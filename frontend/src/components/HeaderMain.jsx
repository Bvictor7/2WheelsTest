import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderMain.css';

export default function HeaderMain() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header-main">
      <nav className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/news">Actualités</Link>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profil</Link>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <img src="/assets/menu.svg" alt="Menu" className="menu-icon" />
    </header>
);
}
