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
import stream from "stream"; // ✅ Needed for buffer to stream

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
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        console.log("🎯 Stripe webhook hit");

        const paymentIntent = event.data.object;
        const sessionList = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });
        const session = sessionList.data[0];
        const { bookingId } = session.metadata;

        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          { isPaid: true, paymentLink: "" },
          { new: true }
        );
        if (!booking) break;

        // Generate token and QR
        const checkInToken = crypto.randomBytes(20).toString("hex");
        booking.checkInToken = checkInToken;
        await booking.save();

        const checkInUrl = `https://your-frontend-url.vercel.app/check-in/${booking._id}?token=${checkInToken}`;
        const qrCodeBuffer = await QRCode.toBuffer(checkInUrl);

        // ⛲ Upload to Cloudinary using stream
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          {
            folder: "screenflow_qrcodes",
            public_id: `booking-${booking._id}`,
          },
          async (error, result) => {
            if (error) {
              console.error("❌ Cloudinary upload failed:", error);
              return;
            }

            // ✅ Now continue email logic
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
              <p><strong>Screen Type:</strong> ${show?.screen || "<em>Not Available</em>"}</p>
              <p><strong>Seats:</strong> ${booking.bookedSeats.join(", ")}</p>
              <p><strong>Amount Paid:</strong> ₹${booking.amount}</p>
              <h3>📲 Show this QR code at the cinema gate:</h3>
              <img src="${result.secure_url}" alt="QR Code" width="200" height="200"/>
              <p>This QR code contains your unique check-in link. Please don’t share it.</p>
              <p>Thank you for booking with <strong>ScreenFlow</strong>. Your seat is ready, and your ticket is confirmed! 🍿</p>
            `;

            try {
              if (user?.email) {
                await sendConfirmationEmail(user.email, "🎟️ ScreenFlow Booking Confirmation", htmlContent);
                console.log("✅ Email sent to:", user.email);
              } else {
                console.log("❌ No email found for user:", user);
              }
            } catch (err) {
              console.error("❌ Email sending failed:", err);
            }
          }
        );

        // 🧠 Pipe buffer to stream
        const readableStream = new stream.PassThrough();
        readableStream.end(qrCodeBuffer);
        readableStream.pipe(uploadStream);

        break;
      }

      default:
        console.log("Unhandled event type:", event.type);
    }

    response.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error", err);
    response.status(500).send("Internal Server Error");
  }
};
