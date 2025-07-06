import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Loading = () => {

    const { nextUrl } = useParams();
     const [isLoading, setIsLoading] = useState(true);

const navigate = useNavigate();
useEffect(() => {
if(nextUrl){
setTimeout(()=>{
    setIsLoading(false);
navigate('/' + nextUrl);
},8000);
 return () => clearTimeout(timer);
}
}, [nextUrl, navigate]);

return (
<div className='flex justify-center items-center h-[80vh]'>
<div className='animate-spin rounded-full h-14 w-14 border-2 border-t-amber-800'></div>
</div>
)
}
export default Loading;