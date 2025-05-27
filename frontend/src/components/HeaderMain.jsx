import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HeaderMain.css';

export default function HeaderMain() {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    navigate('/');
    setOpen(false);
  };

  return (
    <header className="header-main">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/assets/logo.svg" alt="Logo" />
        </Link>

        <nav className="nav-desktop">
          <Link to="/">Accueil</Link>
          <Link to="/news">Actualités</Link>
          {token && <Link to="/new">Créer</Link>}
          {token && <Link to="/dashboard">Dashboard</Link>}
          {token && <Link to="/profile">Profil</Link>}
          {role === 'admin' && <Link to="/admin/actualite">Modération</Link>}
          {token
            ? <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
            : <Link to="/login">Connexion</Link>}
        </nav>

        <button className="burger-btn" onClick={toggleMenu}>
          <img src="/assets/menu.svg" alt="Menu" />
        </button>
      </div>

      {open && (
        <div className="nav-mobile open">
          <Link to="/" onClick={toggleMenu}>Accueil</Link>
          <Link to="/news" onClick={toggleMenu}>Actualités</Link>
          {token && <Link to="/new" onClick={toggleMenu}>Créer</Link>}
          {token && <Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link>}
          {token && <Link to="/profile" onClick={toggleMenu}>Profil</Link>}
          {role === 'admin' && <Link to="/admin/actualite" onClick={toggleMenu}>Modération</Link>}
          {token
            ? <button onClick={handleLogout}>Déconnexion</button>
            : <Link to="/login" onClick={toggleMenu}>Connexion</Link>}
        </div>
      )}
    </header>
  );
}
