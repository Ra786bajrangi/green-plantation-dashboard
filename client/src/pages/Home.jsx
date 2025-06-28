import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, TreePalm, Globe2 } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';


const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded?.role;

        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'user') {
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Invalid token. Clearing token...');
        localStorage.removeItem('token');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-4">
          🌿 Welcome to GreenTrack
        </h1>
        <p className="text-lg md:text-xl text-green-700 mb-6 max-w-xl mx-auto">
          Track your tree plantations, contribute to a greener planet, and lead the change.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/register')}
          className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700 transition"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-green-200 text-center"
        >
          <div className="flex justify-center mb-4">
            <Leaf className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-700">Live Plantation Map</h3>
          <p className="text-gray-600">See global contributions on an interactive map in real-time.</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-green-200 text-center"
        >
          <div className="flex justify-center mb-4">
            <TreePalm className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-700">Track Your Trees</h3>
          <p className="text-gray-600">Easily log your plantation data and see your growth impact.</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-2xl shadow-md border border-green-200 text-center"
        >
          <div className="flex justify-center mb-4">
            <Globe2 className="h-10 w-10 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2 text-green-700">Global Leaderboard</h3>
          <p className="text-gray-600">Contribute and compete to become a top eco-hero in your region.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
