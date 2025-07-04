import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/ContactPage.css'; // If you want to add custom styles later

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.email || !form.phone || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    // For now, just log the form data
    console.log('Contact form submitted:', form);
    setSuccess('Your message has been sent!');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <>
      <Header />
      <div style={{ background: '#fafafa', minHeight: '80vh', padding: '40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {/* Left: Contact Info */}
          <div style={{ flex: '1 1 300px', maxWidth: 350, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001' }}>
              <div style={{ fontSize: 32, color: '#e53935', marginBottom: 8 }}>📞</div>
              <h3 style={{ margin: 0 }}>Call To Us</h3>
              <p style={{ margin: '8px 0 0 0', color: '#555' }}>We are available 24/7, 7 days a week.<br/>Phone: +88061112222</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px #0001' }}>
              <div style={{ fontSize: 32, color: '#e53935', marginBottom: 8 }}>✉️</div>
              <h3 style={{ margin: 0 }}>Write To Us</h3>
              <p style={{ margin: '8px 0 0 0', color: '#555' }}>Fill out our form and we will contact you within 24 hours.<br/>
                Emails: customer@exclusive.com<br/>support@exclusive.com
              </p>
            </div>
          </div>
          {/* Right: Contact Form */}
          <div style={{ flex: '2 1 400px', background: '#fff', borderRadius: 8, padding: 32, boxShadow: '0 2px 8px #0001', minWidth: 320 }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={handleChange}
                  style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 4, border: '1px solid #ddd' }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={form.email}
                  onChange={handleChange}
                  style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 4, border: '1px solid #ddd' }}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone *"
                  value={form.phone}
                  onChange={handleChange}
                  style={{ flex: 1, minWidth: 120, padding: 12, borderRadius: 4, border: '1px solid #ddd' }}
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                style={{ width: '100%', padding: 12, borderRadius: 4, border: '1px solid #ddd', marginBottom: 16 }}
              />
              {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
              {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
              <button
                type="submit"
                style={{ background: '#e53935', color: '#fff', border: 'none', padding: '12px 32px', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
