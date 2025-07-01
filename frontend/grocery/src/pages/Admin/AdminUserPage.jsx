import React, { useEffect, useState } from 'react';

const initialForm = { name: '', email: '', password: '' };

const AdminUserPage = ({ onBack }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [formError, setFormError] = useState('');
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/auth/users')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = () => {
    setFilteredUsers(
      users.filter(
        u =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    fetch(`http://localhost:8080/api/auth/users/${id}`, { method: 'DELETE' })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete user');
        setUsers(users => users.filter(u => u.id !== id));
      })
      .catch(err => alert('Delete failed: ' + err.message));
  };

  const handleEdit = (user) => {
    setEditId(user.id);
    setForm({ name: user.name, email: user.email, password: '' });
    setShowForm(true);
    setFormError('');
  };

  const handleAdd = () => {
    setEditId(null);
    setForm(initialForm);
    setShowForm(true);
    setFormError('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    if (!form.name || !form.email || (!editId && !form.password)) {
      setFormError('Name, email, and password are required.');
      return;
    }
    const method = editId ? 'PUT' : 'POST';
    const url = editId
      ? `http://localhost:8080/api/auth/users/${editId}`
      : 'http://localhost:8080/api/auth/users';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save user');
        return res.json();
      })
      .then(() => {
        setShowForm(false);
        setForm(initialForm);
        setEditId(null);
        fetchUsers();
      })
      .catch(err => setFormError(err.message));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '2rem auto', background: 'white', borderRadius: '0.75rem', boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <button
            onClick={onBack}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.5rem 1.25rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: '1rem'
            }}
          >
            Back
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', margin: 0, flex: 1 }}>User List</h1>
          <button
            onClick={handleAdd}
            style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.5rem 1.25rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginLeft: '1rem'
            }}
          >
            + Add User
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleFormSubmit} style={{ marginBottom: '2rem', background: '#f3f4f6', padding: '1.5rem', borderRadius: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '1rem' }}
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '1rem' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ flex: 1, padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '1rem' }}
              />
            </div>
            {formError && <div style={{ color: '#ef4444', marginBottom: '0.5rem' }}>{formError}</div>}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.5rem 1.25rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>{editId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(initialForm); }} style={{ background: '#9ca3af', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.5rem 1.25rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Cancel</button>
            </div>
          </form>
        )}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #d1d5db', fontSize: '1rem' }}
          />
          <button
            onClick={handleSearch}
            style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.5rem 1.25rem', fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}
          >
            Search
          </button>
        </div>
        {loading ? (
          <div>Loading users...</div>
        ) : error ? (
          <div style={{ color: '#ef4444' }}>{error}</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb', color: '#6b7280', fontWeight: 500 }}>
                <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 0' }}>{user.id}</td>
                  <td style={{ padding: '0.75rem 0' }}>{user.name}</td>
                  <td style={{ padding: '0.75rem 0' }}>{user.email}</td>
                  <td style={{ padding: '0.75rem 0' }}>
                    <button onClick={() => handleEdit(user)} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.3rem 0.9rem', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer', marginRight: '0.5rem' }}>Edit</button>
                    <button onClick={() => handleDelete(user.id)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.3rem 0.9rem', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminUserPage; 