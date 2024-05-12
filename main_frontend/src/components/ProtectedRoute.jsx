import { Navigate, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
        } else {
            Axios.post('http://localhost:5050/verify_current_user', { token: token })
                .then(response => {
                    setIsAuthenticated(response.data.isValid === 1);
                })
                .catch(error => {
                    console.error('Error during auth verification:', error);
                    setIsAuthenticated(false);
                });
        }
    }, []);

    return isAuthenticated;
};

const ProtectedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
