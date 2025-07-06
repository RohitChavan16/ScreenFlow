import express from "express";
import { addShow, getNowPlayingMovies, getShow, getShows } from "../controllers/showController.js";
import adminAuth from "../middleware/adminAuth.js";

const showRouter = express.Router();
showRouter.get('/now-playing', getNowPlayingMovies);  
showRouter.post('/add', adminAuth, addShow);
showRouter.get('/all', getShows);
showRouter.get('/:movieId', getShow);

export default showRouter;

// in this we need to add middleware for to only allow admin to add show 