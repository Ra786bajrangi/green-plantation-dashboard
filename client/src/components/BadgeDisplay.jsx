// src/components/BadgeDisplay.jsx

const getBadge = (totalTrees) => {
  if (totalTrees >= 100) return { name: 'Gold', icon: '🥇', color: 'bg-yellow-300' };
  if (totalTrees >= 50) return { name: 'Silver', icon: '🥈', color: 'bg-gray-300' };
  if (totalTrees >= 20) return { name: 'Bronze', icon: '🥉', color: 'bg-amber-400' };
  return { name: 'Green Starter', icon: '🌱', color: 'bg-green-200' };
};

const BadgeDisplay = ({ totalTrees }) => {
  const badge = getBadge(totalTrees);

  return (
    <div className={`p-4 rounded-xl shadow text-center ${badge.color}`}>
      <div className="text-5xl mb-2">{badge.icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">Badge: {badge.name}</h3>
      <p className="text-sm text-gray-600">You've planted {totalTrees} trees!</p>
    </div>
  );
};

export default BadgeDisplay;
