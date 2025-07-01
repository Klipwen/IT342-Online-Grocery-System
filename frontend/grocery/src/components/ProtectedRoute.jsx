import React from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.role !== requiredRole) {
    window.location.href = '/?route=login';
    return null;
  }
  return children;
};

export default ProtectedRoute;
