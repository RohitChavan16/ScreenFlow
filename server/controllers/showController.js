import axios from "axios";
import Show from "../models/Show.js";
import Movie from "../models/Movie.js";
import { sendConfirmationEmail } from "../utils/sendConfirmationEmail.js";
import userModel from "../models/userModel.js";
import { seatRecommendation } from "../utils/seatRecommendation.js";

export const getNowPlayingMovies = async(req, res) => {

  try {
        const {data} = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
            headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`},
             params: {
                  language: 'en-US',
                  page: 1,
                  region: 'IN' }
             });
        const movies = data.results;

        res.json({success: true, movies: movies});
     } catch(error) {
       console.error(error);
       res.json({success: false, message: error.message});
  }

}











const isScreenAvailable = async (screenType, showDateTime) => {
  const existingShow = await Show.findOne({
    screen: screenType,
    showDateTime: showDateTime
  });

  return !existingShow; 
};








export const addShow = async (req, res) =>{

try {
const {movieId, showsInput, showPrice, screenType} = req.body;
let movie = await Movie.findById(movieId);
   
if(req.message == "Welcome! You can browse, but editing is restricted"){
  return res.json({success: false, message: "Looks like you're not an admin — adding shows is restricted"});
}

 for (const show of showsInput) {
      const showDate = show.date;

      for (const time of show.time) {
        const dateTimeString = `${showDate}T${time}`;
        const showDateTime = new Date(dateTimeString);

        const available = await isScreenAvailable(screenType, showDateTime);

        if (!available) {
          return res.status(400).json({
            success: false,
            message: `❌ Screen ${screenType} is already booked for ${showDate} at ${time}.`,
          });
        }
      }
    }
   
if(!movie) {
// Fetch movie details and credits from TMDB API
const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([

    axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`} }),

axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`}})

]);

const movieApiData = movieDetailsResponse.data;
const movieCreditsData = movieCreditsResponse.data;

const movieDetails = {
_id: movieId,
title: movieApiData.title,
overview: movieApiData.overview,
poster_path: movieApiData.poster_path,
backdrop_path: movieApiData.backdrop_path,
genres: movieApiData.genres,
casts: movieCreditsData.cast,
release_date: movieApiData.release_date,
original_language: movieApiData.original_language,
tagline: movieApiData.tagline || "",
vote_average: movieApiData.vote_average,
runtime: movieApiData.runtime,
}

// Add movie to the database

movie = await Movie.create(movieDetails);
}

  const showsToCreate = [];
    for (const show of showsInput) {
      const showDate = show.date;

      for (const time of show.time) {
        const dateTimeString = `${showDate}T${time}`;
        const showDateTime = new Date(dateTimeString);

        showsToCreate.push({
          movie: movie._id,
          screen: screenType,
          showDateTime,
          showPrice,
          occupiedSeats: {},
        });
      }
    }

if(showsToCreate.length > 0){
   await Show.insertMany(showsToCreate);

      
      const users = await userModel.find({}, 'email');

     
      const subject = `🎬 New Show Added: ${movie.title}`;
      const htmlContent = `
        <h2>New Show Alert: ${movie.title}</h2>
        <p>A new show for <strong>${movie.title}</strong> has just been added to ScreenFlow!</p>
        <p>Don't miss out. Book your tickets now!</p>
        <a href="${process.env.FRONTEND_URL}/movies/${movieId}" style="background:#fe5454;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;">View Show</a>
      `;

      for (const user of users) {
        if (user.email) {
          await sendConfirmationEmail(user.email, subject, htmlContent);
        }
      }
    }


res.json({success: true, message:'Show Added Successfully.'});
} catch(error) {
       console.error(error);
       res.json({success: false, message: error.message});
  }

}








//API to get all shows from the database

export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate('movie')    // ✅ Fixed populate
      .sort({ showDateTime: 1 });

    // ✅ Extract unique movies based on movie._id
    const movieMap = new Map();

    shows.forEach(show => {
      if (show.movie && !movieMap.has(show.movie._id.toString())) {
        movieMap.set(show.movie._id.toString(), show.movie);
      }
    });

    const uniqueMovies = Array.from(movieMap.values());

    res.status(200).json({ success: true, shows: uniqueMovies });

  } catch (error) {
    console.error("Error fetching shows:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};











// API to get a single show from the database

export const getShow = async (req, res) =>{

try {
const {movieId} = req.params;
// get all upcoming shows for the movie
const shows = await Show.find({movie: movieId, showDateTime: { $gte: new Date() }});
const movie = await Movie.findById(movieId);

if (!movie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

const dateTime = {};
shows.forEach((show) => {

const date = show.showDateTime.toISOString().split("T")[0];

if(!dateTime[date]) {
dateTime [date] = []
}
dateTime[date].push({time: show.showDateTime, showId: show._id}); 
})

res.status(200).json({success: true, movie, dateTime});
} catch (error) {
console.error(error);
res.status(500).json({ success: false, message: error.message });
}
}










