import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiUsers, FiSettings, FiChevronDown, FiBell, FiAward, FiTrendingUp, FiZap, FiClock, FiUser, FiLogOut } from 'react-icons/fi';

// Mock data for the header
const mockUserData = {
  id: 1,
  name: 'Laravel Ninja',
  username: 'laravel_ninja',
  email: 'ninja@example.com',
  profile: {
    avatar_path: '/avatar/default-7.svg',
    rank_title: 'Code Master',
    online_status: 'online',
    game_mode: 'progressive'
  },
  progressive: {
    level: 1,
    xp: 5,
    nextLevel: 20,
    completed: 12
  },
  ranked: {
    tier: 'Gold',
    points: 1450,
    position: 34,
    winRate: '68%'
  }
};

// Mock notifications
const mockNotifications = [
  {
    id: 1,
    type: 'challenge',
    title: 'New Challenge Available',
    content: 'Try our new React components challenge!',
    time: '10m ago',
    read: false,
    icon: 'FiCode'
  },
  {
    id: 2,
    type: 'rank',
    title: 'Rank Updated',
    content: 'Congratulations! You reached Gold tier.',
    time: '2h ago',
    read: false,
    icon: 'FiAward'
  }
];

// Logo Component
const Logo = () => {
  return (
    <div className="logo-section">
      <Link to="/dashboard" className="logo">
        <span className="logo-primary">Techno</span>
        <span className="logo-secondary">Match</span>
      </Link>
    </div>
  );
};

