import React, { useState } from 'react';
import axios from 'axios';

const PlantationForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    numberOfTrees: '',
    date: '',
    lat: '',
    lng: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/plantations', {
        ...formData,
        coordinates: {
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
        },
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Plantation recorded!');
    } catch (err) {
      alert('Failed to submit');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Record a New Plantation</h2>
      <form onSubmit={handleSubmit}>
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <input name="numberOfTrees" type="number" placeholder="Number of Trees" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <input name="date" type="date" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <input name="lat" placeholder="Latitude" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <input name="lng" placeholder="Longitude" onChange={handleChange} className="w-full mb-3 p-2 border rounded" />
        <button className="w-full bg-green-600 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default PlantationForm;
