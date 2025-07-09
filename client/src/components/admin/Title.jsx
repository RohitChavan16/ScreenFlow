import React from 'react'
import BlurCircle from '../BlurCircle';

const Title = ({ text1, text2 }) => {

return (
    <>
<h1 className='font-medium text-2xl'>
{text1} 
<span className="underline text-[color:#ff3a6b]">{text2}</span>
</h1>
  
</>
)
}
export default Title;