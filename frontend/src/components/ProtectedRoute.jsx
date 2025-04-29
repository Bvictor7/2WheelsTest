// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isLoggedIn = Boolean(localStorage.getItem('token')); // ou ton gestion d’auth
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
