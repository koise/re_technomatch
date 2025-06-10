import React, { useState, useEffect, useContext } from 'react';
import { useTheme, useSettings } from '../../contexts/ThemeContext';
import '../../styles/main.scss';
import './dashboard.scss';
import { FaSyncAlt, FaArrowRight, FaCode, FaTrophy, FaBolt, FaMedal, FaHashtag, FaLayerGroup, FaList, FaArrowDown, FaChevronLeft, FaChevronRight, FaFilter } from 'react-icons/fa';

const Dashboard = () => {
  const { theme } = useTheme();
  const { settings } = useSettings();
  const [animateStats, setAnimateStats] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [matchesPage, setMatchesPage] = useState(1);
  const [leaderboardPage, setLeaderboardPage] = useState(1);

  // Get the currently selected font from settings
  const [currentFont, setCurrentFont] = useState(settings?.font || 'sans-serif');

  // Update currentFont when the settings change
  useEffect(() => {
    if (settings?.font) {
      setCurrentFont(settings.font);
    }
  }, [settings]);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateStats(true);
    }, 300);
  }, []);
  
  // Color options for accent color
  const colorOptions = [
    { name: 'Red', value: 'red' },
    { name: 'Blue', value: 'blue' },
    { name: 'Green', value: 'green' },
    { name: 'Purple', value: 'purple' },
    { name: 'Orange', value: 'orange' }
  ];
  
  // Font options
  const fontOptions = [
    { name: 'Sans-serif', value: 'sans-serif' },
    { name: 'Serif', value: 'serif' },
    { name: 'Monospace', value: 'monospace' }
  ];

  // Problem Bank data
  const problems = [
    {
      id: 1,
      name: 'Two Sum',
      description: 'Find two numbers that add up to a specific target.',
      difficulty: 'easy',
      tags: ['Array', 'HashMap']
    },
    {
      id: 2,
      name: 'Valid Parentheses',
      description: 'Determine if the input string has valid parentheses ordering.',
      difficulty: 'easy',
      tags: ['Stack', 'String']
    },
    {
      id: 3,
      name: 'Merge Two Sorted Lists',
      description: 'Merge two sorted linked lists into one sorted list.',
      difficulty: 'easy',
      tags: ['Linked List', 'Recursion']
    },
    {
      id: 4,
      name: 'Binary Search',
      description: 'Implement binary search algorithm on a sorted array.',
      difficulty: 'medium',
      tags: ['Array', 'Binary Search']
    },
    {
      id: 5,
      name: 'Maximum Subarray',
      description: 'Find the contiguous subarray with the largest sum.',
      difficulty: 'medium',
      tags: ['Array', 'Dynamic Programming']
    }
  ];

  // Recent Matches mock data
  const recentMatches = [
    {
      id: 1,
      opponent: 'Yobab',
      problem: 'Two Sum',
      result: 'win',
      date: '2023-11-15',
      points: '+15',
      time: '10:23'
    },
    {
      id: 2,
      opponent: 'Bartolome',
      problem: 'Valid Parentheses',
      result: 'loss',
      date: '2023-11-14',
      points: '-8',
      time: '14:52'
    },
    {
      id: 3,
      opponent: 'Alex',
      problem: 'Binary Search',
      result: 'win',
      date: '2023-11-13',
      points: '+12',
      time: '8:41'
    },
    {
      id: 4,
      opponent: 'Maria',
      problem: 'Merge Two Sorted Lists',
      result: 'draw',
      date: '2023-11-12',
      points: '0',
      time: '12:15'
    },
    {
      id: 5,
      opponent: 'John',
      problem: 'Maximum Subarray',
      result: 'win',
      date: '2023-11-11',
      points: '+10',
      time: '15:37'
    },
    {
      id: 6,
      opponent: 'Emma',
      problem: 'Valid Anagram',
      result: 'loss',
      date: '2023-11-10',
      points: '-5',
      time: '9:18'
    },
    {
      id: 7,
      opponent: 'Michael',
      problem: 'Reverse Linked List',
      result: 'win',
      date: '2023-11-09',
      points: '+14',
      time: '16:42'
    },
    {
      id: 8,
      opponent: 'Sophia',
      problem: 'Contains Duplicate',
      result: 'draw',
      date: '2023-11-08',
      points: '0',
      time: '11:05'
    }
  ];

  // Leaderboard data with multiple pages
  const leaderboardData = [
    // Page 1
    [
      {
        id: 1,
        name: 'Yobab',
        level: 20,
        avatar: 'yobab',
        score: 1030,
        winRate: '50%',
        matches: 4,
        solved: 2,
        medal: '🏆'
      },
      {
        id: 2,
        name: 'koise',
        level: 2,
        avatar: 'koise',
        score: 1000,
        winRate: '0%',
        matches: 0,
        solved: 1,
        medal: '🥈',
        isCurrentUser: true
      },
      {
        id: 3,
        name: 'Bartolome',
        level: 8,
        avatar: 'bartolome',
        score: 970,
        winRate: '0%',
        matches: 4,
        solved: 0,
        medal: '🥉'
      }
    ],
    // Page 2
    [
      {
        id: 4,
        name: 'Alex',
        level: 15,
        score: 950,
        winRate: '45%',
        matches: 11,
        solved: 4,
        medal: '4'
      },
      {
        id: 5,
        name: 'Maria',
        level: 12,
        score: 920,
        winRate: '38%',
        matches: 8,
        solved: 3,
        medal: '5'
      },
      {
        id: 6,
        name: 'John',
        level: 10,
        score: 890,
        winRate: '30%',
        matches: 10,
        solved: 2,
        medal: '6'
      }
    ],
    // Page 3
    [
      {
        id: 7,
        name: 'Emma',
        level: 9,
        score: 860,
        winRate: '33%',
        matches: 6,
        solved: 2,
        medal: '7'
      },
      {
        id: 8,
        name: 'Michael',
        level: 7,
        score: 830,
        winRate: '25%',
        matches: 8,
        solved: 1,
        medal: '8'
      },
      {
        id: 9,
        name: 'Sophia',
        level: 5,
        score: 800,
        winRate: '20%',
        matches: 5,
        solved: 1,
        medal: '9'
      }
    ]
  ];

  // Filter problems based on difficulty
  const filteredProblems = difficultyFilter === 'all' 
    ? problems 
    : problems.filter(problem => problem.difficulty === difficultyFilter);

  const totalLeaderboardPages = leaderboardData.length;
  const totalMatchesPages = Math.ceil(recentMatches.length / 3);

  // Get current page matches
  const currentMatches = recentMatches.slice((matchesPage - 1) * 3, matchesPage * 3);

  // Get current page leaderboard data
  const currentLeaderboardData = leaderboardData[leaderboardPage - 1] || [];

  // Pagination handlers
  const handlePrevLeaderboard = () => {
    setLeaderboardPage(prev => prev > 1 ? prev - 1 : prev);
  };

  const handleNextLeaderboard = () => {
    setLeaderboardPage(prev => prev < totalLeaderboardPages ? prev + 1 : prev);
  };

  const handlePrevMatches = () => {
    setMatchesPage(prev => prev > 1 ? prev - 1 : prev);
  };

  const handleNextMatches = () => {
    setMatchesPage(prev => prev < totalMatchesPages ? prev + 1 : prev);
  };

  return (
    <div 
      className={`game-dashboard ${theme === 'light' ? 'light' : 'dark'}`} 
      style={{ fontFamily: currentFont, height: '100vh', overflow: 'hidden' }}
      data-color-accent={settings.colorAccent}
      data-animations={settings.animations ? 'enabled' : 'disabled'}
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
            
            <div className="content-grid">
              <div className="recent-matches-section">
                <div className="section-header">
                  <h2>Recent Matches</h2>
                  <div className="section-subtitle">Your latest coding battles</div>
                </div>
                
                {recentMatches.length > 0 ? (
                  <>
                    <div className="matches-list">
                      {currentMatches.map(match => (
                        <div 
                          key={match.id} 
                          className={`match-item ${match.result}`}
                        >
                          <div className="match-result-indicator"></div>
                          <div className="match-content">
                            <div className="match-header">
                              <div className="match-problem">{match.problem}</div>
                              <div className={`match-points ${match.result}`}>{match.points}</div>
                            </div>
                            <div className="match-details">
                              <div className="match-opponent">vs {match.opponent}</div>
                              <div className="match-time">{match.time}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pagination-controls">
                      <button 
                        className="pagination-btn" 
                        onClick={handlePrevMatches}
                        disabled={matchesPage <= 1}
                      >
                        <FaChevronLeft />
                      </button>
                      <span className="page-indicator">{matchesPage} / {totalMatchesPages}</span>
                      <button 
                        className="pagination-btn" 
                        onClick={handleNextMatches}
                        disabled={matchesPage >= totalMatchesPages}
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="no-matches-container">
                    <div className="code-icon-container">
                      <FaCode className="code-icon" />
                    </div>
                    <p className="no-matches-text">No matches yet. Start a coding battle to see your results here!</p>
                    <button className="start-match-btn">Start a Match</button>
                  </div>
                )}
              </div>
              
              <div className="leaderboard-section">
                <div className="section-header">
                  <h2>Leaderboard</h2>
                  <div className="trophy-icon"><FaTrophy /></div>
                </div>
                <div className="section-subtitle">Top players this season</div>
                
                <div className="leaderboard-list">
                  {currentLeaderboardData.map(player => (
                    <div key={player.id} className={`leaderboard-item ${player.isCurrentUser ? 'current-user' : ''}`}>
                      <div className="medal">{player.medal}</div>
                      <div className={`player-avatar ${player.avatar || ''}`}>
                        {!player.avatar && player.name.charAt(0)}
                      </div>
                      <div className="player-info">
                        <div className="player-name">{player.name}</div>
                        <div className="player-level">Level {player.level}</div>
                      </div>
                      <div className="player-score">
                        <div className="score-value">{player.score}</div>
                        <div className="score-details">{player.winRate} WR  {player.matches} matches</div>
                        <div className="problems-solved">{player.solved} problems solved</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pagination-controls">
                  <button 
                    className="pagination-btn" 
                    onClick={handlePrevLeaderboard}
                    disabled={leaderboardPage <= 1}
                  >
                    <FaChevronLeft />
                  </button>
                  <span className="page-indicator">{leaderboardPage} / {totalLeaderboardPages}</span>
                  <button 
                    className="pagination-btn" 
                    onClick={handleNextLeaderboard}
                    disabled={leaderboardPage >= totalLeaderboardPages}
                  >
                    <FaChevronRight />
                  </button>
                </div>
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

            <div className="problem-bank-section">
              <div className="section-header">
                <h2>Problem Bank</h2>
                <div className="difficulty-filter">
                  <select 
                    className="filter-dropdown"
                    value={difficultyFilter}
                    onChange={(e) => setDifficultyFilter(e.target.value)}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <FaFilter className="filter-icon" />
                </div>
              </div>
              
              <div className="problem-list">
                {filteredProblems.map(problem => (
                  <div key={problem.id} className="problem-card">
                    <div className="problem-name">{problem.name}</div>
                    <div className="problem-description">{problem.description}</div>
                    <div className="problem-footer">
                      <div className={`problem-difficulty ${problem.difficulty}`}>
                        {problem.difficulty.toUpperCase()}
                      </div>
                      <div className="problem-tags">
                        {problem.tags.map((tag, index) => (
                          <span key={index} className="problem-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 