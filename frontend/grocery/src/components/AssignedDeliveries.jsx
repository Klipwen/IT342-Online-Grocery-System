// src/components/AssignedDeliveries.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const AssignedDeliveries = ({ deliveryPersonId }) => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios.get(`/api/delivery-orders?personId=${deliveryPersonId}`)
      .then(res => setDeliveries(res.data))
      .catch(err => console.error(err));
  }, [deliveryPersonId]);

  return (
    <div>
      <h2>Assigned Deliveries</h2>
      {deliveries.length === 0 ? (
        <p>No assigned deliveries.</p>
      ) : (
        <ul>
          {deliveries.map(order => (
            <li key={order.id}>
              {order.delivery_address} - {order.delivery_status} on {order.delivery_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignedDeliveries;
