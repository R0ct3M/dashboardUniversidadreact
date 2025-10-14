import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();

    if (password !== repetirPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const nuevoUsuario = { 
        username: email, // usuario unico por mail
        password: password,
        nombreCompleto: `${nombre} ${apellido}`
    };

    // 2. Obteniene la lista actual
    const usuariosJSON = localStorage.getItem('usuarios_registrados');
    const usuarios = usuariosJSON ? JSON.parse(usuariosJSON) : [];

    // 3. Verifica si el mail existe
    const usuarioExistente = usuarios.find(u => u.username === nuevoUsuario.username);
    if (usuarioExistente) {
        alert("El correo electrónico ya está registrado.");
        return;
    }

    // 4. Se agrega el nuevo usuario al LocalStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios_registrados', JSON.stringify(usuarios)); // ⬅️ NUEVA CLAVE

    alert("Registro exitoso. Ahora puedes iniciar sesión.");

    navigate("/login");
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

                  {/* Botones decorativos */}
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
