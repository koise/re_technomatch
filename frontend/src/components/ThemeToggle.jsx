import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/AuthContext';
import './ThemeToggle.scss';

const ThemeToggle = ({ size = 'medium', className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useAuth();
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const isDarkMode = theme === 'dark';
  
  // Animation state management
  const handleToggleTheme = () => {
    setIsThemeChanging(true);
    setTimeout(() => setIsThemeChanging(false), 750);
    toggleTheme();
  };
  
  // If theme changes from outside this component, sync animation state
  useEffect(() => {
    const handleThemeChange = () => {
      setIsThemeChanging(true);
      setTimeout(() => setIsThemeChanging(false), 750);
    };
    
    window.addEventListener('themechange', handleThemeChange);
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  // Calculate size classes
  const sizeClass = {
    small: 'theme-toggle-small',
    medium: 'theme-toggle-medium',
    large: 'theme-toggle-large',
  }[size] || 'theme-toggle-medium';

  return (
    <div className={`theme-toggle-wrapper ${className}`}>
      <button 
        className={`theme-toggle ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isThemeChanging ? 'theme-changing' : ''} ${sizeClass}`} 
        onClick={handleToggleTheme}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        aria-pressed={isDarkMode}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        <div className="toggle-track theme-transition">
          <FontAwesomeIcon icon={faSun} className="light-icon" aria-hidden="true" />
          <FontAwesomeIcon icon={faMoon} className="dark-icon" aria-hidden="true" />
          <div className="toggle-thumb theme-transition"></div>
        </div>
        <span className="sr-only">{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
      </button>
    
      {showLabel && (
        <span className="theme-toggle-label">
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;