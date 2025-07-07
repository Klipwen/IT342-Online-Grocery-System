import React, { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw, ShoppingCart, X, Eye } from 'lucide-react';
import { getApiBaseUrl } from '../../config/api';
import AddDeliveryPersonPage from './AddDeliveryPersonPage';

const AdminViewDeliveryPersonnel = ({ onBack }) => {
  const [personnel, setPersonnel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredPersonnel, setFilteredPersonnel] = useState([]);

  // Edit modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  // View modal state
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingPerson, setViewingPerson] = useState(null);

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);

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

  // Edit logic
  const handleEdit = (person) => {
    setEditingPerson(person);
    setEditForm({
      name: person.name,
      email: person.email,
      contactNumber: person.contactNumber || '',
      status: person.status || 'Active',
    });
    setShowEditModal(true);
    setEditError('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError('');
    try {
      const payload = { ...editForm };
      const endpoint = `${getApiBaseUrl()}/api/delivery/${editingPerson.id}`;
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('Failed to update delivery personnel');
      setShowEditModal(false);
      setEditingPerson(null);
      fetchPersonnel();
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditLoading(false);
    }
  };

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
          <button
            onClick={() => setShowAddModal(true)}
            style={{ marginLeft: 'auto', background: '#10b981', color: 'white', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 20, display: 'flex', alignItems: 'center' }}>+</span> Add Personnel
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
                      <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => handleEdit(person)}>Edit</button>
                      <button style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer' }} onClick={() => alert('Delete delivery personnel not supported in this version.')}>Delete</button>
                      <button 
                        style={{ background: '#6b7280', color: '#fff', border: 'none', borderRadius: 6, padding: '0.4rem 1rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} 
                        onClick={() => { setViewingPerson(person); setShowViewModal(true); }}
                      >
                        <Eye size={16} /> Info
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                Edit Delivery Personnel
              </h2>
              <button 
                onClick={() => setShowEditModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Contact Number</label>
                <input
                  type="text"
                  value={editForm.contactNumber}
                  onChange={(e) => setEditForm({...editForm, contactNumber: e.target.value})}
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Status</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd' }}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Offline">Offline</option>
                  <option value="Available">Available</option>
                  <option value="On Route">On Route</option>
                </select>
              </div>
              {editError && (
                <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>
                  {editError}
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  style={{ padding: '0.75rem 1.5rem', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
                >
                  {editLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* View Modal */}
      {showViewModal && viewingPerson && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                Delivery Personnel Info
              </h2>
              <button 
                onClick={() => setShowViewModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={24} />
              </button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Name</label>
              <div style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', background: '#f3f4f6' }}>{viewingPerson.name}</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Email</label>
              <div style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', background: '#f3f4f6' }}>{viewingPerson.email}</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Contact Number</label>
              <div style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', background: '#f3f4f6' }}>{viewingPerson.contactNumber}</div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Status</label>
              <div style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #ddd', background: '#f3f4f6' }}>{viewingPerson.status}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowViewModal(false)}
                style={{ padding: '0.75rem 1.5rem', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{ minWidth: 400, maxWidth: 520, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.13)', padding: 0 }}>
            <AddDeliveryPersonPage onNavigate={() => { setShowAddModal(false); fetchPersonnel(); }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewDeliveryPersonnel; 