import React from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  // TEMPORARY: Disable all login protection for development/demo
  return children;
};

export default ProtectedRoute;
