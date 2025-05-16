// src/components/HeaderMain.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderMain.css';

export default function HeaderMain() {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setOpen(o => !o);
    document.body.classList.toggle('ovhidden', !open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setOpen(false);
    document.body.classList.remove('ovhidden');
  };

  return (
    <>
      <header className="header-main">
        <Link to="/" className="header-logo-link">
          <img
            src="/assets/logo.svg"
            alt="2Wheels Logo"
            className="header-logo"
          />
        </Link>
        <nav className="nav-desktop">
          <Link to="/">Accueil</Link>
          <Link to="/news">Actualités</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profil</Link>
          <Link to="/admin/actualite">Modération</Link>
          {token
            ? <button onClick={handleLogout} className="nav-logout">Logout</button>
            : <Link to="/login">Login</Link>}
        </nav>
        <button className="burger-btn" onClick={toggleMenu} aria-label="Menu">
          <img
            src="/assets/menu.svg"
            alt="Menu"
            className="burger-icon"
          />
        </button>
      </header>
      <aside className={`nav-mobile ${open ? 'open' : ''}`}>
        <Link onClick={toggleMenu} to="/">Accueil</Link>
        <Link onClick={toggleMenu} to="/news">Actualités</Link>
        <Link onClick={toggleMenu} to="/dashboard">Dashboard</Link>
        <Link onClick={toggleMenu} to="/profile">Profil</Link>
        <Link onClick={toggleMenu} to="/admin/actualite">Modération</Link>
        {token
          ? <button onClick={handleLogout} className="nav-logout">Logout</button>
          : <Link onClick={toggleMenu} to="/login">Login</Link>}
      </aside>
    </>
  );
}
