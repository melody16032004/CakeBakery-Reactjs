import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated"); // Example using localStorage, replace with your auth logic

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
