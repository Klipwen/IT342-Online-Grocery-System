import React from 'react';
import UserProfile from '../components/UserProfile';
import Footer from '../components/Footer';
import Header from '../components/Header';

const UserProfilePage = ({ user }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <UserProfile user={user} />
      </div>
      <Footer />
    </div>
  );
};

export default UserProfilePage; 