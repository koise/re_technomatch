import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark,
  faEnvelope,
  faLock,
  faRightToBracket,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './LoginSidebar.scss';

// Mock user data for development
const MOCK_USERS = [
  { username: 'admin', email: 'admin@example.com', password: 'password123' },
  { username: 'testuser', email: 'test@example.com', password: 'testpass' }
];

const LoginSidebar = ({ isOpen, onClose }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  
  // Check for dark mode on mount and when theme changes
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = 
        document.documentElement.classList.contains('dark') || 
        localStorage.getItem('theme') === 'dark';
      setDarkMode(isDarkMode);
    };
    
    // Initial check
    checkDarkMode();
    
    // Listen for theme changes
    const handleThemeChange = (e) => {
      setDarkMode(e.detail.theme === 'dark');
    };
    
    window.addEventListener('themechange', handleThemeChange);
    
    return () => {
      window.removeEventListener('themechange', handleThemeChange);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Prepare the login data
    const loginData = {
      identifier, // This can be either username or email
      password,
      remember: rememberMe
    };
    
    try {
      // For development: Mock authentication
      // Comment this block when connecting to a real API
      /* Mock Authentication Start */
      const mockAuth = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const user = MOCK_USERS.find(
              user => (user.username === identifier || user.email === identifier) && user.password === password
            );
            
            if (user) {
              resolve({ 
                success: true, 
                data: { 
                  user: { id: 1, username: user.username, email: user.email },
                  token: 'mock-jwt-token-12345' 
                } 
              });
            } else {
              reject({ 
                success: false, 
                message: 'Invalid username/email or password' 
              });
            }
          }, 1000);
        });
      };
      
      const response = await mockAuth();
      
      // Store token and user data
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Close the sidebar
        onClose();
        
        // Redirect or update UI as needed
        // window.location.href = '/dashboard';
      }
      /* Mock Authentication End */
      
      // Uncomment the following for real API calls
      /*
      // Real API authentication
      const response = await axios.post('https://api.technomatch.com/auth/login', loginData);
      
      if (response.data.success) {
        // Store auth token in localStorage or cookies
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Close the sidebar
        onClose();
        
        // Redirect or update UI as needed
        // window.location.href = '/dashboard';
      }
      */
      
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      // Set error message
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className={`login-sidebar-overlay ${isOpen ? 'open' : ''} ${darkMode ? 'dark' : 'light'}`} onClick={onClose}>
      <div 
        className={`login-sidebar ${darkMode ? 'dark' : 'light'}`} 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: darkMode ? 'var(--dark-bg-secondary)' : 'var(--light-bg-secondary)',
          boxShadow: darkMode ? '0 0 25px rgba(0, 0, 0, 0.3)' : '-5px 0 25px rgba(0, 0, 0, 0.15)',
          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
        }}
      >
        <button 
          className="close-button" 
          onClick={onClose}
          style={{
            color: darkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        
        <div className="login-content">
          <div className="login-header">
            <h2>Welcome back</h2>
            <p style={{ color: darkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
              Sign in to continue your coding journey
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label 
                htmlFor="identifier"
                style={{ color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}
              >
                Email or Username
              </label>
              <div className="input-with-icon">
                <FontAwesomeIcon 
                  icon={faEnvelope} 
                  className="input-icon" 
                  style={{
                    color: darkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'
                  }}
                />
                <input
                  type="text"
                  id="identifier"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="your@email.com or username"
                  required
                  style={{
                    backgroundColor: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    borderColor: darkMode ? 'var(--dark-border)' : 'var(--light-border)'
                  }}
                />
              </div>
            </div>
            
            <div className="form-group">
              <div className="password-header">
                <label 
                  htmlFor="password"
                  style={{ color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}
                >
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="forgot-password"
                  style={{ color: 'var(--primary-color)' }}
                >
                  Forgot password?
                </Link>
              </div>
              <div className="input-with-icon">
                <FontAwesomeIcon 
                  icon={faLock} 
                  className="input-icon"
                  style={{
                    color: darkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'
                  }}
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    backgroundColor: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    borderColor: darkMode ? 'var(--dark-border)' : 'var(--light-border)'
                  }}
                />
              </div>
            </div>
            
            <div className="form-group checkbox-group">
              <label 
                className="checkbox-container"
                style={{ color: darkMode ? 'var(--dark-text)' : 'var(--light-text)' }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span 
                  className="checkmark"
                  style={{
                    backgroundColor: rememberMe ? 'var(--primary-color)' : (darkMode ? 'var(--dark-bg)' : 'var(--light-bg)'),
                    borderColor: rememberMe ? 'var(--primary-color)' : (darkMode ? 'var(--dark-border)' : 'var(--light-border)')
                  }}
                ></span>
                Remember me
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader"></div>
              ) : (
                <>
                  <FontAwesomeIcon icon={faRightToBracket} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>
          
          <div className="signup-prompt">
            <p style={{ color: darkMode ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)' }}>
              Don't have an account?
            </p>
            <Link 
              to="/signup/credentials" 
              className="signup-link"
              style={{ color: 'var(--primary-color)' }}
            >
              <FontAwesomeIcon icon={faUserPlus} />
              <span>Create Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSidebar; 