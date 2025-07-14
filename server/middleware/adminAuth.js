import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';


const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;          //const token = req.headers.authorization?.split(" ")[1];  study about from where we can get token

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
   let message = "";
    if (user.email !== process.env.SENDER_EMAIL) {
        message = "Welcome! You can browse, but editing is restricted";
    } else {
         message = "👑 Welcome, Commander";
    }
    
    req.message = message;
    req.user = user; 
    next(); 
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default adminAuth;
