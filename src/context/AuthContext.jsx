// src/context/AuthContext.jsx

import React, { useState } from 'react';
import { apiLogin } from '../services/authService';

import { AuthContext } from './auth_exports';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('sesion_activa');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // FUNCIÓN LOGIN
  const login = async (username, password) => {
    const { success, user: userData, token } = await apiLogin(username, password);

    if (success){
      const sesionData = {
        username: userData.username,
        nombre: userData.nombreCompleto,
        role: userData.role, // Se almacena el rol
        token: token
      };

      // Almacenamiento en localStorage
      localStorage.setItem('sesion_activa', JSON.stringify(sesionData));
      
      // Almacenamiento en el estado
      setUser(sesionData); 
      return true;
    }
    return false;
  };

  // FUNCIÓN LOGOUT
  const logout = () => {
    localStorage.removeItem('sesion_activa');
    setUser(null);
  };
  
  const value = {
    user,
    role: user?.role,
    login,
    logout,
    isLoggedIn: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};