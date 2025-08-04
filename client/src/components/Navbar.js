import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src="/logo.png" alt="PhotographerLagbe" className="brand-logo" />
          <span>PhotographerLagbe</span>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/photographers" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Find Photographers
          </Link>
          
          {isAuthenticated ? (
            <div className="nav-auth">
              {user?.role === 'photographer' && (
                <Link to="/photographer/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
              <div className="nav-user">
                <div className="user-info">
                  <FaUser className="user-icon" />
                  <span className="user-name">{user?.name}</span>
                </div>
                <div className="user-dropdown">
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                    Profile
                  </Link>
                  {user?.role === 'photographer' && (
                    <Link to="/photographer/action" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>
                      Photographer Action
                    </Link>
                  )}
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="nav-auth">
              <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setIsMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
