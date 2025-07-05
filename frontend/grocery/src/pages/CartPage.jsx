import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addOrUpdateCartItem, fetchCart } from '../utils/cartApi';

function CartPage({ cart, setCart, onRemoveFromCart, onClearCart, user }) {
  const [shipping, setShipping] = useState('delivery');

  const handleQuantityChange = async (id, delta) => {
    const item = cart.find(item => item.id === id);
    if (!item || !user) return;
    const newQuantity = Math.max(1, item.quantity + delta);
    await addOrUpdateCartItem(user.id, id, newQuantity);
    const updatedCart = await fetchCart(user.id);
    setCart(updatedCart);
  };

  const getItemPrice = (item) => (item.salePrice != null ? item.salePrice : item.price);

  const subtotal = cart.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);
  const shippingFee = shipping === 'delivery' ? 150 : 0;
  const total = subtotal + shippingFee;

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
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
      </div>
      <div style={{ maxWidth: '1200px', margin: '2rem auto', flex: 1, width: '100%' }}>
        <div style={{ fontSize: '0.95rem', color: '#6b7280', marginBottom: '1.5rem' }}>
          Home <span style={{ margin: '0 0.5rem' }}>/</span> Cart
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Cart Table */}
          <div style={{ flex: 2, background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.08)', padding: '2rem' }}>
            {cart.length > 0 && (
              <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                <button
                  onClick={onClearCart}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    padding: '0.5rem 1.25rem',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.08)'
                  }}
                >
                  Clear Cart
                </button>
              </div>
            )}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb', color: '#6b7280', fontWeight: 500 }}>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0' }}></th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Product</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Price</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Quantity</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 0' }}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af', fontSize: '1.1rem' }}>
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  cart.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '1rem 0', verticalAlign: 'middle' }}>
                        <button onClick={() => onRemoveFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '1.25rem' }}>✖</button>
                      </td>
                      <td style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', verticalAlign: 'middle' }}>
                        <img src={item.image || 'https://via.placeholder.com/60x60?text=No+Image'} alt={item.name || 'No Name'} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                        <span style={{ fontWeight: 500, color: '#1f2937', fontSize: '1rem' }}>{item.name || 'No Name'}</span>
                      </td>
                      <td style={{ color: '#ef4444', fontWeight: 600, fontSize: '1rem', verticalAlign: 'middle' }}>₱{getItemPrice(item).toFixed(2)}</td>
                      <td style={{ verticalAlign: 'middle' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1} style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', background: 'none', borderRadius: '0.25rem', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', fontWeight: 600, fontSize: '1rem' }}>-</button>
                          <input type="text" value={item.quantity} readOnly style={{ width: '2.5rem', textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: '0.25rem', fontSize: '1rem', padding: '0.25rem 0' }} />
                          <button onClick={() => handleQuantityChange(item.id, 1)} style={{ padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', background: 'none', borderRadius: '0.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>+</button>
                        </div>
                      </td>
                      <td style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem', verticalAlign: 'middle' }}>₱{(getItemPrice(item) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Cart Summary */}
          <div style={{ flex: 1, background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.08)', padding: '2rem', minWidth: '320px' }}>
            <div style={{ fontWeight: 600, fontSize: '1.2rem', color: '#ef4444', marginBottom: '1.5rem' }}>Cart Total</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1rem' }}>
              <span>Subtotal:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              <span>Total:</span>
              <span>₱{subtotal.toFixed(2)}</span>
            </div>
            <button style={{ width: '100%', background: '#ef4444', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '0.5rem', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}
              onClick={() => window.location.href = '/?route=checkout'}>
              Process to checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CartPage;