// ProgressDisplay Component
const ProgressDisplay = ({ userData, activeMode }) => {
  if (activeMode === 'progressive') {
    return (
      <div className="progress-display">
        <div className="progress-info progressive-mode">
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${((userData.progressive?.xp || 0) / (userData.progressive?.nextLevel || 20)) * 100}%` }}
            ></div>
          </div>
          <div className="progress-details">
            <span className="progress-level">Level {userData.progressive?.level || 0}</span>
            <span className="progress-xp">{userData.progressive?.xp || 0}/{userData.progressive?.nextLevel || 20} XP</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="progress-display">
        <div className="progress-info ranked-mode">
          <div className="rank-badge">
            <FiAward className="rank-icon" />
            <span className="rank-tier">{userData.ranked?.tier || 'Unranked'}</span>
          </div>
          <span className="rank-points">{userData.ranked?.points || 0} pts</span>
        </div>
      </div>
    );
  }
};

// PlayButton Component
const PlayButton = ({ activeMode, onGameModeChange }) => {
  const [showGameModeMenu, setShowGameModeMenu] = useState(false);

  const gameModes = [
    {
      id: 'progressive',
      name: 'Progressive',
      icon: <FiTrendingUp className="mode-icon" />,
      description: 'Level up by completing challenges'
    },
    {
      id: 'blitz',
      name: 'Blitz Mode',
      icon: <FiZap className="mode-icon" />,
      description: 'Competing with small amount of time'
    },
    {
      id: 'ranked',
      name: 'Ranked',
      icon: <FiAward className="mode-icon" />,
      description: 'Compete against others to climb leaderboards'
    },
    {
      id: 'contest',
      name: 'Contest',
      icon: <FiClock className="mode-icon" />,
      description: 'Scheduled competitive events — coming soon'
    }
  ];

  const toggleGameModeMenu = () => {
    setShowGameModeMenu(prev => !prev);
  };

  const handleGameModeClick = (mode) => {
    onGameModeChange(mode);
    setShowGameModeMenu(false);
  };

  return (
    <div className="game-play-container">
      <button 
        className="play-button"
        onClick={toggleGameModeMenu}
      >
        <FiPlay className="play-icon" />
        <span className="play-text">Play</span>
        <FiChevronDown className="dropdown-icon" />
      </button>

      {showGameModeMenu && (
        <div className="dropdown-menu game-mode-menu">
          <div className="dropdown-header">
            <h3>Select Game Mode</h3>
          </div>
          
          <div className="game-modes">
            {gameModes.map(mode => (
              <button 
                key={mode.id}
                className={`game-mode-option ${activeMode === mode.id ? 'active' : ''}`}
                onClick={() => handleGameModeClick(mode.id)}
                disabled={mode.id === 'contest'} 
              >
                {mode.icon}
                <div className="mode-details">
                  <span className="mode-name">{mode.name}</span>
                  <span className="mode-description">{mode.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Navigation Component
const Navigation = ({ activeMode, onGameModeChange }) => {
  return (
    <nav className="nav-links">
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
      <Link to="/classes" className="nav-link">Classes</Link>
      
      <PlayButton 
        activeMode={activeMode}
        onGameModeChange={onGameModeChange}
      />
      
      <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
    </nav>
  );
};

// ProfileMenu Component
const ProfileMenu = ({ userData }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(prev => !prev);
  };

  return (
    <div className="dropdown-container">
      <button 
        onClick={toggleProfileMenu}
        className="profile-button"
        aria-label="User profile"
      >
        <div className="avatar-container">
          <img 
            src={userData.profile?.avatar_path || '/avatar/default-7.svg'} 
            alt="User avatar" 
            className="avatar" 
          />
          <div className={`status-indicator ${userData.profile?.online_status || 'online'}`}></div>
        </div>
        <span className="user-name">{userData.name}</span>
        <FiChevronDown className="dropdown-icon" />
      </button>

      {showProfileMenu && (
        <div className="dropdown-menu profile-menu">
          <div className="profile-header">
            <div className="avatar-container large">
              <img 
                src={userData.profile?.avatar_path || '/avatar/default-7.svg'} 
                alt="User avatar" 
                className="large-avatar" 
              />
              <div className={`status-indicator large ${userData.profile?.online_status || 'online'}`}></div>
            </div>
            <div className="profile-info">
              <h3>{userData.name}</h3>
              <p>{userData.profile?.rank_title || userData.ranked?.tier || 'User'}</p>
              <span className="user-status-text">Online</span>
            </div>
          </div>
          
          <div className="profile-section">
            <h4>Game Stats</h4>
            <div className="game-stats">
              <div className="stat-item">
                <FiTrendingUp className="stat-icon progressive" />
                <div className="stat-details">
                  <span className="stat-label">Progressive</span>
                  <span className="stat-value">Level {userData.progressive?.level || 0} · {userData.progressive?.completed || 0} completed</span>
                </div>
              </div>
              <div className="stat-item">
                <FiAward className="stat-icon ranked" />
                <div className="stat-details">
                  <span className="stat-label">Ranked</span>
                  <span className="stat-value">{userData.ranked?.tier || 'Unranked'} · #{userData.ranked?.position || '-'} · {userData.ranked?.winRate || '0%'} win rate</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="profile-actions">
            <Link to="/profile" className="profile-action">
              <FiUser className="action-icon" />
              My Profile
            </Link>
            <Link to="/settings" className="profile-action">
              <FiSettings className="action-icon" />
              Account Settings
            </Link>
            <Link to="/logout" className="profile-action logout">
              <FiLogOut className="action-icon" />
              Log Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// NotificationsMenu Component
const NotificationsMenu = ({ notifications = [], hasUnreadNotifications = false }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotificationsMenu = () => {
    setShowNotifications(prev => !prev);
  };

  return (
    <div className="dropdown-container">
      <button 
        className="icon-button notification-button"
        onClick={toggleNotificationsMenu}
        aria-label="Notifications"
      >
        <FiBell className="icon" />
        {hasUnreadNotifications && <span className="notification-indicator"></span>}
      </button>

      {showNotifications && (
        <div className="dropdown-menu notifications-menu">
          <div className="dropdown-header">
            <h3>Notifications</h3>
          </div>
          
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                >
                  <div className={`notification-icon ${notification.type}`}>
                    {notification.icon === 'FiAward' ? <FiAward /> : <FiBell />}
                  </div>
                  <div className="notification-content">
                    <div className="notification-header">
                      <h4>{notification.title}</h4>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    <p>{notification.content}</p>
                  </div>
                  {!notification.read && <div className="unread-dot"></div>}
                </div>
              ))
            ) : (
              <div className="empty-notifications">
                <p>No notifications yet</p>
              </div>
            )}
          </div>
          
          <div className="notifications-footer">
            <Link to="/notifications">View all notifications</Link>
          </div>
        </div>
      )}
    </div>
  );
};

const AuthTopBar = () => {
  const [userData, setUserData] = useState(mockUserData);
  const [activeMode, setActiveMode] = useState('progressive');
  const [notifications, setNotifications] = useState(mockNotifications);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);

  // Game mode handling
  const handleGameModeChange = (mode) => {
    setActiveMode(mode);
  };

  return (
    <header className="technomatch-header">
      <div className="header-container">
        <Logo />

        <Navigation 
          activeMode={activeMode}
          onGameModeChange={handleGameModeChange}
        />

        <div className="header-actions">
          <ProgressDisplay 
            userData={userData}
            activeMode={activeMode}
          />

          <NotificationsMenu 
            notifications={notifications}
            hasUnreadNotifications={hasUnreadNotifications}
          />

          <ProfileMenu 
            userData={userData}
          />
        </div>
      </div>
    </header>
  );
};

export default AuthTopBar;