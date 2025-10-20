// src/pages/RegistroEstudiante.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PrivateLayout from '../layouts/PrivateLayout';

const MOCK_API_URL_ESTUDIANTES = "https://68f53ec2b16eb6f46836bb71.mockapi.io/api/v1/estudiantes";

export default function RegistroEstudiante() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Estado inicial del formulario.
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        celular: '',
        grado: '',
        direccion: '',
        direccion2: '',
        infoAcademica: '',
    });

    // Carga los datos si es modo edición (UPDATE)
    useEffect(() => {
        if (isEditMode) {
            const fetchEstudiante = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`${MOCK_API_URL_ESTUDIANTES}/${id}`);
                    if (!response.ok) throw new Error("Estudiante no encontrado");
                    
                    const data = await response.json();
                    setFormData({
                        nombre: data.nombre || '',
                        apellido: data.apellido || '',
                        email: data.email || '',
                        celular: data.celular || '',
                        grado: data.grado || '',
                        direccion: data.direccion || '',
                        direccion2: data.direccion2 || '',
                        infoAcademica: data.infoAcademica || '',
                    });
                } catch (err) {
                    setError("Error al cargar datos del estudiante para edición.");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchEstudiante();
        }
    }, [id, isEditMode]);

    // Maneja el cambio en los campos del formulario
    const handleChange = (e) => {
        const { id, value } = e.target;
        const keyMap = {
            'nombre-estudiante': 'nombre',
            'apellido-estudiante': 'apellido',
            'email-estudiante': 'email',
            'celular-estudiante': 'celular',
            'grado-estudiante': 'grado',
            'direccion-estudiante': 'direccion',
            'direccion2-estudiante': 'direccion2',
            'info-academica': 'infoAcademica',
        };
        const name = keyMap[id];
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Maneja el envío del formulario (CREATE o UPDATE)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `${MOCK_API_URL_ESTUDIANTES}/${id}` : MOCK_API_URL_ESTUDIANTES;

        // Prepara los datos a enviar
        const dataToSend = { 
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            celular: formData.celular,
            grado: formData.grado,
            direccion: formData.direccion,
            // Puedes incluir 'direccion2' y otros campos si tu API los acepta
            // direccion2: formData.direccion2,
            // infoAcademica: formData.infoAcademica,
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) throw new Error("Error al guardar el estudiante.");

            const successMessage = isEditMode ? 
                "Estudiante actualizado exitosamente." : 
                "Estudiante creado exitosamente.";
            alert(successMessage);
            
            // Navega de vuelta al listado
            navigate('/estudiantes'); 

        } catch (err) {
            setError(err.message || "Ocurrió un error al procesar la solicitud.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) {
        return <PrivateLayout><div className="text-center mt-5"><i className="fas fa-spinner fa-spin fa-3x"></i><p className="mt-2">Cargando datos para edición...</p></div></PrivateLayout>;
    }

    return (
        <PrivateLayout>
            <div className="container-fluid">
                {/* Page Heading y Botón Listado */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">{isEditMode ? 'Editar Estudiante' : 'Crear Estudiante'}</h1>
                    <button 
                        onClick={() => navigate('/estudiantes')} 
                        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    >
                        <i className="fas fa-list fa-sm text-white-50"></i> Listado
                    </button>
                </div>

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <form id="form-estudiante" onSubmit={handleSubmit}>
                            {/* Nombre y Apellido */}
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <label className="form-label" htmlFor="nombre-estudiante">Nombre</label>
                                    <input type="text" id="nombre-estudiante" className="form-control" required value={formData.nombre} onChange={handleChange} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="apellido-estudiante">Apellido</label>
                                    <input type="text" id="apellido-estudiante" className="form-control" required value={formData.apellido} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="email-estudiante">Email</label>
                                <input type="email" id="email-estudiante" className="form-control" required value={formData.email} onChange={handleChange} />
                            </div>

                            {/* Celular */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="celular-estudiante">Celular</label>
                                <input type="tel" id="celular-estudiante" className="form-control" required value={formData.celular} onChange={handleChange} />
                            </div>

                            {/* Grado */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="grado-estudiante">Grado</label>
                                <select id="grado-estudiante" className="form-control" required value={formData.grado} onChange={handleChange}>
                                    <option value="">Seleccionar Grado</option>
                                    <option value="1°">1° Primaria</option>
                                    <option value="2°">2° Primaria</option>
                                    <option value="3°">3° Primaria</option>
                                    <option value="4°">4° Primaria</option>
                                    <option value="5°">5° Primaria</option>
                                    <option value="6°">6° Primaria</option>
                                    <option value="7°">7° Secundaria</option>
                                    <option value="8°">8° Secundaria</option>
                                    <option value="9°">9° Secundaria</option>
                                    <option value="10°">10° Secundaria</option>
                                    <option value="11°">11° Secundaria</option>
                                </select>
                            </div>

                            {/* Direcciones */}
                            <div className="form-group row">
                                <div className="col-sm-6 mb-3 mb-sm-0">
                                    <label className="form-label" htmlFor="direccion-estudiante">Dirección Principal</label>
                                    <input type="text" id="direccion-estudiante" className="form-control" required value={formData.direccion} onChange={handleChange} />
                                </div>
                                <div className="col-sm-6">
                                    <label className="form-label" htmlFor="direccion2-estudiante">Dirección Secundaria</label>
                                    <input type="text" id="direccion2-estudiante" className="form-control" value={formData.direccion2} onChange={handleChange} />
                                </div>
                            </div>

                            {/* Información Académica */}
                            <div className="form-group">
                                <label className="form-label" htmlFor="info-academica">Información Académica</label>
                                <textarea className="form-control" id="info-academica" rows="4" value={formData.infoAcademica} onChange={handleChange}></textarea>
                            </div>

                            {/* Botón de envío que cambia según el modo */}
                            <button type="submit" className={`btn btn-block mb-4 ${isEditMode ? 'btn-success' : 'btn-primary'}`} disabled={loading}>
                                {loading ? 'Guardando...' : (isEditMode ? 'Actualizar Estudiante' : 'Crear Estudiante')}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </PrivateLayout>
    );
}