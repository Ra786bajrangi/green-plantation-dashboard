import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PlantationForm from './pages/PlantationForm';
import PlantationMap from './components/PlantationMap';
import Leaderboard from './components/Leaderboard';
import PlantationList from './components/PlantationList';
import UserSummaryDashboard from './pages/UserSummaryDashboard';
import AdminDashboard from './pages/AdminDashboard';
import DashboardLayout from './layouts/DashboardLayout'; 
import PublicLayout from './layouts/PublicLayout';
import ProfilePage from './pages/ProfilePage'; 
import UserManagement from './components/UserManagement';
import EducationHub from './pages/EducationHub';

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
  <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
  <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
  <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
  <Route path="/education" element={<PublicLayout><EducationHub /></PublicLayout>} />  

        {/* Dashboard Routes (Protected + Layout) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user', 'admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserSummaryDashboard />} />
          <Route path="plant" element={<PlantationForm />} />
          <Route path="my-plantations" element={<PlantationList />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="plantation-map" element={<PlantationMap />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Admin-only route outside dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} /> 

        </Route>
      </Routes>
    </>
  );
};

export default App;
