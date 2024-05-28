import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


const URL = 'https://rentify-back-end.vercel.app';


const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    isSeller: false,
  });
  const navigate=useNavigate()

  const { firstName, lastName, email, phoneNumber, password, isSeller } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + '/api/users/register', formData);
      localStorage.setItem('token', res.data.token);
      

     navigate('/login')
    } catch (err) {
      alert(err.response.data.message)
      //console.error(err.response.data);
    }
  };

  return (
    <>
      <div className='sm:text-3xl text-2xl w-full h-full flex items-center justify-center bg-black text-white py-12 px-4 sm:px-6 lg:px-8'>

        <p>
          Rentify - Where Renting Meets Simplicity!
        </p>

      </div>
      <div className="w-full h-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">

        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register a new account</h2>
          </div>
          <form onSubmit={onSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="first-name" className="sr-only">First Name</label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  value={firstName}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="last-name" className="sr-only">Last Name</label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="phone-number" className="sr-only">Phone Number</label>
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="text"
                  autoComplete="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={onChange}
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <label htmlFor="isSeller" className="ml-2 block text-sm text-gray-900">
                <input
                  id="isSeller"
                  name="isSeller"
                  type="checkbox"
                  checked={isSeller}
                  onChange={(e) => setFormData({ ...formData, isSeller: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                Register as Seller
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='sm:text-2xl flex-col text-xl 
      w-full h-full flex items-center justify-center
       bg-black text-white py-12 px-4 sm:px-6 lg:px-8'>
        <h3>
          All rights are reserved! ©2024
        </h3>
        <h4>
          Created by: Aashish Kumar Singh
        </h4>
      </div>
    </>
  );
};

export default Register;
