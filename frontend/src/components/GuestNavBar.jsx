import React, { useEffect, useState, useRef } from 'react';
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
  faCode,
  faRightToBracket,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import ReactDOM from 'react-dom';
import { useTheme } from '../contexts/ThemeContext';

const GuestNavBar = ({ onLoginClick }) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Add a state for the theme toggle animation
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

  const handleToggleTheme = () => {
    // Add animation state
    setIsThemeChanging(true);
    setTimeout(() => setIsThemeChanging(false), 750); // Animation duration
    
    toggleTheme();
    
    // Trigger a custom event that other components can listen to
    window.dispatchEvent(new CustomEvent('themechange', { 
      detail: { theme: isDarkMode ? 'light' : 'dark' } 
    }));
  };

  const toggleAuthDropdown = () => {
    if (!authDropdownOpen && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom,
        right: window.innerWidth - rect.right
      });
    }
    setAuthDropdownOpen(!authDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        authDropdownOpen && 
        avatarRef.current && 
        !avatarRef.current.contains(event.target) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [authDropdownOpen]);

  // Add event listener for scroll to close dropdown
  useEffect(() => {
    const handleScroll = () => {
      if (authDropdownOpen) {
        setAuthDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [authDropdownOpen]);

  // Custom dropdown component that renders into document.body
  const AuthDropdown = () => {
    if (!authDropdownOpen) return null;
    
    return ReactDOM.createPortal(
      <div 
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          right: `${dropdownPosition.right}px`,
          zIndex: 1100,
          backgroundColor: !isDarkMode ? 'white' : 'var(--bg-secondary)',
          borderRadius: '12px',
          boxShadow: !isDarkMode 
            ? '0 10px 25px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.05)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
          border: !isDarkMode 
            ? '1px solid rgba(230, 230, 230, 1)' 
            : '1px solid var(--border)',
          minWidth: '220px',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        
        <div style={{
          position: 'absolute',
          top: '-6px',
          right: '14px',
          width: '12px',
          height: '12px',
          backgroundColor: !isDarkMode ? 'white' : 'var(--bg-secondary)',
          transform: 'rotate(45deg)',
          borderLeft: !isDarkMode 
            ? '1px solid rgba(230, 230, 230, 1)' 
            : '1px solid var(--border)',
          borderTop: !isDarkMode 
            ? '1px solid rgba(230, 230, 230, 1)' 
            : '1px solid var(--border)',
          zIndex: -1
        }}></div>
        
        <div style={{
          padding: '15px 15px 10px',
          borderBottom: !isDarkMode 
            ? '1px solid rgba(230, 230, 230, 1)' 
            : '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '0.9rem', 
            margin: 0, 
            marginBottom: '5px',
            color: !isDarkMode ? '#333' : 'var(--text)'
          }}>Welcome to TechnoMatch</h3>
          <p style={{ 
            fontSize: '0.75rem', 
            margin: 0,
            color: !isDarkMode ? '#666' : 'var(--text-muted)'
          }}>Sign in to start your coding journey</p>
        </div>
        
        <button 
          onClick={() => {
            setAuthDropdownOpen(false);
            if (onLoginClick) onLoginClick();
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            color: !isDarkMode ? '#555' : 'var(--text)',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            borderBottom: !isDarkMode 
              ? '1px solid rgba(240, 240, 240, 1)' 
              : '1px solid var(--border)',
            width: '100%',
            textAlign: 'left',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 'inherit',
            fontFamily: 'inherit'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = !isDarkMode 
              ? 'rgba(245, 245, 245, 1)' 
              : 'rgba(var(--primary-color-rgb), 0.1)';
          }}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <FontAwesomeIcon icon={faRightToBracket} style={{ 
            width: '16px',
            color: 'var(--primary-color)'
          }} />
          <span>Login</span>
        </button>
        <Link 
          to="/signup/credentials" 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            margin: '10px',
            borderRadius: '8px',
            textAlign: 'center',
            transition: 'all 0.3s ease',
            boxShadow: !isDarkMode 
              ? '0 4px 12px rgba(var(--primary-color-rgb), 0.3)' 
              : 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.filter = 'brightness(1.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = !isDarkMode 
              ? '0 6px 15px rgba(var(--primary-color-rgb), 0.4)' 
              : '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.filter = 'none';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = !isDarkMode 
              ? '0 4px 12px rgba(var(--primary-color-rgb), 0.3)' 
              : 'none';
          }}
        >
          <FontAwesomeIcon icon={faUserPlus} style={{ width: '16px' }} />
          <span>Sign Up</span>
        </Link>
      </div>,
      document.body
    );
  };

  return (
    <header className="site-header theme-transition" style={{
      backgroundColor: !isDarkMode ? 'white' : 'var(--bg-secondary)',
      boxShadow: !isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.05)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderBottom: !isDarkMode ? '1px solid rgba(230, 230, 230, 1)' : '1px solid var(--border)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%'
    }}>
      <div className="header-bg-elements">
        <div className="bg-element" style={{ 
          opacity: !isDarkMode ? 0.03 : 0.05 
        }}></div>
        <div className="bg-element" style={{ 
          opacity: !isDarkMode ? 0.03 : 0.05 
        }}></div>
        <div className="bg-element" style={{ 
          opacity: !isDarkMode ? 0.03 : 0.05 
        }}></div>
      </div>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <div className="logo-icon theme-transition" style={{
              background: !isDarkMode ? 'rgba(var(--primary-color-rgb), 0.08)' : 'rgba(var(--primary-color-rgb), 0.1)',
              boxShadow: !isDarkMode ? '0 2px 10px rgba(var(--primary-color-rgb), 0.2)' : '0 0 10px rgba(var(--primary-color-rgb), 0.5)'
            }}>
              <FontAwesomeIcon icon={faCode} />
            </div>
            <div className="logo-text">
              <span className="logo-text-part theme-transition" style={{
                color: !isDarkMode ? '#333' : 'var(--text)'
              }}>Techno</span>
              <span className="logo-text-accent">Match</span>
            </div>
          </Link>
        </div>
        
        <div className="nav-links">
          <a href="#features" className="nav-link theme-transition" style={{
            color: !isDarkMode ? '#555' : 'var(--text)',
            fontWeight: !isDarkMode ? '500' : '600'
          }}>
            <FontAwesomeIcon icon={faGamepad} className="nav-icon" style={{
              color: 'var(--primary-color)'
            }} />
            <span>Features</span>
          </a>
          <a href="#battle-modes" className="nav-link theme-transition" style={{
            color: !isDarkMode ? '#555' : 'var(--text)',
            fontWeight: !isDarkMode ? '500' : '600'
          }}>
            <FontAwesomeIcon icon={faTrophy} className="nav-icon" style={{
              color: 'var(--primary-color)'
            }} />
            <span>Battles</span>
          </a>
          <a href="#leaderboard" className="nav-link theme-transition" style={{
            color: !isDarkMode ? '#555' : 'var(--text)',
            fontWeight: !isDarkMode ? '500' : '600'
          }}>
            <FontAwesomeIcon icon={faRankingStar} className="nav-icon" style={{
              color: 'var(--primary-color)'
            }} />
            <span>Leaderboard</span>
          </a>
        </div>
        
        <div className="header-actions">
          <button 
            className={`theme-toggle ${isDarkMode ? 'dark-mode' : 'light-mode'} ${isThemeChanging ? 'theme-changing' : ''}`} 
            onClick={handleToggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            aria-pressed={isDarkMode}
            style={{
              border: !isDarkMode ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
              borderRadius: '30px',
              padding: '2px'
            }}
          >
            <div className="toggle-track theme-transition" style={{
              background: !isDarkMode ? 'rgba(136, 186, 252, 0.25)' : '#2d3748'
            }}>
              <FontAwesomeIcon icon={faSun} className="light-icon" aria-hidden="true" style={{
                color: !isDarkMode ? '#ff9d00' : '#f6e05e'
              }} />
              <FontAwesomeIcon icon={faMoon} className="dark-icon" aria-hidden="true" style={{
                color: !isDarkMode ? '#a0aec0' : '#a0aec0'
              }} />
              <div className="toggle-thumb theme-transition"></div>
            </div>
            <span className="sr-only">{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
          </button>
          
          <div className="auth-dropdown">
            <button 
              ref={avatarRef}
              className="auth-trigger theme-transition" 
              onClick={toggleAuthDropdown}
              aria-expanded={authDropdownOpen}
              aria-label="User menu"
            >
              <div className="user-avatar theme-transition" style={{
                background: !isDarkMode ? 'rgba(var(--primary-color-rgb), 0.08)' : 'rgba(var(--primary-color-rgb), 0.1)',
                border: !isDarkMode ? '2px solid rgba(var(--primary-color-rgb), 0.2)' : '2px solid transparent'
              }}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </button>
            <AuthDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default GuestNavBar; 