import React, { useState } from 'react';
import axios from 'axios';

const AdminAddDeliveryAccount = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/delivery-accounts', form)
      .then(() => setMessage('Delivery account created successfully!'))
      .catch(() => setMessage('Error creating account.'));
  };

  return (
    <div>
      <h3>Create Delivery Account</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminAddDeliveryAccount;
