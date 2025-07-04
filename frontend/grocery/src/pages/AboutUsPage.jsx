import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AboutUs.css';
import cartIcon from '../assets/grocery_shopping_cart.png';
import team1 from '../assets/aboutus_vestil.png'; // Placeholder, replace with real images if available
import team2 from '../assets/aboutus_ricablanca.png';
import team3 from '../assets/aboutus_juen.jpg';

const AboutUsPage = ({ cart = [] }) => {
  return (
    <>
      <Header cartCount={cart.length} />
      <div style={{ background: '#fafafa', minHeight: '80vh', padding: '40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          {/* Breadcrumb */}
          <div style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>
            Home / <span style={{ color: '#222' }}>About</span>
          </div>
          {/* About Section */}
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', alignItems: 'center', marginBottom: 40 }}>
            <div style={{ flex: '1 1 320px', minWidth: 260 }}>
              <h2 style={{ fontSize: 32, marginBottom: 16 }}>About us</h2>
              <p style={{ color: '#444', lineHeight: 1.7 }}>
                Your One-Stop Online Shop for Quality and Affordable Products from the Metro Stores Supermarket and Department Store!<br /><br />
                Exclusive has more than 1 Million products to offer, growing at a very fast rate. Exclusive also shows a diverse assortment in categories ranging from consumer...
              </p>
            </div>
            <div style={{ flex: '1 1 320px', minWidth: 260, textAlign: 'center' }}>
              <img src={cartIcon} alt="About us" style={{ maxWidth: 350, width: '100%', borderRadius: 12 }} />
            </div>
          </div>
          {/* Stats Section */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
            <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>10.5k</div>
              <div style={{ color: '#888', marginTop: 8 }}>Sellers active on site</div>
            </div>
            <div style={{ flex: '1 1 180px', background: '#e53935', color: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>33k</div>
              <div style={{ marginTop: 8 }}>Monthly Product Sale</div>
            </div>
            <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>45.5k</div>
              <div style={{ color: '#888', marginTop: 8 }}>Customer active on site</div>
            </div>
            <div style={{ flex: '1 1 180px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>25k</div>
              <div style={{ color: '#888', marginTop: 8 }}>Annual gross sale on site</div>
            </div>
          </div>
          {/* Team Section */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001', minWidth: 200 }}>
                <img src={team1} alt="Tom Cruise" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
                <div style={{ fontWeight: 700 }}>Ross Mikhail A. Vestil</div>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Founder & CEO</div>
                <div>
                  <span style={{ margin: '0 4px', fontSize: 18 }}>💼</span>
                  <span style={{ margin: '0 4px', fontSize: 18 }}>🔗</span>
                </div>
              </div>
              <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001', minWidth: 200 }}>
                <img src={team2} alt="Emma Watson" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
                <div style={{ fontWeight: 700 }}>Claudine Margaret C. Ricablanca</div>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Operations Manager</div>
                <div>
                  <span style={{ margin: '0 4px', fontSize: 18 }}>💼</span>
                  <span style={{ margin: '0 4px', fontSize: 18 }}>🔗</span>
                </div>
              </div>
              <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001', minWidth: 200 }}>
                <img src={team3} alt="Will Smith" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
                <div style={{ fontWeight: 700 }}>Gee Caliph A. Juen</div>
                <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>Lead Software Engineer</div>
                <div>
                  <span style={{ margin: '0 4px', fontSize: 18 }}>💼</span>
                  <span style={{ margin: '0 4px', fontSize: 18 }}>🔗</span>
                </div>
              </div>
            </div>
          </div>
          {/* Features Section */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 40 }}>
            <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001', minWidth: 200 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>🚚</div>
              <div style={{ fontWeight: 700 }}>FREE AND FAST DELIVERY</div>
              <div style={{ color: '#888', fontSize: 14 }}>Free delivery for all orders over $140</div>
            </div>
            <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001', minWidth: 200 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>💬</div>
              <div style={{ fontWeight: 700 }}>24/7 CUSTOMER SERVICE</div>
              <div style={{ color: '#888', fontSize: 14 }}>Friendly 24/7 customer support</div>
            </div>
            <div style={{ flex: '1 1 220px', background: '#fff', borderRadius: 8, padding: 24, textAlign: 'center', boxShadow: '0 2px 8px #0001', minWidth: 200 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>💸</div>
              <div style={{ fontWeight: 700 }}>MONEY BACK GUARANTEE</div>
              <div style={{ color: '#888', fontSize: 14 }}>We return money within 30 days</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUsPage; 