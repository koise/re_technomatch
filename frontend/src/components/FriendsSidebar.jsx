import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTimes, 
  FaSearch, 
  FaUserPlus, 
  FaCircle, 
  FaEllipsisV, 
  FaUserMinus, 
  FaBan, 
  FaChevronRight, 
  FaUsers, 
  FaUserFriends, 
  FaGamepad, 
  FaCheck,
  FaCrown,
  FaMedal,
  FaRegBell,
  FaStar,
  FaTrophy
} from 'react-icons/fa';
import { useSettings } from '../contexts/ThemeContext'; // Import the settings context
import { useToast } from '../contexts/ToastContext'; // Import the toast hook
import './FriendsSidebar.scss';

const FriendsSidebar = ({ onClose, theme = 'dark', isCompact = false }) => {
  const [activeTab, setActiveTab] = useState('online');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  
  // Get settings from context
  const settingsContext = useSettings ? useSettings() : null;
  
  // Get toast functions
  const toast = useToast ? useToast() : null;
  
  // Use settings from context if available, otherwise use props
  const effectiveTheme = settingsContext?.settings?.theme || theme;
  const showAnimations = settingsContext?.settings?.animations !== undefined ?
    settingsContext.settings.animations : true;
  
  // Set mounted state after initial render for animations
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Mock friends data with gaming stats
  const friends = [
    {
      id: 1,
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'online',
      game: 'Progressive Mode',
      lastActive: 'Now',
      level: 42,
      badge: 'Gold',
      recentAchievement: 'Master Tactician'
    },
    {
      id: 2,
      name: 'Michael Brown',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      status: 'online',
      game: null,
      lastActive: 'Now',
      level: 27,
      badge: 'Silver',
      recentAchievement: null
    },
    {
      id: 3,
      name: 'Sophia Clark',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      status: 'offline',
      game: null,
      lastActive: '3h ago',
      level: 19,
      badge: 'Bronze',
      recentAchievement: 'Quick Learner'
    },
    {
      id: 4,
      name: 'James Davis',
      avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
      status: 'online',
      game: 'Competitive Mode',
      lastActive: 'Now',
      level: 56,
      badge: 'Diamond',
      recentAchievement: 'Champion'
    },
    {
      id: 5,
      name: 'Olivia Taylor',
      avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
      status: 'offline',
      game: null,
      lastActive: '2d ago',
      level: 31,
      badge: 'Silver',
      recentAchievement: null
    }
  ];

  // Mock friend requests
  const friendRequests = [
    {
      id: 101,
      name: 'Daniel Lewis',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      mutualFriends: 3,
      level: 23
    },
    {
      id: 102,
      name: 'Isabella Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
      mutualFriends: 1,
      level: 15
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

  // Toggle the more menu for a friend
  const toggleMenu = (friendId) => {
    setActiveMenu(activeMenu === friendId ? null : friendId);
  };

  // Handle unfriend action
  const handleUnfriend = (friendId) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend && toast) {
      toast.showWarning(`Removed ${friend.name} from your friends`);
    }
    setActiveMenu(null);
    // Implement actual unfriend logic here
    console.log(`Unfriend user with ID: ${friendId}`);
  };

  // Handle block action
  const handleBlock = (friendId) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend && toast) {
      toast.showError(`Blocked ${friend.name}`);
    }
    setActiveMenu(null);
    // Implement actual block logic here
    console.log(`Block user with ID: ${friendId}`);
  };

  // Handle accepting a friend request
  const handleAcceptFriendRequest = (requestId) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request && toast) {
      toast.showAchievement(
        'New Friend Added', 
        `${request.name} is now your friend`
      );
    }
    // Implement actual accept logic here
    console.log(`Accept friend request with ID: ${requestId}`);
  };

  // Handle declining a friend request
  const handleDeclineFriendRequest = (requestId) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (request && toast) {
      toast.showInfo(`Declined ${request.name}'s friend request`);
    }
    // Implement actual decline logic here
    console.log(`Decline friend request with ID: ${requestId}`);
  };

  // Handle viewing all friends
  const handleViewAllFriends = () => {
    // Navigate to friends page or expand the list
    console.log('View all friends clicked');
    if (toast) {
      toast.showInfo('Navigating to Friends page');
    }
    // Implement actual navigation here
  };

  // Handle viewing all friend requests
  const handleViewAllRequests = () => {
    // Navigate to requests page or expand the list
    console.log('View all requests clicked');
    if (toast) {
      toast.showInfo('Navigating to Friend Requests page');
    }
    // Implement actual navigation here
  };

  // Render badge icon based on badge type
  const renderBadgeIcon = (badge) => {
    switch (badge?.toLowerCase()) {
      case 'gold':
        return <FaTrophy style={{ color: '#FFD700' }} />;
      case 'diamond':
        return <FaCrown style={{ color: '#B9F2FF' }} />;
      case 'silver':
        return <FaMedal style={{ color: '#C0C0C0' }} />;
      case 'bronze':
        return <FaMedal style={{ color: '#CD7F32' }} />;
      default:
        return null;
    }
  };

  // Handle game invite
  const handleGameInvite = (friendId) => {
    const friend = friends.find(f => f.id === friendId);
    if (friend && toast) {
      toast.showInfo(`Game invitation sent to ${friend.name}`);
    }
    // Implement actual game invite logic here
    console.log(`Invite ${friendId} to play`);
  };

  return (
    <div className={`friends-sidebar ${effectiveTheme}`}>
      <div className="friends-header">
        <h3>
          Friends List
          <span className="friends-count">{friends.length}</span>
        </h3>
        <div className="header-actions">
          <button className="close-btn" onClick={handleClose} aria-label="Close friends sidebar">
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="search-container">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search friends"
          />
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`tab-btn ${activeTab === 'online' ? 'active' : ''}`}
          onClick={() => setActiveTab('online')}
        >
          Online
          <span className="online-count">
            {friends.filter(f => f.status === 'online').length}
          </span>
        </button>
        <button 
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
          <span className="requests-count">{friendRequests.length}</span>
        </button>
      </div>

      <div className="friends-content">
        {activeTab !== 'requests' ? (
          <>
            <div className="section-title">
              {activeTab === 'all' ? 'All Friends' : 'Online Friends'}
              <span className="count">
                {filteredFriends.length}
              </span>
            </div>
            
            {filteredFriends.length > 0 ? (
              <div className="friends-list">
                {filteredFriends.map(friend => (
                  <div key={friend.id} className="friend-item">
                    <div className="friend-avatar">
                      <img src={friend.avatar} alt={friend.name} />
                      <div className={`status-indicator ${friend.status}`}></div>
                    </div>
                    
                    <div className="friend-info">
                      <div className="friend-name">
                        {friend.name}
                        {friend.badge && (
                          <span className="badge-icon" title={`${friend.badge} Badge`}>
                            {renderBadgeIcon(friend.badge)}
                          </span>
                        )}
                      </div>
                      
                      <div className="friend-status">
                        {friend.status === 'online' ? (
                          friend.game ? (
                            <span className="playing-status">
                              <FaGamepad className="game-icon" />
                              {friend.game}
                            </span>
                          ) : (
                            <span className="online-status">
                              <FaCircle className="online-indicator" />
                              Online
                            </span>
                          )
                        ) : (
                          <span className="offline-status">
                            Last online {friend.lastActive}
                          </span>
                        )}
                        <span className="level-badge" title="Player Level">Lvl {friend.level}</span>
                      </div>
                      
                      {friend.recentAchievement && (
                        <div className="achievement-tag">
                          <FaStar className="achievement-icon" />
                          {friend.recentAchievement}
                        </div>
                      )}
                    </div>
                    
                    <div className="friend-actions">
                      {friend.status === 'online' && (
                        <button 
                          className="invite-btn" 
                          onClick={() => handleGameInvite(friend.id)}
                          aria-label={`Invite ${friend.name} to play`}
                        >
                          <FaGamepad />
                        </button>
                      )}
                      <button 
                        className="more-btn" 
                        onClick={() => toggleMenu(friend.id)}
                        aria-expanded={activeMenu === friend.id}
                        aria-label="More options"
                      >
                        <FaEllipsisV />
                      </button>
                      
                      {activeMenu === friend.id && (
                        <div className="friend-menu" ref={menuRef}>
                          <button className="menu-item" onClick={() => handleUnfriend(friend.id)}>
                            <FaUserMinus className="menu-icon" />
                            <span>Unfriend</span>
                          </button>
                          <button className="menu-item danger" onClick={() => handleBlock(friend.id)}>
                            <FaBan className="menu-icon" />
                            <span>Block</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className={`view-all-container ${isCompact ? 'compact-view-all' : ''}`}>
                  <button className="view-all-btn" onClick={handleViewAllFriends}>
                    <FaUserFriends />
                    View All Friends
                    <FaChevronRight className="chevron-icon" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <FaUserFriends className="empty-icon" />
                <p>No friends found{searchQuery ? ` matching "${searchQuery}"` : ''}</p>
                {searchQuery && (
                  <button 
                    className="clear-search" 
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="section-title">
              Friend Requests
              <span className="count">{friendRequests.length}</span>
            </div>

            {friendRequests.length > 0 ? (
              <div className="friends-list">
                {friendRequests.map(request => (
                  <div key={request.id} className="request-item">
                    <div className="friend-avatar">
                      <img src={request.avatar} alt={request.name} />
                    </div>
                    
                    <div className="friend-info">
                      <div className="friend-name">{request.name}</div>
                      <div className="mutual-friends">
                        {request.mutualFriends} mutual friend{request.mutualFriends !== 1 ? 's' : ''}
                        <span className="level-badge" title="Player Level">Lvl {request.level}</span>
                      </div>
                    </div>
                    
                    <div className="request-actions">
                      <button 
                        className="accept-btn"
                        onClick={() => handleAcceptFriendRequest(request.id)}
                        aria-label={`Accept ${request.name}'s friend request`}
                      >
                        <FaCheck />
                      </button>
                      <button 
                        className="decline-btn"
                        onClick={() => handleDeclineFriendRequest(request.id)}
                        aria-label={`Decline ${request.name}'s friend request`}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className={`view-all-container ${isCompact ? 'compact-view-all' : ''}`}>
                  <button className="view-all-btn requests" onClick={handleViewAllRequests}>
                    <FaUserPlus />
                    View All Requests
                    <FaChevronRight className="chevron-icon" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <FaUserPlus className="empty-icon" />
                <p>No pending friend requests</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FriendsSidebar; 