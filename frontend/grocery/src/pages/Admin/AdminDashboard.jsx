import React, { useState, useEffect } from 'react';
import { ShoppingCart, ClipboardList, Users as UsersIcon } from 'lucide-react';
import AdminViewUsers from './AdminViewUsers';
import AdminViewProducts from './AdminViewProducts';
import { getApiBaseUrl } from '../../config/api';

const AdminDashboard = ({ onNavigate }) => {
  const [showViewUsers, setShowViewUsers] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [productCount, setProductCount] = useState(null);
  const [userCount, setUserCount] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  // Placeholder count for orders
  const orderCount = 2650;

  useEffect(() => {
    const fetchProductCount = async () => {
      setLoadingProducts(true);
      try {
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/products`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProductCount(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        setProductCount(0);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProductCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      setLoadingUsers(true);
      try {
        const apiBaseUrl = getApiBaseUrl();
        const response = await fetch(`${apiBaseUrl}/api/auth/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUserCount(Array.isArray(data) ? data.length : 0);
      } catch (err) {
        setUserCount(0);
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUserCount();
  }, []);

  // Quick Actions handlers (implement navigation as needed)
  const handleAddProduct = () => {
    if (onNavigate && onNavigate.onAddProduct) {
      onNavigate.onAddProduct();
    }
  };
  const handleAddDeliveryPersonnel = () => {
    // Implement navigation or modal for adding delivery personnel
    alert('Add Delivery Personnel feature coming soon!');
  };
  const handleBulkActions = () => {
    // Implement bulk actions logic
    alert('Bulk Actions feature coming soon!');
  };

  if (showViewUsers) {
    return <AdminViewUsers onBack={() => setShowViewUsers(false)} />;
  }

  if (showProductList) {
    return (
      <AdminViewProducts onBack={() => setShowProductList(false)} />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '0 0 2rem 0' }}>
      {/* Header */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto 1.5rem auto',
        background: 'white',
        padding: '2rem 2.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 8px 0 rgb(0 0 0 / 0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '220px', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <div style={{ backgroundColor: '#ef4444', padding: '0.5rem', borderRadius: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart style={{ width: '1.25rem', height: '1.25rem', color: 'white' }} />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.125rem', color: '#1f2937' }}>Online Grocery</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>Admin Dashboard</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem('isAdminAuthenticated');
            window.location.href = '/?route=login';
          }}
          style={{ background: '#ef4444', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
        >
          Logout
        </button>
      </div>

      {/* Summary Cards with Icons */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem auto',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
        <div
          onClick={() => setShowProductList(true)}
          style={{
            flex: 1,
            minWidth: '220px',
            background: '#f3f4f6',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.07)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px 0 rgb(37 99 235 / 0.15)'}
          onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.07)'}
        >
          <div style={{ background: '#ef4444', borderRadius: '50%', padding: '0.75rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart style={{ width: '2rem', height: '2rem', color: 'white' }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Products</div>
          <div style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            {loadingProducts ? <span style={{ color: '#aaa', fontSize: '1.2rem' }}>...</span> : productCount}
          </div>
          <button style={{ background: 'none', border: 'none', color: '#111', fontWeight: 'bold', cursor: 'pointer' }}>
            View &gt;
          </button>
        </div>
        <div style={{ flex: 1, minWidth: '220px', background: '#f3f4f6', borderRadius: '1rem', padding: '2rem', textAlign: 'center', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#2563eb', borderRadius: '50%', padding: '0.75rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ClipboardList style={{ width: '2rem', height: '2rem', color: 'white' }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Orders</div>
          <div style={{ fontWeight: 'bold', fontSize: '2rem' }}>{orderCount.toLocaleString()}</div>
          <button style={{ background: 'none', border: 'none', color: '#111', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => {}}>
            View &gt;
          </button>
        </div>
        <div
          onClick={() => setShowViewUsers(true)}
          style={{
            flex: 1,
            minWidth: '220px',
            background: '#f3f4f6',
            borderRadius: '1rem',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.07)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            cursor: 'pointer',
            transition: 'box-shadow 0.2s, background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 12px 0 rgb(16 185 129 / 0.15)'}
          onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.07)'}
        >
          <div style={{ background: '#10b981', borderRadius: '50%', padding: '0.75rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UsersIcon style={{ width: '2rem', height: '2rem', color: 'white' }} />
          </div>
          <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Users</div>
          <div style={{ fontWeight: 'bold', fontSize: '2rem' }}>
            {loadingUsers ? <span style={{ color: '#aaa', fontSize: '1.2rem' }}>...</span> : userCount}
          </div>
          <button style={{ background: 'none', border: 'none', color: '#111', fontWeight: 'bold', cursor: 'pointer' }}>
            View &gt;
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto 2rem auto',
        display: 'flex',
        gap: '1.5rem',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <button onClick={handleAddProduct} style={{ background: '#ef4444', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>+ Add Product</button>
        <button onClick={handleAddDeliveryPersonnel} style={{ background: '#2563eb', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>+ Add Delivery Personnel</button>
        <button onClick={handleBulkActions} style={{ background: '#111', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Bulk Actions</button>
      </div>

      {/* Pending Orders Label */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto 0 auto',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        color: '#1f2937',
        letterSpacing: '-0.5px',
      }}>
        Pending Orders
      </div>

      {/* Pending Orders & Active Delivery (placeholders, style as needed) */}
      <div style={{ maxWidth: '1200px', margin: '1rem auto 0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 2, background: '#ededed', borderRadius: '1.5rem', padding: '2rem', minWidth: '400px' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Home Delivery</h3>
          {/* Pending orders table improved styling */}
          <table style={{ width: '100%', background: 'white', borderCollapse: 'separate', borderSpacing: 0, borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.07)', marginBottom: '1.5rem' }}>
            <thead style={{ background: '#f3f4f6' }}>
              <tr style={{ textAlign: 'left', color: '#222' }}>
                <th style={{ padding: '0.75rem' }}>Customer</th>
                <th style={{ padding: '0.75rem' }}>Address</th>
                <th style={{ padding: '0.75rem' }}>Phone</th>
                <th style={{ padding: '0.75rem' }}>Order Amount</th>
                <th style={{ padding: '0.75rem' }}>Payment Method</th>
                <th style={{ padding: '0.75rem' }}>Payment Status</th>
                <th style={{ padding: '0.75rem' }}></th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#fff' }}>
                <td style={{ padding: '0.75rem' }}>John Doe</td>
                <td style={{ padding: '0.75rem' }}>Mandaue City, Cebu</td>
                <td style={{ padding: '0.75rem' }}>09282323234</td>
                <td style={{ padding: '0.75rem' }}>₱ 2,530</td>
                <td style={{ padding: '0.75rem' }}>Gcash</td>
                <td style={{ padding: '0.75rem' }}>Paid</td>
                <td style={{ padding: '0.75rem' }}><button style={{ background: '#111', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>Assign Delivery</button></td>
              </tr>
              <tr style={{ background: '#f9fafb' }}>
                <td style={{ padding: '0.75rem' }}>John Doe</td>
                <td style={{ padding: '0.75rem' }}>Mandaue City, Cebu</td>
                <td style={{ padding: '0.75rem' }}>09282323234</td>
                <td style={{ padding: '0.75rem' }}>₱ 2,530</td>
                <td style={{ padding: '0.75rem' }}>Gcash</td>
                <td style={{ padding: '0.75rem' }}>Paid</td>
                <td style={{ padding: '0.75rem' }}><button style={{ background: '#111', color: 'white', border: 'none', borderRadius: '0.375rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>Assign Delivery</button></td>
              </tr>
            </tbody>
          </table>
          <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Personal Pickups</h3>
          {/* Personal pickups placeholder */}
        </div>
        <div style={{ flex: 1, background: '#ededed', borderRadius: '1.5rem', padding: '2rem', minWidth: '220px', minHeight: '200px' }}>
          <h2 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>Active Delivery</h2>
          <div>James Bond</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 