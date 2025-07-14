import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "./AppContext";  

// Set axios default base URL
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const { isLoggedin, userData } = useContext(AppContext);   

  const [isAdmin, setIsAdmin] = useState(false);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [adminLoading, setAdminLoading] = useState(true);  

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const location = useLocation();
  const navigate = useNavigate();


 const fetchIsAdmin = async () => {
     setAdminLoading(true);
  try {
    const { data } = await axios.get("/api/admin/is-admin", { withCredentials: true });

     const adminStatus = data.isAdmin === true;
    console.log("✅ Admin Check Response:", JSON.stringify(data, null, 2));
    console.log("🎯 Setting isAdmin to:", adminStatus);

    setIsAdmin(adminStatus); 
  } catch (error) {
    console.error("❌ Admin check failed:", error.response?.data || error.message);
    setIsAdmin(false);  
  } finally {
    setAdminLoading(false);  
  }
};



  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");

      if (data.success) {
        setShows(data.shows);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch shows:", error.message);
    }
  };



  const fetchFavoriteMovies = async () => {
    try {
      const { data } = await axios.get("/api/user/favorites", { withCredentials: true });

      if (data.success) {
        setFavoriteMovies(data.movies);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error.message);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (isLoggedin && userData) {   
      fetchIsAdmin();
      fetchFavoriteMovies();
    }
  }, [isLoggedin, userData]);

  const value = {
    axios,
    isAdmin,
    shows,
    favoriteMovies,
    user: userData,               
    navigate,
    fetchFavoriteMovies,
    fetchIsAdmin,
     adminLoading, 
     image_base_url
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);


{/*✅ You fixed:

Async state timing

Multi-loading handling

Context management

Protected routes & backend checks

👉 Before you sleep, here’s a quick review checklist for tomorrow:

Problem	What You Learned
Redirects firing too early	❗ Wait for all loading flags (loading, adminLoading) before decisions
Context values missing	➕ Always include every required value in the context provider
isAdmin check failing	✅ Backend must validate + frontend must wait
UIs flashing before check	🕒 Show <Loading /> until everything is ready

*/}
