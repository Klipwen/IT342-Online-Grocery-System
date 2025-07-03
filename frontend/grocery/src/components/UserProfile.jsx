import React, { useState } from 'react';

const mockUser = {
  name: 'Your name',
  email: 'yourname@gmail.com',
  profilePic: 'https://ui-avatars.com/api/?name=Your+Name&background=0D8ABC&color=fff',
  mobile: '',
  location: 'USA',
  id: 1,
};

const menuItems = [
  { icon: '👤', label: 'My Profile' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '🔔', label: 'Notification' },
  { icon: '🚪', label: 'Log Out' },
];

const UserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState({ ...mockUser, ...user });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    mobile: currentUser.mobile || '',
    location: currentUser.location || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setForm({
      name: currentUser.name,
      email: currentUser.email,
      mobile: currentUser.mobile || '',
      location: currentUser.location || '',
    });
    setError('');
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:8080/api/auth/users/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form }),
      });
      if (!res.ok) throw new Error('Failed to update user');
      const updatedUser = await res.json();
      setCurrentUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setEditMode(false);
    } catch (err) {
      setError(err.message || 'Error updating user');
    } finally {
      setLoading(false);
    }
  };

  const displayUser = { ...currentUser, ...form };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: '#fff', padding: '2rem 0' }}>
      {/* Left menu card */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 24, minWidth: 260, marginRight: 40, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={displayUser.profilePic} alt="Profile" style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
        <div style={{ fontWeight: 600, fontSize: 18 }}>{displayUser.name}</div>
        <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 18 }}>{displayUser.email}</div>
        <div style={{ width: '100%' }}>
          {menuItems.map((item, idx) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: idx < menuItems.length - 1 ? '1px solid #f3f4f6' : 'none', cursor: 'pointer', color: item.label === 'Log Out' ? '#ef4444' : '#374151', fontWeight: item.label === 'Log Out' ? 600 : 500 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Right profile details card */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: 32, minWidth: 380, maxWidth: 420, position: 'relative' }}>
        <button style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <img src={displayUser.profilePic} alt="Profile" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 18 }}>{displayUser.name}</div>
              {!editMode && (
                <button onClick={handleEdit} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title="Edit profile details">
                  <svg width="20" height="20" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6h12"/></svg>
                </button>
              )}
            </div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>User ID: {displayUser.id}</div>
            <div style={{ color: '#6b7280', fontSize: 14 }}>{displayUser.email}</div>
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
            <span style={{ color: '#888' }}>Name</span>
            {editMode ? (
              <input name="name" value={form.name} onChange={handleChange} style={{ fontWeight: 500, border: '1px solid #ccc', borderRadius: 6, padding: '4px 8px', width: 180 }} />
            ) : (
              <span style={{ fontWeight: 500 }}>{displayUser.name}</span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
            <span style={{ color: '#888' }}>Email account</span>
            {editMode ? (
              <input name="email" value={form.email} onChange={handleChange} style={{ fontWeight: 500, border: '1px solid #ccc', borderRadius: 6, padding: '4px 8px', width: 180 }} />
            ) : (
              <span style={{ fontWeight: 500 }}>{displayUser.email}</span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' }}>
            <span style={{ color: '#888' }}>Mobile number</span>
            {editMode ? (
              <input name="mobile" value={form.mobile} onChange={handleChange} style={{ fontWeight: 500, border: '1px solid #ccc', borderRadius: 6, padding: '4px 8px', width: 180 }} />
            ) : (
              <span style={{ fontWeight: 500, color: '#aaa' }}>{displayUser.mobile || 'Add number'}</span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
            <span style={{ color: '#888' }}>Location</span>
            {editMode ? (
              <input name="location" value={form.location} onChange={handleChange} style={{ fontWeight: 500, border: '1px solid #ccc', borderRadius: 6, padding: '4px 8px', width: 180 }} />
            ) : (
              <span style={{ fontWeight: 500 }}>{displayUser.location || 'USA'}</span>
            )}
          </div>
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
          {editMode ? (
            <>
              <button onClick={handleCancel} style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }} disabled={loading}>Cancel</button>
              <button onClick={handleSave} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
            </>
          ) : (
            <button onClick={handleEdit} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 600, fontSize: 16, marginTop: 10, cursor: 'pointer' }}>Save Change</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 