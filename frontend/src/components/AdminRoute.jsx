import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAllowed(false);
      return;
    }
    axios
      .get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAllowed(res.data.role === 'admin'))
      .catch(() => setAllowed(false));
  }, []);

  if (allowed === null) return <p>Vérification en cours…</p>;
  if (!allowed) return <Navigate to="/login" replace />;
  return children;
}
