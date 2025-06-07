import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useTheme } from '../../contexts/ThemeContext';
import './Header.scss';

const Header = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure theme is applied to body when header mounts
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  return (
    <header className={`site-header ${theme} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="header-bg-elements">
        <div className="bg-element"></div>
        <div className="bg-element"></div>
        <div className="bg-element"></div>
      </div>
      <div className="header-container">
        <div className="logo">
          <a href="#hero">
            <span className="logo-icon">&#60;/&#62;</span>
            <span className="logo-text">Techno<span className="logo-accent">Match</span></span>
          </a>
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><a href="#features" className="nav-link"><span className="nav-icon">✨</span>Features</a></li>
            <li><a href="#battle-modes" className="nav-link"><span className="nav-icon">🎮</span>Battle Modes</a></li>
            <li><a href="#journey" className="nav-link"><span className="nav-icon">🗺️</span>Journey</a></li>
            <li><a href="#leaderboard" className="nav-link"><span className="nav-icon">🏆</span>Leaderboard</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <div className="auth-buttons">
            <button className="btn btn-ghost">Log In</button>
            <button className="btn btn-primary btn-glow">Sign Up</button>
          </div>
        </div>
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header; 