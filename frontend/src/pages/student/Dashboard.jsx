import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/main.scss';
import './dashboard.scss';
import { FaSyncAlt, FaArrowRight, FaCode, FaTrophy, FaBolt, FaMedal } from 'react-icons/fa';

const Dashboard = () => {
  const { theme } = useAuth();
  const [animateStats, setAnimateStats] = useState(false);

  // Get the currently selected font from the body element
  const [currentFont, setCurrentFont] = useState(document.body.style.fontFamily || 'system-ui');

  // Update currentFont when the body font changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          setCurrentFont(document.body.style.fontFamily || 'system-ui');
        }
      });
    });

    observer.observe(document.body, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateStats(true);
    }, 300);
  }, []);

  return (
    <div 
      className={`game-dashboard ${theme === 'light' ? 'light' : 'dark'}`} 
      style={{ fontFamily: currentFont }}
    >
      <div className="dashboard-content">

        
        <div className={`dashboard-stats-wrapper ${animateStats ? 'animate' : ''}`}>
          <div className="dashboard-left-column">
            <div className="stats-cards">
              <div className="stat-card">
                <div className="stat-header">Rank</div>
                <div className="stat-value">Unranked</div>
                <div className="stat-subtext">Unranked</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-header">Problems Solved</div>
                <div className="stat-value">
                  1
                  <span className="stat-trend-up">↑ 1</span>
                </div>
                <div className="stat-subtext">+1 in the last week</div>
              </div>
              
              <div className="stat-card">
                <div className="stat-header">Win Rate</div>
                <div className="stat-value">0%</div>
                <div className="stat-subtext">No change from last month</div>
              </div>
            </div>
            
            <div className="recent-matches-section">
              <div className="section-header">
                <h2>Recent Matches</h2>
                <div className="section-subtitle">Your latest coding battles</div>
              </div>
              
              <div className="no-matches-container">
                <div className="code-icon-container">
                  <FaCode className="code-icon" />
                </div>
                <p className="no-matches-text">No matches yet. Start a coding battle to see your results here!</p>
                <button className="start-match-btn">Start a Match</button>
              </div>
            </div>
          </div>
          
          <div className="profile-section">
            <div className="section-header">
              <h2>Your Profile</h2>
              <button className="refresh-btn"><FaSyncAlt /></button>
            </div>
            
            <div className="profile-info">
              <div className="profile-avatar">
                <span>BE</span>
              </div>
              
              <div className="profile-details">
                <h3>koise</h3>
                <div className="profile-tier">
                  <FaMedal className="tier-icon" />
                  Bronze Tier • 1000 Rating
                </div>
              </div>
            </div>
            
            <div className="profile-completion">
              <div className="completion-header">
                <div className="completion-label">Problem Completion</div>
                <div className="completion-value">1/10</div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '10%' }}></div>
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
            
            <div className="leaderboard-section">
              <div className="section-header">
                <h2>Leaderboard</h2>
                <div className="trophy-icon"><FaTrophy /></div>
              </div>
              <div className="section-subtitle">Top players this season</div>
              
              <div className="leaderboard-list">
                <div className="leaderboard-item">
                  <div className="medal">🏆</div>
                  <div className="player-avatar yobab"></div>
                  <div className="player-info">
                    <div className="player-name">Yobab</div>
                    <div className="player-level">Level 20</div>
                  </div>
                  <div className="player-score">
                    <div className="score-value">1030</div>
                    <div className="score-details">50% WR  4 matches</div>
                    <div className="problems-solved">2 problems solved</div>
                  </div>
                </div>
                
                <div className="leaderboard-item current-user">
                  <div className="medal">🥈</div>
                  <div className="player-avatar koise">BE</div>
                  <div className="player-info">
                    <div className="player-name">koise</div>
                    <div className="player-level">Level 2</div>
                  </div>
                  <div className="player-score">
                    <div className="score-value">1000</div>
                    <div className="score-details">0% WR  0 matches</div>
                    <div className="problems-solved">1 problems solved</div>
                  </div>
                </div>
                
                <div className="leaderboard-item">
                  <div className="medal">🥉</div>
                  <div className="player-avatar bartolome"></div>
                  <div className="player-info">
                    <div className="player-name">Bartolome</div>
                    <div className="player-level">Level 8</div>
                  </div>
                  <div className="player-score">
                    <div className="score-value">970</div>
                    <div className="score-details">0% WR  4 matches</div>
                    <div className="problems-solved">0 problems solved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 