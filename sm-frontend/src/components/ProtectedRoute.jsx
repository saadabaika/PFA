import React from 'react';
import { Navigate } from 'react-router-dom';

// Remplacez ceci par votre propre logique d'authentification
const isAuthenticated = () => {
  // Par exemple, vérifiez si un token est stocké dans le localStorage
  return localStorage.getItem('token') !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
