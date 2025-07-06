import React, { useState } from 'react';
import styles from '../styles/UserProfile.module.css';

const UserProfile = ({ user, onNavigate }) => {
  // Mock user for demonstration; replace with real user prop/data as needed
  const currentUser = user || {
    name: 'Md Rimel',
    email: 'rimel1111@gmail.com',
    address: 'Kingston, 5236, United State',
    phone: '',
  };

  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    address: currentUser.address,
    phone: currentUser.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [success, setSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('profile'); // 'profile', 'address', 'orders', etc.

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
      phone: currentUser.phone || '',
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

  const handleAddressBookClick = () => {
    setActiveSection('address');
    setEditMode(false);
  };

  const handleMyOrdersClick = () => {
    if (onNavigate) {
      onNavigate('user-orders');
    }
  };

  // Sidebar
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh', background: '#fafbfc', padding: '2rem 0' }}>
      <div style={{ minWidth: 220, marginRight: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {[
          { key: 'profile', label: 'My Profile', onClick: () => { setActiveSection('profile'); setEditMode(false); } },
          { key: 'address', label: 'Address Book', onClick: handleAddressBookClick },
          { key: 'orders', label: 'My Orders', onClick: handleMyOrdersClick },
        ].map(item => (
          <div
            key={item.key}
            onClick={item.onClick}
            aria-current={activeSection === item.key ? 'page' : undefined}
            style={{
              cursor: 'pointer',
              padding: '12px 28px',
              borderRadius: 24,
              fontWeight: 500,
              fontSize: 16,
              color: activeSection === item.key ? '#fff' : '#ef4444',
              background: activeSection === item.key ? '#ef4444' : 'transparent',
              boxShadow: activeSection === item.key ? '0 2px 12px 0 rgba(239,68,68,0.10)' : 'none',
              transition: 'all 0.18s cubic-bezier(.4,1.2,.6,1)',
              marginBottom: 0,
              outline: 'none',
              border: 'none',
              userSelect: 'none',
              position: 'relative',
              zIndex: 1,
            }}
            onMouseEnter={e => {
              if (!activeSection || activeSection !== item.key) {
                e.currentTarget.style.background = '#fee2e2';
                e.currentTarget.style.color = '#b91c1c';
                e.currentTarget.style.boxShadow = '0 2px 12px 0 rgba(239,68,68,0.08)';
              }
            }}
            onMouseLeave={e => {
              if (!activeSection || activeSection !== item.key) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
            tabIndex={0}
          >
            {item.label}
          </div>
        ))}
      </div>
      {/* Main Card */}
      <div className={styles.profileCard} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '2.5rem 2.5rem 2rem 2.5rem', minWidth: 480, maxWidth: 540 }}>
        {activeSection === 'profile' && (
          <>
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
          </>
        )}
        {activeSection === 'address' && (
          <>
            <div style={{ color: '#ef4444', fontWeight: 600, fontSize: 20, marginBottom: 24 }}>Address Book</div>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', gap: 24, marginBottom: 18 }}>
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
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, marginBottom: 6 }}>Phone Number</div>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={styles.input}
                    style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', background: '#f7f7f7', marginBottom: 0 }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 24 }}>
                {editMode ? (
                  <>
                    <button type="button" onClick={handleCancel} style={{ background: 'none', color: '#222', border: 'none', fontWeight: 500, fontSize: 16, marginRight: 8, cursor: 'pointer' }}>Cancel</button>
                    <button type="submit" className={styles.saveBtn}>Save Changes</button>
                  </>
                ) : (
                  <button type="button" onClick={() => setEditMode(true)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 32px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Edit Address</button>
                )}
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile; 