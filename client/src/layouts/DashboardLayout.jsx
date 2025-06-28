import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-green-50 p-4">
        <Outlet /> {/* This renders the nested dashboard page */}
      </main>
    </>
  );
};

export default DashboardLayout;
