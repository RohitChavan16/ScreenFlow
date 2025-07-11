import express from 'express';
import { createBooking, getOccupiedSeats, getRecommendedSeat } from '../controllers/bookingController.js';
import userAuth from '../middleware/userAuth.js';

const bookingRouter = express.Router();

bookingRouter.post('/create', userAuth, createBooking);
bookingRouter.get('/recommend-seat/:showId', userAuth, getRecommendedSeat);
bookingRouter.get('/seats/:showId', getOccupiedSeats); 

export default bookingRouter;