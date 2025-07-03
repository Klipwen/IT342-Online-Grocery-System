import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setShowPrompt(false);
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, rememberMe })
      });
      if (!response.ok) {
        setError('Failed to login.');
        setSuccess('');
        setShowPrompt(true);
        setLoading(false);
        setTimeout(() => setShowPrompt(false), 2500);
        return;
      }
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      setSuccess('Successfully Login. Please wait...');
      setError('');
      setShowPrompt(true);
      setLoading(false);
      setTimeout(() => {
        setShowPrompt(false);
        if (data.role === 'admin') {
          window.location.href = '/?route=admin';
        } else {
          window.location.href = '/?route=home';
        }
      }, 1500);
      return;
    } catch (err) {
      setError('Failed to login.');
      setSuccess('');
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
          Welcome!
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
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
          <div style={{ width: '100%', maxWidth: 320, margin: '0 auto 18px auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', fontSize: '1rem', color: '#444', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                style={{ marginRight: '0.5rem' }}
              />
              Remember for 30 days
            </label>
            <a href="#" style={{ color: '#ef4444', fontSize: '1rem', textDecoration: 'underline', fontWeight: 500, display: 'block', textAlign: 'right' }}>Forgot password</a>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', maxWidth: 320, margin: '0 auto 18px auto', background: '#ef4444', color: 'white', padding: '1rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1.1rem', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 1px 3px 0 rgb(239 68 68 / 0.10)', textAlign: 'center' }}
          >
            {loading ? 'Signing in...' : 'Sign up'}
          </button>
          <button
            type="button"
            style={{ width: '100%', maxWidth: 320, margin: '0 auto 18px auto', background: '#ef4444', color: '#fff', padding: '1rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center' }}
            tabIndex={-1}
          >
            <span style={{ fontSize: 20, marginRight: 8, display: 'flex', alignItems: 'center' }}> <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: 22, height: 22, verticalAlign: 'middle' }} /> </span>
            Sign in with Google
          </button>
        </form>
        <div style={{ textAlign: 'center', color: '#888', fontSize: '1rem', marginTop: 10 }}>
          Don't have an account?{' '}
          <a href="/?route=register" style={{ color: '#ef4444', textDecoration: 'underline', fontWeight: 500 }}>Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
