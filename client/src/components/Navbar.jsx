import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets' 
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react'
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext'
import { useMovieContext } from '../context/MovieContext';

const Navbar = () =>{

    const [isOpen, setIsOpen] = useState(false);
    const {userData, setUserData, backendUrl, setIsLoggedin} = useContext(AppContext);
    const navigate = useNavigate();
        const {favoriteMovies} = useMovieContext();

    const sendVerificationOtp = async () => {
    try {
     // axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp",{
  withCredentials: true,});

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


    const logout = async () => {
  try {
    axios.defaults.withCredentials = true;
    const { data } = await axios.post(backendUrl + "/api/auth/logout");

    if (data.success) {
      setIsLoggedin(false);
      setUserData(false);
      toast.success("Logged out successfully!"); // ✅ Show toast
      navigate("/"); // ✅ Navigate to homepage
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


    return (
        <div className='fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5' >
        <Link to = '/' className='max-md:flex-1'>
        <img src={assets.logo} alt="" className = 'w-46 h-auto' />
        </Link>
        
        <div className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/60 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

          <XIcon className='md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer' onClick={()=>{
            setIsOpen(!isOpen);
          }} />

          <Link onClick = {() => {scrollTo(0, 0); setIsOpen(false)} } to='/' className=" hover:scale-105" >Home</Link>
          <Link onClick = {() => {scrollTo(0, 0); setIsOpen(false)}} to='/movies' className=" hover:scale-105" >Movies</Link>
          <Link onClick = {() => {scrollTo(0, 0); setIsOpen(false)}} to='/' className="hover:scale-105" >Theaters</Link>
          <Link onClick = {() => {scrollTo(0, 0); setIsOpen(false)}} to='/my-bookings' className=" hover:scale-105" >My-Booking</Link>
          { favoriteMovies.length > 0 && <Link onClick = {() => {scrollTo(0, 0); setIsOpen(false)}} to='/favorite' className="hover:scale-105" >Favorite</Link>}
        </div>
        <div className='flex items-center gap-8'>
         <SearchIcon onClick={() => {navigate('/movies'); scrollTo(0, 0)}} className='max-md:hidden w-6 h-6 cursor-pointer'/>
     { userData ? <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gradient-to-tr from-[#841aee] to-[#dd00ff] text-white font-semibold text-lg cursor-pointer shadow-md hover:scale-110 transition-all duration-300 ease-in-out relative group">
          {userData.name[0].toUpperCase()}
           <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className="py-1 px-2 hover:bg-emerald-200 hover:text-emerald-600 text-sm text-gray-700 cursor-pointer rounded-md transition-all duration-200"
                >
                  Verify email
                </li>
              )}

              <li onClick={logout}
                className="py-1 px-2 hover:bg-red-100 hover:text-red-600 text-sm text-gray-700 cursor-pointer rounded-md transition-all duration-200">
                Logout
              </li>
            </ul>
          </div>
          </div> :
       <Link
  to="/login"
  className="px-4 py-1 sm:px-7 sm:py-2 bg-amber-600 hover:bg-amber-700 transition rounded-full font-medium cursor-pointer text-white inline-block text-center">
  Login
</Link>
}
        </div>
        <MenuIcon className='max-md:ml-4 md:hidden w-8 h-8 cursor-pointer' onClick = {() => {setIsOpen(!isOpen)}} />
        </div>
    )
}

export default Navbar; 