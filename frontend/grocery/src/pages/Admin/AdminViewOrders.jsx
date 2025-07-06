import React, { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../../config/api';

const AdminViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
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
    fetchOrders();
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '32px auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #ececec', padding: 32 }}>
      <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Pending Orders</h2>
      {loading ? <div>Loading orders...</div> : error ? <div style={{ color: 'red' }}>{error}</div> : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Customer</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Address</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Phone</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Amount</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Payment</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Status</th>
              <th style={{ padding: 12, borderBottom: '1px solid #eee' }}>Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: 24 }}>No orders found.</td></tr>
            ) : orders.map(order => (
              <tr key={order.id}>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f1f1' }}>{order.customerName}</td>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f1f1' }}>{order.address}</td>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f1f1' }}>{order.phone}</td>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f1f1', color: '#059669', fontWeight: 600 }}>₱{order.totalAmount?.toLocaleString()}</td>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f1f1' }}>{order.paymentMethod}</td>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f1f1' }}>
                  <span style={{
                    background: order.status === 'Paid' ? '#d1fae5' : '#fef3c7',
                    color: order.status === 'Paid' ? '#059669' : '#b45309',
                    padding: '4px 12px',
                    borderRadius: 6,
                    fontWeight: 600,
                  }}>{order.status}</span>
                </td>
                <td style={{ padding: 10, borderBottom: '1px solid #f1f1f1' }}>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {order.items?.map(item => (
                      <li key={item.productId} style={{ fontSize: 14 }}>
                        {item.productName} x {item.quantity} (₱{item.price})
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminViewOrders;
