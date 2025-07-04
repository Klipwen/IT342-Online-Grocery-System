import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/ProductsPage.module.css';
import cardStyles from '../styles/ProductCard.module.css';

const ProductsPage = ({ cart, setCart, selectedCategory, onAddToCart, user }) => {
  const [products, setProducts] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [toast, setToast] = useState('');
  const cartIconRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = (product) => {
    if (typeof onAddToCart === 'function') {
      onAddToCart(product.id, 1)
        .then(() => {
          setToast(`${product.name} added to cart!`);
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

  const handleToggleWishlist = (product) => {
    setWishlistCount(wishlistCount > 0 ? 0 : 1);
  };

  // Filter products by selectedCategory if set
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category && product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', width: '100%', overflowX: 'hidden', position: 'relative' }}>
      <Header cartCount={cart.length} ref={cartIconRef} />
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
                  <div key={product.id} className={cardStyles.fadeInCard}>
                    <ProductCard
                      product={product}
                      onAddToCart={() => handleAddToCart(product)}
                      onToggleWishlist={() => handleToggleWishlist(product)}
                      isWishlisted={wishlistCount > 0}
                      isInCart={!!cart.find(item => item.id === product.id)}
                      onClick={() => {
                        window.location.href = `/?route=product&id=${product.id}`;
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      {toast && (
        <div className="cart-toast">{toast}</div>
      )}
    </div>
  );
};

export default ProductsPage;
