import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
    console.log("Login response:", res.data);

    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role); // ✅ FIXED HERE
      console.log("Token saved:", res.data.token);
      console.log("Role saved:", res.data.role);
      navigate('/dashboard', { replace: true });
    } else {
      alert('Login succeeded but no token returned');
    }
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    alert('Login failed');
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
