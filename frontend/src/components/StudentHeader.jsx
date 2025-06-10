import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './StudentHeader.scss';
import FriendsSidebar from './FriendsSidebar';
import { 
  FaBell, 
  FaCog, 
  FaUser, 
  FaChevronDown, 
  FaGamepad, 
  FaCrown, 
  FaTrophy,
  FaSignOutAlt,
  FaCode,
  FaChartLine,
  FaLightbulb,
  FaBolt,
  FaPuzzlePiece,
  FaRunning,
  FaUsers,
  FaUserPlus,
  FaMedal,
  FaStore,
  FaFileAlt,
  FaCircle,
  FaGraduationCap,
  FaClock,
  FaHome,
  FaChartBar,
  FaMoon,
  FaCompress,
  FaSpinner,
  FaVolumeUp,
  FaUndo,
  FaCoins,
  FaSun
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, useSettings } from '../contexts/ThemeContext';

// Enhanced Cookie utility functions
const setCookie = (name, value, days = 365) => {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    document.cookie = `${name}=${encodeURIComponent(stringValue)};expires=${expires.toUTCString()};path=/;samesite=strict`;
    return true;
  } catch (error) {
    console.error('Error setting cookie:', error);
    return false;
  }
};

const getCookie = (name) => {
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const rawValue = c.substring(nameEQ.length, c.length);
        const value = decodeURIComponent(rawValue);
        // Try to parse as JSON if it looks like a JSON string
        if ((value.startsWith('{') && value.endsWith('}')) || 
            (value.startsWith('[') && value.endsWith(']'))) {
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        }
        return value;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// User settings management
const defaultSettings = {
  theme: 'dark',
  font: 'sans-serif',
  onlineStatus: true,
  notifications: true,
  soundEffects: true,
  animations: true,
  language: 'en',
  colorAccent: 'red', // Default accent color
  sessionTimeout: 60 // in minutes
};

const getUserSettings = () => {
  const savedSettings = getCookie('user_settings');
  return savedSettings ? { ...defaultSettings, ...savedSettings } : defaultSettings;
};

const saveUserSettings = (settings) => {
  const result = setCookie('user_settings', { ...getUserSettings(), ...settings });
  if (!result) {
    console.error('Failed to save user settings:', settings);
  }
  return result;
};

// Update the applyAllSettings function to remove the accent color part
const applyAllSettings = (settings) => {
  // Apply theme
  const isDark = settings.theme === 'dark';
  document.body.setAttribute('data-theme', settings.theme);
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
  }
  
  // Apply font
  document.body.style.fontFamily = settings.font;
  
  // Apply animations setting
  if (!settings.animations) {
    document.body.classList.add('disable-animations');
  } else {
    document.body.classList.remove('disable-animations');
  }
};

const StudentHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [playDropdownOpen, setPlayDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [friendSidebarOpen, setFriendSidebarOpen] = useState(false);
  
  // Use ThemeContext instead of local state
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSetting, resetSettings: resetContextSettings } = useSettings();
  
  // Initialize settings from cookies or defaults
  const savedSettings = getUserSettings();
  
  const [font, setFont] = useState(savedSettings.font);
  const [isOnline, setIsOnline] = useState(savedSettings.onlineStatus);
  const [soundEffects, setSoundEffects] = useState(savedSettings.soundEffects);
  const [showAnimations, setShowAnimations] = useState(savedSettings.animations);
  const [colorAccent, setColorAccent] = useState(savedSettings.colorAccent);
  
  // Keep darkMode state in sync with theme
  const [darkMode, setDarkMode] = useState(theme === 'dark');

  // Refs for dropdown elements
  const playDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  
  // Apply theme changes to document
  useEffect(() => {
    setDarkMode(theme === 'dark');
  }, [theme]);
  
  // Get user data from auth context or use mock data
  const authContext = useAuth();
  const mockUser = {
    id: 1,
    name: 'laravel lmnida',
    email: 'user@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'student',
    status: 'online',
    gameStats: {
      progressive: {
        level: 1,
        completed: 0
      },
      ranked: {
        rating: '#-',
        winRate: 'No game win rate'
      }
    }
  };
  
  // Use the user from auth context if available, otherwise use mock data
  const user = authContext?.user || mockUser;
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Skip if clicking overlay (it already handles closing)
      if (event.target.classList.contains('dropdown-overlay')) {
        return;
      }

      // Check play dropdown
      if (playDropdownRef.current && !playDropdownRef.current.contains(event.target) && 
          !event.target.closest('.nav-btn')) {
        setPlayDropdownOpen(false);
      }

      // Check notifications dropdown
      if (notificationsDropdownRef.current && !notificationsDropdownRef.current.contains(event.target) && 
          !event.target.closest('.notifications-btn')) {
        setNotificationsOpen(false);
      }

      // Check settings dropdown
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target) && 
          !event.target.closest('.settings-btn')) {
        setSettingsOpen(false);
      }

      // Check profile dropdown
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target) && 
          !event.target.closest('.profile-button')) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Initialize settings
  useEffect(() => {
    // Get saved settings and apply them
    const settings = getUserSettings();
    
    // Update all state values
    setFont(settings.font);
    setIsOnline(settings.onlineStatus);
    setSoundEffects(settings.soundEffects);
    setShowAnimations(settings.animations);
    setColorAccent(settings.colorAccent);
    
    // Apply all settings at once
    applyAllSettings(settings);
    
    // Log success
    console.log('Settings initialized from cookies:', settings);
  }, []);
  
  useEffect(() => {
    document.body.style.fontFamily = font;
    saveUserSettings({ font });
  }, [font]);
  
  useEffect(() => {
    saveUserSettings({ onlineStatus: isOnline });
  }, [isOnline]);

  useEffect(() => {
    saveUserSettings({ soundEffects });
  }, [soundEffects]);

  useEffect(() => {
    saveUserSettings({ animations: showAnimations });
  }, [showAnimations]);

  // Font change handler
  const handleFontChange = (newFont) => {
    setFont(newFont);
    saveUserSettings({ font: newFont });
  };
  
  // Toggle online status
  const toggleOnlineStatus = () => {
    const newStatus = !isOnline;
    setIsOnline(newStatus);
    saveUserSettings({ onlineStatus: newStatus });
  };

  // Toggle sound effects
  const toggleSoundEffects = () => {
    const newValue = !soundEffects;
    setSoundEffects(newValue);
    saveUserSettings({ soundEffects: newValue });
  };

  // Toggle animations
  const toggleAnimations = () => {
    const newValue = !showAnimations;
    setShowAnimations(newValue);
    saveUserSettings({ animations: newValue });
  };
  
  // Simplify the changeColorAccent function since we're removing the feature
  const changeColorAccent = (color) => {
    // Still save the preference but don't apply it visually
    setColorAccent(color);
    saveUserSettings({ colorAccent: color });
  };
  
  // Close all dropdowns
  const closeAllDropdowns = () => {
    setPlayDropdownOpen(false);
    setNotificationsOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
  };
  
  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    setPlayDropdownOpen(false);
    setNotificationsOpen(false);
    setSettingsOpen(false);
  };

  const togglePlayDropdown = (e) => {
    e.stopPropagation();
    setPlayDropdownOpen(!playDropdownOpen);
    setNotificationsOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setNotificationsOpen(!notificationsOpen);
    setPlayDropdownOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
  };

  const toggleSettings = (e) => {
    e.stopPropagation();
    setSettingsOpen(!settingsOpen);
    if (!settingsOpen) {
      // Only close other dropdowns when opening settings
      setPlayDropdownOpen(false);
      setNotificationsOpen(false);
      setProfileOpen(false);
    }
  };
  
  // Count unread notifications
  const unreadNotifications = 3;
  
  const resetSettings = () => {
    // Reset all settings using context
    resetContextSettings();
    
    // Update local state to match reset settings
    setFont(defaultSettings.font);
    setIsOnline(defaultSettings.onlineStatus);
    setSoundEffects(defaultSettings.soundEffects);
    setShowAnimations(defaultSettings.animations);
    setColorAccent(defaultSettings.colorAccent);
    
    // Clear the cookie
    deleteCookie('user_settings');
    
    // Show a reset notification
    const notification = document.createElement('div');
    notification.className = 'settings-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-undo notification-icon"></i>
        <span>Settings Reset to Defaults</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Remove the notification after animation completes
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 1500);
  };
  
  return (
    <div className={`student-header ${theme === 'dark' ? 'dark' : 'light'}`}>
      <header className={isScrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">
                <Link to="/dashboard">
                  <div className="logo-text">
                    <span className="logo-techno">Techno</span>
                    <span className="logo-match">Match</span>
                  </div>
                </Link>
              </div>
            </div>
            
            <div className="navigation-container">
              <nav className="navigation">
                <Link to="/dashboard" className="nav-item">
                  <FaHome className="nav-icon" />
                  <span>Dashboard</span>
                  <div className="nav-highlight"></div>
                </Link>
                
                <button 
                  className={`nav-btn play-button ${playDropdownOpen ? 'active' : ''}`}
                  onClick={togglePlayDropdown}
                >
                  <span className="play-icon">▶</span>
                  <span>Play</span>
                  <FaChevronDown className={`dropdown-arrow ${playDropdownOpen ? 'open' : ''}`} />
                </button>
                
                <Link to="/classes" className="nav-item">
                  <FaGraduationCap className="nav-icon" />
                  <span>Classes</span>
                  <div className="nav-highlight"></div>
                </Link>
              </nav>
              
              {playDropdownOpen && (
                <div className="dropdown-menu play-dropdown game-card" ref={playDropdownRef}
                  style={{
                    display: 'block',
                    visibility: 'visible',
                    opacity: 1,
                    zIndex: 999,
                    ...(showAnimations ? {
                      animation: "dropdownFadeIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                    } : {})
                  }}
                >
                  <div className="dropdown-header">
                    <h3><FaGamepad className="header-icon" /> Game Modes</h3>
                    <div className="dropdown-glint"></div>
                  </div>
                  <div className="game-modes-list">
                    <Link to="/play/progressive" className="game-mode-row">
                      <div className="game-mode-icon progressive">
                        <FaChartLine />
                        <div className="icon-glow"></div>
                      </div>
                      <div className="game-mode-content">
                        <div className="game-mode-name">Progressive</div>
                        <div className="game-mode-description">Level up by completing challenges</div>
                        <div className="game-mode-stats">
                          <div className="progress-bar">
                            <div className="progress" style={{width: `${user.gameStats.progressive.completed * 10}%`}}></div>
                          </div>
                          <span className="level-tag">Level {user.gameStats.progressive.level}</span>
                        </div>
                      </div>
                      <div className="game-mode-action">
                        <div className="play-now-btn">Play Now</div>
                      </div>
                    </Link>
                    
                    <Link to="/play/ranked" className="game-mode-row">
                      <div className="game-mode-icon ranked">
                        <FaMedal />
                        <div className="icon-glow"></div>
                      </div>
                      <div className="game-mode-content">
                        <div className="game-mode-name">Ranked</div>
                        <div className="game-mode-description">Compete against others to climb</div>
                        <div className="game-mode-stats">
                          <div className="rank-tag">{user.gameStats.ranked.rating}</div>
                          <div className="win-rate">{user.gameStats.ranked.winRate}</div>
                        </div>
                      </div>
                      <div className="game-mode-action">
                        <div className="play-now-btn">Play Now</div>
                      </div>
                    </Link>
                    
                    <div className="game-mode-row locked">
                      <div className="game-mode-icon contest">
                        <FaClock />
                        <div className="lock-icon"><span>🔒</span></div>
                      </div>
                      <div className="game-mode-content">
                        <div className="game-mode-name">Contest</div>
                        <div className="game-mode-description">Scheduled competitive events</div>
                        <div className="unlock-text">Coming soon</div>
                      </div>
                      <div className="game-mode-action">
                        <div className="play-now-btn locked">Coming Soon</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="header-right">
              <div className="header-actions">
                <button 
                  className="action-btn friends-btn"
                  onClick={() => setFriendSidebarOpen(true)}
                >
                  <FaUsers className="action-icon" />
                  <div className="badge online-badge">
                    <span>3</span>
                  </div>
                </button>
                
                <button 
                  className={`action-btn notifications-btn ${notificationsOpen ? 'active' : ''}`}
                  onClick={toggleNotifications}
                >
                  <FaBell className="action-icon" />
                  {unreadNotifications > 0 && (
                    <div className="badge notification-badge">
                      <span>{unreadNotifications}</span>
                    </div>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="dropdown-menu notifications-dropdown game-card" ref={notificationsDropdownRef}
                    style={{
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      zIndex: 999,
                      ...(showAnimations ? {
                        animation: "dropdownFadeIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                      } : {})
                    }}
                    role="dialog"
                    aria-label="Notifications"
                  >
                    <div className="dropdown-header">
                      <h3><FaBell className="header-icon" /> Notifications</h3>
                      <button className="mark-all-read" aria-label="Mark all notifications as read">
                        <span className="btn-text">Mark all as read</span>
                        <div className="btn-glow"></div>
                      </button>
                      <div className="dropdown-glint"></div>
                    </div>
                    
                    <div className="notifications-list">
                      <div className="notification-item unread">
                        <div className="notification-icon friend-request">
                          <FaUserPlus />
                          <div className="pulse-effect"></div>
                        </div>
                        <div className="notification-content">
                          <div className="notification-text">Friend Request</div>
                          <div className="notification-description">John Doe wants to connect with you</div>
                          <div className="notification-time">5m ago</div>
                          <div className="notification-actions">
                            <button className="action-btn accept-btn">Accept</button>
                            <button className="action-btn decline-btn">Decline</button>
                          </div>
                        </div>
                        <div className="notification-glow"></div>
                      </div>
                      
                      <div className="notification-item unread">
                        <div className="notification-icon challenge">
                          <FaCode />
                          <div className="pulse-effect"></div>
                        </div>
                        <div className="notification-content">
                          <div className="notification-text">New Challenge Available</div>
                          <div className="notification-description">Try our new React components challenge!</div>
                          <div className="notification-time">10m ago</div>
                          <div className="notification-actions">
                            <button className="action-btn view-btn">View Challenge</button>
                          </div>
                        </div>
                        <div className="notification-glow"></div>
                      </div>
                      
                      <div className="notification-item unread">
                        <div className="notification-icon ranked">
                          <FaTrophy />
                        </div>
                        <div className="notification-content">
                          <div className="notification-text">Rank Updated</div>
                          <div className="notification-description">Congratulations! You reached TechnoMatch tier.</div>
                          <div className="notification-time">2h ago</div>
                        </div>
                      </div>
                      
                      <div className="notification-item">
                        <div className="notification-icon achievement">
                          <FaCrown />
                        </div>
                        <div className="notification-content">
                          <div className="notification-text">Achievement Unlocked</div>
                          <div className="notification-description">You've earned the 'Quick Learner' badge!</div>
                          <div className="notification-time">6h ago</div>
                        </div>
                      </div>
                      
                      <div className="notification-item">
                        <div className="notification-icon coins">
                          <FaCoins />
                        </div>
                        <div className="notification-content">
                          <div className="notification-text">Coins Awarded</div>
                          <div className="notification-description">You earned 50 coins for completing daily challenge.</div>
                          <div className="notification-time">1d ago</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="dropdown-footer">
                      <Link to="/notifications" className="view-all">
                        View all notifications
                        <div className="btn-highlight"></div>
                      </Link>
                    </div>
                  </div>
                )}
                
                <button 
                  className={`action-btn settings-btn ${settingsOpen ? 'active' : ''}`}
                  onClick={toggleSettings}
                  aria-expanded={settingsOpen}
                  aria-controls="settings-dropdown"
                >
                  <FaCog className="action-icon" />
                </button>
                
                {settingsOpen && (
                  <div 
                    id="settings-dropdown"
                    className="dropdown-menu settings-dropdown game-card" 
                    ref={settingsDropdownRef}
                    style={{
                      display: 'block',
                      visibility: 'visible',
                      opacity: 1,
                      zIndex: 999,
                      ...(showAnimations ? {
                        animation: "dropdownFadeIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                      } : {})
                    }}
                    role="dialog"
                    aria-label="Settings"
                  >
                    <div className="dropdown-header">
                      <h3><FaCog className="header-icon spin-slow" /> Settings</h3>
                      <div className="dropdown-glint"></div>
                    </div>
                    
                    <div className="settings-section" style={{ ...(!showAnimations ? {} : { "--index": 0 }) }}>
                      <h4 className="settings-section-title">APPEARANCE</h4>
                      <div className="settings-option">
                        <span>
                          <FaMoon className="settings-icon" />
                          Dark Mode
                        </span>
                        <button 
                          className={`toggle-btn ${theme === 'dark' ? 'active' : ''}`}
                          onClick={toggleTheme}
                          aria-pressed={theme === 'dark'}
                          role="switch"
                        >
                          <span className="toggle-track">
                            <span className="toggle-thumb">
                              {theme === 'dark' ? <FaMoon size={10} /> : <FaSun size={10} />}
                            </span>
                          </span>
                          <div className="toggle-highlight"></div>
                        </button>
                      </div>
                      
                      <div className="settings-option">
                        <span>
                          <FaSpinner className="settings-icon" />
                          Animations
                        </span>
                        <button 
                          className={`toggle-btn ${showAnimations ? 'active' : ''}`}
                          onClick={toggleAnimations}
                          aria-pressed={showAnimations}
                          role="switch"
                        >
                          <span className="toggle-track">
                            <span className="toggle-thumb"></span>
                          </span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="settings-section" style={{ ...(!showAnimations ? {} : { "--index": 1 }) }}>
                      <h4 className="settings-section-title">FONT</h4>
                      <div className="font-options">
                        <button 
                          className={`font-option ${font === 'sans-serif' ? 'active' : ''}`}
                          onClick={() => handleFontChange('sans-serif')}
                        >
                          <span className="font-name">System UI</span>
                        </button>
                        
                        <button 
                          className={`font-option ${font === 'serif' ? 'active' : ''}`}
                          onClick={() => handleFontChange('serif')}
                        >
                          <span className="font-name">Serif</span>
                        </button>
                        
                        <button 
                          className={`font-option ${font === 'monospace' ? 'active' : ''}`}
                          onClick={() => handleFontChange('monospace')}
                        >
                          <span className="font-name">Monospace</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="settings-section" style={{ ...(!showAnimations ? {} : { "--index": 2 }) }}>
                      <h4 className="settings-section-title">NOTIFICATIONS</h4>
                      <div className="settings-option">
                        <span>
                          <FaVolumeUp className="settings-icon" />
                          Sound Effects
                        </span>
                        <button 
                          className={`toggle-btn ${soundEffects ? 'active' : ''}`}
                          onClick={toggleSoundEffects}
                          aria-pressed={soundEffects}
                          role="switch"
                        >
                          <span className="toggle-track">
                            <span className="toggle-thumb"></span>
                          </span>
                        </button>
                      </div>
                      
                      <div className="settings-option">
                        <span>
                          <FaCircle className="settings-icon online-status-icon" />
                          Online Status
                        </span>
                        <button 
                          className={`toggle-btn ${isOnline ? 'active' : ''}`}
                          onClick={toggleOnlineStatus}
                          aria-pressed={isOnline}
                          role="switch"
                        >
                          <span className="toggle-track">
                            <span className="toggle-thumb"></span>
                          </span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="settings-footer">
                      <button 
                        className="reset-settings-btn"
                        onClick={resetSettings}
                      >
                        <FaUndo className="reset-icon" /> Reset to Defaults
                        <div className="btn-highlight"></div>
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="profile">
                  <button 
                    className="profile-button" 
                    onClick={toggleProfile}
                    aria-expanded={profileOpen}
                    aria-controls="profile-dropdown"
                  >
                    <div className="profile-img-container">
                      <img src={user.avatar} alt={user.name} />
                      <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></div>
                    </div>
                    <div className="profile-name">
                      <span className="username">{user.name}</span>
                      <span className="user-role">
                        <FaGraduationCap className="role-icon" />
                        Student
                      </span>
                    </div>
                    <div className="profile-button-shine"></div>
                    <FaChevronDown className={`chevron ${profileOpen ? 'open' : ''}`} />
                  </button>
                  
                  {profileOpen && (
                    <div 
                      id="profile-dropdown"
                      className="dropdown-menu profile-dropdown game-card"
                      ref={profileDropdownRef}
                      style={{
                        display: 'block',
                        visibility: 'visible',
                        opacity: 1,
                        zIndex: 999,
                        ...(showAnimations ? {
                          animation: "dropdownFadeIn 0.3s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                        } : {})
                      }}
                      role="dialog"
                      aria-label="User profile"
                    >
                      <div className="dropdown-header">
                        <h3><FaUser className="header-icon" /> My Profile</h3>
                        <div className="dropdown-glint"></div>
                      </div>
                      
                      <div className="profile-simple">
                        <div className="profile-avatar">
                          <img src={user.avatar} alt={user.name} />
                          <div className="level-badge">LVL {user.gameStats.progressive.level}</div>
                        </div>
                        <div className="profile-info">
                          <h3 className="profile-name">{user.name}</h3>
                          <div className="profile-status-container">
                            <div className="profile-status-label">Student</div>
                            <div className="profile-status-online">
                              <span className="status-dot"></span>
                              Online
                            </div>
                          </div>
                          <div className="xp-progress">
                            <div className="xp-bar">
                              <div className="xp-fill" style={{width: "65%"}}></div>
                            </div>
                            <div className="xp-text">650 / 1000 XP</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="profile-stats">
                        <div className="stat-item">
                          <div className="stat-value">42</div>
                          <div className="stat-label">Challenges</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                          <div className="stat-value">8</div>
                          <div className="stat-label">Badges</div>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                          <div className="stat-value">75%</div>
                          <div className="stat-label">Win Rate</div>
                        </div>
                      </div>
                      
                      <div className="profile-menu-simple">
                        <Link to="/profile" className="menu-item-simple" style={showAnimations ? { animation: "menuItemIn 0.3s ease-out forwards", animationDelay: "0.05s" } : {}}>
                          <FaUser className="menu-icon-simple" />
                          <span>View Full Profile</span>
                          <div className="item-highlight"></div>
                        </Link>
                        
                        <Link to="/achievements" className="menu-item-simple" style={showAnimations ? { animation: "menuItemIn 0.3s ease-out forwards", animationDelay: "0.1s" } : {}}>
                          <FaTrophy className="menu-icon-simple" />
                          <span>Achievements</span>
                          <div className="item-highlight"></div>
                        </Link>
                        
                        <Link to="/settings" className="menu-item-simple" style={showAnimations ? { animation: "menuItemIn 0.3s ease-out forwards", animationDelay: "0.15s" } : {}}>
                          <FaCog className="menu-icon-simple" />
                          <span>Settings</span>
                          <div className="item-highlight"></div>
                        </Link>
                        
                        <Link to="/logout" className="menu-item-simple logout" style={showAnimations ? { animation: "menuItemIn 0.3s ease-out forwards", animationDelay: "0.2s" } : {}}>
                          <FaSignOutAlt className="menu-icon-simple" />
                          <span>Log Out</span>
                          <div className="item-highlight"></div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Friends Sidebar */}
      {friendSidebarOpen && <FriendsSidebar onClose={() => setFriendSidebarOpen(false)} theme={theme} />}
      
      {/* Overlay to close dropdowns when clicking outside */}
      {(playDropdownOpen || notificationsOpen || settingsOpen || profileOpen) && (
        <div 
          className="dropdown-overlay"
          onClick={closeAllDropdowns}
        ></div>
      )}
    </div>
  );
};

export default StudentHeader;