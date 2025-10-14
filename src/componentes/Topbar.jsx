import React from "react";
import { Link } from "react-router-dom";

function Topbar({ usuario = "Admin Sistema", onLogout }) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      {/* Sidebar Toggle (Topbar) */}
      <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle me-3">
        <i className="fa fa-bars"></i>
      </button>

      {/* Topbar Search */}
      <form className="d-none d-sm-inline-block form-inline me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Buscar..."
            aria-label="Search"
          />
          <button className="btn btn-primary" type="button">
            <i className="fas fa-search fa-sm"></i>
          </button>
        </div>
      </form>

      {/* Topbar Navbar */}
      <ul className="navbar-nav ms-auto">
        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="userDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="me-2 d-none d-lg-inline text-gray-600 small">
              {usuario}
            </span>
            <img
              className="img-profile rounded-circle"
              src="/img/undraw_profile.svg"
              alt="Perfil"
            />
          </a>

          {/* Dropdown - User Information */}
          <div
            className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
            aria-labelledby="userDropdown"
          >
            <Link className="dropdown-item" to="/perfil">
              <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
              Perfil
            </Link>
            <div className="dropdown-divider"></div>
            <button
              type="button"
              className="dropdown-item"
              onClick={onLogout}
            >
              <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
              Cerrar Sesión
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Topbar;
