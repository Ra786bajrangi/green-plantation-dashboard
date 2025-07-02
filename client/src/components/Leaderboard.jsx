import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [period, setPeriod] = useState("all");

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/plantations/leaderboard${
          period === "monthly" ? "?period=monthly" : ""
        }`
      );
      setLeaders(res.data);
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [period]);

  const renderPodiumCard = (user, medal, color, height, delay) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`flex flex-col items-center justify-end w-28 sm:w-32 p-4 rounded-xl shadow-md ${color} dark:bg-opacity-20 ${height}`}
    >
      <div className="text-3xl">{medal}</div>
      <img
        src={user.avatar || `https://i.pravatar.cc/150?u=${user.username}`}
        alt={user.username}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white my-2"
      />
      <div className="text-center">
        <div className="text-sm font-semibold text-gray-800 dark:text-white">
          {user.username}
        </div>
        <div className="text-xs text-green-900 dark:text-green-300">
          🌳 {user.totalTrees} Trees
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">
          🏆 Top Contributors
        </h3>

        <div className="flex space-x-2">
          {["all", "monthly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 text-sm rounded-full ${
                period === p
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-100"
              }`}
            >
              {p === "all" ? "All Time" : "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* Podium layout with correct ranking */}
      <div className="flex justify-center items-end gap-4 mb-8">
        {leaders[1] &&
          renderPodiumCard(leaders[1], "🥈", "bg-gray-300", "translate-y-6", 0.2)}
        {leaders[0] &&
          renderPodiumCard(leaders[0], "🥇", "bg-yellow-300", "", 0)}
        {leaders[2] &&
          renderPodiumCard(leaders[2], "🥉", "bg-orange-300", "translate-y-12", 0.4)}
      </div>

      {/* Remaining users */}
      <ul className="space-y-2">
        {leaders.length <= 3 ? (
          <p className="text-gray-500 dark:text-gray-300">No more users.</p>
        ) : (
          leaders.slice(3).map((user, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center justify-between text-gray-700 dark:text-gray-200"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold">{i + 4}.</span>
                <img
                  src={user.avatar || `https://i.pravatar.cc/150?u=${user.username}`}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{user.username}</span>
              </div>
              <span>🌳 {user.totalTrees}</span>
            </motion.li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
