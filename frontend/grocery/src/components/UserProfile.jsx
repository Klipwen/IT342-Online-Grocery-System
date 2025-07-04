import React, { useState } from 'react';
import styles from '../styles/UserProfile.module.css';

const UserProfile = ({ user }) => {
  // Mock user for demonstration; replace with real user prop/data as needed
  const currentUser = user || {
    name: 'Md Rimel',
    email: 'rimel1111@gmail.com',
    address: 'Kingston, 5236, United State',
  };

  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    address: currentUser.address,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setForm({
      name: currentUser.name,
      email: currentUser.email,
      address: currentUser.address,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  const handleSave = e => {
    e.preventDefault();
    // Save logic here
    setEditMode(false);
    setSuccess('Profile updated successfully!');
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: '#fafbfc', padding: '2rem 0' }}>
      {/* Sidebar */}
      <div style={{ minWidth: 220, marginRight: 40 }}>
        <div style={{ fontWeight: 600, marginBottom: 24, color: '#222' }}>Manage My Account</div>
        <div style={{ marginBottom: 32 }}>
          <div style={{ color: '#ef4444', fontWeight: 500, marginBottom: 8 }}>My Profile</div>
          <div style={{ color: '#aaa', marginBottom: 8 }}>Address Book</div>
          <div style={{ color: '#aaa' }}>My Payment Options</div>
        </div>
        <div style={{ fontWeight: 600, marginBottom: 16, color: '#222' }}>My Orders</div>
        <div style={{ color: '#aaa', marginBottom: 8 }}>My Returns</div>
        <div style={{ color: '#aaa', marginBottom: 32 }}>My Cancellations</div>
        <div style={{ fontWeight: 600, marginBottom: 8, color: '#222' }}>My WishList</div>
      </div>
      {/* Main Card */}
      <div className={styles.profileCard} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '2.5rem 2.5rem 2rem 2.5rem', minWidth: 480, maxWidth: 540 }}>
        <div style={{ color: '#ef4444', fontWeight: 600, fontSize: 20, marginBottom: 24 }}>Edit Your Profile</div>
        {success && <div className={styles.successMsg}>{success}</div>}
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontWeight: 500, marginBottom: 6 }}>Name</div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editMode}
              className={styles.input}
              style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f7f7f7', marginBottom: 0 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Email</div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                disabled={!editMode}
                className={styles.input}
                style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f7f7f7', marginBottom: 0 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, marginBottom: 6 }}>Address</div>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                disabled={!editMode}
                className={styles.input}
                style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f7f7f7', marginBottom: 0 }}
              />
            </div>
          </div>
          <div style={{ fontWeight: 600, margin: '24px 0 12px 0', color: '#222' }}>Password Changes</div>
          <div style={{ marginBottom: 14 }}>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Current Password"
              className={styles.input}
              style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f7f7f7', marginBottom: 12 }}
            />
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="New Password"
              className={styles.input}
              style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f7f7f7', marginBottom: 12 }}
            />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={!editMode}
              placeholder="Confirm New Password"
              className={styles.input}
              style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f7f7f7', marginBottom: 0 }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}>
            {editMode ? (
              <>
                <button type="button" onClick={handleCancel} style={{ background: 'none', color: '#222', border: 'none', fontWeight: 500, fontSize: 16, marginRight: 8, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save Changes</button>
              </>
            ) : (
              <button type="button" onClick={handleEdit} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Edit Profile</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile; 