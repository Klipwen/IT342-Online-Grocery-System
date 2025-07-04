import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/ProductsPage.module.css';

const ProductsPage = ({ cart, setCart, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
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

  // Filter products by selectedCategory if set
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category && product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', width: '100%', overflowX: 'hidden', position: 'relative' }}>
      <Header cartCount={cart.length} />
      <main style={{ width: '100%', padding: '2rem 1rem', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          {selectedCategory && (
            <div style={{ marginBottom: 24 }}>
              <span style={{ fontWeight: 600, color: '#ef4444' }}>Category: {selectedCategory}</span>
              <button
                style={{ marginLeft: 16, background: '#eee', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.delete('category');
                  window.history.pushState({}, '', url.pathname + url.search);
                  window.dispatchEvent(new Event('popstate'));
                }}
              >
                Clear Filter
              </button>
            </div>
          )}
          <button
            onClick={() => window.history.back()}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.5rem 1.25rem',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              marginBottom: '1.5rem'
            }}
          >
            ← Back
          </button>
          <section className="homepage-section">
            <div className="homepage-section-header">
              <div className="homepage-section-bar"></div>
              <span className="homepage-section-label">All Products</span>
            </div>
            <div className="homepage-section-title-row" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
              <h2 className="homepage-section-title" style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0, textAlign: 'center' }}>
                {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
              </h2>
            </div>
            <div className={styles.productsPageGrid}>
              {filteredProducts.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#9ca3af', fontSize: '1.1rem' }}>
                  No products found.
                </div>
              ) : (
                filteredProducts.map(product => (
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
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
