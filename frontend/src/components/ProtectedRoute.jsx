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
            Axios.post('http://localhost:5000/verify_current_user', { token: token })
                .then(response => {
                    // Asumiendo que el servidor devuelve un booleano true/false o algo similar
                    // Si el servidor realmente devuelve 1 o 0, puedes necesitar ajustar esto:
                    setIsAuthenticated(response.data.isValid === 1);
                })
                .catch(error => {
                    console.error('Error during auth verification:', error);
                    setIsAuthenticated(false);
                });
        }
    }, []); // La dependencia [] asegura que este efecto se ejecute solo una vez al montar el componente.

    return isAuthenticated;
};

const ProtectedRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
