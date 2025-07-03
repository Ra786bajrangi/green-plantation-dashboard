import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/users/${id}/toggle`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success('User status updated');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  useEffect(() => {
    fetchUsers();
    window.dispatchEvent(new Event('refreshAdminStats'));

  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-100 to-white">
      <h1 className="text-3xl font-bold mb-6 text-green-700">User Management</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          className="px-4 py-2 w-1/3 rounded border shadow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded border shadow"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-6">Avatar</th>
                 <th className="py-3 px-6 text-left">Username</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6">Plantations</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-green-50 transition-all"
                  >
                    <td className="px-6 py-3">
          <img
            src={user.avatar || `https://i.pravatar.cc/150?u=${user.email}`}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover border"
          /></td>
                    <td className="px-6 py-3">{user.username}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3 text-center">{user.plantations}</td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={`px-2 py-1 rounded text-white ${
                          user.isActive ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">{user.role}</td>
                    <td className="px-6 py-3 text-center space-x-2">
                      <button
                        onClick={() => toggleUserStatus(user._id)}
                        className={`px-3 py-1 rounded text-white ${
                          user.isActive
                            ? 'bg-yellow-500 hover:bg-yellow-600'
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
