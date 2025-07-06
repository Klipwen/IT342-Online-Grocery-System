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
    agree: false,
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

  // Calculation helper to ensure consistency
  function calculateTotals(cart, paymentMethod) {
    const subtotal = cart.reduce(
      (sum, item) => sum + ((item.price || 0) * item.quantity),
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
    // Use calculation for backend
    const { subtotal, shippingCost, total } = calculateTotals(cart, paymentMethod);

    const orderData = {
      userId: userId,
      customerName: addressForm.name,
      address: addressForm.address,
      phone: addressForm.phone,
      totalAmount: total,
      status: 'Pending',
      paymentMethod: paymentMethod,
      items: cart.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
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
      setAddressSuccess('Address updated!');
      setTimeout(() => setAddressSuccess(''), 1500);
      setAddressEditMode(false);
    } catch (err) {
      setAddressError('Failed to update address.');
    }
  };

  return (
    <div className="checkout-page">
      <Header cartCount={cart.length} />
      <div className="breadcrumb">Home / Product / View Cart / <b>CheckOut</b></div>
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #ececec', padding: 24, margin: '24px auto 16px auto', maxWidth: 800, display: 'flex', alignItems: 'flex-start', gap: 24 }}>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#ef4444', fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
            <span style={{ marginRight: 8 }}>📍</span>Delivery Address
          </div>
          {!addressEditMode ? (
            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{addressForm.name} <span style={{ fontWeight: 400, color: '#444', fontSize: 15 }}>({addressForm.phone})</span></div>
              <div style={{ color: '#444', marginBottom: 4 }}>{addressForm.address}</div>
              <button style={{ color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, padding: 0 }} onClick={() => setAddressEditMode(true)}>Change</button>
              {addressSuccess && <div style={{ color: 'green', fontSize: 13, marginTop: 4 }}>{addressSuccess}</div>}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input type="text" name="name" placeholder="Full Name" value={addressForm.name} onChange={handleAddressChange} style={{ padding: 8, borderRadius: 5, border: '1px solid #ddd' }} />
              <input type="text" name="phone" placeholder="Phone Number" value={addressForm.phone} onChange={handleAddressChange} style={{ padding: 8, borderRadius: 5, border: '1px solid #ddd' }} />
              <input type="text" name="address" placeholder="Complete Address" value={addressForm.address} onChange={handleAddressChange} style={{ padding: 8, borderRadius: 5, border: '1px solid #ddd' }} />
              {addressError && <div style={{ color: '#e63946', fontSize: 13 }}>{addressError}</div>}
              <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                <button onClick={handleAddressSave} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 5, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }}>Save</button>
                <button onClick={() => { setAddressEditMode(false); setAddressError(''); }} style={{ background: 'none', color: '#222', border: '1px solid #ddd', borderRadius: 5, padding: '6px 18px', fontWeight: 500, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #ececec', padding: 24, margin: '0 auto 24px auto', maxWidth: 800 }}>
        <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 18 }}>Products Ordered</div>
        {loading ? <div>Loading cart...</div> : cart.length === 0 ? <div>No items in cart.</div> : (
          <>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f1f1f1', padding: '12px 0' }}>
                <img src={item.image || require('../assets/sardines_product.png')} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 6, marginRight: 16, border: '1px solid #eee' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 15 }}>{item.name}</div>
                  {item.variation && <div style={{ color: '#888', fontSize: 13 }}>Variation: {item.variation}</div>}
                </div>
                <div style={{ width: 80, textAlign: 'right', fontSize: 15 }}>₱{item.price}</div>
                <div style={{ width: 60, textAlign: 'center', fontSize: 15 }}>{item.quantity}</div>
                <div style={{ width: 80, textAlign: 'right', fontWeight: 600, fontSize: 15 }}>₱{item.price * item.quantity}</div>
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
          >
            Cash on Delivery
          </button>
          <button
            type="button"
            className={`payment-method-btn${paymentMethod === 'pickup' ? ' selected' : ''}`}
            onClick={() => setPaymentMethod('pickup')}
          >
            Self Pick-up
          </button>
          <button
            type="button"
            className={`payment-method-btn${paymentMethod === 'gcash' ? ' selected' : ''}`}
            onClick={() => setPaymentMethod('gcash')}
          >
            GCash
          </button>
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
        <div className="success-message" style={{ color: 'green', fontWeight: 600, fontSize: 18, margin: '16px 0', textAlign: 'center' }}>
          Order placed successfully! Your order has been sent to the store and will be processed soon.
          <br />
          <small style={{ color: '#666', fontWeight: 400 }}>You will be redirected to the home page in 3 seconds...</small>
        </div>
      )}
      <div style={{ margin: '24px 0', textAlign: 'center' }}>
        <label style={{ fontSize: 15 }}>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            style={{ marginRight: 8 }}
          />
          I agree to the terms and conditions
        </label>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
