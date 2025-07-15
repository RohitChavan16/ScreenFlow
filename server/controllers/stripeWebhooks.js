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
import { Readable } from "stream";

dayjs.extend(utc);
dayjs.extend(timezone);

// Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Convert buffer to stream
const bufferToStream = (buffer) =>
  new Readable({
    read() {
      this.push(buffer);
      this.push(null);
    },
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

        // Generate check-in token and URL
        const checkInToken = crypto.randomBytes(20).toString("hex");
        booking.checkInToken = checkInToken;
        await booking.save();

        const checkInUrl = `https://your-frontend-domain.com/check-in/${booking._id}?token=${checkInToken}`;
        const qrCodeBuffer = await QRCode.toBuffer(checkInUrl);

        // Upload QR to Cloudinary
        bufferToStream(qrCodeBuffer).pipe(
          cloudinary.v2.uploader.upload_stream(
            {
              folder: "screenflow_qrcodes",
              public_id: `booking-${booking._id}`,
              resource_type: "image",
            },
            async (error, result) => {
              if (error) {
                console.error("Cloudinary Upload Error:", error);
                return;
              }

              const show = await Show.findById(booking.show);
              const user = await User.findById(booking.user);
              const movie = show ? await Movie.findById(show.movie) : null;
              const showIST = dayjs
                .utc(show.showDateTime)
                .tz("Asia/Kolkata")
                .format("DD MMM YYYY, hh:mm A");

              // HTML content with QR code image from Cloudinary
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
              } else {
                console.log("❌ No email found for user:", user);
              }
            }
          )
        );

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

