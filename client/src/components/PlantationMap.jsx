import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick({ lat, lng });
    }
  });
  return null;
};

const PlantationMap = () => {
  const [plantations, setPlantations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/plantations/all`, {
          headers: { Authorization: `Bearer ${token}` }
        });
         console.log(res)
        const data = res.data.map((doc) => ({
          id: doc._id,
          name: doc.user ? doc.user.username : "Deleted User",
  
          trees: doc.numberOfTrees || "Unknown", 

            date: doc.date || "Unknown date",
          location: doc.coordinates
        }));
        console.log(data)

        setPlantations(data.filter((entry) => entry.location));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMapClick = ({ lat, lng }) => {
    const newPlantation = {
      id: `temp-${Date.now()}`,
      name: "New Location",
      trees: "N/A",
      date: new Date().toISOString(),
      location: { lat, lng }
    };
    setPlantations((prev) => [...prev, newPlantation]);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Unknown date") return dateString;
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  const filteredPlantations = plantations.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPlantations.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPlantations.length / itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading data...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center text-green-700">🌱 Plantation Map Dashboard</h2>

      {/* Map Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
        <p className="mb-2 text-sm text-gray-600">📍 Click on the map to simulate a new location</p>
        <div className="rounded-lg overflow-hidden border border-green-300">
          <MapContainer
            center={[20.2961, 85.8245]}
            zoom={6}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <ClickHandler onMapClick={handleMapClick} />
            {plantations.map((plantation) => (
              <Marker
                key={plantation.id}
                position={[plantation.location.lat, plantation.location.lng]}
              >
                <Popup>
                  <div>
                    <h4 className="font-semibold">{plantation.name}</h4>
                    <p>🌳 Trees: {plantation.trees}</p>
                    <p>📅 {formatDate(plantation.date)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Search + Table */}
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <h3 className="text-xl font-semibold mb-3 text-green-700">📊 Plantation Data</h3>

        <input
          type="text"
          placeholder="🔍 Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border border-collapse">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Trees</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Coordinates</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((plantation) => (
                <tr key={plantation.id} className="hover:bg-green-50 transition">
                  <td className="p-2 border">{plantation.name}</td>
                  <td className="p-2 border">{plantation.trees}</td>
                  <td className="p-2 border">{formatDate(plantation.date)}</td>
                  <td className="p-2 border">
                    {plantation.location.lat.toFixed(4)}, {plantation.location.lng.toFixed(4)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
          >
            ◀ Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-green-600 text-white px-4 py-1 rounded disabled:opacity-50"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantationMap;
