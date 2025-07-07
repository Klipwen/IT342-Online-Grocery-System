import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart, X } from 'lucide-react';
import { getApiBaseUrl } from '../../config/api';

const AdminViewPayments = ({ onBack }) => {
  const COLORS = {
    primary: '#fff',
    secondary: '#f8fafc',
    border: '#e2e8f0',
    text: '#1f2937',
    text1: '#6b7280',
    paid: '#10b981',
    pending: '#f59e42',
    refunded: '#ef4444',
    cardShadow: '0 4px 24px rgba(0,0,0,0.07)',
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/orders`);
      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      setError('Could not load payments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const summarizeItems = (items) => {
    if (!items || !Array.isArray(items) || items.length === 0) return '-';
    return items.map(item => `${item.productName || item.product_name || 'Item'} x${item.quantity || 1}`).join(', ');
  };

  // Filtered payments
  const filteredOrders = orders.filter(order => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchText) ||
      String(order.id).includes(searchText) ||
      order.status.toLowerCase().includes(searchText);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: '2rem 0' }}>
      {/* Header Card */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto 2.5rem auto',
        background: '#fff',
        borderRadius: '1.5rem',
        boxShadow: '0 4px 24px rgba(0,0,0,0.09)',
        padding: '2.5rem 2.5rem 2.5rem 2.5rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.25rem', color: '#ef4444' }}>
          <span style={{ background: '#ef4444', borderRadius: '0.75rem', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShoppingCart style={{ color: '#fff', width: '1.5rem', height: '1.5rem' }} />
          </span>
          <span style={{ color: '#222', fontWeight: 700 }}>Online Grocery</span>
        </div>
        <h2 style={{ fontWeight: 800, fontSize: '2.5rem', color: '#1f2937', flex: 1, textAlign: 'center', margin: 0 }}>Payments</h2>
        <button
          style={{
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.75rem 2.5rem',
            fontWeight: 700,
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onClick={() => {
            sessionStorage.removeItem('isAdminAuthenticated');
            window.location.href = '/?route=login';
          }}
        >
          Logout
        </button>
      </div>
      {/* Main Content Card */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        background: COLORS.primary,
        borderRadius: '1.5rem',
        boxShadow: COLORS.cardShadow,
        padding: '2.5rem',
        border: `1px solid ${COLORS.border}`,
      }}>
        {/* Back Arrow */}
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            marginLeft: '0.25rem',
            display: 'flex',
            alignItems: 'center',
          }}
          title="Back to Dashboard"
        >
          <ArrowLeft size={32} />
        </button>
        {/* Controls: search, status filter, refresh */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 2, padding: '0.7rem 1rem', border: '1px solid #ddd', borderRadius: 8, fontSize: 16, minWidth: 180 }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '0.7rem 1rem', border: '1px solid #ddd', borderRadius: 8, fontSize: 16 }}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Refunded">Refunded</option>
          </select>
          <button
            onClick={fetchOrders}
            style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            Refresh
          </button>
        </div>
        {/* Payments Table */}
        <div style={{ overflowX: 'auto', marginTop: 24 }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: COLORS.text1, padding: '2rem' }}>Loading payments...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: COLORS.refunded, padding: '2rem' }}>{error}</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: COLORS.primary, borderRadius: '1rem', boxShadow: COLORS.cardShadow }}>
              <thead style={{ background: COLORS.secondary }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Order ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>User</th>
                  <th style={{ padding: '1rem', textAlign: 'right', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Amount</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Method</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Date</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '1rem', borderBottom: `2px solid ${COLORS.border}` }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr><td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: COLORS.text1 }}>No payments found.</td></tr>
                ) : filteredOrders.map((order, idx) => (
                  <tr key={order.id} style={{ background: idx % 2 === 0 ? COLORS.primary : COLORS.secondary }}>
                    <td style={{ padding: '1rem', color: COLORS.text1, fontWeight: 600 }}>{order.id}</td>
                    <td style={{ padding: '1rem', color: COLORS.text }}>{order.customerName}</td>
                    <td style={{ padding: '1rem', color: COLORS.text, textAlign: 'right', fontWeight: 700 }}>
                      <span style={{ fontWeight: 'bold', fontSize: '1.1em', marginRight: 2 }}>₱</span>{order.totalAmount?.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem', color: COLORS.text1 }}>{order.paymentMethod}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        background: order.status === 'Paid' ? '#dcfce7' : order.status === 'Pending' ? '#fef3c7' : '#fee2e2',
                        color: order.status === 'Paid' ? COLORS.paid : order.status === 'Pending' ? COLORS.pending : COLORS.refunded,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.5rem',
                        fontSize: '0.95rem',
                        fontWeight: 'bold',
                      }}>{order.status}</span>
                    </td>
                    <td style={{ padding: '1rem', color: COLORS.text1, textAlign: 'center' }}>{order.orderDate ? new Date(order.orderDate).toLocaleString() : '-'}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        style={{
                          background: COLORS.secondary,
                          color: COLORS.text,
                          border: `1px solid ${COLORS.border}`,
                          borderRadius: '0.5rem',
                          padding: '0.4rem 1rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          marginRight: 8,
                          transition: 'background 0.2s',
                        }}
                        onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                      >
                        View
                      </button>
                      <button style={{
                        background: COLORS.paid,
                        color: COLORS.primary,
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.4rem 1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginRight: 8,
                        transition: 'background 0.2s',
                      }}>Update</button>
                      <button style={{
                        background: COLORS.refunded,
                        color: COLORS.primary,
                        border: 'none',
                        borderRadius: '0.5rem',
                        padding: '0.4rem 1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}>Delete/Refund</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '1.5rem',
            padding: '2.5rem 2.5rem 2rem 2.5rem',
            minWidth: 350,
            maxWidth: 420,
            boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
            position: 'relative',
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#888',
                fontSize: 22,
              }}
              title="Close"
            >
              <X size={24} />
            </button>
            <h2 style={{ fontWeight: 800, fontSize: '2rem', marginBottom: 18, color: COLORS.text }}>Order Details</h2>
            <div style={{ fontSize: '1.13rem', color: COLORS.text }}>
              <div style={{ marginBottom: 8 }}><b>Order ID:</b> {selectedOrder.id}</div>
              <div style={{ marginBottom: 8 }}><b>User:</b> {selectedOrder.customerName}</div>
              <div style={{ marginBottom: 8 }}><b>Address:</b> {selectedOrder.address}</div>
              <div style={{ marginBottom: 8 }}><b>Phone:</b> {selectedOrder.phone}</div>
              <div style={{ marginBottom: 8 }}><b>Items:</b> {summarizeItems(selectedOrder.items)}</div>
              <div style={{ marginBottom: 8 }}><b>Amount:</b> <span style={{ fontWeight: 'bold' }}>₱{selectedOrder.totalAmount?.toLocaleString()}</span></div>
              <div style={{ marginBottom: 8 }}><b>Status:</b> {selectedOrder.status}</div>
              <div style={{ marginBottom: 8 }}><b>Date:</b> {selectedOrder.orderDate ? new Date(selectedOrder.orderDate).toLocaleString() : '-'}</div>
              <div style={{ marginBottom: 8 }}><b>Payment Method:</b> {selectedOrder.paymentMethod}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminViewPayments;
