import React, { useEffect, useState } from 'react';
import API from '@services/api';
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    API.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setUser(res.data);
        setForm({ name: res.data.name, email: res.data.email, password: '' });
      })
      .catch(console.error);
  }, [token]);

  const handleSubmit = e => {
    e.preventDefault();
    API.patch(
      '/auth/me',
      { name: form.name, email: form.email, ...(form.password && { password: form.password }) },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(res => {
        setUser(res.data);
        alert('Profil mis à jour !');
        setForm(f => ({ ...f, password: '' }));
      })
      .catch(err => {
        alert(err.response?.data?.message || 'Erreur !');
      });
  };

  if (!user) return <div className="page-container"><p>Chargement…</p></div>;

  return (
    <div className="page-container">
      <div className="profile-page">
        <h1>Mon Profil</h1>
        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label>
            Nouveau mot de passe
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Laisser vide pour ne pas changer"
            />
          </label>
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
}




