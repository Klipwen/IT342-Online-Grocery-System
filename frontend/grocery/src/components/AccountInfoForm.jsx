import React, { useState } from 'react';

const AccountInfoForm = ({ user, onClose, onSave }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditing(true);
    console.log('Editing set to true');
  };

  const handleCancel = () => {
    setEditing(false);
    setForm({
      name: user?.name || '',
      email: user?.email || '',
    });
    setError('');
    console.log('Editing set to false');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:8080/api/auth/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
      if (!res.ok) throw new Error('Failed to update user');
      const updatedUser = await res.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      onSave(updatedUser);
      setEditing(false);
      console.log('Editing set to false after save');
    } catch (err) {
      setError(err.message || 'Error updating user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: 16 }}>Account Info</h2>
      <div style={{ marginBottom: 12 }}>
        <label>Name</label>
        {editing ? (
          <input name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        ) : (
          <div style={{ padding: 8, borderRadius: 6, background: '#f3f4f6', marginTop: 4 }}>{form.name}</div>
        )}
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Email</label>
        {editing ? (
          <input name="email" type="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }} />
        ) : (
          <div style={{ padding: 8, borderRadius: 6, background: '#f3f4f6', marginTop: 4 }}>{form.email}</div>
        )}
      </div>
      <div style={{ color: 'blue', marginBottom: 8 }}>Debug: editing = {String(editing)}</div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        {editing ? (
          <>
            <button type="button" onClick={handleCancel} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#e5e7eb', color: '#374151' }}>Cancel</button>
            <button type="submit" disabled={loading} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#ef4444', color: 'white', fontWeight: 600 }}>{loading ? 'Saving...' : 'Save'}</button>
          </>
        ) : (
          <>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#e5e7eb', color: '#374151' }}>Close</button>
            <button type="button" onClick={handleEdit} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#ef4444', color: 'white', fontWeight: 600 }}>Edit</button>
          </>
        )}
      </div>
    </form>
  );
};

export default AccountInfoForm; 