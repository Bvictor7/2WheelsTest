import React, { useEffect, useState } from 'react';
import { fetchMe } from '../services/auth';  // si tu as déjà ce service

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetchMe(token)
      .then(res => setUser(res.data))
      .catch(console.error);
  }, []);

  if (!user) return <p>Chargement du profil…</p>;

  return (
    <div className="profile-page">
      <h1>Profil de {user.name}</h1>
      <p>Email : {user.email}</p>
      {/* Ajoute ici les autres infos ou formulaires pour modifier le profil */}
    </div>
  );
}
