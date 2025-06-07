import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBell, 
  FaCog, 
  FaUser, 
  FaCoins, 
  FaChevronDown, 
  FaUserFriends, 
  FaGamepad, 
  FaCrown, 
  FaTrophy,
  FaSignOutAlt,
  FaEnvelope,
  FaExclamationCircle,
  FaPuzzlePiece
} from 'react-icons/fa';

const StudentHeader = () => {
  // State for dropdown menus
  const [playDropdownOpen, setPlayDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [friendsOpen, setFriendsOpen] = useState(false);
  
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    level: 42,
    xp: 35,
    coins: 942,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };
  
  // Mock notifications
  const notifications = [
    { id: 1, title: 'New Challenge', message: 'Tree Traversal challenge is available', time: '2h ago', read: false },
    { id: 2, title: 'Friend Request', message: 'CodeNinja wants to add you', time: '3h ago', read: false },
    { id: 3, title: 'Achievement Unlocked', message: '7-day streak achieved!', time: '1d ago', read: true }
  ];
  
  // Mock friends
  const friends = [
    { id: 1, name: 'CodeNinja', status: 'online', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 2, name: 'ByteWizard', status: 'online', avatar: 'https://randomuser.me/api/portraits/men/67.jpg' },
    { id: 3, name: 'AlgoQueen', status: 'idle', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
    { id: 4, name: 'DevMaster', status: 'offline', avatar: 'https://randomuser.me/api/portraits/men/52.jpg' }
  ];
  
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
  
  const toggleFriends = (e) => {
    e.stopPropagation();
    setFriendsOpen(!friendsOpen);
    closeAllDropdowns();
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Count online friends
  const onlineFriendsCount = friends.filter(f => f.status === 'online' || f.status === 'idle').length;

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <Link to="/dashboard">
                  <span className="text-red-500">Techno</span>
                  <span className="text-white">Match</span>
                </Link>
              </h1>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-white hover:text-red-500 font-medium">Dashboard</Link>
              <Link to="/classes" className="text-gray-400 hover:text-white font-medium">Classes</Link>
              
              {/* Play Button Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md"
                  onClick={togglePlayDropdown}
                >
                  <span>Play</span>
                  <FaChevronDown className="h-3 w-3 ml-1" />
                </button>
                
                {playDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                    <Link to="/competitive" className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
                      <FaGamepad className="mr-2" />
                      Competitive
                    </Link>
                    <Link to="/practice" className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
                      <FaPuzzlePiece className="mr-2" />
                      Practice
                    </Link>
                    <Link to="/ranked" className="flex items-center px-4 py-2 text-white hover:bg-gray-700">
                      <FaCrown className="mr-2" />
                      Ranked
                    </Link>
                  </div>
                )}
              </div>
              
              <Link to="/leaderboard" className="text-gray-400 hover:text-white font-medium">Leaderboard</Link>
            </nav>
            
            {/* User Info & Icons */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="text-sm mr-1">
                  <span className="bg-purple-800 text-white px-2 py-1 rounded-md">Level {user.level}</span>
                </div>
                <div className="text-xs text-gray-400">
                  <span>{user.xp}/50 XP</span>
                </div>
              </div>
              
              <div className="flex items-center text-yellow-500">
                <FaCoins className="mr-1" />
                <span className="font-medium">{user.coins}</span>
              </div>
              
              {/* Notification Dropdown */}
              <div className="relative">
                <button 
                  className="text-gray-400 hover:text-white relative"
                  onClick={toggleNotifications}
                >
                  <FaBell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-md shadow-lg z-50">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
                      <h3 className="text-white font-semibold">Notifications</h3>
                      <button className="text-xs text-blue-400 hover:underline">Mark all as read</button>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-2 border-b border-gray-700 hover:bg-gray-700 ${
                            notification.read ? '' : 'bg-gray-700 bg-opacity-50'
                          }`}
                        >
                          <div className="flex justify-between">
                            <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-gray-700">
                      <button className="text-sm text-center w-full text-blue-400 hover:underline">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Friends Button */}
              <button 
                className="text-gray-400 hover:text-white relative"
                onClick={toggleFriends}
              >
                <FaUserFriends size={20} />
                {onlineFriendsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
                    {onlineFriendsCount}
                  </span>
                )}
              </button>
              
              {/* Settings Dropdown */}
              <div className="relative">
                <button 
                  className="text-gray-400 hover:text-white"
                  onClick={toggleSettings}
                >
                  <FaCog size={20} />
                </button>
                
                {settingsOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                    <Link to="/settings/profile" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Profile Settings
                    </Link>
                    <Link to="/settings/account" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Account Settings
                    </Link>
                    <Link to="/settings/notifications" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Notification Settings
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <Link to="/help" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Help & Support
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Profile Dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center"
                  onClick={toggleProfile}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full border-2 border-gray-700"
                  />
                </button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-50">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-white font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-700">
                      My Profile
                    </Link>
                    <Link to="/achievements" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Achievements
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-white hover:bg-gray-700">
                      Settings
                    </Link>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button className="w-full text-left px-4 py-2 text-white hover:bg-gray-700">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Friends Sidebar */}
      {friendsOpen && (
        <>
          <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 shadow-lg z-50">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Friends</h2>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={toggleFriends}
              >
                ×
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-700">
              <input
                type="text"
                placeholder="Search friends..."
                className="w-full bg-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2">Online</h3>
              {friends
                .filter(friend => friend.status === 'online')
                .map(friend => (
                  <div key={friend.id} className="flex items-center mb-3">
                    <div className="relative">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name} 
                        className="w-8 h-8 rounded-full mr-2" 
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></span>
                    </div>
                    <span className="text-white">{friend.name}</span>
                  </div>
                ))
              }
              
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 mt-4">Idle</h3>
              {friends
                .filter(friend => friend.status === 'idle')
                .map(friend => (
                  <div key={friend.id} className="flex items-center mb-3">
                    <div className="relative">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name} 
                        className="w-8 h-8 rounded-full mr-2" 
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-gray-800"></span>
                    </div>
                    <span className="text-white">{friend.name}</span>
                  </div>
                ))
              }
              
              <h3 className="text-xs uppercase text-gray-500 font-semibold mb-2 mt-4">Offline</h3>
              {friends
                .filter(friend => friend.status === 'offline')
                .map(friend => (
                  <div key={friend.id} className="flex items-center mb-3">
                    <div className="relative">
                      <img 
                        src={friend.avatar} 
                        alt={friend.name} 
                        className="w-8 h-8 rounded-full mr-2 opacity-50" 
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full border-2 border-gray-800"></span>
                    </div>
                    <span className="text-gray-400">{friend.name}</span>
                  </div>
                ))
              }
            </div>
          </div>
          
          {/* Overlay for friends sidebar */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleFriends}
          ></div>
        </>
      )}
      
      {/* Overlay to close dropdowns when clicking outside */}
      {(playDropdownOpen || notificationsOpen || settingsOpen || profileOpen) && (
        <div 
          className="fixed inset-0 z-30"
          onClick={closeAllDropdowns}
        ></div>
      )}
    </>
  );
};

export default StudentHeader;
