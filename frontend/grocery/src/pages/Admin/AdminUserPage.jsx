import React, { useEffect, useState } from 'react';

const initialForm = { name: '', email: '', password: '' };

function UserForm({ form, setForm, onSubmit, onCancel, formError, editId }) {
  return (
    <form onSubmit={onSubmit} className="user-form">
      <div className="user-form-fields">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </div>
      {formError && <div className="user-form-error">{formError}</div>}
      <div className="user-form-actions">
        <button type="submit" className="btn btn-primary">{editId ? 'Update' : 'Create'}</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

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

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/?route=login';
  };

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

  useEffect(() => {
    if (!search) {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter(
          u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, users]);

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

  const handleCancel = () => {
    setShowForm(false);
    setEditId(null);
    setForm(initialForm);
  };

  return (
    <div className="admin-user-page">
      <div className="admin-user-header">
        <button onClick={onBack} className="btn btn-danger">Back</button>
        <h1>User List</h1>
        <button onClick={handleAdd} className="btn btn-primary">+ Add User</button>
        <button onClick={fetchUsers} className="btn btn-secondary" title="Refresh user list">⟳</button>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </div>
      <div className="admin-user-search">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && <button className="btn btn-secondary" onClick={() => setSearch('')}>Clear</button>}
      </div>
      {showForm && (
        <UserForm
          form={form}
          setForm={setForm}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          formError={formError}
          editId={editId}
        />
      )}
      {loading ? (
        <div className="admin-user-loading">Loading users...</div>
      ) : error ? (
        <div className="admin-user-error">{error}</div>
      ) : (
        <div className="admin-user-table-wrapper">
          <table className="admin-user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr><td colSpan="4" style={{ textAlign: 'center', color: '#888' }}>No users found.</td></tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button onClick={() => handleEdit(user)} className="btn btn-primary btn-sm">Edit</button>
                      <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUserPage; 