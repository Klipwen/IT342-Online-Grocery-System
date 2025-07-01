import React from "react";
import cartIcon from "../../assets/grocery_shopping_cart.png";
import "../../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Header */}
      <header className="navbar">
        <div className="logo-section">
          <img src={cartIcon} alt="Logo" />
          <span>Online Grocery</span>
        </div>
        <nav className="nav-links">
          <a href="#">Category</a>
          <a href="#">Home</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
        </nav>
        <div className="nav-icons">
          <input type="text" placeholder="What are you looking for?" />
          <i className="bi bi-search"></i>
          <i className="bi bi-heart"></i>
          <i className="bi bi-cart"></i>
          <i className="bi bi-person"></i>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb">Home / About</div>

      {/* Main Section */}
      <div className="about-main">
        <div className="about-text">
          <h2>About us</h2>
          <p>
            Your One-Stop Online Shop for Quality and Affordable Products from
            the Nation’s Most Competitive and Dependable Retailers!
          </p>
          <p>
            From food to home items, delivery is available nationwide.
            Everything we offer is curated to bring you top value.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1542834369-f10ebf06d3cb"
            alt="Shopping"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="about-stats">
        <div className="stat-box">
          <h3>10.5k</h3>
          <p>Sold on our site</p>
        </div>
        <div className="stat-box active">
          <h3>33k</h3>
          <p>Monthly Product Sales</p>
        </div>
        <div className="stat-box">
          <h3>45.5k</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-box">
          <h3>25k</h3>
          <p>Annual Gross Revenue</p>
        </div>
      </div>

      {/* Team */}
      <div className="about-team">
        <div className="team-member">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Tom Cruise"
          />
          <h4>Tom Cruise</h4>
          <p>Founder & Chairman</p>
        </div>
        <div className="team-member">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Emma Watson"
          />
          <h4>Emma Watson</h4>
          <p>Managing Director</p>
        </div>
        <div className="team-member">
          <img
            src="https://randomuser.me/api/portraits/men/62.jpg"
            alt="Will Smith"
          />
          <h4>Will Smith</h4>
          <p>Product Designer</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Exclusive</h4>
            <p>Subscribe</p>
            <small>Get 10% off your first order</small>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <p>111 Bijoy sarani, Dhaka, BD</p>
            <p>exclusive@gmail.com</p>
            <p>+88015-88888-9999</p>
          </div>
          <div className="footer-section">
            <h4>Account</h4>
            <p>My Account</p>
            <p>Login / Register</p>
            <p>Cart</p>
            <p>Wishlist</p>
            <p>Shop</p>
          </div>
          <div className="footer-section">
            <h4>Quick Link</h4>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
          <div className="footer-section">
            <h4>Download App</h4>
            <img
              src="https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=https://yourapp.com"
              alt="QR Code"
              className="qr"
            />
            <div className="store-buttons">
              <img
                className="store-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
              />
              <img
                className="store-icon"
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
