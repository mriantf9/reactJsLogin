import { React, useState, useEffect } from 'react';
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

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [cookies, setCookies] = useCookies(['token','XSRF-TOKEN']);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        setLoading(true);


    
        try {
          await axios.get('http://localhost:8000/sanctum/csrf-cookie');
          const response = await axios.post('http://localhost:8000/api/login', {
            'email' : email,
            'password' : password
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
              setError(error.response.data.data.email[0]);
              
            } else {
              
              setError(error.response.data.message);
            }
            
            
          } else if (error.request) {
    
            console.log(error.request);
            
    
          } else {
    
            console.log(error.message);
            
          }
          console.log(error.config);

          setLoading(false);
          
          
        }
      };

    return (
        <form onSubmit={handleSubmit}>
            <CardBody className="flex flex-col gap-4">
            <Input label="Email" type="text" size="lg" required={true} value={email} onChange={(event) => setEmail(event.target.value)}  error={error ? true : false} />
            <Input label="Password" type="password" size="lg" required={true} value={password} onChange={(event) => setPassword(event.target.value)} error={error ? true : false}/>
            {error && <Typography variant="small" color="red" className="ml-1 font-bold"> {error} </Typography>}
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
                Don't have an account?
                  <Typography
                      as={Link}
                      to="/register"
                      variant="small"
                      color="blue"
                      className="ml-1 font-bold"
                  >
                      Sign up
                  </Typography>
                </Typography>
            </CardFooter>
        </form>

    );



}


export default LoginForm