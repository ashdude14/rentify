import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { userContext } from "../context/userContext";
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom"

const URL = 'https://rentify-back-end.vercel.app';

const EditProperty = () => {
  const navigate = useNavigate();
  const { Email } = useContext(userContext);
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    address: '',
    area: '',
    nearbyColleges: '',
    nearbyHospitals: ''
  });

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${URL}/api/properties/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProperties(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchMyProperties();
  }, [Email, properties, setProperties]);

  const openModal = (property) => {
    setSelectedProperty(property);
    setFormData({
      title: property.title,
      description: property.description,
      price: property.price,
      address: property.address,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      nearbyColleges: property.nearbyColleges,
      nearbyHospitals: property.nearbyHospitals,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${URL}/api/properties/${selectedProperty._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProperties(properties.map(property =>
        property._id === selectedProperty._id ? res.data : property
      ));
      closeModal();
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleDelete = async () => {

    console.log("selected property", selectedProperty)

    try {
      const token = localStorage.getItem('token');
      console.log(token);
      await axios.delete(`${URL}/api/properties/${selectedProperty._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProperties(properties.filter(property => property._id !== selectedProperty._id));
      alert(`Deleted property: ${selectedProperty.title}`);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl font-bold text-gray-900'>My Properties</h1>
          <button
            onClick={() => navigate('/properties')}
            className='text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded'
          >
            Go Home
          </button>
        </div>
        <div className='text-lg'>
          {properties.length > 0 ? (
            properties
              .filter(property => property.owner.email === Email)
              .map(property => (
                <div key={property._id} className='border-b border-gray-300 py-4'>
                  <h2 className='text-xl font-semibold'>{property.title}</h2>
                  <p className='text-gray-600'>{property.description}</p>
                  <p className='text-gray-600'><strong>Price:</strong> {property.price}</p>
                  <button
                    onClick={() => openModal(property)}
                    className="ml-4 text-indigo-600 hover:text-indigo-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProperty(property);
                      handleDelete();
                    }}
                    className="ml-4 text-indigo-600 hover:text-indigo-800"
                  >
                    Delete
                  </button>
                </div>
              ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Property"
        ariaHideApp={false}
        className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex"
        overlayClassName="fixed inset-0 bg-black"
      >
        <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg">
          <h2 className='text-2xl font-bold mb-4 text-indigo-700'>Edit Property</h2>
          <form onSubmit={handleFormSubmit}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='title'>
                Title
              </label>
              <input
                type='text'
                name='title'
                id='title'
                value={formData.title}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='description'>
                Description
              </label>
              <textarea
                name='description'
                id='description'
                value={formData.description}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                Price
              </label>
              <input
                type='text'
                name='price'
                id='price'
                value={formData.price}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='address'>
                Address
              </label>
              <input
                type='text'
                name='address'
                id='address'
                value={formData.address}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='bedrooms'>
                Bedrooms
              </label>
              <input
                type='number'
                name='bedrooms'
                id='bedrooms'
                value={formData.bedrooms}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='bathrooms'>
                Bathrooms
              </label>
              <input
                type='number'
                name='bathrooms'
                id='bathrooms'
                value={formData.bathrooms}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nearbyColleges'>
                Near By Colleges
              </label>
              <input
                type='text'
                name='nearbyColleges'
                id='nearbyColleges'
                value={formData.nearbyColleges}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nearbyHospitals'>
                Near by Hospitals
              </label>
              <input
                type='text'
                name='nearbyHospitals'
                id='nearbyHospitals'
                value={formData.nearbyHospitals}
                onChange={handleInputChange}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                OK
              </button>
              <button
                type='button'
                onClick={closeModal}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditProperty;
