import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch, FaUserPlus, FaCircle, FaEllipsisV, FaCommentAlt, FaGamepad, FaChevronRight, FaUsers, FaUserFriends } from 'react-icons/fa';
import { useSettings } from '../contexts/ThemeContext'; // Import the settings context
import './FriendsSidebar.scss';

const FriendsSidebar = ({ onClose, theme = 'dark', isCompact = false }) => {
  const [activeTab, setActiveTab] = useState('online');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  
  // Get settings from context
  const settingsContext = useSettings ? useSettings() : null;
  
  // Use settings from context if available, otherwise use props
  const effectiveTheme = settingsContext?.settings?.theme || theme;
  const effectiveCompactMode = settingsContext?.settings?.compactMode !== undefined ? 
    settingsContext.settings.compactMode : isCompact;
  const showAnimations = settingsContext?.settings?.animations !== undefined ?
    settingsContext.settings.animations : true;
  
  // Set mounted state after initial render for animations
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Mock friends data
  const friends = [
    {
      id: 1,
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'online',
      game: 'Progressive Mode',
      lastActive: 'Now'
    },
    {
      id: 2,
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      status: 'online',
      game: null,
      lastActive: 'Now'
    },
    {
      id: 3,
      name: 'Sophia Clark',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      status: 'offline',
      game: null,
      lastActive: '3h ago'
    },
    {
      id: 4,
      name: 'James Davis',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      status: 'online',
      game: 'Competitive Mode',
      lastActive: 'Now'
    },
    {
      id: 5,
      name: 'Olivia Taylor',
      avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
      status: 'offline',
      game: null,
      lastActive: '2d ago'
    }
  ];

  // Mock friend requests
  const friendRequests = [
    {
      id: 101,
      name: 'Daniel Lewis',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      mutualFriends: 3
    },
    {
      id: 102,
      name: 'Isabella Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
      mutualFriends: 1
    }
  ];

  // Filter friends based on search and active tab
  const filteredFriends = friends.filter(friend => {
    // Filter by search query
    if (searchQuery && !friend.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by tab
    if (activeTab === 'online' && friend.status !== 'online') {
      return false;
    }
    
    if (activeTab === 'all') {
      return true;
    }
    
    return true;
  });

  // Set animation classes
  const sidebarClasses = [
    'friends-sidebar',
    effectiveTheme,
    effectiveCompactMode ? 'compact-mode' : '',
    mounted && showAnimations ? 'animated' : 'no-animation'
  ].filter(Boolean).join(' ');

  // Handle closing with animation
  const handleClose = () => {
    if (showAnimations && mounted) {
      const sidebar = document.querySelector('.friends-sidebar');
      sidebar.classList.add('slide-out');
      setTimeout(() => {
        onClose();
      }, 300); // Match animation duration in CSS
    } else {
      onClose();
    }
  };

  return (
    <div className={sidebarClasses}>
      <div className={`friends-header ${effectiveCompactMode ? 'compact-header' : ''}`}>
        <h3>
          {effectiveCompactMode ? 'Friends' : 'Friends List'}
          <span className="friends-count">{friends.length}</span>
        </h3>
        <div className="header-actions">
          {effectiveCompactMode && (
            <span className="online-count">
              <FaCircle className="online-indicator" />
              {friends.filter(f => f.status === 'online').length} online
            </span>
          )}
          <button className="close-btn" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder={effectiveCompactMode ? "Search..." : "Search friends..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="add-friend-btn">
          <FaUserPlus />
        </button>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'online' ? 'active' : ''}`}
          onClick={() => setActiveTab('online')}
        >
          Online
          <span className="badge">{friends.filter(f => f.status === 'online').length}</span>
        </button>
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
          <span className="badge">{friends.length}</span>
        </button>
        <button 
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
          <span className="badge">{friendRequests.length}</span>
        </button>
      </div>

      <div className="friends-content">
        {activeTab !== 'requests' && (
          <div className="friends-list">
            {filteredFriends.length > 0 ? (
              <>
                {filteredFriends.map(friend => (
                  <div key={friend.id} className="friend-item">
                    <div className="friend-avatar">
                      <img src={friend.avatar} alt={friend.name} />
                      <span className={`status-indicator ${friend.status}`}>
                        <FaCircle />
                      </span>
                    </div>
                    <div className="friend-info">
                      <div className="friend-name">{friend.name}</div>
                      <div className="friend-status">
                        {friend.status === 'online' ? (
                          friend.game ? (
                            <span className="playing">
                              <FaGamepad /> {friend.game}
                            </span>
                          ) : (
                            <span className="online">Online</span>
                          )
                        ) : (
                          <span className="offline">Last online {friend.lastActive}</span>
                        )}
                      </div>
                    </div>
                    <div className="friend-actions">
                      {friend.status === 'online' && (
                        <button className="action-btn chat-btn">
                          <FaCommentAlt />
                        </button>
                      )}
                      <button className="action-btn more-btn">
                        <FaEllipsisV />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="view-all-container">
                  <button className="view-all-btn">
                    <FaUserFriends />
                    <span>View All Friends</span>
                    <FaChevronRight className="chevron-icon" />
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No friends found{searchQuery ? ' matching your search' : ''}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-list">
            {friendRequests.length > 0 ? (
              <>
                {friendRequests.map(request => (
                  <div key={request.id} className="request-item">
                    <div className="friend-avatar">
                      <img src={request.avatar} alt={request.name} />
                    </div>
                    <div className="request-info">
                      <div className="friend-name">{request.name}</div>
                      <div className="mutual-friends">
                        {request.mutualFriends} mutual {request.mutualFriends === 1 ? 'friend' : 'friends'}
                      </div>
                    </div>
                    <div className="request-actions">
                      <button className="accept-btn">Accept</button>
                      <button className="decline-btn">Decline</button>
                    </div>
                  </div>
                ))}
                <div className="view-all-container">
                  <button className="view-all-btn">
                    <FaUsers />
                    <span>View All Requests</span>
                    <FaChevronRight className="chevron-icon" />
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>No friend requests</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsSidebar; 