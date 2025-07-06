import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

// Mock order data for initial UI
const mockOrders = [
  {
    id: 'ORD-1001',
    user: 'John Doe',
    items: '3x Sardines, 2x Noodles',
    amount: 2530,
    status: 'Paid',
    date: '2024-06-01',
  },
  {
    id: 'ORD-1002',
    user: 'Jane Smith',
    items: '1x Rice, 1x Coke',
    amount: 1850,
    status: 'Pending',
    date: '2024-06-02',
  },
  {
    id: 'ORD-1003',
    user: 'Alice Lee',
    items: '2x Biscuits',
    amount: 990,
    status: 'Cancelled',
    date: '2024-06-03',
  },
];

const COLORS = {
  primary: '#fff',
  secondary: '#f8fafc',
  border: '#e2e8f0',
  text: '#1f2937',
  text1: '#6b7280',
  paid: '#10b981',
  pending: '#f59e42',
  cancelled: '#ef4444',
  cardShadow: '0 4px 24px rgba(0,0,0,0.07)',
};

const OrdersPage = ({ onBack }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        <h2 style={{ fontWeight: 800, fontSize: '2.5rem', color: '#1f2937', flex: 1, textAlign: 'center', margin: 0 }}>Orders</h2>
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
        {/* Orders Table */}
        <div style={{ overflowX: 'auto', marginTop: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: COLORS.primary, borderRadius: '1rem', boxShadow: COLORS.cardShadow }}>
            <thead style={{ background: COLORS.secondary }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Order ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>User</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Items</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Amount</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order, idx) => (
                <tr key={order.id} style={{ background: idx % 2 === 0 ? COLORS.primary : COLORS.secondary }}>
                  <td style={{ padding: '1rem', color: COLORS.text1, fontWeight: 600 }}>{order.id}</td>
                  <td style={{ padding: '1rem', color: COLORS.text }}>{order.user}</td>
                  <td style={{ padding: '1rem', color: COLORS.text1 }}>{order.items}</td>
                  <td style={{ padding: '1rem', color: COLORS.text, textAlign: 'right', fontWeight: 700 }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1em', marginRight: 2 }}>₱</span>{order.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      background: order.status === 'Paid' ? '#dcfce7' : order.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                      color: order.status === 'Paid' ? COLORS.paid : order.status === 'Pending' ? COLORS.pending : COLORS.cancelled,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                    }}>{order.status}</span>
                  </td>
                  <td style={{ padding: '1rem', color: COLORS.text1, textAlign: 'center' }}>{order.date}</td>
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
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                    >
                      View
                    </button>
                    <button style={{
                      background: COLORS.paid,
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
                      background: COLORS.cancelled,
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
        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              background: COLORS.primary,
              borderRadius: '1rem',
              boxShadow: COLORS.cardShadow,
              padding: '2.5rem',
              minWidth: 350,
              maxWidth: 400,
              border: `1px solid ${COLORS.border}`,
              position: 'relative',
            }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  background: 'none',
                  border: 'none',
                  fontSize: 22,
                  color: COLORS.text1,
                  cursor: 'pointer',
                }}
                title="Close"
              >
                ×
              </button>
              <h3 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 16, color: COLORS.text }}>Order Details</h3>
              <div style={{ marginBottom: 10 }}><b>Order ID:</b> {selectedOrder.id}</div>
              <div style={{ marginBottom: 10 }}><b>User:</b> {selectedOrder.user}</div>
              <div style={{ marginBottom: 10 }}><b>Items:</b> {selectedOrder.items}</div>
              <div style={{ marginBottom: 10 }}><b>Amount:</b> <span style={{ fontWeight: 'bold', fontSize: '1.1em', marginRight: 2 }}>₱</span>{selectedOrder.amount.toLocaleString()}</div>
              <div style={{ marginBottom: 10 }}><b>Status:</b> {selectedOrder.status}</div>
              <div style={{ marginBottom: 10 }}><b>Date:</b> {selectedOrder.date}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage; 