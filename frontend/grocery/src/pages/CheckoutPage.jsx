import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchCart, clearCart } from '../utils/cartApi';
import { updateUserInfo, placeOrder } from '../config/api';
import '../styles/CheckoutPage.css';

const SHIPPING_OPTIONS = [
  { label: 'Personal Pickup', value: 'pickup', cost: 0 },
  { label: 'Home Delivery', value: 'delivery', cost: 150 },
];
const PAYMENT_OPTIONS = [
  { label: 'Ewallet', value: 'ewallet' },
  { label: 'Cash on delivery', value: 'cod' },
];

const CheckoutPage = ({ cart, setCart, onClearCart, user: appUser }) => {
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    fullName: '',
    country: 'Philippines',
    street: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    saveInfo: false,
    shipping: 'delivery',
    payment: 'cod',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [addressEditMode, setAddressEditMode] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [addressError, setAddressError] = useState('');
  const [addressSuccess, setAddressSuccess] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod', 'pickup', 'gcash'

  // Get userId from props or localStorage
  const user = appUser || JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id;

  useEffect(() => {
    if (!userId) return;
    // If cart is already loaded from props, don't fetch again
    if (cart && cart.length > 0) {
      setLoading(false);
    } else {
      fetchCart(userId)
        .then(data => {
          setCart(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
    // Set address form from user info in localStorage
    if (user) {
      setAddressForm({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
      });
    }
  }, [userId, cart]);

  // Add this helper at the top of the component
  function getItemPrice(item) {
    return item.salePrice != null ? item.salePrice : item.price;
  }

  // Update calculateTotals to use getItemPrice
  function calculateTotals(cart, paymentMethod) {
    const subtotal = cart.reduce(
      (sum, item) => sum + (getItemPrice(item) * item.quantity),
      0
    );
    const shippingCost = paymentMethod === 'cod' ? 150 : 0;
    const total = subtotal + shippingCost;
    return { subtotal, shippingCost, total };
  }

  // Use calculation for UI
  const { subtotal, shippingCost, total } = calculateTotals(cart, paymentMethod);

  // Handle form input
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess(false);
    if (!addressForm.name || !addressForm.address || !addressForm.phone) {
      alert('Please fill in your name, address, and contact number.');
      return;
    }
    // Recalculate using the latest paymentMethod
    const { subtotal, shippingCost, total } = calculateTotals(cart, paymentMethod);

    const orderData = {
      userId: userId,
      customerName: addressForm.name,
      address: addressForm.address,
      phone: addressForm.phone,
      totalAmount: total, // This will always include shipping if COD
      status: 'Pending',
      paymentMethod: paymentMethod,
      items: cart.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: getItemPrice(item)
      }))
    };
    // Debug log to trace order values
    console.log('DEBUG ORDER SUBMIT', { cart, subtotal, shippingCost, total, orderData });
    try {
      await placeOrder(orderData);
      setSuccess(true);
      // Clear the cart from backend and local state after successful order placement
      if (onClearCart) {
        await onClearCart();
      } else {
        try {
          await clearCart(userId);
          setCart([]);
          localStorage.removeItem('cart');
        } catch (clearError) {
          console.error('Failed to clear cart:', clearError);
          // Even if clearing fails, the order was successful
        }
      }
      // Redirect to home page after 3 seconds
      setTimeout(() => {
        window.location.href = '/?route=home';
      }, 3000);
    } catch (err) {
      alert('Failed to place order. Please try again.');
    }
  };

  // Load saved info
  useEffect(() => {
    const saved = localStorage.getItem('checkoutInfo');
    if (saved) {
      setForm(f => ({ ...f, ...JSON.parse(saved) }));
    }
  }, []);

  // Handle address form changes
  const handleAddressChange = e => {
    const { name, value } = e.target;
    setAddressForm(f => ({ ...f, [name]: value }));
  };

  // Save address to backend
  const handleAddressSave = async () => {
    setAddressError('');
    if (!addressForm.name || !addressForm.phone || !addressForm.address) {
      setAddressError('Please fill in all address fields.');
      return;
    }
    try {
      const updated = await updateUserInfo(userId, {
        name: addressForm.name,
        phone: addressForm.phone,
        address: addressForm.address,
        email: user.email,
      });
      localStorage.setItem('user', JSON.stringify(updated));
      setAddressSuccess('Great! Your address was updated successfully.');
      setTimeout(() => setAddressSuccess(''), 1500);
      setAddressEditMode(false);
    } catch (err) {
      setAddressError('Failed to update address.');
    }
  };

  return (
    <div className="checkout-page">
      <Header cartCount={cart.length} />
      <div style={{ width: '100%', maxWidth: 800, margin: '32px auto 0 auto', paddingLeft: 24, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div className="breadcrumb" style={{ marginBottom: 8, paddingLeft: 0 }}>Home / Product / View Cart / <b>CheckOut</b></div>
        <span style={{ fontSize: 42, fontWeight: 800, color: '#222', letterSpacing: '-1.5px', marginBottom: 4 }}>Checkout</span>
        <span style={{ color: '#6b7280', fontSize: 18, fontWeight: 400 }}>Review and complete your order</span>
      </div>
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #ececec', padding: 24, margin: '24px auto 16px auto', maxWidth: 800, display: 'flex', alignItems: 'flex-start', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 22, marginRight: 10, color: '#ef4444' }}>📍</span>
            <span style={{ color: '#ef4444', fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px' }}>Delivery Address</span>
            <span title="We need your address to deliver your order!" style={{ marginLeft: 8, color: '#ef4444', cursor: 'pointer', fontSize: 18 }}>ℹ️</span>
          </div>
          <div style={{ background: '#fdf2f8', borderRadius: 10, padding: 18, boxShadow: '0 1px 4px #fce7ef', marginBottom: 8, minHeight: 80, display: 'flex', alignItems: 'center', gap: 16, position: 'relative', transition: 'box-shadow 0.2s', cursor: !addressEditMode ? 'pointer' : 'default' }}
            onClick={() => { if (!addressEditMode) setAddressEditMode(true); }}
            onMouseOver={e => { if (!addressEditMode) e.currentTarget.style.boxShadow = '0 4px 16px #fca5a5'; }}
            onMouseOut={e => { if (!addressEditMode) e.currentTarget.style.boxShadow = '0 1px 4px #fce7ef'; }}
          >
            {!addressEditMode ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18, color: '#ef4444' }}>👤</span>
                  <span style={{ fontWeight: 700, fontSize: 16, color: addressForm.name ? '#222' : '#bbb' }}>{addressForm.name || 'No Name'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18, color: '#ef4444' }}>🏠</span>
                  <span style={{ fontSize: 15, color: addressForm.address ? '#444' : '#bbb' }}>{addressForm.address || 'No Address Provided'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 18, color: '#ef4444' }}>📞</span>
                  <span style={{ fontSize: 15, color: addressForm.phone ? '#444' : '#bbb' }}>{addressForm.phone || 'No Contact Number'}</span>
                </div>
                <button style={{ position: 'absolute', right: 18, top: 18, color: '#fff', background: '#ef4444', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14, padding: '5px 14px', fontWeight: 600, boxShadow: '0 2px 8px #fca5a5', transition: 'background 0.2s' }} onClick={e => { e.stopPropagation(); setAddressEditMode(true); }} onMouseOver={e => e.currentTarget.style.background = '#dc2626'} onMouseOut={e => e.currentTarget.style.background = '#ef4444'}>Edit</button>
                {(!addressForm.name || !addressForm.address || !addressForm.phone) && (
                  <span style={{ marginTop: 8, color: '#ef4444', fontWeight: 600, fontSize: 14 }}>⚠️ Please complete your address</span>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', animation: 'fadeIn 0.3s' }}>
                <label style={{ fontWeight: 600, color: '#ef4444', fontSize: 14, marginBottom: 2 }}>Full Name</label>
                <input type="text" name="name" placeholder="Full Name" value={addressForm.name} onChange={handleAddressChange} style={{ padding: 10, borderRadius: 6, border: '1.5px solid #ef4444', fontSize: 15, marginBottom: 4 }} />
                <label style={{ fontWeight: 600, color: '#ef4444', fontSize: 14, marginBottom: 2 }}>Address</label>
                <input type="text" name="address" placeholder="Complete Address" value={addressForm.address} onChange={handleAddressChange} style={{ padding: 10, borderRadius: 6, border: '1.5px solid #ef4444', fontSize: 15, marginBottom: 4 }} />
                <label style={{ fontWeight: 600, color: '#ef4444', fontSize: 14, marginBottom: 2 }}>Contact Number</label>
                <input type="text" name="phone" placeholder="Contact Number" value={addressForm.phone} onChange={handleAddressChange} style={{ padding: 10, borderRadius: 6, border: '1.5px solid #ef4444', fontSize: 15, marginBottom: 4 }} />
                {addressError && <div style={{ color: '#e63946', fontSize: 13 }}>{addressError}</div>}
                <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                  <button onClick={handleAddressSave} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 8px #fca5a5' }}>Save</button>
                  <button onClick={() => { setAddressEditMode(false); setAddressError(''); }} style={{ background: 'none', color: '#222', border: '1px solid #ddd', borderRadius: 6, padding: '7px 18px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
          {addressSuccess && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#16a34a', fontWeight: 600, fontSize: 15, marginTop: 8, background: 'rgba(34,197,94,0.08)', borderRadius: 8, padding: '8px 16px', boxShadow: '0 2px 8px #bbf7d0', animation: 'fadeIn 0.5s' }}>
              <span style={{ fontSize: 22, animation: 'popIn 0.5s' }}>✅</span>
              <span>Great! Your address was updated successfully.</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #ececec', padding: 24, margin: '0 auto 24px auto', maxWidth: 800 }}>
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 18 }}>Products Ordered</div>
        {loading ? <div>Loading cart...</div> : cart.length === 0 ? <div>No items in cart.</div> : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f1f1f1', padding: '12px 0', transition: 'box-shadow 0.18s, transform 0.18s', boxShadow: 'none' }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 4px 16px #fca5a5'; e.currentTarget.style.transform = 'scale(1.01)'; }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <img src={item.image || require('../assets/sardines_product.png')} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 6, marginRight: 16, border: '1px solid #eee', transition: 'transform 0.18s' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'scale(1.12)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>{item.name}</div>
                  {item.variation && <div style={{ color: '#888', fontSize: 13 }}>Variation: {item.variation}</div>}
                </div>
                <div style={{ width: 80, textAlign: 'right', fontSize: 15 }}>₱{getItemPrice(item)}</div>
                <div style={{ width: 60, textAlign: 'center', fontSize: 15 }}>{item.quantity}</div>
                <div style={{ width: 80, textAlign: 'right', fontWeight: 600, fontSize: 15 }}>₱{getItemPrice(item) * item.quantity}</div>
              </div>
            ))}
          </>
        )}
      </div>
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #ececec', padding: 0, margin: '0 auto 24px auto', maxWidth: 800, overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid #f1f1f1', padding: '20px 24px', fontWeight: 600, fontSize: 18 }}>Payment Method</div>
        <div style={{ display: 'flex', gap: 12, padding: '20px 24px' }}>
          <button
            type="button"
            className={`payment-method-btn${paymentMethod === 'cod' ? ' selected' : ''}`}
            onClick={() => setPaymentMethod('cod')}
            style={{ background: paymentMethod === 'cod' ? '#fee2e2' : '#fff', color: paymentMethod === 'cod' ? '#ef4444' : '#222', border: '1.5px solid #ef4444', borderRadius: 8, fontWeight: 600, fontSize: 15, padding: '10px 24px', cursor: 'pointer', boxShadow: paymentMethod === 'cod' ? '0 2px 8px #fca5a5' : 'none', transition: 'all 0.18s' }}
          >
            Cash on Delivery
          </button>
          <button
            type="button"
            className={`payment-method-btn${paymentMethod === 'pickup' ? ' selected' : ''}`}
            onClick={() => setPaymentMethod('pickup')}
            style={{ background: paymentMethod === 'pickup' ? '#e0e7ff' : '#fff', color: paymentMethod === 'pickup' ? '#3730a3' : '#222', border: '1.5px solid #3730a3', borderRadius: 8, fontWeight: 600, fontSize: 15, padding: '10px 24px', cursor: 'pointer', boxShadow: paymentMethod === 'pickup' ? '0 2px 8px #a5b4fc' : 'none', transition: 'all 0.18s' }}
          >
            Self Pick-up
          </button>
        </div>
        <div style={{ padding: '0 24px 24px 24px', minHeight: 40 }}>
          {paymentMethod === 'pickup' && (
            <div style={{ background: '#e0e7ff', color: '#3730a3', borderRadius: 8, padding: '14px 18px', marginTop: 8, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>🏪</span>
              Pick up your order at <b>Online Grocery Store, Labangon, Cebu City</b> <span style={{ marginLeft: 8, fontSize: 15, color: '#6366f1' }}>(View Map)</span>
            </div>
          )}
          {paymentMethod === 'cod' && (
            <div style={{ background: '#fee2e2', color: '#ef4444', borderRadius: 8, padding: '14px 18px', marginTop: 8, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 10, animation: 'slideIn 0.3s' }}>
              <span style={{ fontSize: 22 }}>🚚</span>
              Your order will be delivered to your address in <b>1-2 days</b>! <span style={{ marginLeft: 8, fontSize: 15, color: '#ef4444' }}>Enjoy fast delivery!</span>
            </div>
          )}
        </div>
        <div style={{ background: '#fdfcf9', padding: '32px 24px 24px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <div style={{ width: 220, fontSize: 15, color: '#888' }}>Merchandise Subtotal</div>
            <div style={{ width: 120, textAlign: 'right', fontWeight: 500 }}>₱{subtotal.toLocaleString()}</div>
          </div>
          {paymentMethod === 'cod' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <div style={{ width: 220, fontSize: 15, color: '#888' }}>Shipping Subtotal</div>
              <div style={{ width: 120, textAlign: 'right', fontWeight: 500 }}>₱{shippingCost.toLocaleString()}</div>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 16, borderTop: '1px dashed #eee', paddingTop: 18 }}>
            <div style={{ width: 220, fontSize: 18, fontWeight: 600 }}>Total Payment:</div>
            <div style={{ width: 120, textAlign: 'right', color: '#ef4444', fontWeight: 700, fontSize: 26 }}>
              ₱{total.toLocaleString()}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <button
              className="place-order-btn"
              onClick={handleSubmit}
              disabled={loading || cart.length === 0}
              title={cart.length === 0 ? "Your cart is empty" : ""}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      {success && (
        <div className="success-message" style={{ color: 'green', fontWeight: 600, fontSize: 18, margin: '16px 0', textAlign: 'center', position: 'relative' }}>
          <span style={{ fontSize: 32, marginRight: 8, verticalAlign: 'middle', animation: 'popIn 0.5s' }}>✅</span>
          Order placed successfully! Your order has been sent to the store and will be processed soon.
          <br />
          <small style={{ color: '#666', fontWeight: 400 }}>You will be redirected to the home page in 3 seconds...</small>
        </div>
      )}
      <Footer />
      <style>{`
      @keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 80% { transform: scale(1.1); opacity: 1; } 100% { transform: scale(1); } }
      @keyframes fall { 0% { transform: translateY(-10px); } 100% { transform: translateY(20px); } }
      @keyframes pulsePin { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
