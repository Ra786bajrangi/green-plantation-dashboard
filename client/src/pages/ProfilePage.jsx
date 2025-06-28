import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(res.data);
        setUsername(res.data.username);
        setPreview(res.data.avatar);
      } catch (err) {
        toast.error('Failed to load profile');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    if (avatar) formData.append('avatar', avatar);

    try {
      const res = await axios.put(
        'http://localhost:5000/api/users/profile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('🎉 Profile updated successfully!');
      setUser(res.data);
      setPreview(res.data.avatar);
    } catch (err) {
      toast.error('❌ Update failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg mt-10"
    >
      <ToastContainer />
      <h2 className="text-3xl font-extrabold text-green-700 mb-6 text-center">👤 Update Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Username Input */}
        <div>
          <label className="block text-gray-700 mb-1">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter new name"
          />
        </div>

        {/* Avatar Upload */}
        <div>
          <label className="block text-gray-700 mb-1">Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            className="w-full text-sm file:bg-green-500 file:text-white file:px-4 file:py-1 file:rounded file:border-0"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mt-4 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-md transition-transform hover:scale-105"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-md transition-all"
          >
            Save Changes
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProfilePage;
