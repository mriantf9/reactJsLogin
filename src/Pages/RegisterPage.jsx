import React from 'react';
import { Navigate } from 'react-router-dom';
import RegisterForm from "../Components/RegisterForm"

import {
    Card,
    Typography
  } from "@material-tailwind/react";

const RegisterPage = () => {

  return (
    
    <>
    <div className="h-screen flex mx-auto justify-center items-center bg-black">
        <Card className="w-96">
        <Typography variant="h4" color="blue-gray" className="my-4">
        Sign Up
        </Typography>
        <RegisterForm/>
        </Card>
    </div>
    
    </>
    
  );
};

export default RegisterPage;