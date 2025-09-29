// pages/ForgotPassword.jsx
import React, { useState } from 'react';
import API from '../services/api';
import './Login.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/forgot-password', { email });
      setMessage(data.message || 'Un email de réinitialisation a été envoyé.');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la demande.');
    }
  };

  return (
    <div className="page-container">
      <div className="login-page">
        <div className="login-card">
          <div className="login-header">
            <img src="/assets/logo.svg" alt="Logo" className="login-logo" />
            <h2>Mot de passe oublié</h2>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Entrez votre email
              <input
                type="email"
                placeholder="utilisateur@exemple.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="btn-signin">Envoyer</button>
          </form>
          {message && <p className="info-message">{message}</p>}
        </div>
      </div>
    </div>
  );
}