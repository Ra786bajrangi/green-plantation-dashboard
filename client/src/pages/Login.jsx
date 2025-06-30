import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSignInAlt } from 'react-icons/fa';

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
        localStorage.setItem('role', res.data.role);
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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-300 via-blue-200 to-purple-300">
      <motion.form
        onSubmit={handleLogin}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
        className="backdrop-blur-md bg-white/30 shadow-2xl rounded-xl p-8 w-80 border border-white/20"
      >
        <div className="flex justify-center mb-4 text-white">
          <FaSignInAlt size={40} className="drop-shadow-lg" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          Welcome Back
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-md border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-md border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition"
        >
          Login
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Login;
