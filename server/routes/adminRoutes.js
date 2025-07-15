import express from "express";
import { getAllBookings, getAllShows, getDashboardData, isAdmin, verifyCheckInToken } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

adminRouter.get('/is-admin', adminAuth, isAdmin);
adminRouter.get('/dashboard', adminAuth, getDashboardData);
adminRouter.get('/all-shows', adminAuth, getAllShows);
adminRouter.get('/all-bookings', adminAuth, getAllBookings);
adminRouter.get('/check-in/:bookingId', adminAuth, verifyCheckInToken);

export default adminRouter;