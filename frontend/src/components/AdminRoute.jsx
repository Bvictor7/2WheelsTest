// src/components/AdminRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import API from '../services/api';

export default function AdminRoute({ children }) {
  const [allowed, setAllowed] = useState(null);

  console.log('AdminRoute mounted, token=', localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAllowed(false);
      return;
    }

    API.get('/auth/me')
      .then(res => {
        setAllowed(res.data.role === 'admin');
      })
      .catch(() => {
        setAllowed(false);
      });
  }, []);

  if (allowed === null) {
    return (
      <div className="page-container">
        <p>Vérification en cours…</p>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
