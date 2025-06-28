import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, User, Search, Menu, Star, Minus, Plus } from 'lucide-react';
import Footer from '../components/Footer';
import axios from 'axios';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // For now, fetch the first product as an example
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        if (response.data.length > 0) {
          setProduct(response.data[0]);
          // Set defaults if available
          const variants = response.data[0].variants ? response.data[0].variants.split(',') : [];
          const sizes = response.data[0].sizes ? response.data[0].sizes.split(',') : [];
          setSelectedVariant(variants[0] || '');
          setSelectedSize(sizes[0] || '');
        }
      })
      .catch(error => console.error('Error fetching product:', error));
  }, []);

  if (!product) return <div>Loading...</div>;

  const variants = product.variants ? product.variants.split(',') : [];
  const sizes = product.sizes ? product.sizes.split(',') : [];

  const relatedProducts = [
    {
      id: 1,
      name: "Ligo Easy Open Can Sardines In Tomato Sauce 155g",
      price: "₱42.50",
      originalPrice: "₱50.00",
      discount: "-20%",
      inStock: 6,
      image: "/api/placeholder/120/120"
    },
    {
      id: 2,
      name: "Ligo Easy Open Can Sardines In Tomato Sauce 155g",
      price: "₱42.50",
      originalPrice: "₱50.00",
      discount: "-15%",
      inStock: 0,
      image: "/api/placeholder/120/120"
    },
    {
      id: 3,
      name: "Ligo Easy Open Can Sardines In Tomato Sauce 155g",
      price: "₱42.50",
      originalPrice: "₱50.00",
      discount: "-30%",
      inStock: 5,
      image: "/api/placeholder/120/120"
    },
    {
      id: 4,
      name: "Ligo Easy Open Can Sardines In Tomato Sauce 155g",
      price: "₱42.50",
      originalPrice: "₱50.00",
      discount: "-5%",
      inStock: 0,
      image: "/api/placeholder/120/120"
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', borderRadius: '0.25rem' }}>
                <ShoppingCart style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
              </div>
              <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Online Grocery</span>
            </div>
            
            <nav style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>Category</a>
              <a href="#" style={{ color: '#1f2937', fontWeight: '500', textDecoration: 'none' }}>Home</a>
              <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>Contact</a>
              <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>About</a>
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  style={{
                    paddingLeft: '1rem',
                    paddingRight: '2.5rem',
                    paddingTop: '0.5rem',
                    paddingBottom: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    width: '200px',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
                <Search style={{ position: 'absolute', right: '0.75rem', top: '0.625rem', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <ShoppingCart style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
                <span style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '-0.5rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '0.75rem',
                  borderRadius: '50%',
                  width: '1.25rem',
                  height: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>3</span>
              </div>
              <Heart style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
              <User style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
            </div>
          </div>
        </div>
      </header>

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
              <div style={{
                width: '256px',
                height: '256px',
                background: 'linear-gradient(to bottom, #16a34a, #166534)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ color: 'white', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>MEGA</div>
                  <div style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>SARDINES</div>
                  <div style={{ fontSize: '0.875rem' }}>NET WEIGHT 155 g (5.5 oz)</div>
                </div>
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '3rem',
                  height: '3rem',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ width: '2rem', height: '1.5rem', backgroundColor: 'white', borderRadius: '0.25rem' }}></div>
                </div>
              </div>
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
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.5rem 0.5rem 0 0',
              display: 'inline-block',
              fontWeight: '500'
            }}>
              Related Products
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {relatedProducts.map((product) => (
                <div key={product.id} style={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
                  position: 'relative'
                }}>
                  {product.discount && (
                    <span style={{
                      position: 'absolute',
                      top: '0.5rem',
                      left: '0.5rem',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem'
                    }}>
                      {product.discount}
                    </span>
                  )}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(to bottom, #16a34a, #166534)',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem auto'
                  }}>
                    <div style={{ color: 'white', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 'bold' }}>MEGA</div>
                      <div style={{ fontSize: '0.75rem' }}>SARDINES</div>
                    </div>
                  </div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#1f2937',
                    marginBottom: '0.5rem',
                    textAlign: 'center'
                  }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#ef4444', fontWeight: '600', fontSize: '0.875rem' }}>{product.price}</span>
                    <span style={{ color: '#9ca3af', fontSize: '0.75rem', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem', textAlign: 'center' }}>
                    {product.inStock > 0 ? `${product.inStock} pcs` : 'Out of stock'}
                  </div>
                  <button
                    disabled={product.inStock === 0}
                    style={{
                      width: '100%',
                      backgroundColor: product.inStock > 0 ? '#ef4444' : '#e5e7eb',
                      color: product.inStock > 0 ? 'white' : '#9ca3af',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '0.25rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      cursor: product.inStock > 0 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
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