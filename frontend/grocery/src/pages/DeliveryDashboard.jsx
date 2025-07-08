import React, { useEffect, useState } from 'react';

const DeliveryDashboard = () => {
  const [deliveryPerson, setDeliveryPerson] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [processingId, setProcessingId] = useState(null);

  const fetchDeliveries = async (personId) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:8080/api/orders/delivery-person/${personId}`);
      if (res.ok) {
        const data = await res.json();
        setDeliveries(data);
      } else {
        setError('Failed to load deliveries. Please try again later.');
      }
    } catch (err) {
      console.error('Error fetching deliveries:', err);
      setError('Failed to load deliveries. Please check your connection or contact support.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedDeliveryPerson = localStorage.getItem('deliveryPerson');
    if (!storedDeliveryPerson) {
      window.location.href = '/?route=delivery';
      return;
    }

    try {
      const parsedDeliveryPerson = JSON.parse(storedDeliveryPerson);
      setDeliveryPerson(parsedDeliveryPerson);
      fetchDeliveries(parsedDeliveryPerson.id);
    } catch (err) {
      console.error('Error parsing delivery person data:', err);
      localStorage.removeItem('deliveryPerson');
      window.location.href = '/?route=delivery';
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('deliveryPerson');
    window.location.href = '/?route=delivery';
  };

  const handleViewLogs = async (orderId) => {
    setShowLogs(true);
    setSelectedOrder(orderId);
    setLogs([]);
    try {
      const res = await fetch(`http://localhost:8080/api/delivery-log/${orderId}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      } else {
        console.error('Failed to fetch logs');
      }
    } catch (err) {
      console.error('Error fetching logs:', err);
    }
  };

  const handleAccept = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${orderId}/accept-delivery`, {
        method: 'POST'
      });
      if (res.ok) {
        setDeliveries(prev => prev.map(order => order.id === orderId ? { ...order, status: 'Out for Delivery' } : order));
      } else {
        console.error('Failed to accept delivery.');
      }
    } catch (err) {
      console.error('Error accepting delivery:', err);
    }
  };

  const handleReject = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${orderId}/reject-delivery`, {
        method: 'POST'
      });
      if (res.ok) {
        setDeliveries(prev => prev.map(order => order.id === orderId ? { ...order, status: 'Ready to Deliver' } : order));
      } else {
        console.error('Failed to reject delivery.');
      }
    } catch (err) {
      console.error('Error rejecting delivery:', err);
    }
  };

  const handleComplete = async (orderId) => {
    if (!window.confirm('Are you sure you want to mark this delivery as completed?')) return;
    setProcessingId(orderId);
    try {
      const res = await fetch(`http://localhost:8080/api/orders/${orderId}/complete-delivery`, {
        method: 'PATCH'
      });
      if (res.ok) {
        setNotification({ message: 'Delivery marked as completed!', type: 'success' });
        // Wait a moment to ensure backend update, then fetch
        setTimeout(() => {
          if (deliveryPerson) fetchDeliveries(deliveryPerson.id);
        }, 300);
      } else {
        setNotification({ message: 'Failed to mark delivery as completed.', type: 'error' });
      }
    } catch (err) {
      setNotification({ message: 'Error marking delivery as completed.', type: 'error' });
    } finally {
      setProcessingId(null);
      setTimeout(() => setNotification({ message: '', type: '' }), 2500);
    }
  };

  // --- Summary stats ---
  const totalDeliveries = deliveries.length;
  const completedDeliveries = deliveries.filter(d => d.status && d.status.toLowerCase().includes('complete')).length;
  const pendingDeliveries = deliveries.filter(d => d.status && d.status.toLowerCase().includes('ready')).length;
  const completedDeliveriesList = deliveries.filter(d => d.status && d.status.toLowerCase() === 'completed');
  const assignedDeliveriesList = deliveries.filter(d => d.status && d.status.toLowerCase() !== 'completed');

  if (!deliveryPerson) {
    return (
      <div style={{ minHeight: '100vh', background: '#f6f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#888' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb', padding: '2rem 0' }}>
      {notification.message && (
        <div style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: notification.type === 'success' ? '#4ade80' : '#ef4444',
          color: '#fff',
          padding: '1rem 2rem',
          borderRadius: 10,
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.13)',
          fontWeight: 600,
          fontSize: 16,
          minWidth: 260,
          textAlign: 'center',
        }}>
          {notification.message}
        </div>
      )}
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '2.5rem', border: '1px solid #ececec' }}>
        {/* Profile and Welcome */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, color: '#2563eb', border: '2px solid #ececec' }}>
              {deliveryPerson.name ? deliveryPerson.name[0].toUpperCase() : '?'}
            </div>
            <div>
              <div style={{ color: '#888', fontWeight: 500, fontSize: 18 }}>Welcome back,</div>
              <div style={{ fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 4 }}>{deliveryPerson.name}</div>
              <div style={{ color: '#444', fontSize: 16 }}>{deliveryPerson.email} | {deliveryPerson.contactNumber}</div>
              <div style={{ color: deliveryPerson.status === 'Active' ? '#22c55e' : '#ef4444', fontWeight: 600, fontSize: 15, marginTop: 4 }}>{deliveryPerson.status}</div>
            </div>
          </div>
          <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        </div>
        {/* Summary Card */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 32, justifyContent: 'center' }}>
          <div style={{ flex: 1, background: '#f6f7fb', borderRadius: 12, padding: '1.2rem 1rem', textAlign: 'center', border: '1px solid #ececec' }}>
            <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>Total Deliveries</div>
            <div style={{ fontWeight: 700, fontSize: 28, color: '#2563eb', marginTop: 2 }}>{totalDeliveries}</div>
          </div>
          <div style={{ flex: 1, background: '#f6f7fb', borderRadius: 12, padding: '1.2rem 1rem', textAlign: 'center', border: '1px solid #ececec' }}>
            <div style={{ color: '#888', fontWeight: 500, fontSize: 15 }}>Completed</div>
            <div style={{ fontWeight: 700, fontSize: 28, color: '#22c55e', marginTop: 2 }}>{completedDeliveries}</div>
          </div>
        </div>
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#222' }}>Assigned Deliveries</h2>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Loading deliveries...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '2rem', fontWeight: 500 }}>{error}</div>
        ) : assignedDeliveriesList.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>No assigned deliveries.</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {assignedDeliveriesList.map(order => (
              <div key={order.id} style={{ background: '#f8fafc', borderRadius: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', border: '1px solid #ececec', padding: '1.5rem 1.2rem', minWidth: 320, maxWidth: 370, flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#222' }}>Order #{order.id}</div>
                  <span style={{ padding: '0.3rem 0.9rem', borderRadius: 8, fontWeight: 600, fontSize: 14, background: order.status === 'Completed' ? '#dcfce7' : order.status === 'Cancelled' ? '#fee2e2' : '#dbeafe', color: order.status === 'Completed' ? '#22c55e' : order.status === 'Cancelled' ? '#ef4444' : '#2563eb' }}>{order.status}</span>
                </div>
                <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}><b>Customer:</b> {order.customerName}</div>
                <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}><b>Order Date:</b> {order.orderDate ? new Date(order.orderDate).toLocaleString() : '-'}</div>
                <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}><b>Address:</b> {order.address}</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  {order.status === 'Ready to Deliver' ? (
                    <>
                      <button onClick={() => handleAccept(order.id)} style={{ background: '#22c55e', color: 'white', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 500, cursor: 'pointer' }}>Accept</button>
                      <button onClick={() => handleReject(order.id)} style={{ background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '6px 16px', fontWeight: 500, cursor: 'pointer' }}>Reject</button>
                    </>
                  ) : (['Out for Delivery', 'On Route'].includes(order.status) ? (
                    <>
                      <button onClick={() => handleComplete(order.id)}
                        style={{ background: '#22c55e', color: 'white', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 500, cursor: processingId === order.id ? 'not-allowed' : 'pointer', opacity: processingId === order.id ? 0.7 : 1 }}
                        disabled={processingId === order.id}
                      >{processingId === order.id ? 'Processing...' : 'Mark as Completed'}</button>
                      <button onClick={() => handleViewLogs(order.id)} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 500, cursor: 'pointer' }}>View Log</button>
                    </>
                  ) : (
                    <button onClick={() => handleViewLogs(order.id)} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 500, cursor: 'pointer' }}>View Log</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Completed Deliveries Section */}
        <h2 style={{ fontWeight: 700, fontSize: 22, margin: '32px 0 18px 0', color: '#222' }}>Completed Deliveries</h2>
        {completedDeliveriesList.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>No completed deliveries yet.</div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {completedDeliveriesList.map(order => (
              <div key={order.id} style={{ background: '#f8fafc', borderRadius: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.04)', border: '1px solid #ececec', padding: '1.5rem 1.2rem', minWidth: 320, maxWidth: 370, flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 10, opacity: 0.85 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#222' }}>Order #{order.id}</div>
                  <span style={{ padding: '0.3rem 0.9rem', borderRadius: 8, fontWeight: 600, fontSize: 14, background: '#dcfce7', color: '#22c55e' }}>Completed</span>
                </div>
                <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}><b>Customer:</b> {order.customerName}</div>
                <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}><b>Order Date:</b> {order.orderDate ? new Date(order.orderDate).toLocaleString() : '-'}</div>
                <div style={{ color: '#444', fontSize: 15, marginBottom: 2 }}><b>Address:</b> {order.address}</div>
                <div style={{ marginTop: 8, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button onClick={() => handleViewLogs(order.id)} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '6px 18px', fontWeight: 500, cursor: 'pointer' }}>View Log</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {showLogs && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowLogs(false)}>
            <div style={{ background: '#fff', borderRadius: 12, padding: '2.2rem', minWidth: 340, maxWidth: 420, boxShadow: '0 2px 16px rgba(0,0,0,0.13)', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 18, color: '#222', textAlign: 'center' }}>Delivery Log</h3>
              {logs.length === 0 ? (
                <div style={{ color: '#888', textAlign: 'center' }}>No logs for this order.</div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {logs.map(log => (
                    <li key={log.id} style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #ececec' }}>
                      <div style={{ fontWeight: 600, color: '#2563eb', marginBottom: 2 }}>{log.status}</div>
                      <div style={{ color: '#444', fontSize: 15 }}>{log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}</div>
                      {log.remarks && <div style={{ color: '#888', fontSize: 14, marginTop: 2 }}>Remarks: {log.remarks}</div>}
                    </li>
                  ))}
                </ul>
              )}
              <button onClick={() => setShowLogs(false)} style={{ marginTop: 18, background: '#ef4444', color: 'white', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 500, cursor: 'pointer', width: '100%' }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDashboard;
