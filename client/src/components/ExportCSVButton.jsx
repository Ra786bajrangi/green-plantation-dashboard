import React from 'react';

const ExportCSVButton = ({ data, filename = 'plantations.csv' }) => {
  const exportCSV = () => {
    const rows = data.map(row =>
      `${row.user?.username},${row.location},${row.numberOfTrees},${new Date(row.date).toLocaleDateString()}`
    );
    const csv = ['User,Location,Trees,Date', ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 mb-6"
    >
      📤 Export Plantations to CSV
    </button>
  );
};

export default ExportCSVButton;
