import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import BlurCircle from '../components/BlurCircle';
import { useMovieContext } from '../context/MovieContext';
import { Link } from 'react-router-dom';
import timeFormat from '../lib/timeFormat';
import dateFormat from '../lib/dateFormat';

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const { axios, user, image_base_url } = useMovieContext();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timers, setTimers] = useState({});

  const getMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/user/booking', { withCredentials: true });
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (user) {
      getMyBookings();
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      let expired = false;

      bookings.forEach(item => {
        if (!item.isPaid && item.expiresAt) {
          const expiry = new Date(item.expiresAt).getTime();
          const now = Date.now();
          const timeLeft = Math.max(Math.floor((expiry - now) / 1000), 0);
          newTimers[item._id] = timeLeft;
          if (timeLeft === 0) expired = true;
        }
      });

      setTimers(newTimers);

      // If any booking expired, refresh bookings to update UI
      if (expired) {
        getMyBookings();
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [bookings]);

  // Poll every 10 seconds to fetch fresh bookings
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      getMyBookings();
    }, 10000);

    return () => clearInterval(refreshInterval);
  }, []);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  return !isLoading ? (
    <div className='relative px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
      <BlurCircle top="100px" left="100px" />
      <div><BlurCircle bottom="0px" left="600px" /></div>

      <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

      <button
        onClick={getMyBookings}
        className="bg-amber-700 px-3 py-1 rounded text-sm mb-4 cursor-pointer"
      >
        🔄 Refresh Bookings
      </button>

      {bookings.length === 0 && (
        <p className="text-gray-400">No bookings found.</p>
      )}

      {bookings.map((item, index) => (
        <div key={index} className='flex flex-col md:flex-row justify-between bg-amber-900/30 border border-amber-800/30 rounded-lg mt-4 p-2 max-w-3xl'>
          <div className='flex flex-col md:flex-row'>
            <img
              src={image_base_url + item.show.movie.poster_path}
              alt=""
              className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded'
            />
            <div className='flex flex-col p-4'>
              <p className='text-lg font-semibold'>{item.show.movie.title}</p>
              <p className='text-gray-400 text-sm'>{timeFormat(item.show.movie.runtime)}</p>
              <p className='text-gray-400 text-sm mt-auto'>{dateFormat(item.show.showDateTime)}</p>
            </div>
          </div>

          <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
            <div className='flex items-center gap-4'>
              <p className='text-2xl font-semibold mb-3'>{currency}{item.amount}</p>

              {!item.isPaid && (
                <div className='mb-3'>
                  {timers[item._id] > 0 ? (
                    <>
                      <p className='text-red-400 text-xs mb-1'>⏳ Please complete your payment before time runs out!</p>
                      <p className='text-xl font-mono text-red-600 mb-2'>{formatTime(timers[item._id] || 0)}</p>
                      <Link
                        to={item.paymentLink}
                        className='bg-amber-600 px-4 py-1.5 text-sm rounded-full font-medium cursor-pointer'
                      >
                        Pay Now
                      </Link>
                    </>
                  ) : (
                    <p className='text-gray-400 text-xs'>⛔ Booking expired</p>
                  )}
                </div>
              )}

              {item.isPaid && (
                <p className='text-green-500 text-sm mb-3'>✅ Payment Completed</p>
              )}
            </div>

            <div className='text-sm'>
              <p><span className='text-gray-400'>Total Tickets:</span> {item.bookedSeats.length}</p>
              <p><span className='text-gray-400'>Seat Number:</span> {item.bookedSeats.join(", ")}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : <Loading />;
};

export default MyBookings;
