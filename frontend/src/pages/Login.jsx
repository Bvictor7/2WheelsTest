import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import './Login.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      console.log('🧪 Résultat complet du backend :', result);

      if (!response.ok) {
        throw new Error(result.message || 'Erreur de connexion');
      }

      // Vérification de la structure de la réponse
      const { token, user } = result;
      if (!token || !user?.role || !user?.id) {
        throw new Error('Réponse du serveur incomplète.');
      }

      // Stockage local
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user.id);

      // Redirection selon le rôle
      if (user.role === 'admin') {
        navigate('/admin/actualite');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      alert(err.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="page-container">
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <h1>Your logo</h1>
            <h2>Login</h2>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                placeholder="username@email.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </label>
            <label className="password-label">
              Password
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
              <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
            </label>
            <button type="submit" className="btn-signin">Sign in</button>
          </form>

          <div className="login-divider">Or Continue With</div>
          <div className="social-login">
            <button className="social-btn"><FaGoogle /></button>
            <button className="social-btn"><FaGithub /></button>
            <button className="social-btn"><FaFacebook /></button>
          </div>

          <p className="register-link">
            Don’t have an account yet? <Link to="/register">Register for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}




