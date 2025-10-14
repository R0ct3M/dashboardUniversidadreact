import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth_exports";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(usuario, password);

    // Simulación de autenticación
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Credenciales incorrectas. Intente de nuevo.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Estructura principal */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>

                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">¡Bienvenido de nuevo!</h1>
                    </div>

                    {/* Formulario de login */}
                    <form className="user" onSubmit={handleLogin}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="usuarioForm"
                          placeholder="Usuario..."
                          value={usuario}
                          onChange={(e) => setUsuario(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="contraForm"
                          placeholder="Contraseña..."
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Recordarme
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block"
                      >
                        Iniciar Sesión
                      </button>

                      <hr />

                      <button
                        type="button"
                        className="btn btn-google btn-user btn-block"
                      >
                        <i className="fab fa-google fa-fw"></i> Iniciar con Google
                      </button>
                      <button
                        type="button"
                        className="btn btn-facebook btn-user btn-block"
                      >
                        <i className="fab fa-facebook-f fa-fw"></i> Iniciar con Facebook
                      </button>
                    </form>

                    <hr />

                    <div className="text-center">
                      <Link className="small" to="/forgot-password">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>

                    <div className="text-center">
                      <Link className="small" to="/registro">
                        ¡Crear una cuenta!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
