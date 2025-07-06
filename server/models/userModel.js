import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

name: {type: String, required: true},

email: {type: String, required: true, unique: true},

password: {type: String, required: [true, "Password is Required"]},

verifyotp: {type: String, default: ''},

verifyOtpExpireAt: {type: Number, default: 0},

isAccountVerified: {type: Boolean, default: false},

resetotp: {type: String, default: ""},

resetOtpExpireAt: {type: Number, default: 0},

role: {type: String, enum: ['user', 'admin'], default: 'user'},

favorites: [{ type: String, ref: 'Movie' }],

bookings: [{type: String, ref: 'Booking'}],}, { timestamps: true });

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;

//password: { type: String, required: [true, "Password is required"], select: false } This prevents the password from being returned in queries accidentally.