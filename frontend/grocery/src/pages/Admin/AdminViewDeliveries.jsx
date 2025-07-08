import React, { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { getApiBaseUrl } from '../../config/api';

const COLORS = {
  primary: '#fff',
  secondary: '#f8fafc',
  border: '#e2e8f0',
  text: '#1f2937',
  text1: '#6b7280',
  onroute: '#2563eb',
  pending: '#f59e42',
  delivered: '#10b981',
  cardShadow: '0 4px 24px rgba(0,0,0,0.07)',
};

const AdminViewDeliveries = ({ onBack }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchDeliveries = () => {
    setLoading(true);
    fetch(`${getApiBaseUrl()}/api/orders`)
      .then(res => res.json())
      .then(data => setDeliveries(data || []))
      .finally(() => setLoading(false));
    fetch(`${getApiBaseUrl()}/api/delivery`)
      .then(res => res.json())
      .then(data => setDeliveryPersonnel(data || []));
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  // Helper to get delivery person name
  const getDeliveryPersonName = (id) => {
    const person = deliveryPersonnel.find(p => p.id === id);
    return person ? person.name : '-';
  };

  // View order details
  const handleView = (order) => {
    alert(`Order ID: ${order.id}\nCustomer: ${order.customerName}\nDelivery Person: ${getDeliveryPersonName(order.deliveryPersonId)}\nStatus: ${order.status}\nDate: ${order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}\n\nItems: ${(order.items || []).map(i => `${i.name} x${i.quantity}`).join(', ')}`);
  };

  // Update order status
  const handleUpdate = async (order) => {
    const newStatus = prompt('Enter new status for this delivery:', order.status);
    if (!newStatus || newStatus === order.status) return;
    setUpdating(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/orders/${order.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchDeliveries();
        alert('Status updated successfully!');
      } else {
        alert('Failed to update status.');
      }
    } finally {
      setUpdating(false);
    }
  };

  // Delete/cancel delivery
  const handleDelete = async (order) => {
    if (!window.confirm('Are you sure you want to cancel/delete this delivery?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/orders/${order.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchDeliveries();
        alert('Delivery cancelled/deleted successfully!');
      } else {
        alert('Failed to cancel/delete delivery.');
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: COLORS.secondary, padding: '2rem 0' }}>
      {/* Header Card - OUTSIDE main content card */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto 2.5rem auto',
        background: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
        padding: '2.5rem 2.5rem 2.5rem 2.5rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.25rem', color: '#ef4444' }}>
          <span style={{ background: '#ef4444', borderRadius: '0.75rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart style={{ color: '#fff', width: '1.5rem', height: '1.5rem' }} />
          </span>
          <span style={{ color: '#222', fontWeight: 700 }}>Online Grocery</span>
        </div>
        <h2 style={{ fontWeight: 800, fontSize: '2.5rem', color: '#1f2937', flex: 1, textAlign: 'center', margin: 0 }}>Deliveries</h2>
        <button
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.75rem 2.5rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onClick={() => {
            sessionStorage.removeItem('isAdminAuthenticated');
            window.location.href = '/?route=login';
          }}
        >
          Logout
        </button>
      </div>
      {/* Main Content Card */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        background: COLORS.primary,
        borderRadius: '1.5rem',
        boxShadow: COLORS.cardShadow,
        padding: '2.5rem',
        border: `1px solid ${COLORS.border}`,
      }}>
        {/* Back Arrow and Refresh Button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: 16 }}>
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '0.25rem',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Back to Dashboard"
          >
            <ArrowLeft size={32} />
          </button>
          <button
            onClick={fetchDeliveries}
            style={{
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.6rem 1.5rem',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              marginLeft: 12,
              transition: 'background 0.2s',
            }}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        {/* Deliveries Table */}
        <div style={{ overflowX: 'auto', marginTop: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: COLORS.primary, borderRadius: '1rem', boxShadow: COLORS.cardShadow }}>
            <thead style={{ background: COLORS.secondary }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Order ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Delivery Person</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Customer</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deliveries
                .filter(order => order.deliveryPersonId && [
                  'on route', 'accepted', 'delivered', 'out for delivery', 'assigned'
                ].includes((order.status || '').toLowerCase()))
                .map((order, idx) => (
                  <tr key={order.id} style={{ background: idx % 2 === 0 ? COLORS.primary : COLORS.secondary }}>
                    <td style={{ padding: '1rem', color: COLORS.text1, fontWeight: 600 }}>{order.id}</td>
                    <td style={{ padding: '1rem', color: COLORS.text1 }}>{getDeliveryPersonName(order.deliveryPersonId)}</td>
                    <td style={{ padding: '1rem', color: COLORS.text }}>{order.customerName}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        background: order.status === 'Delivered' ? '#dcfce7' : order.status === 'Pending' ? '#fef3c7' : '#dbeafe',
                        color: order.status === 'Delivered' ? COLORS.delivered : order.status === 'Pending' ? COLORS.pending : COLORS.onroute,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 'bold',
                      }}>{order.status}</span>
                    </td>
                    <td style={{ padding: '1rem', color: COLORS.text1, textAlign: 'center' }}>{order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        style={{
                          background: COLORS.secondary,
                          color: COLORS.text,
                          border: `1px solid ${COLORS.border}`,
                          borderRadius: '0.5rem',
                          padding: '0.4rem 1rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          marginRight: 8,
                          transition: 'background 0.2s',
                        }}
                        title="View delivery details"
                        onClick={() => handleView(order)}
                        disabled={updating || deleting}
                      >View</button>
                      <button
                        style={{
                          background: COLORS.onroute,
                          color: COLORS.primary,
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.4rem 1rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          marginRight: 8,
                          transition: 'background 0.2s',
                        }}
                        title="Update delivery status"
                        onClick={() => handleUpdate(order)}
                        disabled={updating || deleting}
                      >Update</button>
                      <button
                        style={{
                          background: COLORS.pending,
                          color: COLORS.primary,
                          border: 'none',
                          borderRadius: '0.5rem',
                          padding: '0.4rem 1rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        title="Cancel or delete this delivery"
                        onClick={() => handleDelete(order)}
                        disabled={updating || deleting}
                      >Delete/Cancel</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminViewDeliveries;
