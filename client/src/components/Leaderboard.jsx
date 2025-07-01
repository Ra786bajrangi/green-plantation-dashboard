import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [period, setPeriod] = useState("all"); // 'all' or 'monthly'

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/plantations/leaderboard${period === "monthly" ? "?period=monthly" : ""}`
      );
      setLeaders(res.data);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [period]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-green-700 dark:text-green-300">🏆 Top Contributors</h3>

        <div className="flex space-x-2">
          <button
            onClick={() => setPeriod("all")}
            className={`px-3 py-1 text-sm rounded-full ${
              period === "all"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100"
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setPeriod("monthly")}
            className={`px-3 py-1 text-sm rounded-full ${
              period === "monthly"
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100"
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {leaders.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">No data available.</p>
        ) : (
          leaders.map((user, i) => (
            <li key={i} className="flex items-center justify-between text-gray-700 dark:text-gray-200">
              <div className="flex items-center gap-2">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`}
                <span className="font-medium">{user.username}</span>
              </div>
              <span>🌳 {user.totalTrees}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
