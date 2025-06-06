import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './GuestNavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faSun, 
  faMoon, 
  faGamepad, 
  faTrophy, 
  faRankingStar, 
  faCircleInfo,
  faCode
} from '@fortawesome/free-solid-svg-icons';

const GuestNavBar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (localStorage.getItem('theme') === null && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);

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

  const toggleAuthDropdown = () => {
    setAuthDropdownOpen(!authDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (authDropdownOpen && !event.target.closest('.auth-dropdown')) {
        setAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [authDropdownOpen]);

  return (
    <header className="site-header">
      <div className="header-bg-elements">
        <div className="bg-element"></div>
        <div className="bg-element"></div>
        <div className="bg-element"></div>
      </div>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <div className="logo-icon">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <div className="logo-text">
              <span className="logo-text-part">Techno</span>
              <span className="logo-text-accent">Match</span>
            </div>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link to="/features" className="nav-link">
            <FontAwesomeIcon icon={faGamepad} className="nav-icon" />
            <span>Features</span>
          </Link>
          <Link to="/battles" className="nav-link">
            <FontAwesomeIcon icon={faTrophy} className="nav-icon" />
            <span>Battles</span>
          </Link>
          <Link to="/leaderboard" className="nav-link">
            <FontAwesomeIcon icon={faRankingStar} className="nav-icon" />
            <span>Leaderboard</span>
          </Link>
          <Link to="/about" className="nav-link">
            <FontAwesomeIcon icon={faCircleInfo} className="nav-icon" />
            <span>About</span>
          </Link>
        </div>
        
        <div className="header-actions">
          <button 
            className={`theme-toggle ${darkMode ? 'dark-mode' : 'light-mode'}`} 
            onClick={toggleDarkMode}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            <div className="toggle-track">
              <FontAwesomeIcon icon={faSun} className="light-icon" aria-hidden="true" />
              <FontAwesomeIcon icon={faMoon} className="dark-icon" aria-hidden="true" />
              <div className="toggle-thumb"></div>
            </div>
            <span className="sr-only">{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
          </button>
          
          <div className="auth-dropdown">
            <button 
              className="auth-trigger" 
              onClick={toggleAuthDropdown}
              aria-expanded={authDropdownOpen}
              aria-label="User menu"
            >
              <div className="user-avatar">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </button>
            
            {authDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/login" className="dropdown-item">Login</Link>
                <Link to="/signup/credentials" className="dropdown-item highlight">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GuestNavBar; 