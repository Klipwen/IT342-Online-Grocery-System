import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, User, Search, Menu, Star, Minus, Plus } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Get product id from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (!productId) return;
    axios.get(`http://localhost:8080/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        const variants = response.data.variants ? response.data.variants.split(',') : [];
        const sizes = response.data.sizes ? response.data.sizes.split(',') : [];
        setSelectedVariant(variants[0] || '');
        setSelectedSize(sizes[0] || '');
        // Fetch related products in the same category
        axios.get('http://localhost:8080/api/products')
          .then(res => {
            const related = res.data.filter(p => p.category === response.data.category && p.id !== response.data.id);
            setRelatedProducts(related);
          });
      })
      .catch(error => console.error('Error fetching product:', error));
  }, []);

  if (!product) return <div>Loading...</div>;

  const variants = product.variants ? product.variants.split(',') : [];
  const sizes = product.sizes ? product.sizes.split(',') : [];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <Header cartCount={0} />

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1rem 0 1rem' }}>
        <nav style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          <span>Home</span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span>Pantry Essentials</span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span>Canned Goods</span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#1f2937' }}>Canned Sardines</span>
        </nav>
      </div>

      {/* Product Details */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
          padding: '2rem'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {/* Product Image */}
            <div style={{ flex: 1, minWidth: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {product.image ? (
                <img src={product.image} alt={product.name} style={{ width: '256px', height: '256px', objectFit: 'contain', borderRadius: '0.5rem', background: '#fff', border: '1px solid #e5e7eb' }} />
              ) : (
                <div style={{ width: '256px', height: '256px', background: '#e5e7eb', borderRadius: '0.5rem' }} />
              )}
            </div>

            {/* Product Info */}
            <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
                  {product.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#4b5563', fontSize: '1.125rem' }}>{product.price}</span>
                  <span style={{ color: '#9ca3af', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                </div>
                <div style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.95rem' }}>
                  <div><strong>Category:</strong> {product.category}</div>
                  <div><strong>Available Quantity:</strong> {product.quantity}</div>
                </div>
              </div>

              {/* Variants */}
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem', display: 'block' }}>Variants:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {variants.map((variant, idx) => (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      style={{
                        width: '1.5rem',
                        height: '1.5rem',
                        borderRadius: '50%',
                        border: selectedVariant === variant ? '2px solid #1f2937' : '2px solid #d1d5db',
                        backgroundColor: variant.trim(), // assumes color name or code
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem', display: 'block' }}>Size:</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {sizes.map((size, idx) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        borderRadius: '0.25rem',
                        border: selectedSize === size ? '2px solid #ef4444' : '2px solid #d1d5db',
                        backgroundColor: selectedSize === size ? '#ef4444' : 'white',
                        color: selectedSize === size ? 'white' : '#374151',
                        cursor: 'pointer'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price and Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>{product.price}</div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '0.25rem' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Minus style={{ width: '1rem', height: '1rem' }} />
                  </button>
                  <span style={{ padding: '0.5rem 1rem', borderLeft: '1px solid #d1d5db', borderRight: '1px solid #d1d5db' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <Plus style={{ width: '1rem', height: '1rem' }} />
                  </button>
                </div>
                <button style={{
                  flex: 1,
                  backgroundColor: '#ef4444',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}>
                  Add To Cart
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: isWishlisted ? '2px solid #ef4444' : '2px solid #d1d5db',
                    backgroundColor: isWishlisted ? '#fee2e2' : 'white',
                    color: isWishlisted ? '#ef4444' : '#4b5563',
                    cursor: 'pointer'
                  }}
                >
                  <Heart style={{ width: '1.25rem', height: '1.25rem', fill: isWishlisted ? '#ef4444' : 'none' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div style={{ marginTop: '3rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '0.25rem',
                height: '1.5rem',
                backgroundColor: '#ef4444',
                borderRadius: '0.125rem',
              }}></div>
              <span style={{ color: '#ef4444', fontWeight: '600', fontSize: '1.1rem' }}>Related Products</span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem',
            }}>
              {relatedProducts.map((related) => (
                <ProductCard
                  key={related.id}
                  product={related}
                  onAddToCart={() => {}}
                  onToggleWishlist={() => {}}
                  isWishlisted={false}
                  onClick={() => {
                    window.location.href = `/?route=product&id=${related.id}`;
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;