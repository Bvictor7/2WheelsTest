// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  // Si pas de token, on redirige vers /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  // Sinon, on affiche le composant enfant
  return children;
}
