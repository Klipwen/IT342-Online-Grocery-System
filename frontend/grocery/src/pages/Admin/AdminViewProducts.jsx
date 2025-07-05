import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { getApiBaseUrl } from '../../config/api';
import AddProductPage from './AddProductPage';
import EditProductPage from './EditProductPage';

const categories = [
  'All Categories',
  'Canned Seafood',
  'Noodles',
  'Canned Goods',
  'Breakfast World',
  'Snacks & Sweets',
  'Health & Beauty',
  'Wines & Liquors',
];

const AdminViewProducts = ({ onBack }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/admin/products/${id}`, { method: 'DELETE' });
      if (response.status === 409) {
        const msg = await response.text();
        setDeleteError(msg || 'Cannot delete product: It is referenced by other records.');
        return;
      }
      if (!response.ok) throw new Error('Delete failed');
      setProducts(products => products.filter(p => p.id !== id));
      alert('Product deleted successfully!');
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      (category === 'All Categories' || p.category === category) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()))
  );

  // Show Add Product
  if (showAdd) {
    return <AddProductPage onNavigate={() => { setShowAdd(false); fetchProducts(); }} />;
  }
  // Show Edit Product
  if (editId !== null) {
    return <EditProductPage productId={editId} onNavigate={() => { setEditId(null); fetchProducts(); }} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 0' }}>
      {/* Header Bar */}
      <div style={{
        maxWidth: '1000px',
        margin: '2rem auto 0.5rem auto',
        background: 'white',
        padding: '2rem 2.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '220px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>Online Grocery</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Products</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem('isAdminAuthenticated');
            window.location.href = '/?route=login';
          }}
          style={{ background: '#ef4444', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)',
        padding: '2.5rem',
        position: 'relative',
        border: '1px solid #e5e7eb',
      }}>
        {/* Top Row: Back Button and Add Product */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: 0,
              }}
              title="Back"
            >
              <ArrowLeft size={28} />
            </button>
          )}
          <button
            style={{
              background: '#ef4444',
              color: 'white',
              padding: '0.6rem 1.7rem',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              boxShadow: '0 2px 8px 0 rgb(239 68 68 / 0.10)',
              letterSpacing: '0.5px',
            }}
            onClick={() => setShowAdd(true)}
          >
            + Add Product
          </button>
        </div>
        {/* Search, Filter, Refresh */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 2,
              padding: '0.85rem 1.1rem',
              border: '1.5px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f9fafb',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
            }}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              flex: 1,
              padding: '0.85rem 1.1rem',
              border: '1.5px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1.05rem',
              outline: 'none',
              background: '#f9fafb',
              boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.03)',
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            style={{
              background: '#111',
              color: 'white',
              padding: '0.85rem 1.5rem',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 'bold',
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.10)',
            }}
            onClick={fetchProducts}
          >
            Refresh
          </button>
        </div>
        {/* Loading/Error States */}
        {loading ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Loading products...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '2rem' }}>{error}</div>
        ) : deleteError ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '1.5rem', fontWeight: 'bold', background: '#fff3f3', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            {deleteError}
            <button onClick={() => setDeleteError('')} style={{ marginLeft: 16, background: '#ef4444', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.3rem 1rem', fontWeight: 'bold', cursor: 'pointer' }}>Close</button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', background: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: 'white', fontSize: '1.05rem' }}>
              <thead>
                <tr style={{ background: '#f3f4f6', color: '#222' }}>
                  <th style={{ padding: '0.95rem', textAlign: 'left', fontWeight: 700 }}>Product</th>
                  <th style={{ padding: '0.95rem', textAlign: 'left', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '0.95rem', textAlign: 'left', fontWeight: 700 }}>Price</th>
                  <th style={{ padding: '0.95rem', textAlign: 'left', fontWeight: 700 }}>Stock</th>
                  <th style={{ padding: '0.95rem', textAlign: 'left', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '0.95rem', textAlign: 'left', fontWeight: 700 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product, idx) => (
                    <tr
                      key={product.id}
                      style={{
                        borderBottom: '1px solid #f3f4f6',
                        background: idx % 2 === 0 ? '#fff' : '#f9fafb',
                        transition: 'background 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#f3f4f6'}
                      onMouseOut={e => e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#f9fafb'}
                    >
                      <td style={{ padding: '0.95rem', display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                        <img src={product.image} alt={product.name} style={{ width: 56, height: 56, borderRadius: '1rem', objectFit: 'cover', boxShadow: '0 1px 4px 0 rgb(0 0 0 / 0.10)' }} />
                        <div>
                          <div style={{ fontWeight: 'bold', color: '#222', fontSize: '1.08rem' }}>{product.name}</div>
                          <div style={{ fontSize: '0.98rem', color: '#888' }}>ID: {product.id}</div>
                        </div>
                      </td>
                      <td style={{ padding: '0.95rem' }}>{product.category}</td>
                      <td style={{ padding: '0.95rem' }}>
                        <span style={{ fontWeight: 'bold', color: '#222' }}>₱{product.price?.toFixed(2)}</span>
                        {product.original_price > product.price && (
                          <span style={{ textDecoration: 'line-through', color: '#ef4444', marginLeft: 8, fontSize: '0.98rem' }}>
                            ₱{product.original_price?.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '0.95rem', color: product.quantity > 10 ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                        {product.quantity} in stock
                      </td>
                      <td style={{ padding: '0.95rem' }}>
                        <span
                          style={{
                            background: product.discount === 'No Discount' ? '#e5e7eb' : product.best_selling ? '#2563eb' : '#fde68a',
                            color: product.discount === 'No Discount' ? '#555' : product.best_selling ? 'white' : '#b45309',
                            padding: product.discount === 'No Discount' ? '0.18rem 0.7rem' : '0.25rem 0.85rem',
                            borderRadius: '0.5rem',
                            fontWeight: product.discount === 'No Discount' ? 400 : 'bold',
                            fontSize: product.discount === 'No Discount' ? '0.97rem' : '1.01rem',
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            boxShadow: product.discount === 'No Discount' ? 'none' : undefined,
                            letterSpacing: product.discount === 'No Discount' ? '0.01em' : undefined,
                          }}
                        >
                          {product.discount}
                        </span>
                      </td>
                      <td style={{ padding: '0.95rem', display: 'flex', gap: '0.7rem' }}>
                        <button
                          style={{
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            padding: '0.5rem 1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1.01rem',
                            boxShadow: '0 1px 3px 0 rgb(37 99 235 / 0.10)',
                          }}
                          onClick={() => setEditId(product.id)}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            padding: '0.5rem 1.1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontSize: '1.01rem',
                            boxShadow: '0 1px 3px 0 rgb(239 68 68 / 0.10)',
                          }}
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViewProducts;
