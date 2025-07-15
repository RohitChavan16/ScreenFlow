import stripe from "stripe";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/userModel.js";
import Movie from "../models/Movie.js";
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import QRCode from "qrcode";
import crypto from "crypto";
import cloudinary from "cloudinary";
import streamifier from "streamifier";

dayjs.extend(utc);
dayjs.extend(timezone);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const stripeWebhooks = async (request, response) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("✅ Stripe webhook event verified");
  } catch (error) {
    console.error("❌ Webhook verification failed:", error.message);
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        console.log("💰 Payment succeeded for intent:", paymentIntent.id);

        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        const session = sessionList.data[0];
        const { bookingId } = session.metadata;

        console.log("📦 Booking ID from metadata:", bookingId);

        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          { isPaid: true, paymentLink: "" },
          { new: true }
        );

        if (!booking) {
          console.log("❌ Booking not found");
          break;
        }

        const booking1 = await Booking.findById(bookingId);
        const checkInToken = crypto.randomBytes(20).toString("hex");
        booking1.checkInToken = checkInToken;
        await booking1.save();
        console.log("🔐 Check-in token saved:", checkInToken);

        const checkInUrl = `http://localhost:5173/check-in/${booking1._id}?token=${checkInToken}`;
        const qrCodeBuffer = await QRCode.toBuffer(checkInUrl);
        console.log("🧾 QR code generated");

        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "screenflow_qrcodes",
            resource_type: "image",
            public_id: `booking-${booking1._id}`,
          },
          async (error, result) => {
            if (error) {
              console.error("❌ Cloudinary upload error:", error);
              return;
            }

            console.log("☁️ Uploaded QR Code to Cloudinary:", result.secure_url);

            const show = await Show.findById(booking.show);
            const user = await User.findById(booking.user);
            const movie = show ? await Movie.findById(show.movie) : null;
            const showIST = dayjs
              .utc(show.showDateTime)
              .tz("Asia/Kolkata")
              .format("DD MMM YYYY, hh:mm A");

            const htmlContent = `
              <h2>🎉 Booking Confirmed - ${movie?.title || "Movie"}</h2>
              <p><strong>Show Time:</strong> ${showIST}</p>
              <p><strong>Screen Type:</strong> ${
                show?.screen || "<em>Not Available</em>"
              }</p>
              <p><strong>Seats:</strong> ${booking.bookedSeats.join(", ")}</p>
              <p><strong>Amount Paid:</strong> ₹${booking.amount}</p>
              <h3>📲 Show this QR code at the cinema gate:</h3>
              <img src="${result.secure_url}" alt="QR Code" width="200" height="200"/>
              <p>This QR code contains your unique check-in link. Please don’t share it.</p>
              <p>Thank you for booking with <strong>ScreenFlow</strong>. Your seat is ready, and your ticket is confirmed! 🍿</p>
            `;

            if (user?.email) {
              await sendConfirmationEmail(
                user.email,
                "🎟️ ScreenFlow Booking Confirmation",
                htmlContent
              );
              console.log("📧 Confirmation email sent to:", user.email);
            } else {
              console.log("❌ User email not found");
            }
          }
        );

        streamifier.createReadStream(qrCodeBuffer).pipe(uploadStream);
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook processing error:", err);
    response.status(500).send("Internal Server Error");
  }
};


