import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '@services/api';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await API.post('/auth/login', form);

      const { token, user } = data;
      if (!token || !user?.role || !user?.id) {
        throw new Error('Réponse du serveur incomplète.');
      }

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user.id);

      if (user.role === 'admin') {
        navigate('/admin/actualite');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <img
              src="/assets/logo.svg"
              alt="Logo"
              className="login-logo"
            />
            <h2>Connexion</h2>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                placeholder="utilisateur@exemple.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <label className="password-label">
              Mot de passe
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <Link to="/forgot" className="forgot-link">Mot de passe oublié ?</Link>
            </label>
            <button type="submit" className="btn-signin">Se connecter</button>
          </form>

          <p className="register-link">
            Vous n’avez pas encore de compte ? <Link to="/register">Inscrivez-vous gratuitement</Link>
          </p>
        </div>
      </div>
    </div>
  );
}






