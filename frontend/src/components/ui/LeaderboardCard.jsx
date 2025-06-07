import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { 
  faStar, 
  faCrown,
  faMedal,
  faTrophy,
  faFire,
  faChartLine,
  faGem,
  faGamepad,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import './LeaderboardCard.scss';

// API base URL - change this to your actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Mock data for development
const mockLeaderboardData = [
  { 
    id: 1,
    rank: 1, 
    username: 'CodingLegend', 
    fullName: 'Alex Johnson',
    xp: 28750, 
    level: 52,
    badge: 'Technocrat', 
    avatarColor: '#E91E63',
    winRate: '94',
    matches: 287,
    progressPercentage: 85,
    nextRankXP: 30000
  },
  { 
    id: 2,
    rank: 2, 
    username: 'AlgorithmQueen', 
    fullName: 'Sophia Chen',
    xp: 26543, 
    level: 48,
    badge: 'Master 3', 
    avatarColor: '#9C27B0',
    winRate: '91',
    matches: 253,
    progressPercentage: 78,
    nextRankXP: 28000
  },
  { 
    id: 3,
    rank: 3, 
    username: 'DragonCoder', 
    fullName: 'Michael Rodriguez',
    xp: 24981, 
    level: 45,
    badge: 'Master 2', 
    avatarColor: '#FF5722',
    winRate: '89',
    matches: 215,
    progressPercentage: 72,
    nextRankXP: 26000
  },
  { 
    id: 4,
    rank: 4, 
    username: 'HackerElite', 
    fullName: 'Emma Watson',
    xp: 23542, 
    level: 43,
    badge: 'Master 1', 
    avatarColor: '#673AB7',
    winRate: '87',
    matches: 198,
    progressPercentage: 65,
    nextRankXP: 25000
  },
  { 
    id: 5,
    rank: 5, 
    username: 'ByteNinja', 
    fullName: 'David Kim',
    xp: 21687, 
    level: 41,
    badge: 'Elite 3', 
    avatarColor: '#2196F3',
    winRate: '86',
    matches: 176,
    progressPercentage: 60,
    nextRankXP: 23000
  }
];

const LeaderboardCard = ({ player, index, isHighlighted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  // Badge styling with rank colors
  const getBadgeStyle = (badge) => {
    // Badge colors based on rank
    const badgeColors = {
      'Novice 1': '#607D8B',
      'Novice 2': '#9E9E9E',
      'Novice 3': '#CDDC39',
      'Apprentice 1': '#03A9F4',
      'Apprentice 2': '#8BC34A',
      'Apprentice 3': '#FF9800',
      'Elite 1': '#FFC107',
      'Elite 2': '#4CAF50',
      'Elite 3': '#2196F3',
      'Master 1': '#673AB7',
      'Master 2': '#FF5722',
      'Master 3': '#9C27B0',
      'Technocrat': '#E91E63'
    };
    
    // Base style
    const style = {
      backgroundColor: `${badgeColors[badge] || '#607D8B'}20`,
      color: badgeColors[badge] || '#607D8B'
    };
    
    // Special styling for highest rank
    if (badge === 'Technocrat') {
      style.background = 'linear-gradient(45deg, #E91E63, #9C27B0)';
      style.color = '#fff';
      style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
    }
    
    return style;
  };

  // Get rank icon based on position
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return faCrown;
      case 2: return faMedal;
      case 3: return faTrophy;
      default: return null;
    }
  };
  
  // For top ranks, add special colors
  const getTopRankClass = (rank) => {
    if (rank <= 3) return `top-${rank}`;
    return '';
  };

  // Navigate to player profile
  const handleViewProfile = () => {
    navigate(`/profile/${player.username}`);
  };

  // Handle challenge player
  const handleChallenge = () => {
    navigate(`/challenge/${player.id}`);
  };
  
  return (
    <motion.div 
      className={`leaderboard-card ${isHovered ? 'hovered' : ''} ${getTopRankClass(player.rank)} ${isHighlighted ? 'highlighted' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 } 
      }}
    >
      {/* Decorative effects for top 3 ranks */}
      {player.rank <= 3 && (
        <div className="rank-effects">
          <div className="rank-glow"></div>
          <div className="rank-particles"></div>
        </div>
      )}
      
      <div className="rank-container">
        <div className="rank-badge" style={{ 
          background: player.rank <= 3 
            ? `linear-gradient(135deg, var(--primary-color), ${player.avatarColor || '#E91E63'})` 
            : 'rgba(var(--text-rgb), 0.1)' 
        }}>
          {player.rank <= 3 ? (
            <FontAwesomeIcon icon={getRankIcon(player.rank)} className="rank-icon" />
          ) : (
            <span>{player.rank}</span>
          )}
        </div>
      </div>
      
      <div className="player-container">
        <div 
          className="player-avatar"
          style={{ backgroundColor: player.avatarColor || '#607D8B' }}
        >
          {player.username.charAt(0)}
        </div>
        
        <div className="player-info">
          <div className="player-name">{player.fullName}</div>
          <div className="player-username">@{player.username}</div>
        </div>
      </div>
      
      <div className="player-stats">
        <div className="level-badge">
          <span className="level-number">{player.level}</span>
        </div>
        <div className="rank-text">{player.badge} Rank</div>
      </div>
      
      <div className="matches-container">
        <div className="matches-count">{player.matches}</div>
        <div className="matches-label">Matches</div>
      </div>

      <div className="winrate-container">
        <div className="winrate-percentage">{player.winRate}%</div>
        <div className="winrate-label">Win Rate</div>
      </div>
      
      <div className="card-actions">
        <button className="action-button" onClick={handleViewProfile}>
          <FontAwesomeIcon icon={faUserCircle} className="button-icon" /> View Profile
        </button>
        <button className="action-button challenge" onClick={handleChallenge}>
          <FontAwesomeIcon icon={faGamepad} className="button-icon" /> Challenge
        </button>
      </div>
    </motion.div>
  );
};

// Leaderboard container component to fetch and display leaderboard data
export const LeaderboardContainer = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [highlightedPlayer, setHighlightedPlayer] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();

    // Set up interval to highlight random players for visual effect
    const highlightInterval = setInterval(() => {
      if (leaderboardData.length > 0) {
        const randomIndex = Math.floor(Math.random() * leaderboardData.length);
        setHighlightedPlayer(leaderboardData[randomIndex].id);
        setTimeout(() => setHighlightedPlayer(null), 2000);
      }
    }, 5000);

    return () => clearInterval(highlightInterval);
  }, [leaderboardData.length]);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Commented out actual API call - uncomment for production
      /*
      const response = await axios.get(`${API_BASE_URL}/leaderboard`, {
        params: {
          limit: 10,
          // Add other query parameters as needed
        }
      });
      setLeaderboardData(response.data);
      */
      
      // Using mock data for development
      setLeaderboardData(mockLeaderboardData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError('Failed to load leaderboard data. Please try again later.');
      setLoading(false);
    }
  };

  // Handle refresh button click
  const handleRefresh = () => {
    fetchLeaderboardData();
  };

  if (loading && leaderboardData.length === 0) {
    return (
      <div className="leaderboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading leaderboard data...</p>
      </div>
    );
  }

  if (error && leaderboardData.length === 0) {
    return (
      <div className="leaderboard-error">
        <p>{error}</p>
        <button onClick={handleRefresh} className="refresh-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>Battle Rankings</h2>
        <button onClick={handleRefresh} className="refresh-button">
          Refresh
        </button>
      </div>

      <div className="leaderboard-table-header">
        <div className="header-rank">
          <FontAwesomeIcon icon={faTrophy} className="header-icon" />
          <span>RANK</span>
        </div>
        <div className="header-player">
          <FontAwesomeIcon icon={faUserCircle} className="header-icon" />
          <span>PLAYER</span>
        </div>
        <div className="header-level">
          <FontAwesomeIcon icon={faStar} className="header-icon" />
          <span>LEVEL</span>
        </div>
        <div className="header-rank-badge">
          <FontAwesomeIcon icon={faGem} className="header-icon" />
          <span>RANK</span>
        </div>
        <div className="header-matches">
          <FontAwesomeIcon icon={faGamepad} className="header-icon" />
          <span>MATCHES</span>
        </div>
        <div className="header-winrate">
          <FontAwesomeIcon icon={faChartLine} className="header-icon" />
          <span>WIN RATE</span>
        </div>
      </div>

      <div className="leaderboard-list">
        {leaderboardData.map((player, index) => (
          <LeaderboardCard 
            key={player.id} 
            player={player} 
            index={index}
            isHighlighted={player.id === highlightedPlayer}
          />
        ))}
      </div>

      <div className="leaderboard-footer">
        <Link to="/leaderboard" className="view-all-button">
          View Full Leaderboard
        </Link>
      </div>
    </div>
  );
};

export default LeaderboardCard; 