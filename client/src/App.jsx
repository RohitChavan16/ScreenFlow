import { useState } from 'react'
import './App.css'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import SeatLayout from './pages/SeatLayout'
import MovieDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './pages/admin/Layout';
import ListShows from './pages/admin/ListShows';
import AddShows from './pages/admin/AddShows';
import ListBookings from './pages/admin/ListBookings';
import Dashboard from './pages/admin/Dashboard';
import { useContext } from 'react';
import { useMovieContext } from './context/MovieContext';
import { toast } from 'react-toastify';
import AdminRoute from './components/admin/AdminLogin';
import Loading from './components/Loading';

function App() {
  const location = useLocation();
const path = location.pathname;
     const navigate = useNavigate();
  const isAdminRoute = path.startsWith('/admin') || path === '/login' || path === '/email-verify' || path === '/reset-password';
 

  return (
    <div className="select-none">
       <ToastContainer  />
      < Toaster />
      
      {!isAdminRoute && <Navbar />}
      <Routes>
         <Route path = '/' element = {<Home/>} />
         <Route path = '/movies' element = {<Movies/>} /> 
         <Route path = '/movies/:id' element = {<MovieDetails/>} />
         <Route path = '/movies/:id/:date' element = {<SeatLayout/>} />
         <Route path = '/my-bookings' element = {<MyBookings/>} />
         <Route path = '/loading/:nextUrl' element = {<Loading/>} />
         <Route path = '/favorite' element = {<Favorite/>} />
          <Route path = '/login' element = {<Login/>} />
         <Route path = '/email-verify' element = {<EmailVerify/>} />
         <Route path = '/reset-password' element = {<ResetPassword/>} />

         <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path="add-shows" element={<AddShows/>} />
          <Route path="list-shows" element={<ListShows/>} />
          <Route path="list-bookings" element={<ListBookings/>} />
        </Route>
      </Routes>
       {!isAdminRoute && < Footer />}
    </div>
  )
}

export default App;
