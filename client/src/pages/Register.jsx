import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-300 via-blue-200 to-green-200">
      <motion.form
        onSubmit={handleRegister}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
        className="backdrop-blur-md bg-white/30 shadow-2xl rounded-xl p-8 w-80 border border-white/20"
      >
        <div className="flex justify-center mb-4 text-white">
          <FaUserPlus size={40} className="drop-shadow-lg" />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6 text-white drop-shadow-lg">
          Create Account
        </h2>

        <input
          name="username"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-md border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-md border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-md border border-white/30 bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white transition"
          onChange={handleChange}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-md border border-white/30 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-white transition"
        >
          <option value="user" className="text-black">User</option>
          <option value="admin" className="text-black">Admin</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 transition"
        >
          Register
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Register;
