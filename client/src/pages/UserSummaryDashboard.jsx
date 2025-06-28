import React, { useEffect, useState } from 'react';
import axios from 'axios';


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

  if (loading) return <div className="p-6 text-center">Loading summary...</div>;

  if (!summary)
    return <div className="p-6 text-red-500 text-center">Failed to load summary</div>;

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      

      <div className="flex items-center gap-4 mb-6">
  <img
    src={summary.avatar || 'https://www.gravatar.com/avatar/?d=mp'}
    alt="Profile"
    className="w-20 h-20 rounded-full object-cover border-4 border-green-500 shadow"
  />
  <div>
    <h1 className="text-2xl font-bold text-green-700">Welcome, {summary.username}</h1>
    <p className="text-gray-600">{summary.email}</p>
  </div>
</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">📋 Total Plantation Records</h2>
          <p className="text-3xl text-green-600 font-bold">{summary.totalPlantations}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">🌱 Total Trees Planted</h2>
          <p className="text-3xl text-green-600 font-bold">{summary.totalTrees}</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold">📅 Last Plantation Date</h2>
          <p className="text-xl text-gray-700">
            {summary.recentPlantations?.[0]?.date
              ? new Date(summary.recentPlantations[0].date).toLocaleDateString()
              : 'No record'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">🧾 Recent Plantation Entries</h2>
        {summary.recentPlantations.length === 0 ? (
          <p>No recent plantations yet.</p>
        ) : (
          <ul className="space-y-3">
            {summary.recentPlantations.map((p) => (
              <li key={p._id} className="border p-4 rounded bg-green-100">
                <p><strong>📍 Location:</strong> {p.location}</p>
                <p><strong>🌳 Trees:</strong> {p.numberOfTrees}</p>
                <p><strong>📅 Date:</strong> {new Date(p.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserSummaryDashboard;
