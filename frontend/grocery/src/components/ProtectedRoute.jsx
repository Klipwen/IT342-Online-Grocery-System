import React, { useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      // No user logged in, redirect to login page
      window.location.href = '/?route=login';
      return;
    }

    try {
      const parsedUser = JSON.parse(user);
      
      // If a specific role is required, check if user has that role
      if (requiredRole && parsedUser.role !== requiredRole) {
        // User doesn't have the required role, redirect to login
        localStorage.removeItem('user');
        window.location.href = '/?route=login';
        return;
      }
    } catch (err) {
      // Invalid user data, clear localStorage and redirect to login
      localStorage.removeItem('user');
      window.location.href = '/?route=login';
      return;
    }
  }, [requiredRole]);

  // Check if user is authenticated
  const user = localStorage.getItem('user');
  if (!user) {
    return null; // Don't render anything while redirecting
  }

  try {
    const parsedUser = JSON.parse(user);
    
    // If a specific role is required, check if user has that role
    if (requiredRole && parsedUser.role !== requiredRole) {
      return null; // Don't render anything while redirecting
    }
  } catch (err) {
    return null; // Don't render anything while redirecting
  }

  return children;
};

export default ProtectedRoute;
