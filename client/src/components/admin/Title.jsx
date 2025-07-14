import React from 'react'
import BlurCircle from '../BlurCircle';

const Title = ({ text1, text2 }) => {

return (
    <>
<h1 className='font-medium text-2xl w-fit bg-gradient-to-r from-amber-600 via-amber-200 to-rose-700 text-transparent bg-clip-text'>
{text1} {text2}
</h1>
  
</>
)
}
export default Title;