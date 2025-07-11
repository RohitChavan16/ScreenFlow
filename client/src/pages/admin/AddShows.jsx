import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import Title from '../../components/admin/Title';
import kConverter from '../../lib/kConverter';
import { toast } from 'react-hot-toast';
import { useMovieContext } from '../../context/MovieContext';

const AddShows = () => {

const currency = import.meta.env.VITE_CURRENCY
const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);
const [dateTimeSelection, setDateTimeSelection] = useState({});
const [dateTimeInput, setDateTimeInput] = useState("");
const [showPrice, setShowPrice] = useState("");
const {axios, user, image_base_url} = useMovieContext();
const [loading, setLoading] = useState(true);
const [addingShow, setAddingShow] = useState(false);
const [screenType, setScreenType] = useState("Screen1");

const fetchNowPlayingMovies = async() => {
 setLoading(true); 
try {
const { data } = await axios.get('/api/show/now-playing', {withCredentials: true});
console.log(data.success);
if(data.success){
setNowPlayingMovies(data.movies);
}
} catch(error) {
console.error('Error fetching movies:', error);
} finally {
    setLoading(false);  // End loading no matter what
  }

};

const handleDateTimeAdd = () => {
if (!dateTimeInput) return toast("Please Enter the date");
const [date, time] = dateTimeInput.split("T");
if (!date || !time) return;
setDateTimeSelection((prev) => {
const times = prev [date] || [];
if (!times.includes (time)) {
return { ...prev, [date]: [...times, time] };
}
return prev;
});
}

const handleRemoveTime = (date, time) => {
setDateTimeSelection((prev) => {
const filteredTimes = prev[date].filter((t) => t !== time);
if (filteredTimes.length === 0) {
const { [date]:_, ...rest } = prev;
return rest;
}
return {...prev,
[date]: filteredTimes,
};
});
};


const handleSubmit = async ()=>{

try {
setAddingShow(true)
if(!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice) {
return toast('Missing required fields');
}
const showsInput = Object.entries(dateTimeSelection).map(([date, time]) => ({date, time}));

const payload = {
movieId: selectedMovie,
showsInput,
showPrice: Number(showPrice),
screenType
}

 const { data } = await axios.post('/api/show/add', payload, { withCredentials: true });

if(data.success) {
toast.success(data.message);
setSelectedMovie(null);
setDateTimeSelection({});
setShowPrice("");
}else{
toast.error(data.message);
}

} catch (error) {
console.error("Submission error:", error);
toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
}finally {
    setAddingShow(false);  
  }
}


useEffect(() => {
    if(user){
fetchNowPlayingMovies();
    }
}, [user]);


if (loading) return <Loading />;

if (nowPlayingMovies.length === 0) {
  return <div className="text-gray-400 text-center mt-10">No movies found.</div>;
}


return nowPlayingMovies.length > 0 ? (
<div className="w-full min-h-screen bg-[url('/AddShowBG.jpg')] bg-cover bg-center px-6 py-4">
<Title text1="Add" text2="Shows" />

<p className="mt-10 text-lg font-medium">Now Playing Movies</p>

<div className="overflow-x-auto pb-4">
<div className="group flex flex-wrap gap-4 mt-4 w-max">

{nowPlayingMovies.map((movie) =>(

<div key={movie.id} onClick={() => setSelectedMovie(movie.id)} className={`relative max-w-40 cursor-pointer group-hover:not-hover:opacity-40 hover:-translate-y-1 transition duration-300 `}>
<div className="relative rounded-lg overflow-hidden">
<img src={image_base_url + movie.poster_path} alt="" className="w-full object-cover brightness-90" />

<div className="text-sm flex items-center justify-between p-2 bg-black/70 w-full absolute bottom-0 left-0">
<p className="flex items-center gap-1 text-gray-400">
<StarIcon className="w-4 h-4 text-primary fill-[color:#d50061]" />
{movie.vote_average.toFixed(1)}</p>
<p className="text-gray-300">{kConverter(movie.vote_count)} Votes</p>
</div>
</div>

{selectedMovie === movie.id && (
<div className="absolute top-2 right-2 flex items-center justify-center bg-amber-600 h-6 w-6 rounded">
<CheckIcon className="w-4 h-4 text-white" strokeWidth={2.5} />
</div>
)}

<p className="font-medium truncate">{movie.title}</p>
<p className="text-gray-400 text-sm">{movie.release_date}</p>

</div>
))}
</div>
</div>


{/*PRICE ENTRY*/}
<div className="mt-8">
<label className="block text-sm font-medium mb-2">Show Price</label>
<div className="inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md">
<p className="text-gray-400 text-sm">{currency}</p>
<input min={0} type="number" value={showPrice} onChange={(e) => setShowPrice(e.target.value)} placeholder="Enter show price" className="outline-none" />
</div>
</div>


<div className="mt-6 ">
  <label className="block text-sm font-medium mb-2">Select Screen</label>
  <select value={screenType} onChange={(e)=>setScreenType(e.target.value)} className="border border-gray-600 rounded-lg p-2 bg-transparent text-neutral-100">
    
    <option value="Screen1" className="bg-[#ce05a6] text-white">Screen 1</option>
    <option value="Screen2" className="bg-[#b90495] text-white">Screen 2</option>
    <option value="Screen3" className="bg-[#ce05a6] text-white">Screen 3</option>
    <option value="Screen4" className="bg-[#b90495] text-white">Screen 4</option>
  </select>

</div>


{/*DATE AND TIME*/}

<div className="mt-6 select-none">
<label className="block text-sm font-medium mb-2">Select Date and Time</label>
<div className="inline-flex gap-5 border border-gray-600 p-1 p1-3 rounded-lg">
<input type="datetime-local" value={dateTimeInput} onChange={(e) => setDateTimeInput(e.target.value)} className="outline-none rounded-md" />
<button onClick={handleDateTimeAdd} className="bg-amber-600 text-white px-3 py-2 text-sm rounded-lg hover:bg-amber-700 cursor-pointer" >
Add Time
</button>
</div>
</div>

{/*Selected date and time*/}

{Object.keys(dateTimeSelection).length > 0 && (
<div className="mt-6">
<h2 className=" mb-2">Selected Date-Time</h2>
<ul className="space-y-3">

{Object.entries(dateTimeSelection).map(([date, times]) => (

<li key={date}>

<div className="font-medium">{date}</div>

<div className="flex flex-wrap gap-2 mt-1 text-sm">
{times.map((time) => (
<div key={time} className="border border-primary px-2 py-1 flex items-center rounded" >
<span>{time}</span>
<DeleteIcon onClick={() => handleRemoveTime(date, time)} width={15} className="ml-2 text-red-500 hover:text-red-700 cursor-pointer" />
</div>
))}
</div>
</li>
))}
</ul>
</div>
)}

<button onClick={handleSubmit} disabled={addingShow || !selectedMovie || !screenType || !showPrice || Object.keys(dateTimeSelection).length === 0} className="bg-amber-600 text-white mx-3 px-8 py-2 mt-6 rounded transition-all cursor-pointer disabled:opacity-50" >
Add Show
</button>

 </div>
) : <Loading/>
}

export default AddShows;