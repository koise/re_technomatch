import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  FaUserPlus
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import '../styles/main.scss';
import '../styles/global.scss';
import './StudentHeader.scss';
import FriendsSidebar from './FriendsSidebar';

const StudentHeader = () => {
  const { theme, toggleTheme } = useAuth();
  
  // State for dropdown menus
  const [playDropdownOpen, setPlayDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [friendSidebarOpen, setFriendSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showXpAnimation, setShowXpAnimation] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    level: 42,
    xp: 35,
    maxXp: 50,
    rank: "TechnoCrat",
    rankColor: "linear-gradient(135deg, #00c6ff, #0072ff)",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };
  
  // Mock notifications
  const notifications = [
    { id: 1, title: 'New Challenge', message: 'Tree Traversal challenge is available', time: '2h ago', read: false, icon: <FaCode />, type: 'challenge' },
    { id: 2, title: 'Achievement Unlocked', message: '7-day streak achieved!', time: '1d ago', read: true, icon: <FaTrophy />, type: 'achievement' }
  ];

  // Play menu options
  const playOptions = [
    { 
      id: 1, 
      name: 'Progressive', 
      icon: <FaRunning />, 
      color: '#4776E6',
      description: 'Learn at your own pace'
    },
    { 
      id: 2, 
      name: 'Competitive', 
      icon: <FaTrophy />, 
      color: '#FF416C',
      description: 'Compete with other students'
    },
    { 
      id: 3, 
      name: 'Contest', 
      icon: <FaPuzzlePiece />, 
      color: '#8E2DE2',
      description: 'Coming Soon',
      disabled: true
    }
  ];
  
  // Simulated XP gain animation effect
  useEffect(() => {
    // Simulate XP gain every 30 seconds
    const interval = setInterval(() => {
      const randomXP = Math.floor(Math.random() * 5) + 1;
      setXpGained(randomXP);
      setShowXpAnimation(true);
      setTimeout(() => setShowXpAnimation(false), 3000);
    }, 30000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Close all dropdowns
  const closeAllDropdowns = () => {
    setPlayDropdownOpen(false);
    setNotificationsOpen(false);
    setSettingsOpen(false);
    setProfileOpen(false);
  };
  
  // Toggle functions
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
    setPlayDropdownOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
  };
  
  const toggleProfile = (e) => {
    e.stopPropagation();
    setProfileOpen(!profileOpen);
    setPlayDropdownOpen(false);
    setNotificationsOpen(false);
    setSettingsOpen(false);
  };
  
  const toggleFriendSidebar = (e) => {
    e.stopPropagation();
    setFriendSidebarOpen(!friendSidebarOpen);
    closeAllDropdowns();
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className={`student-header ${isScrolled ? 'scrolled' : ''} ${theme === 'light' ? 'light' : 'dark'}`}>
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo-container">
              <Link to="/dashboard" className="logo">
                <span className="logo-techno">Techno</span>
                <span className="logo-match">Match</span>
              </Link>
            </div>
            
            {/* Navigation - Centered */}
            <nav className="main-nav">
              <Link to="/dashboard" className="nav-item active">
                <FaChartLine className="nav-icon" />
                <span>Dashboard</span>
                <div className="nav-highlight"></div>
              </Link>
              
              {/* Play Button Dropdown - Centered */}
              <div className="nav-item-dropdown">
                <button 
                  className="nav-btn play-btn"
                  onClick={togglePlayDropdown}
                >
                  <FaGamepad className="nav-icon" />
                  <span>Play</span>
                  <FaChevronDown className="dropdown-arrow" />
                  <div className="nav-highlight"></div>
                </button>
                
                {playDropdownOpen && (
                  <div className="dropdown-menu game-modes-dropdown game-themed-dropdown">
                    <div className="dropdown-header">
                      <h3>SELECT GAME MODE</h3>
                    </div>
                    <div className="game-modes-container">
                      {playOptions.map(option => (
                        <Link 
                          to={option.disabled ? "#" : `/play/${option.id}`} 
                          key={option.id} 
                          className={`game-mode-item ${option.disabled ? 'disabled' : ''}`}
                          onClick={e => option.disabled && e.preventDefault()}
                        >
                          <div className="game-mode-icon" style={{ backgroundColor: `${option.color}20`, color: option.color }}>
                            {option.icon}
                          </div>
                          <div className="game-mode-content">
                            <span className="game-mode-name">{option.name}</span>
                            <span className="game-mode-description">{option.description}</span>
                          </div>
                          {!option.disabled && 
                            <div className="game-mode-arrow">
                              <FaChevronDown />
                            </div>
                          }
                          {option.disabled && 
                            <div className="coming-soon-tag">COMING SOON</div>
                          }
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/classes" className="nav-item">
                <FaLightbulb className="nav-icon" />
                <span>Classes</span>
                <div className="nav-highlight"></div>
              </Link>
            </nav>
            
            {/* User Info & Icons */}
            <div className="user-controls">
              {/* XP and Level */}
              <div className={`user-progress ${showXpAnimation ? 'xp-gained' : ''}`}>
                <div className="level-badge">
                  {user.level}
                  <div className="level-glow"></div>
                </div>
                <div className="xp-container">
                  <div className="xp-bar">
                    <div className="xp-fill" style={{ width: `${Math.round((user.xp / user.maxXp) * 100)}%` }}></div>
                    <div className="xp-particles"></div>
                  </div>
                  <div className="xp-text">
                    <span className="xp-value">{user.xp}/{user.maxXp} XP</span>
                    {showXpAnimation && (
                      <span className="xp-gain">+{xpGained} XP</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Friends Button */}
              <div className="header-icon-container">
                <button 
                  className={`header-icon-btn ${friendSidebarOpen ? 'active' : ''}`}
                  onClick={toggleFriendSidebar}
                  aria-label="Friends"
                >
                  <FaUsers />
                </button>
              </div>
              
              {/* Notification Bell */}
              <div className="header-icon-container">
                <button 
                  className={`header-icon-btn ${notificationsOpen ? 'active' : ''} ${unreadCount > 0 ? 'has-alert' : ''}`}
                  onClick={toggleNotifications}
                  aria-label="Notifications"
                >
                  <FaBell />
                  {unreadCount > 0 && (
                    <span className="notification-count">{unreadCount}</span>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="dropdown-menu notifications-dropdown game-themed-dropdown">
                    <div className="dropdown-header">
                      <h3>Notifications</h3>
                      <button className="mark-all-read">Mark all as read</button>
                    </div>
                    <div className="notifications-list">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`notification-item ${!notification.read ? 'unread' : ''} notification-${notification.type}`}
                        >
                          <div className="notification-icon">
                            {notification.icon}
                          </div>
                          <div className="notification-content">
                            <div className="notification-title">{notification.title}</div>
                            <div className="notification-message">{notification.message}</div>
                            <div className="notification-time">{notification.time}</div>
                          </div>
                          {!notification.read && <div className="unread-indicator"></div>}
                        </div>
                      ))}
                    </div>
                    <div className="dropdown-footer">
                      <Link to="/notifications">View all notifications</Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Settings Dropdown */}
              <div className="header-icon-container">
                <button 
                  className={`header-icon-btn ${settingsOpen ? 'active' : ''}`}
                  onClick={toggleSettings}
                  aria-label="Settings"
                >
                  <FaCog />
                </button>
                
                {settingsOpen && (
                  <div className="dropdown-menu settings-dropdown game-themed-dropdown">
                    <div className="dropdown-header">
                      <h3>Settings</h3>
                    </div>
                    
                    <div className="settings-theme-section">
                      <div className="settings-section-title">
                        <FaLightbulb className="settings-section-icon" />
                        <span>Theme</span>
                      </div>
                      <ThemeToggle showLabel={true} size="medium" />
                    </div>
                    
                    <div className="dropdown-divider"></div>
                    
                    <Link to="/settings/profile" className="dropdown-item">
                      <FaUser className="dropdown-icon" />
                      <span>Profile Settings</span>
                    </Link>
                    <Link to="/settings/account" className="dropdown-item">
                      <FaCog className="dropdown-icon" />
                      <span>Account Settings</span>
                    </Link>
                    <Link to="/settings/notifications" className="dropdown-item">
                      <FaBell className="dropdown-icon" />
                      <span>Notification Settings</span>
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="profile-container">
                <button 
                  className={`profile-btn ${profileOpen ? 'active' : ''}`}
                  onClick={toggleProfile}
                >
                  <div className="avatar-wrapper">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="user-avatar"
                    />
                    <div className="avatar-border"></div>
                    <div className="avatar-rank-indicator" style={{ background: user.rankColor }}></div>
                  </div>
                  <div className="user-name-display">
                    <span>{user.name}</span>
                    <div className="user-rank-badge">
                      <FaCrown className="rank-icon" />
                      <span>{user.rank}</span>
                    </div>
                  </div>
                </button>
                
                {profileOpen && (
                  <div className="dropdown-menu profile-dropdown game-themed-dropdown">
                    <div className="profile-header">
                      <div className="profile-avatar">
                        <img src={user.avatar} alt={user.name} />
                        <div className="profile-level-badge">{user.level}</div>
                      </div>
                      <div className="profile-info">
                        <h3 className="profile-name">{user.name}</h3>
                        <div className="profile-rank" style={{ background: user.rankColor }}>
                          <FaCrown className="rank-icon" /> {user.rank}
                        </div>
                        <p className="profile-email">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="dropdown-content">
                      <Link to="/profile" className="dropdown-item">
                        <FaUser className="dropdown-icon" />
                        <span>Profile</span>
                      </Link>
                      <Link to="/settings" className="dropdown-item">
                        <FaCog className="dropdown-icon" />
                        <span>Settings</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link to="/logout" className="dropdown-item logout-item">
                        <FaSignOutAlt className="dropdown-icon" />
                        <span>Logout</span>
                      </Link>
                    </div>
                  </div>
                )}
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
    </>
  );
};

export default StudentHeader;
