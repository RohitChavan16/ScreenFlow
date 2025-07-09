import stripe from "stripe";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/userModel.js";
import Movie from "../models/Movie.js";
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail.js";


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

        const show = await Show.findById(booking.show);
        const user = await User.findById(booking.user);
        const movie = show ? await Movie.findById(show.movie) : null;
        
        const htmlContent = `
          <h2>🎉 Booking Confirmed - ${movie?.title || 'Movie'}</h2>
          <p><strong>Show Time:</strong> ${show ? new Date(show.showDateTime).toLocaleString() : 'N/A'}</p>
          <p><strong>Seats:</strong> ${booking.bookedSeats.join(', ')}</p>
          <p><strong>Amount Paid:</strong> ₹${booking.amount}</p>
          <p>Thank you for booking with <strong>ScreenFlow</strong>!</p>
        `;

        if (user?.email) {
          await sendConfirmationEmail(user.email, '🎟️ ScreenFlow Booking Confirmation', htmlContent);
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

