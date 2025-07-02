import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User } from 'lucide-react';

const categories = [
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

const Header = ({
  cartCount = 0,
  searchValue = '',
  onSearch = () => {},
  onCartClick = () => {},
  onWishlistClick = () => {},
  onUserClick = () => {},
}) => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
            <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', borderRadius: '0.25rem' }}>
              <ShoppingCart style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Online Grocery</span>
          </div>
          <nav style={{ display: 'flex', gap: '2rem', position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <a
                href="#"
                style={{ color: '#4b5563', textDecoration: 'none' }}
                onClick={e => {
                  e.preventDefault();
                  setShowCategories(v => !v);
                }}
                onBlur={() => setTimeout(() => setShowCategories(false), 150)}
                tabIndex={0}
              >
                Category
              </a>
              {showCategories && (
                <div style={{
                  position: 'absolute',
                  top: '2.2rem',
                  left: 0,
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  zIndex: 100,
                  minWidth: '180px',
                  padding: '0.5rem 0',
                }}>
                  {categories.map(cat => (
                    <div
                      key={cat}
                      style={{
                        padding: '0.5rem 1.5rem',
                        cursor: 'pointer',
                        color: '#1f2937',
                        fontWeight: 500,
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        transition: 'background 0.2s',
                      }}
                      onClick={() => {
                        window.location.href = `/?route=category&name=${encodeURIComponent(cat)}`;
                        setShowCategories(false);
                      }}
                      onMouseDown={e => e.preventDefault()}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <a href="#" style={{ color: '#1f2937', fontWeight: '500', textDecoration: 'none' }} onClick={e => { e.preventDefault(); window.location.href = '/?route=home'; }}>Home</a>
            <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }} onClick={e => { e.preventDefault(); window.location.href = '/?route=contact'; }}>Contact</a>
            <a href="#" style={{ color: '#4b5563', textDecoration: 'none' }} onClick={e => { e.preventDefault(); window.location.href = '/?route=aboutus'; }}>About</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchValue}
                onChange={e => onSearch(e.target.value)}
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
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => window.location.href = '/?route=cart'}>
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
              }}>{cartCount}</span>
            </div>
            <Heart style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563', cursor: 'pointer' }} onClick={onWishlistClick} />
            <User style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563', cursor: 'pointer' }} onClick={onUserClick} />
            <button
              onClick={() => {
                localStorage.removeItem('user');
                window.location.href = '/?route=login';
              }}
              style={{
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.5rem 1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginLeft: '0.5rem'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 