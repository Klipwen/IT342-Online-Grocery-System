import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getApiBaseUrl } from '../../config/api';

const AddDeliveryPersonPage = ({ onNavigate }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiBaseUrl = getApiBaseUrl();
      const { name, email, contactNumber, password } = form;
      const response = await fetch(`${apiBaseUrl}/api/delivery`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, contactNumber, password }),
      });
      if (!response.ok) throw new Error('Failed to add delivery personnel');
      if (onNavigate) onNavigate();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 0' }}>
      <div style={{ maxWidth: 500, margin: '3rem auto', background: 'white', borderRadius: '1rem', boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)', padding: '2.5rem', border: '1px solid #e5e7eb' }}>
        <button onClick={onNavigate} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24 }} title="Back">
          <ArrowLeft size={28} />
        </button>
        <h2 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: 24 }}>Add Delivery Personnel</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600 }}>Name</label>
            <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 6 }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600 }}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 6 }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600 }}>Contact Number</label>
            <input name="contactNumber" value={form.contactNumber} onChange={handleChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 6 }} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: 600 }}>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid #ddd', marginTop: 6 }} />
          </div>
          {error && <div style={{ color: '#e11d48', marginBottom: 16 }}>{error}</div>}
          <button type="submit" disabled={loading} style={{ background: '#ef4444', color: 'white', padding: '0.8rem 2.5rem', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer', width: '100%' }}>
            {loading ? 'Adding...' : 'Add Delivery Personnel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDeliveryPersonPage; 