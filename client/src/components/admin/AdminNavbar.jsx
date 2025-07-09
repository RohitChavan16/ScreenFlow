import React from 'react'
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
return (
    <div className='flex items-center bg-gradient-to-r from-[#00023f] via-[#1d0086] to-[#10005ff3] justify-between px-6 md:px-10 h-16 border-b border-gray-300/30'>

<Link to="/">
<img src={assets.logo} alt="logo" className="w-42 h-auto" />
</Link>

</div>
);
}

export default AdminNavbar;