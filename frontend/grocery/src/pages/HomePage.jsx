import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Eye } from 'lucide-react';

function HomePage() {
  const [cartCount, setCartCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(0);

  const productData = {
    name: "Ligo Easy Open Can Sardines in Tomato Sauce 155g",
    originalPrice: "₱55.00",
    salePrice: "₱42.50",
    pieces: "6 pcs",
    discount: "-5%",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=200&h=200&fit=crop&crop=center"
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  const handleToggleWishlist = () => {
    setWishlistCount(wishlistCount > 0 ? 0 : 1);
  };

  const ProductCard = ({ product, showSale = true }) => (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '0.5rem', 
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', 
      border: '1px solid #e5e7eb',
      transition: 'box-shadow 0.2s',
      overflow: 'hidden',
      height: 'fit-content'
    }}>
      <div style={{ position: 'relative', padding: '1rem' }}>
        {showSale && (
          <div style={{ 
            position: 'absolute', 
            top: '0.5rem', 
            left: '0.5rem', 
            backgroundColor: '#ef4444', 
            color: 'white', 
            fontSize: '0.75rem', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '0.25rem',
            zIndex: 10
          }}>
            {product.discount}
          </div>
        )}
        <div style={{ 
          position: 'absolute', 
          top: '0.5rem', 
          right: '0.5rem', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.25rem',
          zIndex: 10
        }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist();
            }}
            style={{ 
              padding: '0.25rem', 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '50%', 
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Heart style={{ 
              width: '1rem', 
              height: '1rem', 
              color: wishlistCount > 0 ? '#ef4444' : '#9ca3af',
              fill: wishlistCount > 0 ? '#ef4444' : 'none'
            }} />
          </button>
          <button style={{ 
            padding: '0.25rem', 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '50%', 
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Eye style={{ width: '1rem', height: '1rem', color: '#9ca3af' }} />
          </button>
        </div>
        
        {/* Product Image */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: '1rem',
          paddingTop: '1rem'
        }}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ 
              width: '6rem', 
              height: '6rem', 
              objectFit: 'cover', 
              borderRadius: '0.25rem'
            }}
          />
        </div>
        
        {/* Product Info */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ 
            color: '#ef4444', 
            fontSize: '0.875rem', 
            margin: '0 0 0.5rem 0',
            fontWeight: '500'
          }}>
            {product.pieces}
          </p>
          
          <h3 style={{ 
            fontSize: '0.875rem', 
            color: '#1f2937', 
            margin: '0 0 0.75rem 0',
            lineHeight: '1.4', 
            minHeight: '2.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}>
            {product.name}
          </h3>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            gap: '0.5rem', 
            marginBottom: '0.75rem' 
          }}>
            <span style={{ 
              color: '#ef4444', 
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              {product.salePrice}
            </span>
            <span style={{ 
              color: '#9ca3af', 
              fontSize: '0.75rem', 
              textDecoration: 'line-through' 
            }}>
              {product.originalPrice}
            </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            style={{ 
              width: '100%', 
              backgroundColor: '#ef4444', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              border: 'none',
              borderRadius: '0.25rem', 
              fontSize: '0.875rem', 
              fontWeight: '500', 
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', width: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', width: '100%' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', borderRadius: '0.25rem' }}>
                <ShoppingCart style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>Online Grocery</span>
            </div>

            {/* Navigation - Hide on small screens */}
            <nav style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '2rem',
              '@media (max-width: 768px)': { display: 'none' }
            }}>
              <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>Category</a>
              <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>Home</a>
              <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>Contact</a>
              <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }}>About</a>
            </nav>

            {/* Search and Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'flex-end', maxWidth: '400px' }}>
              <div style={{ position: 'relative', flex: 1, maxWidth: '250px' }}>
                <input
                  type="text"
                  placeholder="What are you looking for"
                  style={{ 
                    paddingLeft: '1rem', 
                    paddingRight: '2.5rem', 
                    paddingTop: '0.5rem', 
                    paddingBottom: '0.5rem',
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.5rem', 
                    width: '100%',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
                <Search style={{ position: 'absolute', right: '0.75rem', top: '0.625rem', width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <button 
                  onClick={handleToggleWishlist}
                  style={{ position: 'relative', padding: '0.5rem', backgroundColor: 'transparent', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
                >
                  <Heart style={{ width: '1.25rem', height: '1.25rem', color: wishlistCount > 0 ? '#ef4444' : '#4b5563', fill: wishlistCount > 0 ? '#ef4444' : 'none' }} />
                  {wishlistCount > 0 && (
                    <span style={{ 
                      position: 'absolute', 
                      top: '-0.25rem', 
                      right: '-0.25rem', 
                      backgroundColor: '#ef4444', 
                      color: 'white', 
                      fontSize: '0.75rem', 
                      borderRadius: '50%', 
                      width: '1rem', 
                      height: '1rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {wishlistCount}
                    </span>
                  )}
                </button>
                
                <button style={{ position: 'relative', padding: '0.5rem', backgroundColor: 'transparent', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  <ShoppingCart style={{ width: '1.25rem', height: '1.25rem', color: '#4b5563' }} />
                  <span style={{ 
                    position: 'absolute', 
                    top: '-0.25rem', 
                    right: '-0.25rem', 
                    backgroundColor: '#ef4444', 
                    color: 'white', 
                    fontSize: '0.75rem', 
                    borderRadius: '50%', 
                    width: '1rem', 
                    height: '1rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    {cartCount}
                  </span>
                </button>
                
                <button style={{ padding: '0.5rem', backgroundColor: 'transparent', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
                  <User style={{ width: '1.25rem', height: '1.25rem', color: '#4b5563' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

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
            {[...Array(8)].map((_, index) => (
              <ProductCard key={index} product={productData} />
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
              View All Products
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
            width: '100%'
          }}>
            {[...Array(4)].map((_, index) => (
              <ProductCard key={index} product={productData} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;