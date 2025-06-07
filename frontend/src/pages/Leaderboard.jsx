import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSort, 
  faSortUp, 
  faSortDown, 
  faFilter,
  faTrophy,
  faChartLine,
  faGamepad,
  faStar,
  faUserCircle,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import { LeaderboardContainer } from '../components/ui/LeaderboardCard';
import axios from 'axios';
import './Leaderboard.scss';

// API base URL - change this to your actual API endpoint
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
const API_BASE_URL = 'http://localhost:8000/api'; // Hardcoded for now to avoid process.env error

// Extended mock data for the leaderboard page
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
    nextRankXP: 30000,
    country: 'USA',
    joinDate: '2022-05-12'
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
    nextRankXP: 28000,
    country: 'Canada',
    joinDate: '2022-06-28'
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
    nextRankXP: 26000,
    country: 'Mexico',
    joinDate: '2022-07-15'
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
    nextRankXP: 25000,
    country: 'UK',
    joinDate: '2022-08-03'
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
    nextRankXP: 23000,
    country: 'South Korea',
    joinDate: '2022-08-20'
  },
  { 
    id: 6,
    rank: 6, 
    username: 'CodeWarrior', 
    fullName: 'Sarah Parker',
    xp: 19845, 
    level: 39,
    badge: 'Elite 2', 
    avatarColor: '#4CAF50',
    winRate: '84',
    matches: 165,
    progressPercentage: 55,
    nextRankXP: 21000,
    country: 'Australia',
    joinDate: '2022-09-05'
  },
  { 
    id: 7,
    rank: 7, 
    username: 'SyntaxKing', 
    fullName: 'James Wilson',
    xp: 18120, 
    level: 37,
    badge: 'Elite 1', 
    avatarColor: '#FFC107',
    winRate: '82',
    matches: 143,
    progressPercentage: 50,
    nextRankXP: 20000,
    country: 'Germany',
    joinDate: '2022-09-18'
  },
  { 
    id: 8,
    rank: 8, 
    username: 'DataDragon', 
    fullName: 'Olivia Martinez',
    xp: 16450, 
    level: 34,
    badge: 'Apprentice 3', 
    avatarColor: '#FF9800',
    winRate: '79',
    matches: 138,
    progressPercentage: 45,
    nextRankXP: 18000,
    country: 'Spain',
    joinDate: '2022-10-10'
  },
  { 
    id: 9,
    rank: 9, 
    username: 'BugSlayer', 
    fullName: 'Daniel Thompson',
    xp: 14320, 
    level: 30,
    badge: 'Apprentice 2', 
    avatarColor: '#8BC34A',
    winRate: '76',
    matches: 124,
    progressPercentage: 40,
    nextRankXP: 16000,
    country: 'France',
    joinDate: '2022-11-05'
  },
  { 
    id: 10,
    rank: 10, 
    username: 'CodeNinja', 
    fullName: 'Ava Williams',
    xp: 12800, 
    level: 27,
    badge: 'Apprentice 1', 
    avatarColor: '#03A9F4',
    winRate: '73',
    matches: 110,
    progressPercentage: 35,
    nextRankXP: 14000,
    country: 'Japan',
    joinDate: '2022-11-25'
  }
];

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'rank', direction: 'asc' });
  const [filters, setFilters] = useState({
    rankTier: 'all',
    minLevel: '',
    maxLevel: '',
    country: ''
  });
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  // Apply filters to data whenever filters or data changes
  useEffect(() => {
    applyFilters();
  }, [leaderboardData, filters]);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Commented out actual API call - uncomment for production
      /*
      const response = await axios.get(`${API_BASE_URL}/leaderboard/full`, {
        params: {
          // Add query parameters as needed
          limit: 100
        }
      });
      setLeaderboardData(response.data);
      setFilteredData(response.data);
      */

      // Using mock data for development
      setLeaderboardData(mockLeaderboardData);
      setFilteredData(mockLeaderboardData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching full leaderboard data:', err);
      setError('Failed to load leaderboard data. Please try again later.');
      setLoading(false);
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    setFilteredData(prevData => {
      const sortedData = [...prevData];
      sortedData.sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === 'asc' ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      return sortedData;
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FontAwesomeIcon icon={faSort} />;
    return sortConfig.direction === 'asc' 
      ? <FontAwesomeIcon icon={faSortUp} /> 
      : <FontAwesomeIcon icon={faSortDown} />;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let result = [...leaderboardData];

    // Filter by rank tier
    if (filters.rankTier !== 'all') {
      result = result.filter(player => player.badge.includes(filters.rankTier));
    }

    // Filter by min level
    if (filters.minLevel) {
      result = result.filter(player => player.level >= parseInt(filters.minLevel));
    }

    // Filter by max level
    if (filters.maxLevel) {
      result = result.filter(player => player.level <= parseInt(filters.maxLevel));
    }

    // Filter by country
    if (filters.country) {
      result = result.filter(player => 
        player.country.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    // Apply current sorting
    result.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(result);
  };

  const resetFilters = () => {
    setFilters({
      rankTier: 'all',
      minLevel: '',
      maxLevel: '',
      country: ''
    });
  };

  const toggleFilterPanel = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  if (loading && leaderboardData.length === 0) {
    return (
      <div className="leaderboard-page loading">
        <div className="loading-spinner"></div>
        <p>Loading leaderboard data...</p>
      </div>
    );
  }

  if (error && leaderboardData.length === 0) {
    return (
      <div className="leaderboard-page error">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <button onClick={fetchLeaderboardData} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-hero">
        <div className="hero-content">
          <div className="hero-icon">
            <FontAwesomeIcon icon={faTrophy} />
          </div>
          <h1>Battle Rankings</h1>
          <p>Compete against the best and climb the ranks to coding glory</p>
          
          <div className="hero-cta">
            <button className="cta-button primary">
              <FontAwesomeIcon icon={faGamepad} className="cta-icon" />
              Join Tournament
            </button>
            <button className="cta-button secondary">
              <FontAwesomeIcon icon={faUsers} className="cta-icon" />
              Find Players
            </button>
          </div>
        </div>
      </div>
      
      <div className="leaderboard-controls">
        <div className="control-stats">
          <div className="stat-item">
            <FontAwesomeIcon icon={faGamepad} className="stat-icon" />
            <span className="stat-label">Total Players</span>
            <span className="stat-value">{leaderboardData.length}</span>
          </div>
          <div className="stat-item">
            <FontAwesomeIcon icon={faTrophy} className="stat-icon" />
            <span className="stat-label">Top Player</span>
            <span className="stat-value">{leaderboardData[0]?.fullName || 'N/A'}</span>
          </div>
          <div className="stat-item">
            <FontAwesomeIcon icon={faStar} className="stat-icon" />
            <span className="stat-label">Highest Level</span>
            <span className="stat-value">{Math.max(...leaderboardData.map(p => p.level)) || 'N/A'}</span>
          </div>
        </div>
        
        <div className="control-actions">
          <button 
            className={`filter-toggle ${isFilterVisible ? 'active' : ''}`} 
            onClick={toggleFilterPanel}
          >
            <FontAwesomeIcon icon={faFilter} />
            <span>Filters</span>
          </button>
          
          <div className="sort-controls">
            <span>Sort by:</span>
            <button 
              onClick={() => requestSort('rank')}
              className={sortConfig.key === 'rank' ? 'active' : ''}
            >
              Rank {getSortIcon('rank')}
            </button>
            <button 
              onClick={() => requestSort('level')}
              className={sortConfig.key === 'level' ? 'active' : ''}
            >
              Level {getSortIcon('level')}
            </button>
            <button 
              onClick={() => requestSort('winRate')}
              className={sortConfig.key === 'winRate' ? 'active' : ''}
            >
              Win Rate {getSortIcon('winRate')}
            </button>
          </div>
        </div>
      </div>
      
      {isFilterVisible && (
        <div className="filter-panel">
          <div className="filter-grid">
            <div className="filter-group">
              <label>Rank Tier</label>
              <select 
                name="rankTier" 
                value={filters.rankTier}
                onChange={handleFilterChange}
              >
                <option value="all">All Tiers</option>
                <option value="Technocrat">Technocrat</option>
                <option value="Master">Master</option>
                <option value="Elite">Elite</option>
                <option value="Apprentice">Apprentice</option>
                <option value="Novice">Novice</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Min Level</label>
              <input 
                type="number" 
                name="minLevel"
                value={filters.minLevel}
                onChange={handleFilterChange}
                placeholder="Min"
              />
            </div>
            
            <div className="filter-group">
              <label>Max Level</label>
              <input 
                type="number" 
                name="maxLevel"
                value={filters.maxLevel}
                onChange={handleFilterChange}
                placeholder="Max"
              />
            </div>
            
            <div className="filter-group">
              <label>Country</label>
              <input 
                type="text" 
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                placeholder="Filter by country"
              />
            </div>
          </div>
          
          <div className="filter-actions">
            <button onClick={applyFilters} className="apply-button">
              Apply Filters
            </button>
            <button onClick={resetFilters} className="reset-button">
              Reset
            </button>
          </div>
        </div>
      )}
      
      <div className="leaderboard-results">
        <div className="results-count">
          Showing {filteredData.length} of {leaderboardData.length} players
        </div>
        
        <div className="leaderboard-players">
          {filteredData.map((player, index) => (
            <div 
              key={player.id}
              className={`leaderboard-player-card ${player.rank <= 3 ? `top-${player.rank}` : ''}`}
            >
              <div className="player-rank">
                <span>{player.rank}</span>
              </div>
              
              <div className="player-info">
                <div 
                  className="player-avatar"
                  style={{ backgroundColor: player.avatarColor }}
                >
                  {player.username.charAt(0)}
                </div>
                
                <div className="player-details">
                  <div className="player-name">{player.fullName}</div>
                  <div className="player-username">@{player.username}</div>
                </div>
              </div>
              
              <div className="player-level">
                <div className="level-badge">
                  <span className="level-number">{player.level}</span>
                </div>
                <div className="level-label">Level</div>
              </div>
              
              <div className="player-badge" style={{ 
                backgroundColor: `${player.avatarColor}20`,
                color: player.avatarColor
              }}>
                {player.badge}
              </div>
              
              <div className="player-matches">
                <div className="matches-count">{player.matches}</div>
                <div className="matches-label">Matches</div>
              </div>
              
              <div className="player-winrate">
                <div className="winrate-value">{player.winRate}%</div>
                <div className="winrate-label">Win Rate</div>
                <FontAwesomeIcon icon={faChartLine} className="winrate-icon" />
              </div>
              
              <div className="player-country">
                <span>{player.country}</span>
              </div>
              
              <div className="player-actions">
                <button className="player-action-button view">
                  <FontAwesomeIcon icon={faUserCircle} />
                  <span>Profile</span>
                </button>
                <button className="player-action-button challenge">
                  <FontAwesomeIcon icon={faGamepad} />
                  <span>Challenge</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="leaderboard-footer">
          <button className="view-all-button">
            View Full Rankings
            <FontAwesomeIcon icon={faChevronRight} className="button-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 