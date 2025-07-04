import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchCart } from '../utils/cartApi';
import '../styles/CheckoutPage.css';

const SHIPPING_OPTIONS = [
  { label: 'Personal Pickup', value: 'pickup', cost: 0 },
  { label: 'Home Delivery', value: 'delivery', cost: 150 },
];
const PAYMENT_OPTIONS = [
  { label: 'Ewallet', value: 'ewallet' },
  { label: 'Cash on delivery', value: 'cod' },
];

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
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

  // Get userId from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user.id;

  useEffect(() => {
    if (!userId) return;
    fetchCart(userId)
      .then(data => {
        setCart(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  // Calculate subtotal safely
  const subtotal = cart.reduce(
    (sum, item) => sum + ((item.price || 0) * item.quantity),
    0
  );
  const shippingCost = SHIPPING_OPTIONS.find(opt => opt.value === form.shipping)?.cost || 0;
  const total = subtotal + shippingCost;

  // Handle form input
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handle form submit
  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    // Validate required fields
    if (!form.fullName || !form.street || !form.city || !form.phone || !form.email || !form.agree) {
      setError('Please fill in all required fields and agree to the terms.');
      return;
    }
    // Save info if checked
    if (form.saveInfo) {
      localStorage.setItem('checkoutInfo', JSON.stringify(form));
    }
    // Prepare order data
    const orderData = {
      userId,
      items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
      billing: {
        fullName: form.fullName,
        country: form.country,
        street: form.street,
        apartment: form.apartment,
        city: form.city,
        phone: form.phone,
        email: form.email,
      },
      shipping: form.shipping,
      payment: form.payment,
      total,
    };
    // For now, just log order data and show success
    console.log('Order placed:', orderData);
    setSuccess(true);
  };

  // Load saved info
  useEffect(() => {
    const saved = localStorage.getItem('checkoutInfo');
    if (saved) {
      setForm(f => ({ ...f, ...JSON.parse(saved) }));
    }
  }, []);

  return (
    <div className="checkout-page">
      <Header cartCount={cart.length} />
      <div className="breadcrumb">Home / Product / View Cart / <b>CheckOut</b></div>
      <div className="checkout-container">
        <div className="billing-details">
          <h2>Billing Details</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Full name" value={form.fullName} onChange={handleChange} required />
            <input type="text" name="country" value={form.country} disabled />
            <input type="text" name="street" placeholder="Street address *" value={form.street} onChange={handleChange} required />
            <input type="text" name="apartment" placeholder="Apartment, floor, etc. (optional)" value={form.apartment} onChange={handleChange} />
            <input type="text" name="city" placeholder="Town/City*" value={form.city} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone Number*" value={form.phone} onChange={handleChange} required />
            <input type="text" name="email" placeholder="Email Address*" value={form.email} onChange={handleChange} required />
            <label className="save-info">
              <input type="checkbox" name="saveInfo" checked={form.saveInfo} onChange={handleChange} />
              Save this information for faster check-out next time
            </label>
            {error && <div style={{ color: '#e63946', fontSize: 14 }}>{error}</div>}
            {success && <div style={{ color: 'green', fontSize: 15, marginBottom: 10 }}>Order placed successfully!</div>}
          </form>
        </div>
        <div className="order-summary">
          <div className="summary-card">
            <div style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '1rem', color: '#222' }}>Your Order</div>
            {loading ? <div>Loading cart...</div> : cart.length === 0 ? <div>No items in cart.</div> : (
              <>
                {cart.map(item => (
                  <div className="product-summary" key={item.id}>
                    <img src={item.image || require('../assets/sardines_product.png')} alt={item.name} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 120 }}>{`[${item.quantity}pcs] ${item.name}`}</div>
                    </div>
                    <div className="price">₱{item.price * item.quantity}</div>
                  </div>
                ))}
                <div className="summary-line"><span>Subtotal:</span><span>₱{subtotal.toFixed(2)}</span></div>
                <div className="summary-shipping">Shipping:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {SHIPPING_OPTIONS.map(opt => (
                    <label key={opt.value} className="summary-shipping" style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                      <input type="radio" name="shipping" value={opt.value} checked={form.shipping === opt.value} onChange={handleChange} style={{ marginRight: 8 }} />
                      {opt.label}{opt.cost > 0 && <b>: ₱{opt.cost.toFixed(2)}</b>}
                    </label>
                  ))}
                </div>
                <div className="summary-line total"><span>Total:</span><span>₱{total.toFixed(2)}</span></div>
                <div className="payment-method" style={{ marginTop: 10 }}>
                  {PAYMENT_OPTIONS.map(opt => (
                    <label key={opt.value}>
                      <input type="radio" name="payment" value={opt.value} checked={form.payment === opt.value} onChange={handleChange} />
                      {opt.label}
                    </label>
                  ))}
                </div>
                <label style={{ fontSize: 13, marginTop: 10, display: 'block' }}>
                  <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
                  I have read and agree to <a href="#" style={{ color: '#e63946' }}>Terms and Conditions</a> and <a href="#" style={{ color: '#e63946' }}>Privacy Policy</a>.
                </label>
                <button className="place-order-btn" onClick={handleSubmit} disabled={loading || cart.length === 0}>Place Order</button>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
