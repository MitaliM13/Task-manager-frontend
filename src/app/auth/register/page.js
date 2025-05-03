'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RegisterPage({ onRegisterSuccess }) {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      alert(res.data.message || "Registration Success!");
      onRegisterSuccess();
      setForm({ username: '', email: '', password: '' });
    } catch (error) {
      alert(error.response?.data?.error || 'Registration Failed');
    }
  };

  return (
    <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Create your account</h2>

      <div className="space-y-4">
        <div className="text-left">
          <label className="block text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
}
