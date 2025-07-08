import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Search, ShoppingCart, Heart, User, Eye } from 'lucide-react';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import catStyles from '../styles/CategoryCard.module.css';

function HomePage({ cart, setCart, onAddToCart, user }) {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState('');
  const cartIconRef = useRef(null);
  // Ripple effect state for category cards
  const [ripple, setRipple] = useState({});
  const rippleTimeouts = useRef({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleToggleWishlist = (product) => {
    setWishlistCount(wishlistCount > 0 ? 0 : 1);
  };

  const onLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Redirect to login page
  };

  const handleAddToCart = (productId, quantity) => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(productId, quantity)
        .then(() => {
          const product = products.find(p => p.id === productId);
          setToast(`${product?.name || 'Product'} added to cart!`);
          if (cartIconRef.current) {
            cartIconRef.current.classList.remove('cart-bounce');
            void cartIconRef.current.offsetWidth;
            cartIconRef.current.classList.add('cart-bounce');
          }
          setTimeout(() => setToast(''), 1800);
        })
        .catch(() => {
          setToast('Please log in to add to cart.');
          setTimeout(() => setToast(''), 1800);
        });
    } else {
      setToast('Please log in to add to cart.');
      setTimeout(() => setToast(''), 1800);
    }
  };

  const handleCategoryClick = (category, index, e) => {
    // Ripple effect logic
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    setRipple(r => ({ ...r, [index]: { x, y, size } }));
    clearTimeout(rippleTimeouts.current[index]);
    rippleTimeouts.current[index] = setTimeout(() => {
      setRipple(r => ({ ...r, [index]: null }));
    }, 500);
    // Navigate to products page with category filter
    window.location.href = `/?route=products&category=${encodeURIComponent(category.name)}`;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', width: '100%', overflowX: 'hidden', position: 'relative' }}>
      {/* Header */}
      <Header cartCount={cart.length} ref={cartIconRef} searchValue={searchTerm} onSearch={setSearchTerm} />

      {/* Main Content */}
      <main style={{ width: '100%', padding: '2rem 1rem', boxSizing: 'border-box' }}>
        {/* Best Selling Products Section */}
        <section className="homepage-section">
          <div className="homepage-section-header">
            <div className="homepage-section-bar"></div>
            <span className="homepage-section-label">This Month</span>
          </div>
          <div className="homepage-section-title-row">
            <h2 className="homepage-section-title">Best Selling Products</h2>
            <button className="homepage-viewall-btn" onClick={() => { window.location.href = '/?route=products&filter=bestselling'; }}>View All</button>
          </div>
          <div className="homepage-product-grid">
            {products.filter(product => product.bestSelling && product.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id, 1)}
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
        <section className="homepage-section">
          <div className="homepage-section-header">
            <div className="homepage-section-bar"></div>
            <span className="homepage-section-label">Our Products</span>
          </div>
          <div className="homepage-section-title-row">
            <h2 className="homepage-section-title">Explore Our Products</h2>
            <button className="homepage-viewall-btn" onClick={() => { window.location.href = '/?route=products'; }}>View All Products</button>
          </div>
          <div className="homepage-product-grid">
            {products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase())).map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id, 1)}
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
              { name: 'Pantry Essentials', icon: '📋', color: '#ef4444' },
              { name: 'Breakfast World', icon: '🍞', color: '#f59e42' },
              { name: 'Wines & Liquors', icon: '🍷', color: '#a855f7' },
              { name: 'Personal Grooming', icon: '🧴', color: '#0ea5e9' },
              { name: 'Snacks & Sweets', icon: '🍪', color: '#fbbf24' },
              { name: 'Health & Beauty', icon: '💊', color: '#ec4899' }
            ].map((category, index) => (
              <div
                key={index}
                className={catStyles.categoryCard + (category.active ? ' ' + catStyles.active : '')}
                tabIndex={0}
                onClick={e => handleCategoryClick(category, index, e)}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                {/* Ripple effect */}
                {ripple[index] && (
                  <span
                    style={{
                      position: 'absolute',
                      left: ripple[index].x,
                      top: ripple[index].y,
                      width: ripple[index].size,
                      height: ripple[index].size,
                      background: 'rgba(239,68,68,0.18)',
                      borderRadius: '50%',
                      pointerEvents: 'none',
                      transform: 'scale(0)',
                      animation: 'rippleAnim 0.5s linear',
                      zIndex: 2
                    }}
                  />
                )}
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '1rem',
                  color: category.color,
                  filter: category.active ? 'brightness(0) invert(1)' : 'none',
                  transition: 'transform 0.18s cubic-bezier(.34,1.56,.64,1)'
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
      {toast && (
        <div className="cart-toast">{toast}</div>
      )}
    </div>
  );
}

export default HomePage;