import React from 'react';
import ProductForm from '../../components/admin/ProductForm';

const AddProductPage = ({ onNavigate }) => {
  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/?route=login';
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', background: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontWeight: 'bold', fontSize: '1.5rem', margin: 0 }}>Add New Product</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={onNavigate}
            style={{
              background: '#2563eb',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: '#6b7280',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <ProductForm onNavigate={onNavigate} />
    </div>
  );
};

export default AddProductPage; 