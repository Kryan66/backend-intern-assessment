import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/posts');
    } else {
      navigate('/auth');
    }
  };

  const handleExplore = () => {
    if (isAuthenticated) {
      navigate('/posts');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section className="page active">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Mini User Management System</h1>
          <p className="hero-subtitle">Connect, share, and engage with your community</p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn btn-secondary btn-large" onClick={handleExplore}>
              Explore Posts
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1"></div>
          <div className="floating-card card-2"></div>
          <div className="floating-card card-3"></div>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Create Posts</h3>
          <p>Share your thoughts and ideas with the community</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Connect</h3>
          <p>Engage with other users and build your network</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Your data is protected with industry-standard security</p>
        </div>
      </div>
    </section>
  );
};
