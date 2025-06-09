import React, { useState } from 'react';
import { FaTimes, FaSearch, FaUserPlus, FaCircle, FaEllipsisV, FaCommentAlt, FaGamepad } from 'react-icons/fa';
import './FriendsSidebar.scss';

const FriendsSidebar = ({ onClose, theme = 'dark' }) => {
  const [activeTab, setActiveTab] = useState('online');
  const [searchQuery, setSearchQuery] = useState('');
  
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

  return (
    <div className={`friends-sidebar ${theme}`}>
      <div className="friends-header">
        <h3>Friends</h3>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
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
              filteredFriends.map(friend => (
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
              ))
            ) : (
              <div className="empty-state">
                <p>No friends found{searchQuery ? ' matching your search' : ''}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-list">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsSidebar; 