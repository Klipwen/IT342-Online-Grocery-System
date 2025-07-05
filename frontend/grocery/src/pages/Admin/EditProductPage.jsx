import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/admin/ProductForm';
import { getApiBaseUrl } from '../../config/api';

const EditProductPage = ({ productId, onNavigate }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/?route=login';
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/admin/products/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 0' }}>
        <div style={{
          maxWidth: '600px',
          margin: '2rem auto',
          background: 'white',
          padding: '2.5rem',
          borderRadius: '1rem',
          boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)',
          textAlign: 'center',
        }}>
          <div>Loading product...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 0' }}>
        <div style={{
          maxWidth: '600px',
          margin: '2rem auto',
          background: 'white',
          padding: '2.5rem',
          borderRadius: '1rem',
          boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)',
          textAlign: 'center',
        }}>
          <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>
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
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

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
          <h2 style={{ fontWeight: 'bold', fontSize: '2rem', margin: 0 }}>
            Edit Product: {product?.name}
          </h2>
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
        <ProductForm product={product} isEdit={true} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default EditProductPage; 