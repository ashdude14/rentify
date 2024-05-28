import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const URL = 'https://rentify-back-end.vercel.app';

const Login = () => {
  const navigate = useNavigate();

  const { setName, setSeller, setEmail, name, Email } = useContext(userContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/users/login`, formData);
      localStorage.setItem('token', res.data.token);

      setName(res.data.firstName);
      setSeller(res.data.isSeller);
      setEmail(res.data.email);
      // Redirect to properties page
      //window.location.href = '/properties';
      navigate('/properties')
    } catch (err) {
      alert(err.response.data.message);
      //console.error(err.response.data);
    }
  };

  useEffect(() => {
    // console.log("Updated nameygugyu:", name);
    // console.log("Updated seller:", setSeller);
    // console.log("Updated email:", setEmail);
  }, [setName, setSeller, setEmail, name, Email]);

  return (
    <>
      <div className='sm:text-3xl text-2xl w-full h-full flex items-center justify-center bg-black text-white py-12 px-4 sm:px-6 lg:px-8'>
        <p>Rentify!</p>
      </div>

      <div className="w-full h-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={onChange} />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={onChange} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up for new user!</Link>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>

    </>
  );
};

export default Login;
