import { useContext, createContext } from "react";
import { AuthProvider as OriginalAuthProvider } from "./AuthContext";

// Contexto
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = OriginalAuthProvider;
