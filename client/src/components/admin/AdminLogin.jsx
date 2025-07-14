import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const AdminRoute = ({ children }) => {
  const { isLoggedin } = useContext(AppContext);
  const location = useLocation();
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (!isLoggedin && !hasShownToast) {
      toast.error("Please login before accessing Admin Dashboard");
      setHasShownToast(true);
    }

    setTimeout(() => {
        window.location.reload();
      }, 1500);
    
  }, [isLoggedin, hasShownToast]);
 
  if (!isLoggedin) {  
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default AdminRoute;
