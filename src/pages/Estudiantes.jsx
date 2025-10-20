// src/pages/Estudiantes.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrivateLayout from '../layouts/PrivateLayout';

// URL de tu recurso de estudiantes en MockAPI
const MOCK_API_URL_ESTUDIANTES = "https://68f53ec2b16eb6f46836bb71.mockapi.io/api/v1/estudiantes";

export default function Estudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Función para obtener la lista de estudiantes (READ - GET ALL)
    const fetchEstudiantes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(MOCK_API_URL_ESTUDIANTES);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setEstudiantes(data);
        } catch (err) {
            console.error("Error al cargar estudiantes:", err);
            setError("No se pudo cargar la lista de estudiantes. Verifica la URL y el recurso.");
        } finally {
            setLoading(false);
        }
    };

    // Función para eliminar un estudiante (DELETE)
    const handleDelete = async (id) => {
        if (!window.confirm(`¿Estás seguro de que quieres eliminar al estudiante con ID ${id}?`)) {
            return; 
        }

        try {
            const response = await fetch(`${MOCK_API_URL_ESTUDIANTES}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error al eliminar: ${response.status}`);
            }

            alert(`Estudiante con ID ${id} eliminado exitosamente.`);
            fetchEstudiantes(); 
            
        } catch (err) {
            console.error("Error al eliminar:", err);
            alert("Ocurrió un error al intentar eliminar al estudiante.");
        }
    };

    // Carga los datos al montar el componente
    useEffect(() => {
        fetchEstudiantes();
    }, []);

    // Simula la navegación a la página de registro/edición
    const handleNavigate = (path) => {
        navigate(path);
    };

    const renderContent = () => {
        if (loading) {
            return <div className="text-center mt-5"><i className="fas fa-spinner fa-spin fa-3x"></i><p className="mt-2">Cargando...</p></div>;
        }
        if (error) {
            return <div className="alert alert-danger" role="alert">Error al cargar datos: {error}</div>;
        }
    
        return (
            <div className="container-fluid">
                {/* Page Heading y Botón Crear */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Listado de Estudiantes</h1>
                    <button 
                        onClick={() => handleNavigate('/registro-estudiante')} 
                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    >
                        <i className="fas fa-plus fa-sm text-white-50"></i> Crear Estudiante
                    </button>
                </div>

                {/* Content Row */}
                <div className="row">
                    {/* Buscador - Implementación básica para la maqueta */}
                    <div className="input-group mb-3 rounded-pill overflow-hidden border w-50">
                        <span className="input-group-text bg-white border-0 pe-1" id="basic-addon1">
                            <i className="fas fa-search"></i>
                        </span>
                        <input id="search-input" type="search" className="form-control hide-focus border-0" placeholder="Buscar Estudiante" aria-label="Username" aria-describedby="basic-addon1"/>
                    </div>

                    {/* Tabla de Estudiantes */}
                    <table id="table-estudiantes" className="table align-middle mb-0 bg-white">
                        <thead className="bg-light">
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Dirección</th>
                                <th>Grado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.length > 0 ? (
                                estudiantes.map((estudiante) => (
                                    <tr key={estudiante.id}>
                                        <td>{estudiante.id}</td>
                                        <td>{estudiante.nombre}</td>
                                        <td>{estudiante.apellido}</td>
                                        <td>{estudiante.email || 'N/A'}</td>
                                        <td>{estudiante.celular || 'N/A'}</td> 
                                        <td>{estudiante.direccion || 'N/A'}</td>
                                        <td>{estudiante.grado || 'N/A'}</td>
                                        <td>
                                            {/* Botón Editar - Navega con el ID para la edición (UPDATE) */}
                                            <button 
                                                className="btn btn-sm btn-warning me-1"
                                                onClick={() => handleNavigate(`/registro-estudiante/${estudiante.id}`)}
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            {/* Botón Eliminar - Llama a la función DELETE */}
                                            <button 
                                                className="btn btn-sm btn-danger me-1"
                                                onClick={() => handleDelete(estudiante.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No hay estudiantes registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    return (
        <PrivateLayout>
            {renderContent()}
        </PrivateLayout>
    );
}