import React from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

// Mock delivery data for initial UI
const mockDeliveries = [
  {
    id: 'DEL-001',
    orderId: 'ORD-1001',
    deliveryPerson: 'Mark Cruz',
    customer: 'John Doe',
    status: 'On Route',
    date: '2024-06-01',
  },
  {
    id: 'DEL-002',
    orderId: 'ORD-1002',
    deliveryPerson: 'Anna Lee',
    customer: 'Jane Smith',
    status: 'Pending',
    date: '2024-06-02',
  },
  {
    id: 'DEL-003',
    orderId: 'ORD-1003',
    deliveryPerson: 'Sam Lim',
    customer: 'Alice Lee',
    status: 'Delivered',
    date: '2024-06-03',
  },
];

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
  // Header style for the new format
  const headerStyle = {
    width: '100%',
    background: '#fff',
    borderRadius: '1rem',
    boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)',
    padding: '1.5rem 2.5rem',
    marginBottom: '2.5rem',
    border: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  };
  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: '#ef4444',
  };
  const titleStyle = {
    fontWeight: 800,
    fontSize: '2.5rem',
    color: '#1f2937',
    flex: 1,
    textAlign: 'center',
    margin: 0,
  };
  const logoutBtnStyle = {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '0.5rem',
    padding: '0.75rem 2.5rem',
    fontWeight: 700,
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background 0.2s',
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
          style={logoutBtnStyle}
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
        {/* Back Arrow */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            marginLeft: '0.25rem',
            display: 'flex',
            alignItems: 'center',
          }}
          title="Back to Dashboard"
        >
          <ArrowLeft size={32} />
        </button>
        {/* Deliveries Table */}
        <div style={{ overflowX: 'auto', marginTop: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: COLORS.primary, borderRadius: '1rem', boxShadow: COLORS.cardShadow }}>
            <thead style={{ background: COLORS.secondary }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Delivery ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Order ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Delivery Person</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Customer</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockDeliveries.map((delivery, idx) => (
                <tr key={delivery.id} style={{ background: idx % 2 === 0 ? COLORS.primary : COLORS.secondary }}>
                  <td style={{ padding: '1rem', color: COLORS.text1, fontWeight: 600 }}>{delivery.id}</td>
                  <td style={{ padding: '1rem', color: COLORS.text }}>{delivery.orderId}</td>
                  <td style={{ padding: '1rem', color: COLORS.text1 }}>{delivery.deliveryPerson}</td>
                  <td style={{ padding: '1rem', color: COLORS.text }}>{delivery.customer}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      background: delivery.status === 'Delivered' ? '#dcfce7' : delivery.status === 'Pending' ? '#fef3c7' : '#dbeafe',
                      color: delivery.status === 'Delivered' ? COLORS.delivered : delivery.status === 'Pending' ? COLORS.pending : COLORS.onroute,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                    }}>{delivery.status}</span>
                  </td>
                  <td style={{ padding: '1rem', color: COLORS.text1, textAlign: 'center' }}>{delivery.date}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button style={{
                      background: COLORS.secondary,
                      color: COLORS.text,
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: '0.5rem',
                      padding: '0.4rem 1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginRight: 8,
                      transition: 'background 0.2s',
                    }}>View</button>
                    <button style={{
                      background: COLORS.onroute,
                      color: COLORS.primary,
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.4rem 1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginRight: 8,
                      transition: 'background 0.2s',
                    }}>Update</button>
                    <button style={{
                      background: COLORS.pending,
                      color: COLORS.primary,
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.4rem 1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}>Delete/Cancel</button>
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
