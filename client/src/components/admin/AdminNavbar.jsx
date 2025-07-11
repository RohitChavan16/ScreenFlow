import React from 'react'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
return (
    <div className='flex items-center bg-gradient-to-b from-[#002d44] via-[#0f0141] to-[#000000f3] justify-between px-6 md:px-10 h-16 border-b border-b-amber-600'>

<Link to="/">
<img src={assets.logo} alt="logo" className="w-42 h-auto" />
</Link>

</div>
);
}

export default AdminNavbar;