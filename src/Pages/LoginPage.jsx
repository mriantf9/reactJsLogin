import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from "../Components/LoginForm"

import {
    Card,
    Typography
  } from "@material-tailwind/react";
import { useCookies } from 'react-cookie'



const LoginPage = () => {
  const [cookies, setCookies] = useCookies(['token']);

  const isAuthenticated = cookies.token ? true : false;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace={true} />;
  }

  return (
    
    <>
    <div className="h-screen flex mx-auto justify-center items-center bg-black">
        <Card className="w-96">
        <Typography variant="h4" color="blue-gray" className="my-4">
        Sign In
        </Typography>
        <LoginForm/>
        </Card>
    </div>
    
    </>
    
  );
};

export default LoginPage;