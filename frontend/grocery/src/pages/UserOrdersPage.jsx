import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getApiBaseUrl } from '../config/api';

const UserOrdersPage = ({ user, cart = [] }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let interval;
    const fetchUserOrders = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/orders/user/${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        const userOrders = await res.json();
        setOrders(userOrders);
      } catch (err) {
        setError('Could not load your orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
    interval = setInterval(fetchUserOrders, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [user?.id]);

  const summarizeItems = (items) => {
    if (!items || !Array.isArray(items) || items.length === 0) return '-';
    return items.map(item => `${item.productName || item.product_name || 'Item'} x${item.quantity || 1}`).join(', ');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return { bg: '#dcfce7', color: '#166534' };
      case 'Pending': return { bg: '#fef3c7', color: '#92400e' };
      case 'Processing': return { bg: '#dbeafe', color: '#1e40af' };
      case 'Ready to Deliver': return { bg: '#f0fdf4', color: '#166534' };
      case 'Ready to Pick Up': return { bg: '#f0fdf4', color: '#166534' };
      case 'Cancelled': return { bg: '#fee2e2', color: '#991b1b' };
      default: return { bg: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', flexDirection: 'column' }}>
      <Header cartCount={cart.length} />
      
      <div style={{ flex: 1, padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              padding: '0.5rem 1.25rem',
              fontWeight: 600,
              fontSize: '1.5rem',
              cursor: 'pointer',
              marginBottom: '1.5rem',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {'<'}
          </button>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              My Orders
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>
              Track your order history and current orders
            </p>
          </div>

          {/* Orders List */}
          <div style={{ background: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.08)', overflow: 'hidden' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                Loading your orders...
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#ef4444' }}>
                {error}
              </div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                  No orders yet
                </h3>
                <p style={{ color: '#6b7280' }}>
                  You haven't placed any orders yet. Start shopping to see your orders here!
                </p>
                <button
                  onClick={() => window.location.href = '/?route=products'}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    padding: '0.75rem 1.5rem',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: '1rem'
                  }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                  <thead style={{ background: '#f9fafb' }}>
                    <tr>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                        Order ID
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                        Items
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                        Total
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                        Status
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                        Date
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#374151', borderBottom: '1px solid #e5e7eb' }}>
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      const statusStyle = getStatusColor(order.status);
                      return (
                        <tr key={order.id} style={{ background: index % 2 === 0 ? 'white' : '#f9fafb', cursor: 'pointer' }}
                          onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                        >
                          <td style={{ padding: '1rem', fontWeight: '600', color: '#1f2937' }}>
                            #{order.id}
                          </td>
                          <td style={{ padding: '1rem', color: '#6b7280', maxWidth: '300px' }}>
                            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {summarizeItems(order.items)}
                            </div>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '700', color: '#10b981' }}>
                            ₱{order.totalAmount?.toLocaleString()}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <span style={{
                              background: statusStyle.bg,
                              color: statusStyle.color,
                              padding: '0.25rem 0.75rem',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: '600'
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <span style={{
                              background: order.paymentMethod === 'pickup' ? '#e0e7ff' : '#f0fdf4',
                              color: order.paymentMethod === 'pickup' ? '#3730a3' : '#166534',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                              fontWeight: '600'
                            }}>
                              {order.paymentMethod === 'pickup' ? 'Pickup' : 'Delivery'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
            onClick={() => setShowModal(false)}
          >
            <div style={{
              background: '#fff',
              borderRadius: '1.1rem',
              padding: '2rem 2rem 1.5rem 2rem',
              minWidth: 340,
              maxWidth: 440,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              position: 'relative',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 22 }} title="Close">×</button>
              <h3 style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 10, color: '#1f2937', textAlign: 'center', letterSpacing: '-0.5px' }}>Order Details</h3>
              <div style={{ fontSize: '1.05rem', color: '#1f2937', marginBottom: 10, width: '100%' }}>
                <div style={{ marginBottom: 4 }}><b>Order ID:</b> {selectedOrder.id}</div>
                <div style={{ marginBottom: 4 }}><b>Amount:</b> ₱{selectedOrder.totalAmount?.toLocaleString()}</div>
                <div style={{ marginBottom: 4 }}><b>Status:</b> {selectedOrder.status}</div>
                <div style={{ marginBottom: 4 }}><b>Type:</b> {selectedOrder.paymentMethod === 'pickup' ? 'Pickup' : 'Delivery'}</div>
                <div style={{ marginBottom: 4 }}><b>Date:</b> {selectedOrder.orderDate ? new Date(selectedOrder.orderDate).toLocaleString() : '-'}</div>
                <div style={{ marginBottom: 4 }}><b>Address:</b> {selectedOrder.address}</div>
                <div style={{ marginBottom: 4 }}><b>Phone:</b> {selectedOrder.phone}</div>
              </div>
              <div style={{ width: '100%', borderTop: '1px solid #e5e7eb', margin: '10px 0 12px 0', paddingTop: 10 }}>
                <div style={{ fontWeight: 600, marginBottom: 6, color: '#222' }}>Items:</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(selectedOrder.items && selectedOrder.items.length > 0)
                    ? selectedOrder.items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: 4, color: '#374151', fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontWeight: 600 }}>{item.quantity}x</span>
                          <span>{item.productName || item.product_name || 'Item'}</span>
                        </li>
                      ))
                    : <li style={{ color: '#888', fontSize: '0.97rem' }}>No items</li>
                  }
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default UserOrdersPage; 