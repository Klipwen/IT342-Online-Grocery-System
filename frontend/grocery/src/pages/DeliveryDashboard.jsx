import React, { useEffect, useState } from 'react';

const DeliveryDashboard = () => {
  const [deliveryPerson, setDeliveryPerson] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get delivery person from localStorage
    const storedDeliveryPerson = localStorage.getItem('deliveryPerson');
    if (!storedDeliveryPerson) {
      window.location.href = '/?route=delivery';
      return;
    }

    try {
      const parsedDeliveryPerson = JSON.parse(storedDeliveryPerson);
      setDeliveryPerson(parsedDeliveryPerson);
      
      // Fetch deliveries for this delivery person
      const fetchDeliveries = async () => {
        setLoading(true);
        setError('');
        try {
          const res = await fetch(`http://localhost:8080/api/delivery-order/rider/${parsedDeliveryPerson.id}`);
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
      
      fetchDeliveries();
    } catch (err) {
      console.error('Error parsing delivery person data:', err);
      localStorage.removeItem('deliveryPerson');
      window.location.href = '/?route=delivery';
    }
  }, []); // Empty dependency array to run only once

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

  if (!deliveryPerson) {
    return (
      <div style={{ minHeight: '100vh', background: '#f6f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', color: '#888' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f6f7fb', padding: '2rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: '2.5rem', border: '1px solid #ececec' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <div style={{ color: '#888', fontWeight: 500, fontSize: 18 }}>Delivery Personnel</div>
            <div style={{ fontWeight: 700, fontSize: 28, color: '#222', marginBottom: 4 }}>{deliveryPerson.name}</div>
            <div style={{ color: '#444', fontSize: 16 }}>{deliveryPerson.email} | {deliveryPerson.contactNumber}</div>
            <div style={{ color: deliveryPerson.status === 'Active' ? '#22c55e' : '#ef4444', fontWeight: 600, fontSize: 15, marginTop: 4 }}>{deliveryPerson.status}</div>
          </div>
          <button onClick={handleLogout} style={{ background: '#ef4444', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer' }}>Logout</button>
        </div>
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 18, color: '#222' }}>Assigned Deliveries</h2>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>Loading deliveries...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '2rem', fontWeight: 500 }}>{error}</div>
        ) : deliveries.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', padding: '2rem' }}>No assigned deliveries.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
              <thead>
                <tr style={{ background: '#f3f4f6', color: '#222' }}>
                  <th style={{ padding: '12px 8px', borderBottom: '2px solid #ececec' }}>Order ID</th>
                  <th style={{ padding: '12px 8px', borderBottom: '2px solid #ececec' }}>Status</th>
                  <th style={{ padding: '12px 8px', borderBottom: '2px solid #ececec' }}>Pickup Time</th>
                  <th style={{ padding: '12px 8px', borderBottom: '2px solid #ececec' }}>Delivery Time</th>
                  <th style={{ padding: '12px 8px', borderBottom: '2px solid #ececec' }}>Address</th>
                  <th style={{ padding: '12px 8px', borderBottom: '2px solid #ececec' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #ececec' }}>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{order.orderId}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: order.deliveryStatus === 'Delivered' ? '#22c55e' : order.deliveryStatus === 'Failed' ? '#ef4444' : '#f59e42', fontWeight: 600 }}>{order.deliveryStatus}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{order.pickupTime ? new Date(order.pickupTime).toLocaleString() : '-'}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{order.deliveryTime ? new Date(order.deliveryTime).toLocaleString() : '-'}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>{order.deliveryAddress}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                      <button onClick={() => handleViewLogs(order.id)} style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 500, cursor: 'pointer' }}>View Log</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showLogs && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowLogs(false)}>
            <div style={{ background: '#fff', borderRadius: 10, padding: '2rem', minWidth: 340, maxWidth: 420, boxShadow: '0 2px 16px rgba(0,0,0,0.13)', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <h3 style={{ fontWeight: 700, fontSize: 20, marginBottom: 18, color: '#222' }}>Delivery Log</h3>
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