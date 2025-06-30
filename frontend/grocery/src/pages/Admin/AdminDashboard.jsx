import React, { useState, useEffect } from 'react';
import AdminProductTable from '../../components/admin/AdminProductTable';
import AdminHeader from '../../components/admin/AdminHeader';
import { getApiBaseUrl } from '../../config/api';

const AdminDashboard = ({ onNavigate }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const apiBaseUrl = getApiBaseUrl();
      const response = await fetch(`${apiBaseUrl}/api/admin/products/${productId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Remove the product from the local state
      setProducts(prev => prev.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (err) {
      alert('Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  const handleEditProduct = (productId) => {
    if (onNavigate && onNavigate.onEditProduct) {
      onNavigate.onEditProduct(productId);
    }
  };

  const handleAddProduct = () => {
    if (onNavigate && onNavigate.onAddProduct) {
      onNavigate.onAddProduct();
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '2rem auto', 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        textAlign: 'center'
      }}>
        <div>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        maxWidth: '1200px', 
        margin: '2rem auto', 
        background: 'white', 
        padding: '2rem', 
        borderRadius: '0.5rem', 
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        textAlign: 'center'
      }}>
        <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>
        <button 
          onClick={fetchProducts}
          style={{
            background: '#ef4444',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '2rem auto', 
      background: 'white', 
      padding: '2rem', 
      borderRadius: '0.5rem', 
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' 
    }}>
      <AdminHeader 
        title="Admin Dashboard" 
        subtitle={`${filteredProducts.length} products found`}
        onAddProduct={handleAddProduct}
      />

      {/* Search and Filter Controls */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        marginBottom: '2rem', 
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ minWidth: '150px' }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              outline: 'none',
              background: 'white'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={fetchProducts}
          style={{
            background: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Refresh
        </button>
      </div>

      {/* Products Table */}
      <AdminProductTable 
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: '#6b7280' 
        }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            {searchTerm || selectedCategory !== 'all' ? 'No products found' : 'No products yet'}
          </div>
          {!searchTerm && selectedCategory === 'all' && (
            <button
              onClick={handleAddProduct}
              style={{
                background: '#ef4444',
                color: 'white',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Add Your First Product
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 