import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import {
    Typography,
    CardBody,
    CardFooter,
    Input,
    Spinner
  } from "@material-tailwind/react";
import axios from 'axios';
import { useCookies } from "react-cookie";

const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cookies, setCookies] = useCookies(['token','XSRF-TOKEN']);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
    
    
        try {
          await axios.get('http://localhost:8000/sanctum/csrf-cookie');
          const response = await axios.post('http://localhost:8000/api/register', {
            'name' : name,
            'email' : email,
            'password' : password,
            'confirm_password' : confirmPassword,
          },{
            'headers' : {
              'X-XSRF-TOKEN' : cookies['XSRF-TOKEN']
            }
          });
    
          if (response.status === 200) {
            const stringName = JSON.stringify(response.data.data.name)
            const stringEmail = JSON.stringify(response.data.data.email)
            const stringAccess_token = JSON.stringify(response.data.data.access_token)
            localStorage.setItem("username", stringName);
            localStorage.setItem("email", stringEmail);
            setCookies('token', stringAccess_token, { path: '/' });
            navigate('/dashboard');
            
          }
    
        } catch (error) {
            if (error.response) {
                if (error.response.status === 422) {
                    console.log(error.response.data.data);
                    setError(error.response.data.data);
                } else {
                    setError(error.response.data.message);
                    console.log(error.response.status); 
                }
                
              } else if (error.request) {
                // Tidak ada respons yang diterima
                console.log(error.request);
              } else {
                // Terjadi kesalahan lainnya
                console.log(error.message);
              }
              console.log(error.config);
              
            }
            setLoading(false);
      };

    return (
        <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
            <Input label="Username" type="text" size="lg" required={true} value={name} onChange={(event) => setName(event.target.value)}  error={error.name ? true : false} />
            {error && <Typography variant="small" color="red" className="ml-0 mt-0 text-left font-bold text-xs"> {error.name ? error.name[0] : ''} </Typography>}
            <Input label="Email" type="text" size="lg" required={true} value={email} onChange={(event) => setEmail(event.target.value)}  error={error.email ? true : false} />
            {error && <Typography variant="small" color="red" className="ml-0 mt-0 text-left font-bold text-xs"> {error.email ? error.email[0] : ''} </Typography>}
            <Input label="Password" type="password" size="lg" required={true} value={password} onChange={(event) => setPassword(event.target.value)} error={error.password ? true : false}/>
            {error && <Typography variant="small" color="red" className="ml-0 mt-0 text-left font-bold text-xs"> {error.password ? error.password[0] : ''} </Typography>}
            <Input label="Confirm Password" type="password" size="lg" required={true} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} error={error.confirm_password ? true : false}/>
            {error && <Typography variant="small" color="red" className="ml-0 mt-0 text-left font-bold text-xs"> {error.confirm_password ? error.confirm_password[0] : ''} </Typography>}
            </CardBody>
            <CardFooter className="pt-0">
                <Button variant='gradient' fullWidth type="submit" className="flex justify-center items-center" disabled={loading}>
                {loading ? (
                    <p>
                      <Spinner className="h-4 w-4"/>
                    </p>
                    ) : (
                    'Sign In'
                    )}
                </Button>
                <Typography variant="small" className="mt-6 flex justify-center">
                Have an account?
                  <Typography
                      as={Link}
                      to="/login"
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold"
                  >
                      Sign In
                  </Typography>
                </Typography>
            </CardFooter>
        </form>


    );

}


export default RegisterForm;