'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage({onRegisterSuccess} ) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert(res.data.message);
      onRegisterSuccess();
    } catch (error) {
      alert(error.response?.data?.error || 'Registration Failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
