import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductsPage = ({ cart, setCart }) => {
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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', width: '100%', overflowX: 'hidden' }}>
      <Header cartCount={cart.length} />
      <div style={{ maxWidth: '1200px', margin: '2rem auto 0 auto', width: '100%' }}>
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
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '2rem', textAlign: 'center' }}>
          All Products
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          width: '100%'
        }}>
          {products.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#9ca3af', fontSize: '1.1rem' }}>
              No products found.
            </div>
          ) : (
            products.map(product => (
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
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
