import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { getApiBaseUrl } from '../../config/api';

const COLORS = {
  primary: '#fff',
  secondary: '#f8fafc',
  border: '#e2e8f0',
  text: '#1f2937',
  text1: '#6b7280',
  paid: '#10b981',
  pending: '#f59e42',
  cancelled: '#ef4444',
  cardShadow: '0 4px 24px rgba(0,0,0,0.07)',
};

const AdminViewOrders = ({ onBack }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assigningOrder, setAssigningOrder] = useState(null);
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(null);
  const [deliveryPersonnel, setDeliveryPersonnel] = useState([]);
  const [assigning, setAssigning] = useState(false);
  const [typeFilter, setTypeFilter] = useState('All');
  const [ordersTab, setOrdersTab] = useState('active'); // 'active', 'completed', 'cancelled'

  // Function to get delivery personnel name by ID
  const getDeliveryPersonName = (deliveryPersonId) => {
    if (!deliveryPersonId) return '-';
    const person = deliveryPersonnel.find(p => p.id === deliveryPersonId);
    return person ? person.name : 'Unknown';
  };

    const fetchOrders = async () => {
      setLoading(true);
    setError("");
      try {
        const res = await fetch(`${getApiBaseUrl()}/api/orders`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError('Could not load orders.');
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Fetch delivery personnel
  useEffect(() => {
    fetch(`${getApiBaseUrl()}/api/delivery`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setDeliveryPersonnel(data))
      .catch(() => setDeliveryPersonnel([]));
  }, []);

  const refreshOrders = async () => {
    await fetchOrders();
  };

  // Helper to summarize items
  const summarizeItems = (items) => {
    if (!items || !Array.isArray(items) || items.length === 0) return '-';
    return items.map(item => `${item.productName || item.product_name || 'Item'} x${item.quantity || 1}`).join(', ');
  };

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const searchText = search.toLowerCase();
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchText) ||
      (order.items && order.items.some(item => (item.productName || item.product_name || '').toLowerCase().includes(searchText))) ||
      order.status.toLowerCase().includes(searchText);
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    const matchesType = typeFilter === 'All' || (typeFilter === 'Home Delivery' && order.paymentMethod !== 'pickup') || (typeFilter === 'Personal Pickup' && order.paymentMethod === 'pickup');
    return matchesSearch && matchesStatus && matchesType;
  });

  // Sort orders: Pending first, then by orderDate ascending (first come, first serve)
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (a.status === 'Pending' && b.status !== 'Pending') return -1;
    if (a.status !== 'Pending' && b.status === 'Pending') return 1;
    // Both are same status group, sort by orderDate ascending
    const dateA = new Date(a.orderDate || 0).getTime();
    const dateB = new Date(b.orderDate || 0).getTime();
    return dateA - dateB;
  });

  const homeDeliveryOrders = sortedOrders.filter(o => o.paymentMethod !== 'pickup');
  const pickupOrders = sortedOrders.filter(o => o.paymentMethod === 'pickup');

  // Update sortedOrders to filter by tab
  const activeStatuses = ['Pending', 'Processing', 'Ready to Deliver', 'Ready to Pick Up'];
  const completedStatuses = ['Completed'];
  const cancelledStatuses = ['Cancelled'];
  const tabFilteredOrders = sortedOrders.filter(order =>
    ordersTab === 'active' ? activeStatuses.includes(order.status) :
    ordersTab === 'completed' ? completedStatuses.includes(order.status) :
    cancelledStatuses.includes(order.status)
  );

  return (
    <div style={{ minHeight: '100vh', background: COLORS.secondary, padding: '2rem 0' }}>
      {/* Header Card - OUTSIDE main content card */}
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
        <h2 style={{ fontWeight: 800, fontSize: '2.5rem', color: '#1f2937', flex: 1, textAlign: 'center', margin: 0 }}>Orders</h2>
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
        {/* Tabs at the top right of the content card */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => setOrdersTab('active')}
              style={{
                background: ordersTab === 'active' ? '#2563eb' : '#e5e7eb',
                color: ordersTab === 'active' ? '#fff' : '#222',
                border: 'none',
                borderRadius: 8,
                padding: '0.7rem 1.5rem',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.18s',
                boxShadow: ordersTab === 'active' ? '0 2px 8px rgba(37,99,235,0.08)' : 'none',
              }}
            >
              Active Orders
            </button>
            <button
              onClick={() => setOrdersTab('completed')}
              style={{
                background: ordersTab === 'completed' ? '#2563eb' : '#e5e7eb',
                color: ordersTab === 'completed' ? '#fff' : '#222',
                border: 'none',
                borderRadius: 8,
                padding: '0.7rem 1.5rem',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.18s',
                boxShadow: ordersTab === 'completed' ? '0 2px 8px rgba(37,99,235,0.08)' : 'none',
              }}
            >
              Completed Orders
            </button>
            <button
              onClick={() => setOrdersTab('cancelled')}
              style={{
                background: ordersTab === 'cancelled' ? '#ef4444' : '#e5e7eb',
                color: ordersTab === 'cancelled' ? '#fff' : '#222',
                border: 'none',
                borderRadius: 8,
                padding: '0.7rem 1.5rem',
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.18s',
                boxShadow: ordersTab === 'cancelled' ? '0 2px 8px rgba(239,68,68,0.08)' : 'none',
              }}
            >
              Cancelled Orders
            </button>
          </div>
        </div>
        {/* Controls: search, status/type filter, refresh */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
          <input
            type="text"
            placeholder="Search orders..."
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
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Ready to Deliver">Ready to Deliver</option>
            <option value="Ready to Pick Up">Ready to Pick Up</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            style={{ padding: '0.7rem 1rem', border: '1px solid #ddd', borderRadius: 8, fontSize: 16 }}
          >
            <option value="All">All Types</option>
            <option value="Home Delivery">Home Delivery</option>
            <option value="Personal Pickup">Personal Pickup</option>
          </select>
          <button
            onClick={fetchOrders}
            style={{ background: '#111', color: '#fff', border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            Refresh
          </button>
        </div>
        {/* Orders Table */}
        <div style={{ overflowX: 'auto', marginTop: 24 }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: COLORS.text1, padding: '2rem' }}>Loading orders...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: COLORS.cancelled, padding: '2rem' }}>{error}</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: COLORS.primary, borderRadius: '1rem', boxShadow: COLORS.cardShadow, overflow: 'hidden' }}>
              <thead style={{ background: COLORS.secondary, position: 'sticky', top: 0, zIndex: 1 }}>
                <tr>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 40 }}>Order ID</th>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 70 }}>User</th>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'left', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 90 }}>Items</th>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'right', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 60 }}>Amt</th>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 70 }}>Status</th>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 90 }}>Date</th>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 70 }}>Type</th>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 90 }}>Delivery Personnel</th>
                  <th style={{ padding: '0.6rem 0.3rem', textAlign: 'center', color: COLORS.text, fontWeight: 700, fontSize: '0.97rem', borderBottom: `2px solid ${COLORS.border}`, background: COLORS.secondary, minWidth: 110 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tabFilteredOrders.length === 0 ? (
                  <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem', color: COLORS.text1 }}>No orders found.</td></tr>
                ) : tabFilteredOrders.map((order, idx) => (
                  <tr
                    key={order.id}
                    style={{ background: idx % 2 === 0 ? COLORS.primary : COLORS.secondary, transition: 'background 0.2s', height: 64, verticalAlign: 'middle' }}
                  >
                    <td style={{ padding: '0.5rem 0.3rem', color: COLORS.text1, fontWeight: 600, verticalAlign: 'middle', whiteSpace: 'nowrap', minWidth: 40, maxWidth: 60, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.97rem' }}>{order.id}</td>
                    <td style={{ padding: '0.5rem 0.3rem', color: COLORS.text, verticalAlign: 'middle', whiteSpace: 'nowrap', minWidth: 70, maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500, fontSize: '0.97rem' }}>{order.customerName}</td>
                    <td style={{ padding: '0.5rem 0.3rem', color: COLORS.text1, verticalAlign: 'middle', whiteSpace: 'nowrap', minWidth: 90, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.97rem' }} title={summarizeItems(order.items)}>{summarizeItems(order.items)}</td>
                    <td style={{ padding: '0.5rem 0.3rem', color: COLORS.text, textAlign: 'right', fontWeight: 700, verticalAlign: 'middle', fontSize: '0.97rem', whiteSpace: 'nowrap', minWidth: 60, maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ fontWeight: 'bold', fontSize: '1em', marginRight: 2, verticalAlign: 'middle' }}>₱</span><span style={{ fontWeight: 'bold', fontSize: '1em', verticalAlign: 'middle' }}>{order.totalAmount?.toLocaleString()}</span></td>
                    <td style={{ padding: '0.5rem 0.3rem', textAlign: 'center', verticalAlign: 'middle', fontSize: '0.97rem', whiteSpace: 'nowrap', minWidth: 70, maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ background: order.status === 'Paid' ? '#dcfce7' : order.status === 'Pending' ? '#fef3c7' : '#fee2e2', color: order.status === 'Paid' ? COLORS.paid : order.status === 'Pending' ? COLORS.pending : COLORS.cancelled, padding: '0.13rem 0.5rem', borderRadius: '0.5rem', fontWeight: 'bold', display: 'inline-block', minWidth: 50, textAlign: 'center' }}>{order.status}</span></td>
                    <td style={{ padding: '0.5rem 0.3rem', color: COLORS.text1, textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap', minWidth: 90, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.97rem' }}>{order.orderDate ? new Date(order.orderDate).toLocaleString() : '-'}</td>
                    <td style={{ padding: '0.5rem 0.3rem', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap', minWidth: 70, maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <span style={{ background: order.paymentMethod === 'pickup' ? '#e0e7ff' : '#f0fdf4', color: order.paymentMethod === 'pickup' ? '#3730a3' : '#166534', borderRadius: '0.5rem', padding: '0.13rem 0.5rem', fontWeight: 600, fontSize: '0.97rem', display: 'inline-block', minWidth: 70, textAlign: 'center' }}>{order.paymentMethod === 'pickup' ? 'Pickup' : 'Delivery'}</span>
                    </td>
                    <td style={{ padding: '0.5rem 0.3rem', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap', minWidth: 90, maxWidth: 110, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.97rem', color: COLORS.text1 }}>
                      {getDeliveryPersonName(order.deliveryPersonId)}
                    </td>
                    <td style={{ padding: '0.5rem 0.3rem', textAlign: 'center', verticalAlign: 'middle', whiteSpace: 'nowrap', minWidth: 110, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'stretch', background: '#f3f4f6', borderRadius: '0.7rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: '0.5rem 0.5rem', minWidth: 110 }}>
                        {order.paymentMethod === 'pickup' ? (
                          <>
                            <button
                              style={{
                                background: order.status === 'Completed' ? '#f59e42' : (order.status !== 'Pending' ? '#10b981' : '#d1d5db'),
                                color: '#fff',
                                border: 'none',
                        borderRadius: '0.5rem',
                                padding: '0.5rem 0.7rem',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                cursor: order.status === 'Pending' || order.status === 'Completed' ? 'not-allowed' : 'pointer',
                                transition: 'background 0.18s, opacity 0.18s',
                                boxShadow: '0 1px 4px rgba(16,185,129,0.08)',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                position: 'relative',
                                opacity: 1,
                              }}
                              disabled={order.status === 'Pending' || order.status === 'Completed'}
                              onClick={async e => {
                                if (order.status === 'Pending' || order.status === 'Completed') return;
                                e.stopPropagation();
                                // Mark as picked up (Completed)
                                try {
                                  const apiBaseUrl = getApiBaseUrl();
                                  const response = await fetch(`${apiBaseUrl}/api/orders/${order.id}/status`, {
                                    method: 'PATCH',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify('Completed'),
                                  });
                                  if (!response.ok) throw new Error('Failed to update status');
                                  setOrders(orders => orders.map(o => o.id === order.id ? { ...o, status: 'Completed' } : o));
                                  await fetchOrders();
                                } catch (err) {
                                  alert('Failed to mark as picked up.');
                                }
                              }}
                              onMouseEnter={e => { if (order.status !== 'Pending' && order.status !== 'Completed') e.currentTarget.style.background = '#059669'; }}
                              onMouseLeave={e => { if (order.status !== 'Pending' && order.status !== 'Completed') e.currentTarget.style.background = '#10b981'; }}
                            >
                              {order.status === 'Completed' ? 'Order Picked' : 'Mark as Picked Up'}
                            </button>
                            <div style={{ height: 4 }} />
                          </>
                        ) : (
                          <>
                        <button
                          style={{
                                background: order.status === 'Completed' ? '#f59e42' : (order.status !== 'Pending' ? '#2563eb' : '#d1d5db'),
                                color: '#fff',
                                border: 'none',
                            borderRadius: '0.5rem',
                                padding: '0.5rem 0.7rem',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                cursor: order.status === 'Pending' || order.status === 'Completed' ? 'not-allowed' : 'pointer',
                                transition: 'background 0.18s, opacity 0.18s',
                                boxShadow: '0 1px 4px rgba(37,99,235,0.08)',
                                width: '100%',
                                position: 'relative',
                                opacity: 1,
                              }}
                              disabled={order.status === 'Pending' || order.status === 'Completed'}
                              onClick={e => { if (order.status === 'Pending' || order.status === 'Completed') return; e.stopPropagation(); setAssigningOrder(order); setSelectedDeliveryPerson(order.deliveryPerson || null); setShowAssignModal(true); }}
                              onMouseEnter={e => { if (order.status !== 'Pending' && order.status !== 'Completed') e.currentTarget.style.background = '#1d4ed8'; }}
                              onMouseLeave={e => { if (order.status !== 'Pending' && order.status !== 'Completed') e.currentTarget.style.background = '#2563eb'; }}
                            >
                              {order.status === 'Completed' ? 'Order Delivered' : 'Proceed to Delivery'}
                            </button>
                            <div style={{ height: 4 }} />
                          </>
                        )}
                        <button
                          style={{ background: '#374151', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.5rem 0.7rem', fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer', transition: 'background 0.18s', boxShadow: '0 1px 4px rgba(37,99,235,0.08)', width: '100%', marginTop: 2, letterSpacing: '0.01em' }}
                          onClick={e => { e.stopPropagation(); setSelectedOrder(order); setShowModal(true); }}
                          onMouseEnter={e => e.currentTarget.style.background = '#111827'}
                          onMouseLeave={e => e.currentTarget.style.background = '#374151'}
                        >
                          Manage
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div
            style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{ background: '#fff', borderRadius: '1.1rem', padding: '2rem 2rem 1.5rem 2rem', minWidth: 340, maxWidth: 440, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', position: 'relative', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 22 }} title="Close">×</button>
              <h3 style={{ fontWeight: 700, fontSize: '1.35rem', marginBottom: 10, color: '#1f2937', textAlign: 'center', letterSpacing: '-0.5px' }}>Order Details</h3>
              <div style={{ fontSize: '1.05rem', color: '#1f2937', marginBottom: 10, width: '100%' }}>
                <div style={{ marginBottom: 4 }}><b>Order ID:</b> {selectedOrder.id}</div>
                <div style={{ marginBottom: 4 }}><b>Customer:</b> {selectedOrder.customerName}</div>
                <div style={{ marginBottom: 4 }}><b>Amount:</b> ₱{selectedOrder.totalAmount?.toLocaleString()}</div>
                <div style={{ marginBottom: 4 }}><b>Status:</b> {selectedOrder.status}</div>
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
              {/* Status update buttons inside the modal */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center', margin: '10px 0 0 0', width: '100%' }}>
                {(
                  selectedOrder.paymentMethod === 'pickup'
                    ? ["Processing", "Ready to Pick Up", "Completed", "Cancelled"]
                    : ["Processing", "Ready to Deliver", "Completed", "Cancelled"]
                ).map(status => (
                  <button
                    key={status}
                    onClick={async () => {
                      try {
                        const apiBaseUrl = getApiBaseUrl();
                        const response = await fetch(`${apiBaseUrl}/api/orders/${selectedOrder.id}/status`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(status),
                        });
                        if (!response.ok) throw new Error('Failed to update status');
                        setOrders(orders =>
                          orders.map(o => o.id === selectedOrder.id ? { ...o, status } : o)
                        );
                        setSelectedOrder(order => ({ ...order, status }));
                      } catch (err) {
                        alert('Failed to update order status.');
                      }
                    }}
                    style={{
                      padding: '0.5rem 0.9rem',
                      borderRadius: '0.5rem',
                      border: status === selectedOrder.status ? '2px solid #2563eb' : '1px solid #e5e7eb',
                      background: status === selectedOrder.status ? '#2563eb' : '#f3f4f6',
                      color: status === selectedOrder.status ? '#fff' : '#222',
                      fontWeight: 600,
                      fontSize: '0.97rem',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'all 0.15s',
                      minWidth: 90,
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {/* Delete button at the bottom of the modal */}
              {selectedOrder.status !== 'Cancelled' && (
                <button
                  style={{
                    marginTop: 24,
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0.5rem',
                    padding: '0.6rem 1.2rem',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    width: '100%',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                  }}
                  onClick={async () => {
                    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;
                    try {
                      const apiBaseUrl = getApiBaseUrl();
                      const response = await fetch(`${apiBaseUrl}/api/orders/${selectedOrder.id}`, {
                        method: 'DELETE',
                      });
                      if (!response.ok) throw new Error('Failed to delete order');
                      setOrders(orders => orders.filter(o => o.id !== selectedOrder.id));
                      setShowModal(false);
                    } catch (err) {
                      alert('Failed to delete order.');
                    }
                  }}
                >
                  Delete Order
                </button>
              )}
            </div>
          </div>
        )}
        {/* Assign Delivery Modal */}
        {showAssignModal && assigningOrder && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowAssignModal(false)}>
            <div style={{ background: '#fff', borderRadius: '1.1rem', padding: '2rem 2rem 1.5rem 2rem', minWidth: 340, maxWidth: 440, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', position: 'relative', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowAssignModal(false)} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: 22 }} title="Close">×</button>
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: 10, color: '#1f2937', textAlign: 'center', letterSpacing: '-0.5px' }}>Assign Delivery</h3>
              <div style={{ width: '100%', marginBottom: 16 }}>
                <label style={{ fontWeight: 600, color: '#222', marginBottom: 4, display: 'block' }}>Delivery Personnel:</label>
                <select
                  value={selectedDeliveryPerson ? selectedDeliveryPerson.id : ''}
                  onChange={e => {
                    const person = deliveryPersonnel.find(p => String(p.id) === e.target.value);
                    setSelectedDeliveryPerson(person || null);
                  }}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: 10 }}
                >
                  <option value="">Select personnel...</option>
                  {deliveryPersonnel.map(person => (
                    <option key={person.id} value={person.id}>{person.name}</option>
                  ))}
                </select>
              </div>
              <button
                disabled={!selectedDeliveryPerson || assigning}
                style={{
                  background: (!selectedDeliveryPerson) ? '#e5e7eb' : '#2563eb',
                  color: (!selectedDeliveryPerson) ? '#888' : '#fff',
                  border: 'none',
                  borderRadius: '0.5rem',
                  padding: '0.6rem 1.2rem',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: (!selectedDeliveryPerson) ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                  width: '100%',
                  marginTop: 8,
                }}
                onClick={async () => {
                  if (!selectedDeliveryPerson) return;
                  setAssigning(true);
                  try {
                    const apiBaseUrl = getApiBaseUrl();
                    const response = await fetch(`${apiBaseUrl}/api/orders/${assigningOrder.id}/assign-delivery`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ deliveryPersonId: selectedDeliveryPerson.id }),
                    });
                    if (!response.ok) throw new Error('Failed to assign delivery');
                    setShowAssignModal(false);
                    setAssigningOrder(null);
                    setSelectedDeliveryPerson(null);
                    await fetchOrders();
                  } catch (err) {
                    alert('Failed to assign delivery.');
                  } finally {
                    setAssigning(false);
                  }
                }}
              >
                {assigning ? 'Assigning...' : 'Assign'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminViewOrders;
