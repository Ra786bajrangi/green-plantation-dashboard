import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaTree,
  FaSeedling,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaList,
  FaUserCircle,
} from 'react-icons/fa';

const UserSummaryDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/users/summary', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSummary(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user summary:', err);
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-lg text-blue-600 font-medium animate-pulse">
        Loading summary...
      </div>
    );

  if (!summary)
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Failed to load summary.
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8 bg-white/60 p-4 rounded-xl shadow-lg"
      >
        <img
          src={summary.avatar || 'https://www.gravatar.com/avatar/?d=mp'}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow"
        />
        <div>
          <h1 className="text-2xl font-bold text-green-800 flex items-center gap-2">
            <FaUserCircle /> Welcome, {summary.username}
          </h1>
          <p className="text-gray-600">{summary.email}</p>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <FaList className="text-green-600" /> Total Plantation Records
          </h2>
          <p className="text-4xl font-bold text-green-700">{summary.totalPlantations}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <FaSeedling className="text-green-600" /> Total Trees Planted
          </h2>
          <p className="text-4xl font-bold text-green-700">{summary.totalTrees}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <FaCalendarAlt className="text-green-600" /> Last Plantation Date
          </h2>
          <p className="text-xl font-medium text-gray-800">
            {summary.recentPlantations?.[0]?.date
              ? new Date(summary.recentPlantations[0].date).toLocaleDateString()
              : 'No record'}
          </p>
        </motion.div>
      </div>

      {/* Recent Plantations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4 text-green-800 flex items-center gap-2">
          <FaTree /> Recent Plantation Entries
        </h2>

        {summary.recentPlantations.length === 0 ? (
          <p className="text-gray-500">No recent plantations yet.</p>
        ) : (
          <ul className="space-y-4">
            {summary.recentPlantations.map((p) => (
              <li
                key={p._id}
                className="border border-green-200 p-4 rounded-lg bg-green-50 shadow-sm"
              >
                <p className="text-gray-800 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-500" />
                  <strong>Location:</strong> {p.location}
                </p>
                <p className="text-gray-800 flex items-center gap-2">
                  <FaSeedling className="text-green-500" />
                  <strong>Trees:</strong> {p.numberOfTrees}
                </p>
                <p className="text-gray-800 flex items-center gap-2">
                  <FaCalendarAlt className="text-green-500" />
                  <strong>Date:</strong> {new Date(p.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default UserSummaryDashboard;
