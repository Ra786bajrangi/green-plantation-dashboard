import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AdminResourceManager = () => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    type: 'article',
    description: '',
    link: '',
    embedUrl: '',
  });

  const fetchResources = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/resources');
      setResources(res.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/resources', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ title: '', type: 'article', description: '', link: '', embedUrl: '' });
      fetchResources();
    } catch (err) {
      alert('Failed to add resource');
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/resources/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert('Failed to delete resource');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white/80 rounded-lg shadow-md mb-10"
    >
      <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
        <FaPlus /> Manage Educational Resources
      </h2>

      {/* Form */}
      <form onSubmit={handleAdd} className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="article">Article</option>
          <option value="video">Video</option>
          <option value="tip">Tip</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="link"
          placeholder="Link (for articles)"
          value={formData.link}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="embedUrl"
          placeholder="Embed URL (for videos)"
          value={formData.embedUrl}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Resource
        </motion.button>
      </form>

      {/* Animated List */}
      <div className="grid gap-4">
        <AnimatePresence>
          {resources.map((r) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-green-100 rounded flex justify-between items-start"
            >
              <div>
                <h3 className="font-bold text-lg text-green-800">{r.title}</h3>
                <p className="text-sm text-gray-700">{r.description}</p>
                <p className="text-xs text-gray-500">Type: {r.type}</p>
                {r.link && (
                  <a
                    href={r.link}
                    className="text-blue-600 underline text-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Link
                  </a>
                )}
                {r.embedUrl && (
                  <iframe
                    src={r.embedUrl}
                    title={r.title}
                    className="w-full h-40 mt-2 rounded"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDelete(r._id)}
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <FaTrash />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdminResourceManager;
