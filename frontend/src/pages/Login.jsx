import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
export default function Login() {
  const [cred, setCred] = useState({ email: '', password: '' });
  const nav = useNavigate();
  const handle = async e => {
    e.preventDefault();
    const { data } = await login(cred);
    localStorage.setItem('token', data.token);
    nav('/dashboard');
  };
  return (
    <form onSubmit={handle} className="login-form">
      <h2>Connexion</h2>
      <input type="email" required placeholder="Email"
        value={cred.email} onChange={e=>setCred({...cred,email:e.target.value})} />
      <input type="password" required placeholder="Mot de passe"
        value={cred.password} onChange={e=>setCred({...cred,password:e.target.value})} />
      <button type="submit">Se connecter</button>
    </form>
  );
}

