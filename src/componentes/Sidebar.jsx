import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      {/* Sidebar - Brand */}
      <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <div className="sidebar-brand-text mx-3">Sistema Educativo</div>
      </Link>

      <hr className="sidebar-divider my-0" />

      {/* Dashboard */}
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Módulos Educativos</div>

      {/* Ingreso y registro (Estudiantes) */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseIngreso"
          aria-expanded="true"
          aria-controls="collapseIngreso"
        >
          <i className="fas fa-fw fa-user-plus"></i>
          <span>Ingreso y registro</span>
        </a>
        <div id="collapseIngreso" className="collapse" data-bs-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Acciones:</h6>
            <Link className="collapse-item" to="/estudiantes">Ver Estudiantes</Link>
            <Link className="collapse-item" to="/crear-estudiante">Crear Estudiante</Link>
          </div>
        </div>
      </li>

      {/* Historial estudiantil */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseHistorial"
          aria-expanded="true"
          aria-controls="collapseHistorial"
        >
          <i className="fas fa-fw fa-history"></i>
          <span>Historial estudiantil</span>
        </a>
        <div id="collapseHistorial" className="collapse" data-bs-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Acciones:</h6>
            <Link className="collapse-item" to="/listado-historial">Ver Historial</Link>
            <Link className="collapse-item" to="/crear-historial">Crear Registro</Link>
          </div>
        </div>
      </li>

      {/* Módulo Familiar */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseFamiliar"
          aria-expanded="true"
          aria-controls="collapseFamiliar"
        >
          <i className="fas fa-fw fa-users"></i>
          <span>Módulo Familiar</span>
        </a>
        <div id="collapseFamiliar" className="collapse" data-bs-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Acciones:</h6>
            <Link className="collapse-item" to="/listado-familiares">Ver Familiares</Link>
            <Link className="collapse-item" to="/crear-familiar">Crear Familiar</Link>
          </div>
        </div>
      </li>

      {/* Notas */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseNotas"
          aria-expanded="true"
          aria-controls="collapseNotas"
        >
          <i className="fas fa-fw fa-clipboard-list"></i>
          <span>Seguimiento de notas</span>
        </a>
        <div id="collapseNotas" className="collapse" data-bs-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Acciones:</h6>
            <Link className="collapse-item" to="/listado-notas">Ver Notas</Link>
            <Link className="collapse-item" to="/crear-nota">Registrar Nota</Link>
          </div>
        </div>
      </li>

      {/* Asistencias */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseAsistencias"
          aria-expanded="true"
          aria-controls="collapseAsistencias"
        >
          <i className="fas fa-fw fa-calendar-check"></i>
          <span>Asistencias</span>
        </a>
        <div id="collapseAsistencias" className="collapse" data-bs-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Acciones:</h6>
            <Link className="collapse-item" to="/listado-asistencias">Ver Asistencias</Link>
            <Link className="collapse-item" to="/crear-asistencia">Registrar Asistencia</Link>
          </div>
        </div>
      </li>

      {/* Bienestar */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseBienestar"
          aria-expanded="true"
          aria-controls="collapseBienestar"
        >
          <i className="fas fa-fw fa-heart"></i>
          <span>Bienestar Estudiantil</span>
        </a>
        <div id="collapseBienestar" className="collapse" data-bs-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Acciones:</h6>
            <Link className="collapse-item" to="/listado-bienestar">Ver Registros</Link>
            <Link className="collapse-item" to="/crear-bienestar">Crear Registro</Link>
          </div>
        </div>
      </li>

      {/* Estadísticas */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-bs-toggle="collapse"
          data-bs-target="#collapseEstadisticas"
          aria-expanded="true"
          aria-controls="collapseEstadisticas"
        >
          <i className="fas fa-fw fa-chart-bar"></i>
          <span>Estadísticas</span>
        </a>
        <div id="collapseEstadisticas" className="collapse" data-bs-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Acciones:</h6>
            <Link className="collapse-item" to="/estadisticas">Ver Reportes</Link>
          </div>
        </div>
      </li>

      <hr className="sidebar-divider" />

      {/* Toggle */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
}

export default Sidebar;
