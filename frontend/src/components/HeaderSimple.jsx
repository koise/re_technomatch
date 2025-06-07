import React from 'react';
import { Link } from 'react-router-dom';

const HeaderSimple = () => {
  return (
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
            <Link to="/play" className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md">Play</Link>
            <Link to="/leaderboard" className="text-gray-400 hover:text-white font-medium">Leaderboard</Link>
          </nav>
          
          {/* User Info & Icons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="text-sm mr-1">
                <span className="bg-purple-800 text-white px-2 py-1 rounded-md">Level 42</span>
              </div>
              <div className="text-xs text-gray-400">
                <span>35/50 XP</span>
              </div>
            </div>
            
            <div className="flex items-center text-yellow-500">
              <span className="mr-1">🪙</span>
              <span className="font-medium">942</span>
            </div>
            
            {/* Notification Icon */}
            <button className="text-gray-400 hover:text-white relative">
              <span>🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
                2
              </span>
            </button>
            
            {/* Settings Icon */}
            <button className="text-gray-400 hover:text-white">
              ⚙️
            </button>
            
            {/* Profile */}
            <div className="flex items-center">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User" 
                className="w-8 h-8 rounded-full border-2 border-gray-700"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSimple; 