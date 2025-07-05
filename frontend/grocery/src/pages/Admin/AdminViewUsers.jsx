import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, RefreshCw, ShoppingCart } from 'lucide-react';
import AddDeliveryPersonPage from './AddDeliveryPersonPage';

const AdminViewUsers = ({ onBack }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showAddDelivery, setShowAddDelivery] = useState(false);

  const fetchUsersAndDelivery = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch('http://localhost:8080/api/auth/users').then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      }),
      fetch('http://localhost:8080/api/delivery').then(res => {
        if (!res.ok) throw new Error('Failed to fetch delivery personnel');
        return res.json();
      })
    ])
      .then(([usersData, deliveryData]) => {
        const usersList = usersData.map(u => ({ ...u, _role: 'Customer' }));
        const deliveryList = deliveryData.map(d => ({
          id: d.id,
          name: d.name,
          email: d.email,
          _role: 'Delivery',
        }));
        setUsers([...usersList, ...deliveryList]);
        setFilteredUsers([...usersList, ...deliveryList]);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsersAndDelivery();
  }, []);

  useEffect(() => {
    let filtered = users;
    if (search) {
      filtered = filtered.filter(
        u =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (roleFilter === 'customer') {
      filtered = filtered.filter(u => u._role === 'Customer');
    } else if (roleFilter === 'delivery') {
      filtered = filtered.filter(u => u._role === 'Delivery');
    }
    setFilteredUsers(filtered);
  }, [search, roleFilter, users]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/?route=login';
  };

  if (showAddDelivery) {
    return <AddDeliveryPersonPage onNavigate={() => { setShowAddDelivery(false); fetchUsersAndDelivery(); }} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '0 0 2rem 0' }}>
      {/* Header */}
      <div style={{
        maxWidth: '1100px',
        margin: '2rem auto 1.5rem auto',
        background: 'white',
        padding: '2rem 2.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '220px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>Online Grocery</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Users</h1>
        <button
          onClick={handleLogout}
          style={{ background: '#ef4444', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div style={{ background: '#fff', borderRadius: '1.5rem', maxWidth: 1100, margin: '2rem auto', boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)', padding: '2.5rem 2rem 2rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 8 }} title="Back">
            <ArrowLeft size={28} />
          </button>
          <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: 16, marginLeft: 8, cursor: 'pointer' }} onClick={() => setShowAddDelivery(true)}>+ Add Delivery Personnel</button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search Users"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 2, padding: '0.8rem 1rem', border: '1px solid #ddd', borderRadius: 8, fontSize: 16 }}
          />
          <select
            value={roleFilter}
            onChange={e => setRoleFilter(e.target.value)}
            style={{ flex: 1, padding: '0.8rem 1rem', border: '1px solid #ddd', borderRadius: 8, fontSize: 16 }}
          >
            <option value="all">All Users</option>
            <option value="customer">Customer</option>
            <option value="delivery">Delivery</option>
          </select>
          <button onClick={fetchUsersAndDelivery} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '0.8rem 1.5rem', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <RefreshCw size={20} /> Refresh
          </button>
        </div>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>All Users {users.length.toLocaleString()}</div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', background: '#fafbfc' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
            <thead style={{ background: '#f3f4f6' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Role</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Loading users...</td></tr>
              ) : error ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#e11d48' }}>{error}</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No users found.</td></tr>
              ) : (
                filteredUsers.map((user, idx) => (
                  <tr key={user.id + user._role} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '1rem' }}>{user.id}</td>
                    <td style={{ padding: '1rem' }}>{user.name}</td>
                    <td style={{ padding: '1rem' }}>{user.email}</td>
                    <td style={{ padding: '1rem' }}>{user._role}</td>
                    <td style={{ padding: '1rem', display: 'flex', gap: 8 }}>
                      <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => alert('Edit user not supported in this version.')}>Edit</button>
                      <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => alert('Delete user not supported in this version.')}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminViewUsers;
