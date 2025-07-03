import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlantationList = () => {
  const [plantations, setPlantations] = useState([]);

  useEffect(() => {
    const fetchPlantations = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/plantations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlantations(res.data);
      } catch (err) {
        console.error("Failed to fetch plantations:", err);
      }
    };

    fetchPlantations();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">My Plantation History</h2>
      {plantations.length === 0 ? (
        <p>No plantations found.</p>
      ) : (
        <ul className="space-y-4">
          {plantations.map((plantation) => (
            <li key={plantation._id} className="p-4 border rounded bg-green-50">
              <p><strong>Location:</strong> {plantation.location}</p>
              <p><strong>Number of Trees:</strong> {plantation.numberOfTrees}</p>
              <p><strong>Date:</strong> {new Date(plantation.date).toLocaleDateString()}</p>
              <p><strong>Coordinates:</strong> {plantation.coordinates.lat}, {plantation.coordinates.lng}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlantationList;
