import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import userModel from "../models/userModel.js";

//API to check if user is admin
export const isAdmin = async (req, res) =>{
res.json({success: true, isAdmin: true})
}



//API to get dashboard data

export const getDashboardData = async (req, res) =>{
try {

const bookings = await Booking.find({isPaid: true});
const activeShows = await Show.find({showDateTime: {$gte: new Date()}}).populate('movie');
const totalUser = await userModel.countDocuments();

const dashboardData = {
totalBookings: bookings.length,
totalRevenue: bookings.reduce((acc, booking)=> acc + booking.amount, 0),
activeShows,
totalUser
}
const message = req.message;
res.json({success: true, dashboardData, message});  // res,json......(mistake)
}
catch(error) {
  console.error(error);
  res.json({success: false, message: error.message});
}
}





// API to get all shows

export const getAllShows = async (req, res) =>{
try {

const shows = await Show.find({showDateTime: { $gte: new Date() }}).populate('movie').sort({ showDateTime: 1 });

res.json({success: true, shows});
} catch (error) {
console.error(error);
res.json({success: false, message: error.message});
}
}







// API to get all bookings

export const getAllBookings = async (req, res) =>{
try {

const bookings = await Booking.find({}).populate('user').
populate({
path: "show",
populate: {path: "movie"}
}).sort({ createdAt: -1 })

res.json({success: true, bookings });
} catch (error) {
console.error(error);
res.json({success: false, message: error.message})
}
}



export const verifyCheckInToken = async (req, res) => {
   try {
    const { bookingId } = req.params;
    const { token } = req.query;

    if (!token) return res.status(400).json({ success: false, message: "Missing token" });

    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    if (booking.checkedIn) return res.status(400).json({ success: false, message: "Already checked in" });

    if (booking.checkInToken !== token) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

     console.log("🔍 bookingId:", bookingId);
   
   booking.checkedIn = true;
await booking.save();

    res.json({ success: true, message: "Check-in successful!" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};