// src/components/GoalProgressChart.jsx
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const GoalProgressChart = ({ currentTrees, goal = 100 }) => {
  const percentage = Math.min((currentTrees / goal) * 100, 100);
  const remaining = 100 - percentage;

  const data = {
    labels: ['Achieved', 'Remaining'],
    datasets: [
      {
        data: [percentage, remaining],
        backgroundColor: ['#22c55e', '#d1fae5'],
        borderColor: ['#16a34a', '#a7f3d0'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw.toFixed(1)}%`,
        },
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#065f46',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full md:w-[400px] mx-auto text-center">
      <h2 className="text-xl font-bold text-green-700 mb-4">🎯 Goal Progress</h2>
      <div className="relative">
        <Doughnut data={data} options={options} />
        <div className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-800 font-bold text-lg">
          {percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};

export default GoalProgressChart;
