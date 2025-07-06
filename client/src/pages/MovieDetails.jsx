import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dummyDateTimeData, dummyShowsData } from '../assets/assets'
import { Divide, Heart, PlayCircleIcon, StarIcon } from 'lucide-react'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/timeFormat'
import DateSelect from '../components/DateSelect'
import MovieCard from '../components/MovieCard'
import Loading from '../components/Loading'
import { useMovieContext } from '../context/MovieContext'
import { toast } from 'react-toastify'

const MovieDetails = () =>{

const {id} = useParams()
const navigate = useNavigate();
const [show, setShow] = useState(null);
const {shows, axios, getToken, user, fetchFavoriteMovies, favoriteMovies, image_base_url} = useMovieContext();

const getShow = async ()=>{
try {
const { data } = await axios.get(`/api/show/${id}`,{withCredentials: true});
if(data.success){
setShow(data);
}
} catch (error) {
console.log(error);
}
}

const handleFavorite = async () => {
try {
console.log(user);
if(!user) return toast.error("Please login to proceed");
const { data } = await axios.post('/api/user/update-favorite', {movieId: id}, { withCredentials: true});

if(data.success){
await fetchFavoriteMovies();
toast.success(data.message);
}
} catch (error) {
console.log(error);
}
};

useEffect(() => {
getShow();
}, [id])
    

return show ? (
   <div className='px-6 md:px-16 lg:px-40 pt-30 md:pt-50'>

<div className='flex flex-col md:flex-row gap-8 max-w-6xl mx-auto'>

<img src={image_base_url + show.movie.poster_path} alt="" className='max-md:mx-auto rounded-x1 h-104 max-w-70 object-cover'/>

<div className='relative flex flex-col gap-3'>
<BlurCircle top="-100px" left="-100px"/>
<p className='text-amber-700'>ENGLISH</p>
<h1 className='text-4xl font-semibold max-w-96 text-balance'>{show.movie.title}</h1>

<div className='flex items-center gap-2 text-gray-300'>
<StarIcon className="w-5 h-5 text-amber-700 fill-primary"/>
{show.movie.vote_average.toFixed(1)} User Rating
</div>  
<p className='text-gray-400 mt-2 text-sm leading-tight max-w-xl'>{show.movie.overview}</p>
<p>
{timeFormat(show.movie.runtime)}&nbsp;&nbsp; | &nbsp;&nbsp;{show.movie.genres.map(genre => genre.name).join(", ")}&nbsp;&nbsp; | &nbsp;&nbsp;{show.movie.release_date.split("-")[0]} 
</p>

<div className='flex items-center flex-wrap gap-4 mt-4'>
<button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95' >
< PlayCircleIcon className="w-5 h-5 cursor-pointer" />    
Watch Trailer</button>
<a href="#dateSelect" className='px-10 py-3 text-sm bg-amber-600 hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'>Buy Tickets</a>

<button onClick={handleFavorite}>
<Heart className={`w-5 h-5 cursor-pointer ${favoriteMovies.find(movie => movie._id === id) ? 'fill-fuchsia-600 text-fuchsia-700' : '' }`} />
</button>

</div>
</div>
</div>

    < DateSelect dateTime={show.dateTime} id={id} />

<p className='text-lg font-medium mt-20 mb-8'>You May Also Like</p>

<div className='flex flex-wrap max-sm:justify-center gap-8'>
{shows.slice(0,4).map((movie, index)=> (
<MovieCard key={index} movie={movie}/>
))}
</div>

<div className='flex justify-center mt-20'>
<button onClick={() => {navigate('/movies') ; scrollTo(0,0)}} className='px-10 py-3 text-sm bg-amber-600 hover:bg-amber-700 transition rounded-md font-medium cursor-pointer'>Show more</button>
</div>

</div>
) : < Loading />
}

export default MovieDetails; 