import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminSetUserGoal = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [goal, setGoal] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/set-user-goal`,
        { userId: selectedUser, goal: parseInt(goal) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage('Failed to update goal');
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-green-700">🌿 Set User Goal</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          className="w-full border p-2 rounded"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter Goal (Trees)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Set Goal
        </button>

        {message && <p className="text-sm text-center text-blue-600">{message}</p>}
      </form>
    </div>
  );
};

export default AdminSetUserGoal;
