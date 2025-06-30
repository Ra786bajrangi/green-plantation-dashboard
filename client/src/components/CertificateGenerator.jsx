import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import React from 'react';

const CertificateGenerator = ({ user, plantation }) => {
  const generatePDF = () => {
    const input = document.getElementById(`certificate-${plantation._id}`);

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 10, 10, 277, 0);
      pdf.save('Plantation_Certificate.pdf');
    });
  };

  return (
    <div className="my-6">
      {/* Certificate Preview */}
      <div
        id={`certificate-${plantation._id}`}
        className="w-[800px] mx-auto p-10 bg-[url('/certificate-bg.png')] bg-cover bg-center border-8 border-green-800 rounded-lg shadow-2xl text-center text-gray-800 font-serif"
        style={{
          backgroundColor: '#fdfdf5',
          backgroundBlendMode: 'overlay',
        }}
      >
        <h1 className="text-4xl font-extrabold text-green-700 mb-4 tracking-wide">
          🌿 Certificate of Plantation
        </h1>

        <p className="text-xl">This is proudly awarded to</p>

        <h2 className="text-3xl font-bold text-green-900 my-4">
          {user?.username || 'Anonymous'}
        </h2>

        <p className="text-lg">
          for planting <span className="font-bold">{plantation.numberOfTrees}</span> tree(s) at{' '}
          <span className="font-bold">{plantation.location}</span> on{' '}
          <span className="font-bold">
            {new Date(plantation.date).toLocaleDateString()}
          </span>
        </p>

        <p className="mt-6 italic text-sm text-gray-600">"A step toward a greener tomorrow."</p>

        {/* Signature and Date Section */}
        <div className="mt-10 flex justify-between items-center px-10 text-sm">
          <div className="text-center">
            <p className="italic text-green-700 text-lg font-serif mb-1">
              — Rakesh Ranjan Behera
            </p>
            <p className="border-t border-green-700 pt-1">Authorized Signatory</p>
            <p>Green Plantation Authority</p>
          </div>
          <div className="text-center">
            <p className="border-t border-green-700 pt-1">Date Issued</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-4">
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          📥 Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateGenerator;
