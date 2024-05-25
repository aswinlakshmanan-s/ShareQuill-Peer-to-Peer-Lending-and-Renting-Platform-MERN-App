import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/authRedirectHook';
import InputField from '../components/inputs/InputField';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

    useEffect(()=>{
        if(auth.hasaccessToken){
            window.location.href = "/"
        }
    })

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/signup', {
                username,
                email,
                password,
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                window.location.href = "/"
            } else {
                console.error( response.status,'Signup failed');
            }
        } catch (error) {
            console.error('Error during Signup:', error);
        }
    };

    return (
        <>
        {auth.hasaccessToken ? (<></>) :
        (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <a href="/">
              <img
                className="mx-auto h-10 w-auto"
                src="media/logo1.png"
                alt="ShareQuill"
              />
            </a>
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up for an account
              </h2>
            </div>
      
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">

                <InputField
                  label="Username"
                  id="username"
                  name="username"
                  value={username}
                  onChange={setUsername}
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                />
      
                <InputField
                  label="Email address"
                  id="email"
                  name="email"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                />
      
                <InputField
                  label="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={setPassword}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />
      
                <div>
                  <button
                    type="submit"
                    onClick={handleSignup}
                    className="flex w-full justify-center rounded-md text-black-50 bg-black-1000 px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign up
                  </button>
                </div>
              </div>
      
              <p className="mt-10 text-center text-sm text-gray-500">
                Alreadt have an account?{' '}
                <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login in
                </a>
              </p>
            </div>
          </div>
        )}</>
    );
};

export default Signup;
