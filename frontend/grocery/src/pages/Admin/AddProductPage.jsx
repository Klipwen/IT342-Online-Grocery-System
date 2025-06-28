import React from 'react';
import ProductForm from '../../components/admin/ProductForm';

const AddProductPage = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', background: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
      <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.5rem' }}>Add New Product</h2>
      <ProductForm />
    </div>
  );
};

export default AddProductPage; 