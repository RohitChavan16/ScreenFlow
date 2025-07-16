import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading';
import { ArrowRightIcon, ClockIcon } from 'lucide-react';
import isoTime from '../lib/isoTime';
import BlurCircle from '../components/BlurCircle';
import { toast } from 'react-toastify';
import { useMovieContext } from '../context/MovieContext';

const SeatLayout = () =>{
    const {id, date } = useParams();
const [selectedSeats, setSelectedSeats] = useState([]);
const [selectedTime, setSelectedTime] = useState(null);
const [show, setShow] = useState(null);
const navigate = useNavigate();
const {axios, user} = useMovieContext();
const [occupiedSeats, setOccupiedSeats] = useState([]);
const [recommendedSeat, setRecommendedSeat] = useState(null);

const getShow = async () =>{
try {
const { data } = await axios.get(`/api/show/${id}`, {withCredentials: true});
if (data.success){
setShow(data);
}
} catch (error) {
console.log(error);
}
}
const groupRows = [["A","B"],["C","D"],["E","F"],["G","H"],["I","J"]];

const handleSeatClick = (seatId) => {
if (!selectedTime) {
return toast("Please select time first");
}
if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
return toast("You can only select 5 seats");
}
if(occupiedSeats.includes(seatId)){
return toast('This seat is already booked');
}
setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId]);
}

const handleProceed = async() => {
    try{
        if(!user) return toast.error("Please Login before booking");
        if(!user.isAccountVerified) return toast.error("Please verify your account");
    if (!selectedTime) {
return toast("Please select time first");
}
if(selectedSeats.length === 0){
    return toast("Please select the seats");
} 
const {data} = await axios.post('/api/booking/create', {showId: selectedTime.showId, selectedSeats}, {withCredentials: true});
if (data.success){
  window.location.href = data.url;
}
    } catch(error){
     toast(error.message);
    }

}

const renderSeats = (row, count = 9)=>(
<div key={row} className="flex gap-2 mt-2">
<div className="flex flex-wrap items-center justify-center gap-2">

{Array.from({ length: count }, (_, i) => {
const seatId = `${row}${i + 1}`;
return (
<button key={seatId} onClick={() => handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-[color:#fe8765]/40 cursor-pointer ${selectedSeats.includes(seatId) && "bg-amber-700 text-white"} ${occupiedSeats.includes(seatId) && " opacity-50"}`}>
{seatId}
</button>
);
})}
</div>
</div>
)


const getOccupiedSeats = async ()=>{

try {
const { data } = await axios.get(`/api/booking/seats/${selectedTime.showId}`);
if (data.success) {
setOccupiedSeats(data.occupiedSeats);
}else{
toast.error(data.message);
}
} catch (error) {
console.log(error);
}
}


const handleRecommendSeat = async () => {
  if (!selectedTime) {
    return toast("Please select time first");
  }
console.log("Show ID:", selectedTime?.showId);
  try {
    const { data } = await axios.get(`/api/booking/recommend-seat/${selectedTime.showId}`, {withCredentials: true});
    if (data.success && data.seat) {
      setRecommendedSeat(data.seat);
      toast.success(`Recommended Seat: ${data.seat}`);
      setSelectedSeats(prev => prev.includes(data.seat) ? prev : [...prev, data.seat]);
    } else {
      toast.error(data.message || "No seat recommendation available");
    }
    
  } catch (error) {
    console.log(error);
    toast.error("Failed to recommend seat");
  }
};


function convertTo24Hour(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return "00:00";

  const match = timeStr.match(/^(\d{1,2}):(\d{2})(AM|PM)$/i);
  if (!match) return "00:00";

  let [_, hours, minutes, modifier] = match;
  hours = parseInt(hours);
  minutes = parseInt(minutes);

  if (modifier.toUpperCase() === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier.toUpperCase() === "AM" && hours === 12) {
    hours = 0;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}



useEffect(() => {
getShow();
}, [])

useEffect(()=>{
if(selectedTime){
getOccupiedSeats();
  setRecommendedSeat(null);
  setOccupiedSeats([]);
    setSelectedSeats([]);
}
}, [selectedTime]);

return show ? ( <div>
    
    <button onClick={handleRecommendSeat} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 
             animate-bounce 
             hover:scale-105 
             hover:brightness-110 
             shadow-lg 
             text-white 
             rounded-full 
             px-5 py-2 text-sm 
             transition-all duration-300 
             mb-4 absolute top-35 left-41.5 cursor-pointer max-md:top-20 max-md:left-7.5 ">Recommend Best Seat For Me!</button>

   
<div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>

<div className='w-60 bg-[color:#fe5454]/14 border border-[color:#fe8765]/10 rounded-lg py-7 h-max md:sticky md:top-30'>

<p className='text-lg mt-1 font-semibold px-10'>Available Timings</p>

<div className=" mt-7 space-y-1">

{show.dateTime[date]?.slice().sort((a, b) => new Date(a.time) - new Date(b.time)).map((item)=>(  
<div className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? "bg-[color:#fe5454] text-white" : "hover:bg-[color:#fe5454]"}`}
key={item.time} onClick={()=> setSelectedTime(item)}>
<ClockIcon className="w-4 h-4"/>
<p className='text-sm'>{ isoTime(item.time) }</p>
</div>
))}
</div>
</div>

<div className='relative bottom-8 flex-1 flex flex-col items-center max-md:mt-16'>
<BlurCircle top="-100px" left="-100px"/>
<BlurCircle bottom="0" right="50px"/>
<h1 className='text-2xl font-semibold mb-4'>Select your seat</h1>
<img src={assets.screenImage} alt="screen" />
<p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>
<div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
<div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
{groupRows[0].map(row => renderSeats(row))}
</div>
<div className='grid grid-cols-2 gap-11'>
{groupRows.slice(1).map((group, idx)=>(
<div key={idx}>
{group.map(row => renderSeats(row))}
</div>
))}
</div>
</div>

<button onClick={handleProceed} className='flex group items-center gap-1 mt-20 px-10 py-3 text-sm bg-amber-600 hover:bg-amber-700 transition rounded-full font-medium cursor-pointer active:scale-95'>
Proceed to Payment
<ArrowRightIcon strokeWidth={3} className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
</button> {/* add here condition whether time and seat is selected or not */}

</div>
</div>
 </div>
    ) : < Loading />
}

export default SeatLayout; 