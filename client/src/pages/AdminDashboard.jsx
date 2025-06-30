import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  FaTree,
  FaList,
  FaTrophy,
  FaUser,
  FaMapMarkerAlt,
  FaSeedling,
  FaCalendarAlt,
} from 'react-icons/fa';

import UserManagement from '../components/UserManagement';
import TopContributorsChart from '../components/TopContributorsChart';
import PlantationMap from '../components/PlantationMap';
import ExportCSVButton from '../components/ExportCSVButton';
import AdminResourceManager from '../components/AdminResourceManager';
import AdminSetUserGoal from '../components/AdminSetUserGoal';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/admin/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error("Admin fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();

    const handleRefresh = () => fetchSummary();
    window.addEventListener('refreshAdminStats', handleRefresh);
    return () => {
      window.removeEventListener('refreshAdminStats', handleRefresh);
    };
  }, []);

  if (loading) return <div className="p-6 text-center text-blue-500 text-lg animate-pulse">Loading admin dashboard...</div>;

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-green-800 flex items-center gap-3"
      >
        🌍 Admin Plantation Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <FaTree className="text-green-600" /> Total Trees Planted
          </h2>
          <p className="text-4xl font-bold text-green-700">{data.totalTrees}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md"
        >
          <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-2">
            <FaList className="text-green-600" /> Total Plantation Records
          </h2>
          <p className="text-4xl font-bold text-green-700">{data.totalPlantations}</p>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md mb-10"
      >
        <h2 className="text-xl font-bold mb-4 text-green-800 flex items-center gap-2">
          <FaTrophy className="text-yellow-500" /> Top Contributors
        </h2>
        <ul className="space-y-3">
          {data.leaderboard.map((user, index) => (
            <li key={index} className="flex justify-between items-center p-3 border border-green-200 rounded bg-green-50 shadow-sm">
              <span className="flex items-center gap-2 text-gray-700">
                {index + 1}.
                <FaUser className="text-green-500" />
                {user.username}
              </span>
              <span className="font-semibold text-green-600 flex items-center gap-1">
                {user.totalTrees} <FaTree />
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Chart */}
      <div className="mb-10">
        <TopContributorsChart data={data.leaderboard} />
      </div>

      {/* User Management */}
      <div className="mb-10">
        <UserManagement />
      </div>
      {/*Admin Resource Manager*/}
      <div className="mb-10">
        <AdminResourceManager/>
      </div>

      {/* Map & Export */}
      <div className="mb-10">
        <PlantationMap plantations={data.recentPlantations} />
        <ExportCSVButton data={data.recentPlantations} />
      </div>
      {/*goal set by user*/}
      <div className="mb-10">
        <AdminSetUserGoal />

      </div>

      {/* Recent Plantations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-4 text-green-800 flex items-center gap-2">
          <FaCalendarAlt /> Recent Plantation Entries
        </h2>
        <ul className="space-y-4">
          {data.recentPlantations.map((p) => (
            <li
              key={p._id}
              className="border border-green-200 p-4 rounded-lg bg-green-100 shadow-sm"
            >
              <p className="text-gray-700 flex items-center gap-2">
                <FaUser className="text-green-500" /> <strong>User:</strong> {p.user?.username}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-500" /> <strong>Location:</strong> {p.location}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaSeedling className="text-green-500" /> <strong>Trees:</strong> {p.numberOfTrees}
              </p>
              <p className="text-gray-700 flex items-center gap-2">
                <FaCalendarAlt className="text-green-500" /> <strong>Date:</strong> {new Date(p.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
