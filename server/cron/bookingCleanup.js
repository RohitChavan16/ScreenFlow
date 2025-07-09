import cron from 'node-cron';
import mongoose from 'mongoose';
import Booking from '../models/Booking.js';
import Show from '../models/Show.js';

cron.schedule('* * * * *', async () => {
  if (mongoose.connection.readyState !== 1) {
    console.log('⏳ Skipping cron: MongoDB not connected.');
    return;
  }

  try {
    const now = new Date();

    const expiredBookings = await Booking.find({
      isPaid: false,
      expiresAt: { $lte: now }
    });

    for (let booking of expiredBookings) {
      const show = await Show.findById(booking.show);
      if (show) {
        booking.bookedSeats.forEach(seat => {
          if (
            show.occupiedSeats[seat] &&
            show.occupiedSeats[seat].toString() === booking.user.toString()
          ) {
            delete show.occupiedSeats[seat];
          }
        });

        show.markModified('occupiedSeats');
        await show.save();
      }

      await Booking.findByIdAndDelete(booking._id);
      console.log(`⏰ Booking ${booking._id} auto-cancelled & seats released.`);
    }
  } catch (err) {
    console.error('Cron job error:', err.message);
  }
});
