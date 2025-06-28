import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const TopContributorsChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded shadow mb-8">
      <h2 className="text-xl font-bold mb-4 text-green-700">📈 Top Contributors Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="username" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="totalTrees" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopContributorsChart;
