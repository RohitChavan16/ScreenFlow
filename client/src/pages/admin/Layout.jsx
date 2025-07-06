import React from 'react'
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Loading from '../../components/Loading';
import { useMovieContext } from '../../context/MovieContext';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLoggedin, loading } = useContext(AppContext);
  const { isAdmin, fetchIsAdmin, adminLoading } = useMovieContext();

  console.log("👑 isAdmin:", isAdmin);
  console.log("🔑 isLoggedin:", isLoggedin);
  console.log("⏳ loading:", loading);
  console.log("⏳ adminLoading:", adminLoading);

  useEffect(() => {
    if (isLoggedin && location.pathname.startsWith('/admin')) {
      fetchIsAdmin();
    }
  }, [isLoggedin, location.pathname]);

  useEffect(() => {
    console.log("✅ Admin Check Decision Point:", { isLoggedin, isAdmin, loading, adminLoading });

    if (loading || adminLoading) return;

    if (!isLoggedin) {
      toast.error('Please login before accessing admin dashboard');
      navigate('/login');
      return;
    }

    if (location.pathname.startsWith('/admin') && isAdmin === false) {
      toast.error('You are not authorized to access admin dashboard');
      navigate('/');
    }
  }, [isAdmin, isLoggedin, loading, adminLoading, location.pathname, navigate]);

 if (!isLoggedin && !loading) {
    // Extra safety: If not logged in and loading is over, redirect immediately
    navigate('/login', { replace: true });
     toast.error('Please login before accessing admin dashboard');
    return null; // prevent rendering anything
  }

  if (loading || adminLoading) return <Loading />;
    return (
    <div>
        <AdminNavbar/>
        <div className="flex">
            <AdminSidebar/>
            <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    </div>
);
}

export default Layout;