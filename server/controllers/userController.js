import Booking from "../models/Booking.js";
import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user._id; 

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};






// API Controller Function to Get User Bookings

export const getUserBookings = async (req, res)=>{

try {
const user = req.user._id; //const user = req.auth().userId;
const bookings = await Booking.find({user}).populate({
path: "show",
populate: {path: "movie"}
}).sort({createdAt: -1})

res.json({success: true, bookings})
} catch (error) {
console.error(error.message);
res.json({ success: false, message: error.message });
}
}


//API Controller Function to Add Favorite Movie in Clerk User Metadata
/*
export const addFavorite = async (req, res) => {

try {
const { movieId } = req.body;
const userId = req.user.userId; //const userId = req.auth().userId;
const user = await userModel.findById(userId);

 if(!user.privateMetadata.favorites){ 
  user.privateMetadata.favorites = []

}

if(!user.privateMetadata.favorites.includes(movieId)){ 
user.privateMetadata.favorites.push(movieId)
}

await clerkClient.users.updateUserMetadata (userId, {privateMetadata: user.privateMetadata});

res.json({success: true, message: "Favorite added successfully." });

} catch (error) {
console.error(error.message);
res.json({ success: false, message: error.message });
}
}
*/



export const addFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;

    // Get user ID from middleware
    const userId = req.user._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Add to favorites only if not already present
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.json({ success: true, message: "Favorite movie added successfully." });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};










//API Controller Function to Update Favorite Movie in Clerk User Metadata
export const updateFavorite = async (req, res) => {
  try {
    const { movieId } = req.body;

    const userId = req.user._id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let message = "";

    // Add to favorites
    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      message = "Favorite movie added successfully.";
    } else {
      // Remove from favorites
      user.favorites = user.favorites.filter(item => item.toString() !== movieId.toString());
      message = "Favorite movie removed successfully.";
    }
     
    await user.save();  

    res.json({ success: true, message });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



// get Favorite 
export const getFavorites = async (req,res) => {
  try {
     const userId = req.user._id;
     const user = await userModel.findById(userId).populate('favorites'); 

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, movies: user.favorites });
  } catch (error) {
    console.error('Error fetching favorites:', error.message);
    res.status(500).json({ success: false, message: error.message }); 
  }
}