import React from 'react';
import { FaSyncAlt, FaMedal } from 'react-icons/fa';
import SectionHeader from './SectionHeader';

const ProfileSection = ({ username, rating, progressPercent }) => {
  const userInitials = username.charAt(0).toUpperCase();
  
  return (
    <div className="profile-section">
      <SectionHeader 
        title="Your Profile"
      >
        <button className="refresh-btn" aria-label="Refresh profile">
          <FaSyncAlt />
        </button>
      </SectionHeader>
      
      <div className="profile-info">
        <div className="profile-avatar">
          <span>{userInitials}</span>
        </div>
        
        <div className="profile-details">
          <h3>{username}</h3>
          <div className="profile-tier">
            <FaMedal className="tier-icon" />
            Bronze Tier • {rating} Rating
          </div>
        </div>
      </div>
      
      <div className="profile-completion">
        <div className="completion-header">
          <div className="completion-label">Problem Completion</div>
          <div className="completion-value">1/10</div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>
      
      <div className="profile-stats">
        <div className="stat-block">
          <div className="stat-number">0</div>
          <div className="stat-label">Matches</div>
        </div>
        
        <div className="stat-block">
          <div className="stat-number wins">0</div>
          <div className="stat-label">Wins</div>
        </div>
        
        <div className="stat-block">
          <div className="stat-number draws">0</div>
          <div className="stat-label">Draws</div>
        </div>
        
        <div className="stat-block">
          <div className="stat-number losses">0</div>
          <div className="stat-label">Losses</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection; 