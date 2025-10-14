import { createContext, useContext } from 'react';

// Contexto
export const AuthContext = createContext(null);

// hook personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};