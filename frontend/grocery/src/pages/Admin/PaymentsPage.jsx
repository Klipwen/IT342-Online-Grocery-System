import React from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

// Mock payment data for initial UI
const mockPayments = [
  {
    id: 'PAY-001',
    orderId: 'ORD-1001',
    user: 'John Doe',
    amount: 2530,
    method: 'Gcash',
    status: 'Paid',
    date: '2024-06-01',
  },
  {
    id: 'PAY-002',
    orderId: 'ORD-1002',
    user: 'Jane Smith',
    amount: 1850,
    method: 'Cash',
    status: 'Pending',
    date: '2024-06-02',
  },
  {
    id: 'PAY-003',
    orderId: 'ORD-1003',
    user: 'Alice Lee',
    amount: 990,
    method: 'Card',
    status: 'Refunded',
    date: '2024-06-03',
  },
];

const PaymentsPage = ({ onBack }) => {
  // Color tokens for consistency
  const COLORS = {
    primary: '#fff',
    secondary: '#f8fafc',
    border: '#e2e8f0',
    text: '#1f2937',
    text1: '#6b7280',
    paid: '#10b981',
    pending: '#f59e42',
    refunded: '#ef4444',
    cardShadow: '0 4px 24px rgba(0,0,0,0.07)',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 0' }}>
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
        <h2 style={{ fontWeight: 800, fontSize: '2.5rem', color: '#1f2937', flex: 1, textAlign: 'center', margin: 0 }}>Payments</h2>
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
        {/* Payments Table */}
        <div style={{ overflowX: 'auto', marginTop: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: COLORS.primary, borderRadius: '1rem', boxShadow: COLORS.cardShadow }}>
            <thead style={{ background: COLORS.secondary }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Order ID</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>User</th>
                <th style={{ padding: '1rem', textAlign: 'right', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Amount</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Method</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment, idx) => (
                <tr key={payment.id} style={{ background: idx % 2 === 0 ? COLORS.primary : COLORS.secondary }}>
                  <td style={{ padding: '1rem', color: COLORS.text1, fontWeight: 600 }}>{payment.orderId}</td>
                  <td style={{ padding: '1rem', color: COLORS.text }}>{payment.user}</td>
                  <td style={{ padding: '1rem', color: COLORS.text, textAlign: 'right', fontWeight: 700 }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1em', marginRight: 2 }}>₱</span>{payment.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', color: COLORS.text1 }}>{payment.method}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      background: payment.status === 'Paid' ? '#dcfce7' : payment.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                      color: payment.status === 'Paid' ? COLORS.paid : payment.status === 'Pending' ? COLORS.pending : COLORS.refunded,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.95rem',
                      fontWeight: 'bold',
                    }}>{payment.status}</span>
                  </td>
                  <td style={{ padding: '1rem', color: COLORS.text1, textAlign: 'center' }}>{payment.date}</td>
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
                      background: COLORS.refunded,
                      color: COLORS.primary,
                      border: 'none',
                      borderRadius: '0.5rem',
                      padding: '0.4rem 1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}>Delete/Refund</button>
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

export default PaymentsPage; 