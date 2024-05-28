import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import PropertyList from './pages/PropertyList';
import AddProperty from './pages/AddProperty';
import Profile from "./pages/Profile"
import EditProperty from './pages/EditProperty';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/edit-property",
    element: <EditProperty/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/properties",
    element: <PropertyList />,
  },
 
  {
    path: "/add-property",
    element: (
      <AddProperty />
    ),
  },
  {
    path: "/profile",
    element: (
      <Profile />
    ),
  },
]);
const App = () => {
  return (
        <RouterProvider router={router} />
  );
};

export default App;
