import React, { useState, useEffect } from 'react';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const parsed = JSON.parse(user);
        if (parsed.role === 'admin') {
          window.location.href = '/?route=admin';
        } else {
          window.location.href = '/?route=home';
        }
      } catch (err) {
        // If JSON parsing fails, clear localStorage and stay on register page
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setShowPrompt(false);
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 2500);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.message || 'Registration failed');
        setShowPrompt(true);
        setLoading(false);
        setTimeout(() => setShowPrompt(false), 2500);
        return;
      }
      setSuccess('Successfully Registered. You can now log in.');
      setError('');
      setShowPrompt(true);
      setLoading(false);
      setTimeout(() => setShowPrompt(false), 1500);
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Registration failed');
      setShowPrompt(true);
      setTimeout(() => setShowPrompt(false), 2500);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {showPrompt && (success || error) && (
        <div style={{
          position: 'absolute',
          top: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: success ? '#4ade80' : '#ef4444',
          color: '#fff',
          padding: '1rem 2rem 1rem 1.5rem',
          borderRadius: 10,
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.13)',
          fontWeight: 600,
          fontSize: 16,
          display: 'flex',
          alignItems: 'center',
          minWidth: 260,
          gap: 12
        }}>
          <span style={{ fontSize: 22, display: 'flex', alignItems: 'center' }}>{success ? '✔️' : '❌'}</span>
          <span>{success || error}</span>
        </div>
      )}
      <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '2.5rem 2.5rem 2rem 2.5rem', maxWidth: 400, width: '100%', border: '1px solid #ececec', textAlign: 'center' }}>
        <div style={{ color: '#888', fontWeight: 500, fontSize: 18, marginBottom: 8 }}>Please enter your details</div>
        <div style={{ fontWeight: 700, fontSize: 32, marginBottom: 28, color: '#222', lineHeight: 1.2 }}>
          Create your account
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Full Name"
            style={{ width: '100%', maxWidth: 320, margin: '0 auto 18px auto', display: 'block', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: '1rem', background: '#fafbfc', outline: 'none', transition: 'border 0.2s' }}
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email address"
            style={{ width: '100%', maxWidth: 320, margin: '0 auto 18px auto', display: 'block', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: '1rem', background: '#fafbfc', outline: 'none', transition: 'border 0.2s' }}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
            style={{ width: '100%', maxWidth: 320, margin: '0 auto 18px auto', display: 'block', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: '1rem', background: '#fafbfc', outline: 'none', transition: 'border 0.2s' }}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            style={{ width: '100%', maxWidth: 320, margin: '0 auto 18px auto', display: 'block', padding: '1rem', border: '1.5px solid #e0e0e0', borderRadius: 8, fontSize: '1rem', background: '#fafbfc', outline: 'none', transition: 'border 0.2s' }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 500, fontSize: '1rem', marginBottom: 18, cursor: 'pointer', alignSelf: 'flex-end', marginRight: 20 }}
            tabIndex={-1}
          >
            {showPassword ? 'Hide Passwords' : 'Show Passwords'}
          </button>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', maxWidth: 320, margin: '0 auto 18px auto', background: '#ef4444', color: 'white', padding: '1rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 1px 3px 0 rgb(239 68 68 / 0.10)', textAlign: 'center' }}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div style={{ textAlign: 'center', color: '#888', fontSize: '1rem', marginTop: 10 }}>
          Already have an account?{' '}
          <a href="/?route=login" style={{ color: '#ef4444', textDecoration: 'underline', fontWeight: 500 }}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
