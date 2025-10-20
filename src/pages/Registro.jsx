import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Registro() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");
    const navigate = useNavigate();

    const MOCK_API_URL = "https://68f53ec2b16eb6f46836bb71.mockapi.io/api/v1/users";

    const handleRegistro = async (e) => {
        e.preventDefault();

        if (password !== repetirPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const nuevoUsuario = { 
            username: email, // Usado como identificador único
            password: password,
            nombreCompleto: `${nombre} ${apellido}`
        };

        try {
            // 1. Verificar si el usuario ya existe (GET)
            const checkResponse = await fetch(MOCK_API_URL);
            /* (`${MOCK_API_URL})?username=${email}`); */
            
            if (!checkResponse.ok) {
            console.error(`Error HTTP: ${checkResponse.status}`);
            alert(`Error de conexión al verificar el usuario. Código: ${checkResponse.status}`);
            return;
        }
            
            const allUsers = await checkResponse.json();
            const userExistente = allUsers.find(u => u.username === email);

            if (userExistente) {
                alert("El correo electrónico ya está registrado.");
                return;
            }

            // 2. Enviar el nuevo usuario a MockAPI (POST)
            const registerResponse = await fetch(MOCK_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoUsuario),
            });

            if (registerResponse.ok) {
                alert("Registro exitoso. Ahora puedes iniciar sesión.");
                // Redirigir SÓLO si el registro en la API fue exitoso
                navigate("/login"); 
            } else {
                const errorData = await registerResponse.json();
                alert(`Error al registrar el usuario en la API: ${errorData.message || registerResponse.statusText}`);
            }

        } catch (error) {
            // Error de red (servidor caído o sin internet)
            alert("Error de conexión al registrar: " + error.message);
        }
};

    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                        <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
                        <div className="col-lg-7">
                            <div className="p-5">
                                <div className="text-center">
                                    <h1 className="h4 text-gray-900 mb-4">¡Crea tu cuenta!</h1>
                                </div>
                                {/* Formulario de registro */}
                                <form className="user" onSubmit={handleRegistro}>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="nombreForm"
                                                placeholder="Nombre"
                                                value={nombre}
                                                onChange={(e) => setNombre(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="text"
                                                className="form-control form-control-user"
                                                id="apellidoForm"
                                                placeholder="Apellido"
                                                value={apellido}
                                                onChange={(e) => setApellido(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control form-control-user"
                                            id="emailForm"
                                            placeholder="Correo electrónico"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="passwordForm"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="col-sm-6">
                                            <input
                                                type="password"
                                                className="form-control form-control-user"
                                                id="repetirPasswordForm"
                                                placeholder="Repetir contraseña"
                                                value={repetirPassword}
                                                onChange={(e) => setRepetirPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-user btn-block"
                                    >
                                        Registrar Cuenta
                                    </button>
                                    <hr />
                                    {/* Botones decorativos (no funcionales) */}
                                    <button
                                        type="button"
                                        className="btn btn-google btn-user btn-block"
                                    >
                                        <i className="fab fa-google fa-fw"></i> Registrar con Google
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-facebook btn-user btn-block"
                                    >
                                        <i className="fab fa-facebook-f fa-fw"></i> Registrar con Facebook
                                    </button>
                                </form>
                                <hr />
                                <div className="text-center">
                                    <Link className="small" to="/forgot-password">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <div className="text-center">
                                    <Link className="small" to="/login">
                                        ¿Ya tienes una cuenta? ¡Inicia sesión!
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}