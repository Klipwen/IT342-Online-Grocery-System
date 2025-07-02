import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Replace with your backend login endpoint
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe })
      });
      if (!response.ok) {
        throw new Error('Invalid email or password');
      }
      const data = await response.json();
      // Store user info (including role) in localStorage
      localStorage.setItem('user', JSON.stringify(data));
      // Redirect based on role
      if (data.role === 'admin') {
        window.location.href = '/?route=admin';
      } else {
        window.location.href = '/?route=home';
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '2.5rem', borderRadius: '0.75rem', boxShadow: '0 1px 6px 0 rgb(0 0 0 / 0.08)', width: '100%', maxWidth: 400 }}>
        <h2 style={{ marginBottom: '2rem', fontWeight: 'bold', fontSize: '1.5rem', color: '#ef4444', textAlign: 'center' }}>Login</h2>
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', background: '#f9fafb' }}
          />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: 500 }}>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '1rem', background: '#f9fafb' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', fontSize: '0.95rem' }}
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.95rem', color: '#374151' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Remember me
          </label>
          <a href="#" style={{ color: '#ef4444', fontSize: '0.95rem', textDecoration: 'none' }}>Forgot password?</a>
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', background: '#ef4444', color: 'white', padding: '0.9rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 1px 3px 0 rgb(239 68 68 / 0.15)' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <a href="/?route=register" style={{ color: '#ef4444', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
