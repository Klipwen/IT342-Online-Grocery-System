import React, { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, ShoppingCart } from 'lucide-react';
import { getApiBaseUrl } from '../../config/api';

const AdminViewDeliveryPersonnel = ({ onBack }) => {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredPersonnel, setFilteredPersonnel] = useState([]);

  const fetchPersonnel = () => {
    setLoading(true);
    fetch(`${getApiBaseUrl()}/api/delivery`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch delivery personnel');
        return res.json();
      })
      .then(data => {
        setPersonnel(data);
        setFilteredPersonnel(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPersonnel();
  }, []);

  useEffect(() => {
    let filtered = personnel;
    if (search) {
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.email.toLowerCase().includes(search.toLowerCase()) ||
          (p.contactNumber || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredPersonnel(filtered);
  }, [search, personnel]);

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
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '2rem',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '220px', cursor: 'pointer', position: 'absolute', left: '2.5rem' }} onClick={() => window.location.href = '/'}>
          <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>Online Grocery</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0, flex: 1, textAlign: 'center' }}>Delivery Personnel</h1>
        <button
          onClick={() => { sessionStorage.removeItem('isAdminAuthenticated'); window.location.href = '/?route=login'; }}
          style={{ position: 'absolute', right: '2.5rem', background: '#ef4444', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div style={{ background: '#fff', borderRadius: '1.5rem', maxWidth: 1100, margin: '2rem auto', boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)', padding: '2.5rem 2rem 2rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 8 }} title="Back">
            <ArrowLeft size={28} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search Delivery Personnel"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 2, padding: '0.8rem 1rem', border: '1px solid #ddd', borderRadius: 8, fontSize: 16 }}
          />
          <button onClick={fetchPersonnel} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '0.8rem 1.5rem', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <RefreshCw size={20} /> Refresh
          </button>
        </div>
        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>All Delivery Personnel {personnel.length.toLocaleString()}</div>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', background: '#fafbfc' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
            <thead style={{ background: '#f3f4f6' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Contact Number</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>Loading...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#e11d48' }}>{error}</td></tr>
              ) : filteredPersonnel.length === 0 ? (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No delivery personnel found.</td></tr>
              ) : (
                filteredPersonnel.map((person, idx) => (
                  <tr key={person.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f9fafb' }}>
                    <td style={{ padding: '1rem' }}>{person.id}</td>
                    <td style={{ padding: '1rem' }}>{person.name}</td>
                    <td style={{ padding: '1rem' }}>{person.email}</td>
                    <td style={{ padding: '1rem' }}>{person.contactNumber}</td>
                    <td style={{ padding: '1rem' }}>{person.status}</td>
                    <td style={{ padding: '1rem', display: 'flex', gap: 8 }}>
                      <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => alert('Edit delivery personnel not supported in this version.')}>Edit</button>
                      <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => alert('Delete delivery personnel not supported in this version.')}>Delete</button>
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

export default AdminViewDeliveryPersonnel; 