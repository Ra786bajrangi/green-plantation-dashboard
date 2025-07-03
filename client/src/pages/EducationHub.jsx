import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EducationHub = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/resources`);
        setResources(res.data);
      } catch (err) {
        console.error('Failed to fetch resources', err);
      }
    };
    fetchResources();
  }, []);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">🌱 Educational Hub</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-green-800">{item.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{item.description}</p>
            <p className="text-sm italic text-gray-500 mb-2">Type: {item.type}</p>

            {item.type === 'article' && item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Read Full Article
              </a>
            )}

            {item.type === 'video' && item.embedUrl && (
              <div className="mt-2">
                <iframe
                  src={item.embedUrl}
                  title={item.title}
                  className="w-full h-64 rounded"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationHub;
