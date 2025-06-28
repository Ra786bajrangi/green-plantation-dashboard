import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    setIsAuthenticated(!!token);
    setRole(storedRole);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-green-700">🌱 GreenPlant</Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
          {!isAuthenticated && (
            <>
              <Link to="/">About</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {isAuthenticated && role === 'user' && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/dashboard/plant">Plant Tree</Link>
              <Link to="/dashboard/leaderboard">Leaderboard</Link>
              <Link to="/profile">Profile</Link>
              <Link to="/dashboard/my-plantations">My Plantations</Link>
              <Link to="/dashboard/plantation-map">Plantation Map</Link>
              <button onClick={handleLogout} className="text-green-700 hover:underline">Logout</button>
            </>
          )}

          {isAuthenticated && role === 'admin' && (
            <>
              <Link to="/admin">Dashboard</Link>
              <Link to="/admin/users">User Management</Link>
              <Link to="/dashboard/leaderboard">Leaderboard</Link>
              <button onClick={handleLogout} className="text-green-700 hover:underline">Logout</button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-100 p-4 space-y-3 text-green-800">
          {!isAuthenticated && (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>About</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}

          {isAuthenticated && role === 'user' && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/dashboard/plant" onClick={() => setMenuOpen(false)}>Plant Tree</Link>
              <Link to="/dashboard/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
              <Link to="/dashboard/my-plantations" onClick={() => setMenuOpen(false)}>My Plantations</Link>
              <Link to="/dashboard/plantation-map" onClick={() => setMenuOpen(false)}>Plantation Map</Link>
              <Link to="/dashboard/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
            </>
          )}

          {isAuthenticated && role === 'admin' && (
            <>
            <Link to="/admin" className="text-green-700 font-semibold hover:underline">
      Admin Dashboard
    </Link>
             
              <Link to="/admin/users" onClick={() => setMenuOpen(false)}>User Management</Link>
              <Link to="/dashboard/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
            </>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
