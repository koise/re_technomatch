import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (localStorage.getItem('theme') === null && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">TechnoMatch</span>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/battles" className="nav-link">Battles</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        
        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={toggleDarkMode}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              <span className="light-icon">☀️</span>
            ) : (
              <span className="dark-icon">🌙</span>
            )}
          </button>
          
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 