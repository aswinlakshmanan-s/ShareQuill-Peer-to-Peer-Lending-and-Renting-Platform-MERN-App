
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/authRedirectHook';
import InputField from '../components/inputs/InputField';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useAuth();

    useEffect(()=>{
        if(auth.hasaccessToken){
            window.location.href = "/"
        }
    })

  const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/login', {
            email,
            password,
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        if (response.status === 200) {
            window.location.href = "/"
        } else {
            console.error('Login failed');
        }
      } catch (error) {
        console.error("[ERROR]", error);
      }
    }
    return (
        <div>
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
                Sign in to your account
              </h2>
            </div>
      
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <div className="space-y-6">

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
                  forgotLink="#"
                />
      
                <div>
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="flex w-full justify-center rounded-md text-black-50 bg-black-1000 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </div>
      
              <p className="mt-10 text-center text-sm text-gray-500">
                New here?{' '}
                <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Explore rentals or sell your products now!
                </a>
              </p>
            </div>
          </div>

        )
        }
        </div>
    );
}

export default Login;
