import React from 'react';
import facebookIcon from '../assets/icon_facebook.png';
import twitterIcon from '../assets/icon_twitter.png';
import instagramIcon from '../assets/icon_instagram.png';
import tiktokIcon from '../assets/icon_tiktok.png';

function Footer() {
  return (
    <footer style={{ backgroundColor: 'black', color: 'white', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h3>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: '0.5rem' }}><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Home</a></div>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: '0.5rem' }}><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>About Us</a></div>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: '0.5rem' }}><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Contact Us</a></div>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem' }}><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Term of Use</a></div>
          </div>
          {/* Reach Us */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Reach Us</h3>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Cebu City, Philippines</div>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: '0.5rem' }}>+63 922 6578 938</div>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem' }}>onlinegrocery@cit.edu</div>
          </div>
          {/* Account */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Account</h3>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: '0.5rem' }}><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>My Account</a></div>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: '0.5rem' }}><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Cart</a></div>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem', marginBottom: '0.5rem' }}><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Wishlist</a></div>
            <div style={{ color: '#d1d5db', fontSize: '0.95rem' }}><a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>Shop</a></div>
          </div>
          {/* Follow Us */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Follow Us</h3>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="#" title="Facebook" style={{ display: 'block' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                  border: '2px solid #e5e7eb'
                }}>
                  <img src={facebookIcon} alt="Facebook" style={{ width: '1.5rem', height: '1.5rem', display: 'block' }} />
                </div>
              </a>
              <a href="#" title="Twitter" style={{ display: 'block' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                  border: '2px solid #e5e7eb'
                }}>
                  <img src={twitterIcon} alt="Twitter" style={{ width: '1.5rem', height: '1.5rem', display: 'block' }} />
                </div>
              </a>
              <a href="#" title="Instagram" style={{ display: 'block' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                  border: '2px solid #e5e7eb'
                }}>
                  <img src={instagramIcon} alt="Instagram" style={{ width: '1.5rem', height: '1.5rem', display: 'block' }} />
                </div>
              </a>
              <a href="#" title="TikTok" style={{ display: 'block' }}>
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  background: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                  border: '2px solid #e5e7eb'
                }}>
                  <img src={tiktokIcon} alt="TikTok" style={{ width: '1.5rem', height: '1.5rem', display: 'block' }} />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #374151', marginTop: '2rem', paddingTop: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
          © {new Date().getFullYear()} Online Grocery. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
