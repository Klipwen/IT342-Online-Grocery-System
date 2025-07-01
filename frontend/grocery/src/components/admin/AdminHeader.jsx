import React from 'react';

const AdminHeader = ({ title, subtitle, onAddProduct, onViewUsers }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <div>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          margin: 0,
          marginBottom: '0.25rem'
        }}>
          {title}
        </h1>
        <p style={{ 
          color: '#6b7280', 
          margin: 0,
          fontSize: '1rem'
        }}>
          {subtitle}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={onAddProduct}
          style={{
            background: '#ef4444',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: '0 1px 3px 0 rgb(239 68 68 / 0.15)'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>+</span>
          Add Product
        </button>
        <button
          onClick={onViewUsers}
          style={{
            background: '#2563eb',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 1px 3px 0 rgb(37 99 235 / 0.15)'
          }}
        >
          Users
        </button>
      </div>
    </div>
  );
};

export default AdminHeader; 