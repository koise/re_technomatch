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

const GuestNavBar = ({ onLoginClick }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (localStorage.getItem('theme') === null && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Add a state for the theme toggle animation
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });

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
          backgroundColor: !darkMode ? 'white' : 'var(--bg-secondary)',
          borderRadius: '12px',
          boxShadow: !darkMode 
            ? '0 10px 25px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.05)' 
            : '0 4px 12px rgba(0, 0, 0, 0.3)',
          border: !darkMode 
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
          backgroundColor: !darkMode ? 'white' : 'var(--bg-secondary)',
          transform: 'rotate(45deg)',
          borderLeft: !darkMode 
            ? '1px solid rgba(230, 230, 230, 1)' 
            : '1px solid var(--border)',
          borderTop: !darkMode 
            ? '1px solid rgba(230, 230, 230, 1)' 
            : '1px solid var(--border)',
          zIndex: -1
        }}></div>
        
        <div style={{
          padding: '15px 15px 10px',
          borderBottom: !darkMode 
            ? '1px solid rgba(230, 230, 230, 1)' 
            : '1px solid var(--border)',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '0.9rem', 
            margin: 0, 
            marginBottom: '5px',
            color: !darkMode ? '#333' : 'var(--text)'
          }}>Welcome to TechnoMatch</h3>
          <p style={{ 
            fontSize: '0.75rem', 
            margin: 0,
            color: !darkMode ? '#666' : 'var(--text-muted)'
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
            color: !darkMode ? '#555' : 'var(--text)',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            borderBottom: !darkMode 
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
            e.currentTarget.style.backgroundColor = !darkMode 
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
            boxShadow: !darkMode 
              ? '0 4px 12px rgba(var(--primary-color-rgb), 0.3)' 
              : 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.filter = 'brightness(1.1)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = !darkMode 
              ? '0 6px 15px rgba(var(--primary-color-rgb), 0.4)' 
              : '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.filter = 'none';
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = !darkMode 
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
      backgroundColor: !darkMode ? 'white' : 'var(--bg-secondary)',
      boxShadow: !darkMode ? '0 4px 20px rgba(0, 0, 0, 0.05)' : '0 4px 20px rgba(0, 0, 0, 0.1)',
      borderBottom: !darkMode ? '1px solid rgba(230, 230, 230, 1)' : '1px solid var(--border)'
    }}>
      <div className="header-bg-elements">
        <div className="bg-element" style={{ 
          opacity: !darkMode ? 0.03 : 0.05 
        }}></div>
        <div className="bg-element" style={{ 
          opacity: !darkMode ? 0.03 : 0.05 
        }}></div>
        <div className="bg-element" style={{ 
          opacity: !darkMode ? 0.03 : 0.05 
        }}></div>
      </div>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <div className="logo-icon theme-transition" style={{
              background: !darkMode ? 'rgba(var(--primary-color-rgb), 0.08)' : 'rgba(var(--primary-color-rgb), 0.1)',
              boxShadow: !darkMode ? '0 2px 10px rgba(var(--primary-color-rgb), 0.2)' : '0 0 10px rgba(var(--primary-color-rgb), 0.5)'
            }}>
              <FontAwesomeIcon icon={faCode} />
            </div>
            <div className="logo-text">
              <span className="logo-text-part theme-transition" style={{
                color: !darkMode ? '#333' : 'var(--text)'
              }}>Techno</span>
              <span className="logo-text-accent">Match</span>
            </div>
          </Link>
        </div>
        
        <div className="nav-links">
          <a href="#features" className="nav-link theme-transition" style={{
            color: !darkMode ? '#555' : 'var(--text)',
            fontWeight: !darkMode ? '500' : '600'
          }}>
            <FontAwesomeIcon icon={faGamepad} className="nav-icon" style={{
              color: 'var(--primary-color)'
            }} />
            <span>Features</span>
          </a>
          <a href="#battle-modes" className="nav-link theme-transition" style={{
            color: !darkMode ? '#555' : 'var(--text)',
            fontWeight: !darkMode ? '500' : '600'
          }}>
            <FontAwesomeIcon icon={faTrophy} className="nav-icon" style={{
              color: 'var(--primary-color)'
            }} />
            <span>Battles</span>
          </a>
          <a href="#leaderboard" className="nav-link theme-transition" style={{
            color: !darkMode ? '#555' : 'var(--text)',
            fontWeight: !darkMode ? '500' : '600'
          }}>
            <FontAwesomeIcon icon={faRankingStar} className="nav-icon" style={{
              color: 'var(--primary-color)'
            }} />
            <span>Leaderboard</span>
          </a>
        </div>
        
        <div className="header-actions">
          <button 
            className={`theme-toggle ${darkMode ? 'dark-mode' : 'light-mode'} ${isThemeChanging ? 'theme-changing' : ''}`} 
            onClick={toggleDarkMode}
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            aria-pressed={darkMode}
            style={{
              border: !darkMode ? '1px solid rgba(0, 0, 0, 0.05)' : 'none',
              borderRadius: '30px',
              padding: '2px'
            }}
          >
            <div className="toggle-track theme-transition" style={{
              background: !darkMode ? 'rgba(136, 186, 252, 0.25)' : '#2d3748'
            }}>
              <FontAwesomeIcon icon={faSun} className="light-icon" aria-hidden="true" style={{
                color: !darkMode ? '#ff9d00' : '#f6e05e'
              }} />
              <FontAwesomeIcon icon={faMoon} className="dark-icon" aria-hidden="true" style={{
                color: !darkMode ? '#a0aec0' : '#a0aec0'
              }} />
              <div className="toggle-thumb theme-transition"></div>
            </div>
            <span className="sr-only">{darkMode ? 'Switch to light mode' : 'Switch to dark mode'}</span>
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
                background: !darkMode ? 'rgba(var(--primary-color-rgb), 0.08)' : 'rgba(var(--primary-color-rgb), 0.1)',
                border: !darkMode ? '2px solid rgba(var(--primary-color-rgb), 0.2)' : '2px solid transparent'
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