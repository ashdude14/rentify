import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import profile from "../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import Modal from 'react-modal';

const URL = 'https://rentify-back-end.vercel.app';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    address: ''
  });

  const { name, seller } = useContext(userContext);
  const navigate = useNavigate();


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get(URL + '/api/properties');
        setProperties(res.data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchProperties();
  }, []);

  const handleInterest = async (property) => {
    setSelectedOwner(property.owner);
    setIsModalOpen(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to express interest');
        window.location.href = '/login';
        return;
      }

      const res = await axios.post(URL + `/api/properties/interest/${property._id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
    } catch (err) {
      console.error("Error expressing interest:", err);
      if (err.response) {
        if (err.response.status === 401) {
          alert('Session expired. Please log in again.');
          window.location.href = '/login';
        } else {
          alert(`Error: ${err.response.data.message || 'An error occurred. Please try again later.'}`);
        }
      } else {
        alert('Network error. Please check your connection and try again.');
      }
    }
  };

  const handleLike = async (propertyId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to express interest');
        window.location.href = '/login';
        return;
      }

      const res = await axios.post(URL + `/api/properties/like/${propertyId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      properties.map((check) => (
        check._id === propertyId ? alert(`You have liked ${check.owner.firstName}'s property!`) : ""
      ));
    } catch (err) {
      console.error("Error marking Like:", err);
      if (err.response) {
        if (err.response.status === 401) {
          alert('Session expired. Please log in again.');
          window.location.href = '/login';
        } else {
          alert(`Error: ${err.response.data.message || 'An error occurred. Please try again later.'}`);
        }
      } else {
        alert('Network error. Please check your connection and try again.');
      }
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const filteredProperties = properties.filter((property) => {
    return (
      (!filters.priceMin || property.price >= parseInt(filters.priceMin)) &&
      (!filters.priceMax || property.price <= parseInt(filters.priceMax)) &&
      (!filters.bedrooms || property.bedrooms === parseInt(filters.bedrooms)) &&
      (!filters.bathrooms || property.bathrooms === parseInt(filters.bathrooms)) &&
      (!filters.address || property.address.toLowerCase().includes(filters.address.toLowerCase()))
    );
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOwner(null);
  };

  return (
    <>
      <div className='sm:text-3xl text-2xl w-full h-full flex items-center justify-between bg-black text-white py-12 px-4 sm:px-6 lg:px-8'>
        <div className='text-sm flex flex-col text-green-300 '>
          <img src={profile}
            onClick={() => navigate('/profile')}
            className='w-[15%] ml-[10%] relative' />
        </div>
        <p>
          Welcome to Rentify!
        </p>
      </div>

      <div className="w-full h-full flex flex-col sm:flex-row sm:items-start bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:w-1/4 w-full sm:mr-8 mb-8 sm:mb-0">
          <div className="bg-white p-6 rounded-lg shadow-lg h-auto sm:h-full">
            <h2 className="text-2xl font-bold text-gray-900">Filter Properties</h2>
            <div className="mt-4 space-y-4 grid grid-cols-1 sm:grid-cols-1 gap-4">
              <input
                type="number"
                name="priceMin"
                value={filters.priceMin}
                onChange={handleFilterChange}
                placeholder="Min Price"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="priceMax"
                value={filters.priceMax}
                onChange={handleFilterChange}
                placeholder="Max Price"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                placeholder="Bedrooms"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
                placeholder="Bathrooms"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                name="address"
                value={filters.address}
                onChange={handleFilterChange}
                placeholder="Address"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="sm:w-3/4 w-full">
          <div className="max-w-3xl w-full space-y-8">
            <div className="space-y-6">
              {filteredProperties.map((property) => (
                <div key={property._id} className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900">{property.title}</h2>
                  <p className="mt-2 text-gray-600 text-lg sm:text-xl">Description: {property.description}</p>
                  <p className="mt-2 text-gray-800">Rent: INR {property.price}</p>
                  <p className="mt-2 text-gray-800">Address: {property.address}</p>
                  <p className="mt-2 text-gray-800">Bedrooms: {property.bedrooms}</p>
                  <p className="mt-2 text-gray-800">Bathrooms: {property.bathrooms}</p>
                  <p className="mt-2 text-gray-800">Area:  {property.area}</p>
                  <p className="mt-2 text-gray-800">Near By College: {property.nearbyColleges}</p>
                  <p className="mt-2 text-gray-800">Near By Hospital:  {property.nearbyHospitals}</p>
                  <div className='flex mt-4 justify-between'>
                    <button
                      onClick={() => handleInterest(property)}
                      className="w-[50%] flex justify-center py-2 px-4 
                      border border-transparent text-sm font-medium
                       rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      I’m Interested
                    </button>

                    <button
                      onClick={() => handleLike(property._id)}
                      className='py-2 px-4 border
                       border-transparent text-sm 
                       font-medium rounded-md text-white
                        bg-indigo-600 hover:bg-indigo-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2
                          focus:ring-indigo-500'
                    >
                      like: {property.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Owner Details"
        ariaHideApp={false}
        className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black opacity-80"
      >
        <div className="bg-white rounded-lg p-8 m-4 max-w-xs max-h-full text-center">
          <h2 className="text-2xl font-bold mb-4">Owner Details</h2>
          {selectedOwner && (
            <div>
              <p><strong>Name:</strong> {selectedOwner.firstName} {selectedOwner.lastName}</p>
              <p><strong>Mobile Number:</strong> {selectedOwner.phoneNumber}</p>
              <p><strong>Email:</strong> {selectedOwner.email}</p>
            </div>
          )}
          <button
            onClick={closeModal}
            className="mt-4 py-2 
            px-4 border
             border-transparent 
             text-sm font-medium 
             rounded-md text-white
              bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PropertyList;
