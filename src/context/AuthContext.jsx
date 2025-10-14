// src/context/AuthContext.jsx (Archivo MODIFICADO)
import { useState } from 'react';
// Importamos el Contexto y el Hook del nuevo archivo
import { AuthContext } from './auth_exports';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem('sesion_activa') || null;
  });

  // Funciones login y logout (tal como las teníamos)
  const login = (username, password) => {
    const usuariosJSON = localStorage.getItem('usuarios_registrados');
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

    const usuarioValido = usuarios.find(
      u => u.username === username && u.password === password);

    if (usuarioValido) {
      const sesionData = {
        username: usuarioValido.username,
        nombre: usuarioValido.nombreCompleto 
      };

      localStorage.setItem('sesion_activa', JSON.stringify(sesionData));
      setUser(JSON.stringify(sesionData));
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('sesion_activa');
    setUser(null);
  };
  
  const value = {
    user,
    login,
    logout,
    isLoggedIn: !!user 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};