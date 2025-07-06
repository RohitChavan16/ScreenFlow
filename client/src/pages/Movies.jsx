import React from 'react'
import BlurCircle from '../components/BlurCircle';
import MovieCard from '../components/MovieCard';
import { dummyShowsData } from '../assets/assets';
import { useMovieContext } from '../context/MovieContext';

const Movies = () => {

    const {shows} = useMovieContext();

return shows.length > 0 ? (

<div className='relative my-40 mb-60 px-6 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
<BlurCircle top="70px" left="34px"/>
<BlurCircle bottom="50px" right="50px"/>
<h1 className='text-lg font-medium my-4'>Now Showing</h1>

<div className='flex flex-wrap max-sm:justify-center gap-8'>
{shows.map((movie)=> (
<MovieCard movie={movie} key={movie._id}/>
))}
</div>
</div>
    ) : ( <div className='text-center my-40 text-white text-xl'>No movies found</div> )
}

export default Movies; 