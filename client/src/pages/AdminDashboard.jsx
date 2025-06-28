import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserManagement from '../components/UserManagement';
import TopContributorsChart from '../components/TopContributorsChart';
import PlantationMap from '../components/PlantationMap';
import ExportCSVButton from '../components/ExportCSVButton';
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

  if (loading) return <div className="p-6 text-center text-gray-600">Loading admin dashboard...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-700">🌍 Admin Plantation Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">🌳 Total Trees Planted</h2>
          <p className="text-4xl font-bold text-green-700">{data.totalTrees}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">📋 Total Plantation Records</h2>
          <p className="text-4xl font-bold text-green-700">{data.totalPlantations}</p>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4 text-green-700">🏆 Top Contributors</h2>
        <ul className="space-y-2">
          {data.leaderboard.map((user, index) => (
            <li key={index} className="flex justify-between p-3 border rounded bg-green-50">
              <span>{index + 1}. {user.username}</span>
              <span className="font-bold text-green-600">{user.totalTrees} 🌳</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <TopContributorsChart data={data.leaderboard}/>
      </div>
      <div>
        <UserManagement/>
      </div>
       <div>
        <PlantationMap plantations={data.recentPlantations} />
        <ExportCSVButton data={data.recentPlantations} />

       </div>
      {/* Recent Plantations */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-green-700">🕒 Recent Plantation Entries</h2>
        <ul className="space-y-3">
          {data.recentPlantations.map(p => (
            <li key={p._id} className="border p-4 rounded bg-green-100">
              <p><strong>👤 User:</strong> {p.user?.username}</p>
              <p><strong>📍 Location:</strong> {p.location}</p>
              <p><strong>🌱 Trees:</strong> {p.numberOfTrees}</p>
              <p><strong>📅 Date:</strong> {new Date(p.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
