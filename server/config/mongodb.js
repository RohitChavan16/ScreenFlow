import mongoose from "mongoose";

const connectDB = async () => {
    try {
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    
    const conn = await mongoose.connect(`${process.env.MONGODB_URL}/mern-auth`,); // Avoid givivng database name directly instead stored in const.js and import it here. ${dbname}

    } 
    catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }

}

export default connectDB;