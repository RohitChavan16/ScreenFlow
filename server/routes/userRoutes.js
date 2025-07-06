import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getFavorites, getUserBookings, getUserData, updateFavorite } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/data', userAuth, getUserData);
userRouter.get('/booking', userAuth, getUserBookings);
userRouter.post('/update-favorite', userAuth, updateFavorite); // you must when to give post and get
userRouter.get('/favorites', userAuth, getFavorites);

export default userRouter;