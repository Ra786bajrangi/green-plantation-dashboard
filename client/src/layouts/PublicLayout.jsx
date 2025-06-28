// src/layouts/PublicLayout.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-[80vh]">{children}</main>
    <Footer />
  </>
);

export default PublicLayout;
