import stripe from "stripe";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/userModel.js";
import Movie from "../models/Movie.js";
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail.js";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import QRCode from 'qrcode';
import crypto from 'crypto'; 
import { Buffer } from "buffer";

dayjs.extend(utc);
dayjs.extend(timezone);


export const stripeWebhooks = async (request, response) => {
     
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = request.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        const sessionList = await stripeInstance.checkout.sessions.list({ payment_intent: paymentIntent.id });
        const session = sessionList.data[0];
        const { bookingId } = session.metadata;

        const booking = await Booking.findByIdAndUpdate(
          bookingId,
          { isPaid: true, paymentLink: "" },
          { new: true }
        );
         
        if (!booking) break;

        const booking1 = await Booking.findById(bookingId);
         if (!booking1) break;
        const checkInToken = crypto.randomBytes(20).toString('hex');
        booking1.checkInToken = checkInToken;
        await booking1.save();
        

        const checkInUrl = `${process.env.CLIENT_URL}/api/admin/check-in/${booking1._id}?token=${checkInToken}`;
        const qrCodeDataUrl = await QRCode.toDataURL(checkInUrl);
        const qrBuffer = await QRCode.toBuffer(checkInUrl);

        const show = await Show.findById(booking.show);
        const user = await User.findById(booking.user);
        const movie = show ? await Movie.findById(show.movie) : null;
        const showIST = dayjs.utc(show.showDateTime).tz("Asia/Kolkata").format("DD MMM YYYY, hh:mm A");

        const htmlContent = `
          <h2>🎉 Booking Confirmed - ${movie?.title || 'Movie'}</h2>
          <p><strong>Show Time:</strong> ${showIST}</p>
         <p><strong>Screen Type:</strong> ${show?.screen ? show.screen : '<em>Not Available</em>'}</p>  
          <p><strong>Seats:</strong> ${booking.bookedSeats.join(', ')}</p>
          <p><strong>Amount Paid:</strong> ₹${booking.amount}</p>
         <p>You can check in directly using the link below:</p>
          <p><a href="${checkInUrl}">${checkInUrl}</a></p>
           <p>Your QR code is attached to this email. You can show it at the cinema gate for check-in.</p>
          <p>Thank you for booking with <strong>ScreenFlow</strong>. Your seat is ready, and your ticket is confirmed! 🍿</p>
        `;

        if (user?.email) {
          await sendConfirmationEmail(user.email, '🎟️ ScreenFlow Booking Confirmation', htmlContent,  [
  {
    filename: 'qrcode.png',
    content: qrBuffer,
    contentType: 'image/png'
  }
]);
        }  else {
            console.log("❌ No email found for user:", user);
        }
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    response.json({ received: true });

  } catch (err) {
    console.error("Webhook processing error", err);
    response.status(500).send("Internal Server Error");
  }
}
