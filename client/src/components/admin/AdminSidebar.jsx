import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon, QrCode } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const AdminSidebar = () => {

const user = {
firstName: 'Rohit',
lastName: 'Chavan',
imageUrl: assets.Rohit,
}

const adminNavlinks = [
{ name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
{ name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
{ name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
{ name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
{ name: 'Scan Ticket', path: '/admin/scanner', icon: QrCode },
]

return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center bg-gradient-to-r from-[#003556] via-[#100242] to-[#050211f3] pt-8 max-w-13 md:max-w-60 w-full border-r border-amber-600 text-sm'>

<img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={user.imageUrl} alt="sidebar" />

<p className='mt-2 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>

<div className='w-full'>
{adminNavlinks.map((link, index)=>( 

<NavLink key={index} to={link.path} end className={({ isActive }) => `relative flex items-center max-md:justify-center md:px-4 gap-2 w-full py-2.5 min-md:p1-10 first:mt-6 text-gray-400 ${isActive && 'bg-[color:#ff2b60]/70 text-[color:#dd0342] group'}`} >
{({ isActive })=>(
<>
<link.icon className="w-5 h-5" />
<p className="max-md:hidden">{link.name}</p>
<span className={`w-1.5 h-10 rounded-1 right-0 absolute ${isActive && 'bg-[color:#ff5b20]'}`} />
</>
)}
</NavLink>
))}
     
</div>
</div>
)
}

export default AdminSidebar;