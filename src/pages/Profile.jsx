import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";

const Profile = () => {
    const { name, isSeller, Email, setName, setSeller, setEmail } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log("Updated name:", name);
        // console.log("Updated seller:", isSeller);
        // console.log("Updated email:", Email);
    }, [name, isSeller, Email, setEmail, setName, setSeller]);

    const handleLogout = () => {
        // Clear user context
        setName('');
        setSeller(false);
        setEmail('');

        // Clear local storage
        localStorage.removeItem('token');

        // Redirect to login page
        navigate('/login');
    };

    const handleGoHome = () => {
        navigate('/properties');
    };

    return (
        <div className='w-full h-full flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md'>
                <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                    {` ${isSeller ? 'Go ahead and shine, Seller!' : 'Happy hunting Buyer!'}`}
                </h1>
                <div className='text-lg'>
                    <p><strong> Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {Email}</p>
                    <p><strong>Seller:</strong> {isSeller ? 'Yes' : 'No'}</p>
                </div>
                <div className='mt-6 flex justify-between'>
                    {
                        isSeller ? <Link to="/edit-property" className="text-indigo-600 hover:text-indigo-800">Manage your properties!</Link> :
                            <Link to="/properties" className="text-indigo-600 hover:text-indigo-800">View posted properties </Link>
                    }

                    {isSeller && <Link to="/add-property" className="text-indigo-600 hover:text-indigo-800">Post Property</Link>}
                </div>
                <div className='mt-6 flex justify-center space-x-4'>
                    <button
                        onClick={handleLogout}
                        className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                    <button
                        onClick={handleGoHome}
                        className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
                    >
                        Go Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
