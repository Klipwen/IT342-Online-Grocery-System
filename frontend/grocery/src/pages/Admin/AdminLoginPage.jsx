import React, { useState } from 'react';
import { ShoppingCart, Lock, Eye, EyeOff } from 'lucide-react';

const AdminLoginPage = ({ onLogin, onBackToHome }) => {
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!adminPassword.trim()) {
      setError('Please enter the admin password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, using the same password logic as in App.jsx
      // In a real application, this should be an API call to verify admin credentials
      if (adminPassword === 'admin123') {
        onLogin(adminPassword);
      } else {
        setError('Incorrect admin password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        {/* Logo */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem', 
          marginBottom: '2rem',
          cursor: 'pointer'
        }} onClick={onBackToHome}>
          <div style={{ 
            backgroundColor: '#ef4444', 
            padding: '0.5rem', 
            borderRadius: '0.25rem', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <ShoppingCart style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>
            Online Grocery
          </span>
        </div>

        {/* Admin Login Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '0.5rem', 
            marginBottom: '0.5rem' 
          }}>
            <Lock style={{ width: '1.5rem', height: '1.5rem', color: '#ef4444' }} />
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              margin: 0
            }}>
              Admin Login
            </h1>
          </div>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '0.875rem',
            margin: 0
          }}>
            Enter your admin credentials to access the dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              color: '#374151' 
            }}>
              Admin Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  paddingRight: '2.5rem',
                  border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease-in-out',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ef4444';
                  setError('');
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                }}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '0.25rem'
                }}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff style={{ width: '1rem', height: '1rem' }} />
                ) : (
                  <Eye style={{ width: '1rem', height: '1rem' }} />
                )}
              </button>
            </div>
            {error && (
              <p style={{ 
                color: '#ef4444', 
                fontSize: '0.75rem', 
                marginTop: '0.25rem',
                margin: 0
              }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: isLoading ? '#9ca3af' : '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.15s ease-in-out',
              marginBottom: '1rem'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#dc2626';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#ef4444';
              }
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Back to Home Link */}
        <button
          onClick={onBackToHome}
          style={{
            background: 'none',
            border: 'none',
            color: '#6b7280',
            fontSize: '0.875rem',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: '0.5rem'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#6b7280';
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminLoginPage; 