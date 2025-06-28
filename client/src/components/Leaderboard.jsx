import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/plantations/leaderboard")
      .then(res => setLeaders(res.data))
      .catch(err => console.error("Leaderboard error:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-xl font-bold mb-3 text-green-700">🏆 Top Contributors</h3>
      <ul className="space-y-2">
        {leaders.map((user, i) => (
          <li key={i} className="flex justify-between text-gray-700">
            <span>{i + 1}. {user.username}</span>
            <span>🌳 {user.totalTrees}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
