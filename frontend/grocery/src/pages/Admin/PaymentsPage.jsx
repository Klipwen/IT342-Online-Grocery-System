import React from 'react';
import { ArrowLeft } from 'lucide-react';

const PaymentsPage = ({ onBack }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 0' }}>
      <div style={{ maxWidth: 1100, margin: '3rem auto', background: 'white', borderRadius: '1rem', boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)', padding: '2.5rem', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: 8 }} title="Back">
            <ArrowLeft size={28} />
          </button>
          <h2 style={{ fontWeight: 700, fontSize: '2rem', marginLeft: 16 }}>Payments Management</h2>
        </div>
        <div style={{ color: '#6b7280', fontSize: 18, textAlign: 'center', marginTop: 40 }}>
          Payment management features coming soon!
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage; 