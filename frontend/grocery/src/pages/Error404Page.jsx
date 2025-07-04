import React from "react";
import cartIcon from "../assets/grocery_shopping_cart.png";
import "../styles/Error404.css";
import Header from "../components/Header";

const Error404Page = ({ cart = [] }) => {
  return (
    <div className="error-page">
      <Header cartCount={cart.length} />

      {/* Breadcrumb */}
      <div className="breadcrumb">Home / 404 Error</div>

      {/* Main Content */}
      <div className="error-content">
        <h1>404 Not Found</h1>
        <p>Your visited page not found. You may go home page.</p>
        <button className="back-home-btn">Back to home page</button>
      </div>

      {/* Footer */}
      <footer className="footer">
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
          <img src="/qr-code.png" alt="QR Code" className="qr" />
          <div className="store-buttons">
            <img src="/google-play.png" alt="Google Play" />
            <img src="/app-store.png" alt="App Store" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Error404Page;
