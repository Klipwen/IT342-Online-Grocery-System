import React, { useState, useEffect } from 'react';
import ProductForm from '../../components/admin/ProductForm';

const EditProductPage = ({ productId, onNavigate }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Since we don't have axios installed, we'll use fetch
        const response = await fetch(`http://localhost:8080/api/admin/products/${productId}`);
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
      <div style={{ 
        maxWidth: '600px', 
        margin: '2rem auto', 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        textAlign: 'center'
      }}>
        <div>Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '2rem auto', 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>
        <button 
          onClick={onNavigate}
          style={{
            background: '#ef4444',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Back to Add Product
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '2rem auto', 
      background: 'white', 
      padding: '2rem', 
      borderRadius: '0.5rem', 
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' 
    }}>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.5rem' }}>
        Edit Product: {product?.name}
      </h2>
      <ProductForm product={product} isEdit={true} onNavigate={onNavigate} />
    </div>
  );
};

export default EditProductPage; 