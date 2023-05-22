import { useEffect } from 'react';
import React from 'react';
import { useNavigate, Outlet, useLocation  } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const ProtectedRoute = () => {
    const navigate = useNavigate();

    const [cookies, setCookies] = useCookies(['token']);
    const isAuthenticated = cookies.token ? true : false;


useEffect(() => {
    if (!isAuthenticated) {
        navigate('/login', { replace: true });
    }
},[]);


    
    
    return <Outlet />;

};

export default ProtectedRoute;