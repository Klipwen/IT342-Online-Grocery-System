import React from 'react';
import ProductForm from '../../components/admin/ProductForm';

const AddProductPage = ({ onNavigate }) => {
  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/?route=login';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 0' }}>
      <div style={{
        maxWidth: '600px',
        margin: '2rem auto',
        background: 'white',
        padding: '2.5rem',
        borderRadius: '1rem',
        boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '2rem', margin: 0 }}>Add New Product</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={onNavigate}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.5rem 1.25rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Back
            </button>
          </div>
        </div>
        <ProductForm onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default AddProductPage; 