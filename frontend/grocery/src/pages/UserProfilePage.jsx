import React from 'react';
import UserProfile from '../components/UserProfile';
import Footer from '../components/Footer';
import Header from '../components/Header';

const UserProfilePage = ({ user, cart = [] }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header cartCount={cart.length} />
      <div style={{ flex: 1 }}>
        <UserProfile user={user} />
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage; 