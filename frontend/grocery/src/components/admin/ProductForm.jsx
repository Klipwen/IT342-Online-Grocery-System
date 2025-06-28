import React, { useState } from 'react';
import axios from 'axios';

const categories = [
  'Pantry Essentials',
  'Canned Goods',
  'Canned Seafood',
  'Noodles',
  'Snacks & Sweets',
  'Breakfast World',
  'Wines & Liquors',
  'Personal Grooming',
  'Health & Beauty',
];

const inputStyle = {
  padding: '0.75rem 1rem',
  border: '1px solid #d1d5db',
  borderRadius: '0.375rem',
  fontSize: '1rem',
  outline: 'none',
  background: '#f9fafb',
  marginBottom: '0.5rem',
};

const labelStyle = {
  fontWeight: 500,
  color: '#374151',
  marginBottom: '0.25rem',
  fontSize: '1rem',
};

const sectionTitleStyle = {
  color: '#ef4444',
  fontWeight: 700,
  fontSize: '1.1rem',
  margin: '1.5rem 0 0.5rem 0',
};

const initialFormState = {
  name: '',
  price: '',
  category: '',
  quantity: '',
  image: '',
  salePrice: '',
  originalPrice: '',
  discount: '',
  bestSelling: false,
  variants: '',
  sizes: ''
};

const ProductForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:8080/api/admin/products/upload-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(prev => ({ ...prev, image: res.data }));
    } catch (err) {
      alert('Image upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/products', form);
      alert('Product added successfully!');
      setForm(initialFormState);
      setImagePreview('');
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 6px 0 rgb(0 0 0 / 0.08)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={sectionTitleStyle}>Basic Info</div>
      <label style={labelStyle}>Product Name</label>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Product Name" required style={inputStyle} />
      <label style={labelStyle}>Category</label>
      <select name="category" value={form.category} onChange={handleChange} required style={{...inputStyle, background: '#fff'}}>
        <option value="" disabled>Select a category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <label style={labelStyle}>Product Image</label>
      <input type="file" accept="image/*" onChange={handleImageChange} style={inputStyle} />
      {uploading && <div style={{ color: '#ef4444', fontSize: '0.95rem' }}>Uploading...</div>}
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ maxWidth: 120, margin: '0.5rem 0', borderRadius: 8 }} />
      )}

      <div style={sectionTitleStyle}>Pricing & Stock</div>
      <label style={labelStyle}>Price</label>
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" required style={inputStyle} />
      <label style={labelStyle}>Sale Price</label>
      <input name="salePrice" value={form.salePrice} onChange={handleChange} placeholder="Sale Price" type="number" style={inputStyle} />
      <label style={labelStyle}>Original Price</label>
      <input name="originalPrice" value={form.originalPrice} onChange={handleChange} placeholder="Original Price" type="number" style={inputStyle} />
      <label style={labelStyle}>Discount</label>
      <input name="discount" value={form.discount} onChange={handleChange} placeholder="Discount" style={inputStyle} />
      <label style={labelStyle}>Quantity</label>
      <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" required style={inputStyle} />

      <div style={sectionTitleStyle}>Product Options</div>
      <label style={labelStyle}>Best Selling</label>
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
        <input name="bestSelling" type="checkbox" checked={form.bestSelling} onChange={handleChange} style={{ accentColor: '#ef4444' }} />
        Mark as Best Seller
      </label>
      <label style={labelStyle}>Variants (comma separated)</label>
      <input name="variants" value={form.variants} onChange={handleChange} placeholder="e.g. green,red" style={inputStyle} />
      <label style={labelStyle}>Sizes (comma separated)</label>
      <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="e.g. S,M,L" style={inputStyle} />

      <button type="submit" style={{ background: '#ef4444', color: 'white', padding: '0.9rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '1.5rem', cursor: 'pointer', boxShadow: '0 1px 3px 0 rgb(239 68 68 / 0.15)' }}>Add Product</button>
    </form>
  );
};

export default ProductForm; 