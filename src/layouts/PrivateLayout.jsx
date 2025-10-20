import React from 'react';
import { useAuth } from "../context/auth_exports";
import Sidebar from "../componentes/Sidebar";
import Topbar from "../componentes/Topbar";
import { useNavigate } from "react-router-dom";

// Recibe 'children' que será el contenido único de cada página
export default function PrivateLayout({ children }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Determinar el nombre a mostrar
    const username = user?.nombre || user?.username || "Invitado";

    return (
        <div id="wrapper">
            <Sidebar />

            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    {/* Topbar se queda aquí */}
                    <Topbar onLogout={handleLogout} usuario={username} />

                    {/* 💡 AQUÍ SE RENDERIZA EL CONTENIDO DE LA PÁGINA ESPECÍFICA */}
                    <div className="container-fluid">
                        {children}
                    </div>
                </div>

                {/* Footer se queda aquí */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                        <div className="copyright text-center my-auto">
                            <span>Copyright &copy; Sistema Educativo 2024</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}