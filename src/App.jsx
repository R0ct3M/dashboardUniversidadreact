import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// IMPORTACIONES DE PÁGINAS
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Estudiantes from "./pages/Estudiantes";
import RegistroEstudiante from "./pages/RegistroEstudiante"; 

// IMPORTACIONES DE CONTEXTO
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/auth_exports";


// Componente de protección de rutas privadas
function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      
      {/* Rutas privadas (requieren autenticación) */}

      {/* 1. Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* 2. Listado de Estudiantes (READ / DELETE) */}
      <Route 
        path="/estudiantes" 
        element={
            <PrivateRoute>
                <Estudiantes />
            </PrivateRoute>
        } 
      />
      
      {/* 3. Ruta para Crear Estudiante (CREATE) */}
      <Route 
        path="/registro-estudiante" 
        element={
            <PrivateRoute>
                <RegistroEstudiante />
            </PrivateRoute>
        } 
      />

      {/* 4. Ruta para Editar Estudiante (UPDATE) */}
      <Route 
        path="/registro-estudiante/:id" 
        element={
            <PrivateRoute>
                <RegistroEstudiante />
            </PrivateRoute>
        } 
      />

      {/* Redirección de la ruta raíz (/) a /dashboard */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      
      {/* Ruta por defecto/404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}