import React from 'react';
import { Heart, Eye } from 'lucide-react';

// const imageMap = {
//   'sardines.png': sardinesImg,
//   // Add more mappings as you add more sample images
// };

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isWishlisted, onClick, isInCart }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.08)',
        border: '1px solid #f3f4f6',
        padding: '1.25rem 1.25rem 1.5rem 1.25rem',
        position: 'relative',
        width: '100%',
        maxWidth: '320px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '420px',
      }}
    >
      {/* Discount Badge */}
      {product.discount && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          backgroundColor: '#ef4444',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: '0.375rem',
          padding: '0.25rem 0.75rem',
          zIndex: 2,
        }}>
          {product.discount}
        </div>
      )}
      {/* Wishlist & View Icons */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        zIndex: 2,
      }}>
        <button
          onClick={onToggleWishlist}
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '50%',
            width: '2.25rem',
            height: '2.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.08)',
          }}
        >
          <Heart style={{
            width: '1.25rem',
            height: '1.25rem',
            color: isWishlisted ? '#ef4444' : '#9ca3af',
            fill: isWishlisted ? '#ef4444' : 'none',
          }} />
        </button>
        <button
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '50%',
            width: '2.25rem',
            height: '2.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.08)',
          }}
        >
          <Eye style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} />
        </button>
      </div>
      {/* Product Image (clickable for navigation) */}
      <div
        style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '1.25rem',
          marginTop: '2.5rem',
          marginBottom: '1.25rem',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '120px',
          minWidth: '120px',
          maxWidth: '160px',
          maxHeight: '160px',
          position: 'relative',
          cursor: onClick ? 'pointer' : 'default',
        }}
        onClick={onClick}
      >
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '120px',
              objectFit: 'contain',
              borderRadius: '0.5rem',
              background: '#f3f4f6',
            }}
          />
        )}
        {/* Quantity */}
        {product.quantity && (
          <span style={{
            position: 'absolute',
            bottom: '-1.5rem',
            right: '0',
            color: '#ef4444',
            fontWeight: '500',
            fontSize: '1.1rem',
            background: 'white',
            borderRadius: '0.5rem',
            padding: '0.1rem 0.75rem',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.04)',
          }}>
            {product.quantity} pcs
          </span>
        )}
      </div>
      {/* Product Name (clickable for navigation) */}
      <div
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          margin: '1.5rem 0 0.5rem 0',
          color: '#111827',
          minHeight: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: onClick ? 'pointer' : 'default',
        }}
        onClick={onClick}
      >
        {product.name}
      </div>
      {/* Price Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        margin: '0.5rem 0 1.5rem 0',
      }}>
        <span style={{
          color: '#ef4444',
          fontWeight: '700',
          fontSize: '1.2rem',
        }}>
          ₱{product.salePrice}
        </span>
        {product.quantity && (
          <span style={{
            color: '#ef4444',
            fontWeight: '500',
            fontSize: '1rem',
          }}>
            [{product.quantity}pcs]
          </span>
        )}
        {product.originalPrice && (
          <span style={{
            color: '#9ca3af',
            fontSize: '1.1rem',
            textDecoration: 'line-through',
            fontWeight: '400',
          }}>
            ₱{product.originalPrice}
          </span>
        )}
      </div>
      {/* Add To Cart Button */}
      <button
        onClick={e => {
          e.stopPropagation();
          if (!isInCart) onAddToCart();
        }}
        disabled={isInCart}
        style={{
          width: '100%',
          backgroundColor: isInCart ? '#9ca3af' : '#ef4444',
          color: 'white',
          padding: '0.75rem 0',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '1.1rem',
          fontWeight: '600',
          cursor: isInCart ? 'not-allowed' : 'pointer',
          marginTop: 'auto',
        }}
      >
        {isInCart ? 'Added' : 'Add To Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
