import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const URL = 'https://rentify-back-end.vercel.app';

const AddProperty = () => {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearbyHospitals: '',
    nearbyColleges: '',
  });

  const { title, description, price, address, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(URL + '/api/properties', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Property added successfully');
      navigate('/properties')
    } catch (err) {
      alert("Please log in as a Seller to add property!")
      console.error(err.response.data);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Add a new property</h2>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mt-4">
              <label htmlFor="title" className="sr-only">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Title"
                value={title}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="description" className="sr-only">Description</label>
              <textarea
                id="description"
                name="description"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Description"
                value={description}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="price" className="sr-only">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Price"
                value={price}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="address" className="sr-only">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address"
                value={address}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="area" className="sr-only">Area</label>
              <input
                id="area"
                name="area"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Area"
                value={area}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="bedrooms" className="sr-only">Bedrooms</label>
              <input
                id="bedrooms"
                name="bedrooms"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Bedrooms"
                value={bedrooms}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="bathrooms" className="sr-only">Bathrooms</label>
              <input
                id="bathrooms"
                name="bathrooms"
                type="number"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Bathrooms"
                value={bathrooms}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="nearbyHospitals" className="sr-only">Nearby Hospitals</label>
              <input
                id="nearbyHospitals"
                name="nearbyHospitals"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nearby Hospitals"
                value={nearbyHospitals}
                onChange={onChange}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="nearbyColleges" className="sr-only">Nearby Colleges</label>
              <input
                id="nearbyColleges"
                name="nearbyColleges"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nearby Colleges"
                value={nearbyColleges}
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
