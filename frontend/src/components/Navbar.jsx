import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>Mini User Management System</span>
        </div>
        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/posts" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Posts
              </Link>
              <Link to="/profile" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                Profile
              </Link>
              {isAdmin && (
                <Link to="/admin" className="nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Admin
                </Link>
              )}
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <button className="btn btn-primary" onClick={() => navigate('/auth')}>
              Login
            </button>
          )}
        </div>
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};
