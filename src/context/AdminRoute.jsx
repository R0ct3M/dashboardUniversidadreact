import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './auth_exports'; 

export default function AdminRoute({ children }) {
    const { isLoggedIn, role } = useAuth();
    
    // Si no está logueado, redirige a login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    if (role !== 'admin') {
        return <Navigate to="/dashboard" replace />; 
    }

    return children;
}