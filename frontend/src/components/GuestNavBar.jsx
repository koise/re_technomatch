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
  
  // Add a state for the theme toggle animation
  const [isThemeChanging, setIsThemeChanging] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    // Add animation state
    setIsThemeChanging(true);
    setTimeout(() => setIsThemeChanging(false), 750); // Animation duration
    
    setDarkMode(!darkMode);
    
    // Trigger a custom event that other components can listen to
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: !darkMode ? 'dark' : 'light' } 
    }));
  };

  // Listen for system color scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only change if user hasn't explicitly set a preference
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
    <header className="site-header theme-transition">
      <div className="header-bg-elements">
        <div className="bg-element"></div>
        <div className="bg-element"></div>
        <div className="bg-element"></div>
      </div>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <div className="logo-icon theme-transition">
              <FontAwesomeIcon icon={faCode} />
            </div>
            <div className="logo-text">
              <span className="logo-text-part theme-transition">Techno</span>
              <span className="logo-text-accent">Match</span>
            </div>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link to="/features" className="nav-link theme-transition">
            <FontAwesomeIcon icon={faGamepad} className="nav-icon" />
            <span>Features</span>
          </Link>
          <Link to="/battles" className="nav-link theme-transition">
            <FontAwesomeIcon icon={faTrophy} className="nav-icon" />
            <span>Battles</span>
          </Link>
          <Link to="/leaderboard" className="nav-link theme-transition">
            <FontAwesomeIcon icon={faRankingStar} className="nav-icon" />
            <span>Leaderboard</span>
          </Link>
          <Link to="/about" className="nav-link theme-transition">
            <FontAwesomeIcon icon={faCircleInfo} className="nav-icon" />
            <span>About</span>
          </Link>
        </div>
        
        <div className="header-actions">
          <button 
            className={`theme-toggle ${darkMode ? 'dark-mode' : 'light-mode'} ${isThemeChanging ? 'theme-changing' : ''}`} 
            onClick={toggleDarkMode}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            aria-pressed={darkMode}
          >
            <div className="toggle-track theme-transition">
              <FontAwesomeIcon icon={faSun} className="light-icon" aria-hidden="true" />
              <FontAwesomeIcon icon={faMoon} className="dark-icon" aria-hidden="true" />
              <div className="toggle-thumb theme-transition"></div>
            </div>
            <span className="sr-only">{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
          </button>
          
          <div className="auth-dropdown">
            <button 
              className="auth-trigger theme-transition" 
              onClick={toggleAuthDropdown}
              aria-expanded={authDropdownOpen}
              aria-label="User menu"
            >
              <div className="user-avatar theme-transition">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </button>
            
            {authDropdownOpen && (
              <div className="dropdown-menu theme-transition">
                <Link to="/login" className="dropdown-item theme-transition">Login</Link>
                <Link to="/signup/credentials" className="dropdown-item highlight theme-transition">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default GuestNavBar; 