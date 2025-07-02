import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, ShoppingCart, Heart, User, Eye } from 'lucide-react';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';

function HomePage({ cart, setCart }) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleToggleWishlist = (product) => {
    setWishlistCount(wishlistCount > 0 ? 0 : 1);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', width: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <Header cartCount={cart.length} />

      {/* Main Content */}
      <main style={{ width: '100%', padding: '2rem 1rem', boxSizing: 'border-box' }}>
        {/* Best Selling Products Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '0.25rem', height: '2rem', backgroundColor: '#ef4444', borderRadius: '0.125rem' }}></div>
            <span style={{ color: '#ef4444', fontWeight: '500' }}>This Month</span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>Best Selling Products</h2>
            <button style={{ 
              backgroundColor: '#ef4444', 
              color: 'white', 
              padding: '0.5rem 1.5rem', 
              border: 'none',
              borderRadius: '0.25rem', 
              cursor: 'pointer',
              fontWeight: '500',
              flexShrink: 0
            }}>
              View All
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            width: '100%'
          }}>
            {products.filter(product => product.bestSelling).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onToggleWishlist={() => handleToggleWishlist(product)}
                isWishlisted={wishlistCount > 0}
                isInCart={!!cart.find(item => item.id === product.id)}
                onClick={() => {
                  window.location.href = `/?route=product&id=${product.id}`;
                }}
              />
            ))}
          </div>
        </section>

        {/* Explore Our Products Section */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '0.25rem', height: '2rem', backgroundColor: '#ef4444', borderRadius: '0.125rem' }}></div>
            <span style={{ color: '#ef4444', fontWeight: '500' }}>Our Products</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1f2937', margin: '0' }}>Explore Our Products</h2>
            <button
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                padding: '0.5rem 1.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: '500',
                flexShrink: 0
              }}
              onClick={() => { window.location.href = '/?route=products'; }}
            >
              View All Products
            </button>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            width: '100%'
          }}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onToggleWishlist={() => handleToggleWishlist(product)}
                isWishlisted={wishlistCount > 0}
                isInCart={!!cart.find(item => item.id === product.id)}
                onClick={() => {
                  window.location.href = `/?route=product&id=${product.id}`;
                }}
              />
            ))}
          </div>
        </section>

        {/* Browse By Category Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '0.25rem', height: '2rem', backgroundColor: '#ef4444', borderRadius: '0.125rem' }}></div>
            <span style={{ color: '#ef4444', fontWeight: '500' }}>Categories</span>
          </div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#1f2937', margin: '0 0 2rem 0' }}>Browse By Category</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
            gap: '1rem',
            marginBottom: '3rem'
          }}>
            {[
              { name: 'Pantry Essentials', icon: '📋' },
              { name: 'Breakfast World', icon: '🍞' },
              { name: 'Wines & Liquors', icon: '🍷' },
              { name: 'Personal Grooming', icon: '🧴', active: true },
              { name: 'Snacks & Sweets', icon: '🍪' },
              { name: 'Health & Beauty', icon: '💊' }
            ].map((category, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: category.active ? '#ef4444' : 'white',
                  border: `1px solid ${category.active ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '0.5rem',
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
                }}
                onMouseOver={(e) => {
                  if (!category.active) {
                    e.target.style.backgroundColor = '#f9fafb';
                    e.target.style.borderColor = '#ef4444';
                  }
                }}
                onMouseOut={(e) => {
                  if (!category.active) {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.borderColor = '#e5e7eb';
                  }
                }}
              >
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '1rem',
                  filter: category.active ? 'brightness(0) invert(1)' : 'none'
                }}>
                  {category.icon}
                </div>
                <div style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '500',
                  color: category.active ? 'white' : '#1f2937'
                }}>
                  {category.name}
                </div>
              </div>
            ))}
          </div>
          {/* Service Features */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {[
              {
                icon: '🚚',
                title: 'FREE AND FAST DELIVERY',
                subtitle: 'Free delivery for all orders over $140'
              },
              {
                icon: '🎧',
                title: '24/7 CUSTOMER SERVICE',
                subtitle: 'Friendly 24/7 customer support'
              },
              {
                icon: '✅',
                title: 'MONEY BACK GUARANTEE',
                subtitle: 'We return money within 30 days'
              }
            ].map((service, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#1f2937',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  position: 'relative'
                }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {service.icon}
                  </div>
                </div>
                <h3 style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#1f2937', 
                  margin: '0 0 0.5rem 0' 
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  fontSize: '0.875rem', 
                  color: '#6b7280', 
                  margin: '0' 
                }}>
                  {service.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;