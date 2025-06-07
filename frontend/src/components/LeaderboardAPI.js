import axios from 'axios';

// API base URL - change this to your actual API endpoint
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Mock leaderboard data for development
export const mockLeaderboardData = [
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
  }
];

/**
 * Fetches the top players for the leaderboard
 * @param {Object} params - Query parameters for the API request
 * @param {number} params.limit - Number of players to fetch (default: 5)
 * @param {string} params.sortBy - Field to sort by (default: 'rank')
 * @param {string} params.order - Sort order ('asc' or 'desc')
 * @returns {Promise<Array>} - Array of player data
 */
export const fetchLeaderboard = async (params = {}) => {
  const defaultParams = {
    limit: 5,
    sortBy: 'rank',
    order: 'asc'
  };
  
  const queryParams = { ...defaultParams, ...params };
  
  try {
    // Commented out actual API call - uncomment for production
    /*
    const response = await axios.get(`${API_BASE_URL}/leaderboard`, {
      params: queryParams
    });
    return response.data;
    */
    
    // Using mock data for development
    // Simulate sorting and filtering as would happen on the backend
    let filteredData = [...mockLeaderboardData];
    
    // Apply limit
    filteredData = filteredData.slice(0, queryParams.limit);
    
    return filteredData;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw error;
  }
};

/**
 * Fetches the full leaderboard with pagination
 * @param {Object} params - Query parameters for the API request
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.perPage - Items per page (default: 10)
 * @param {string} params.sortBy - Field to sort by (default: 'rank')
 * @param {string} params.order - Sort order ('asc' or 'desc')
 * @param {Object} params.filters - Additional filters to apply
 * @returns {Promise<Object>} - Object containing player data and pagination info
 */
export const fetchFullLeaderboard = async (params = {}) => {
  const defaultParams = {
    page: 1,
    perPage: 10,
    sortBy: 'rank',
    order: 'asc',
    filters: {}
  };
  
  const queryParams = { ...defaultParams, ...params };
  
  try {
    // Commented out actual API call - uncomment for production
    /*
    const response = await axios.get(`${API_BASE_URL}/leaderboard/full`, {
      params: queryParams
    });
    return response.data;
    */
    
    // Using mock data for development
    // Create extended mock data for full leaderboard
    const extendedMockData = [
      ...mockLeaderboardData,
      // Add 5 more mock entries to simulate a larger dataset
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
    
    // Apply filters if provided
    let filteredData = [...extendedMockData];
    
    if (queryParams.filters) {
      const { rankTier, minLevel, maxLevel, country } = queryParams.filters;
      
      if (rankTier && rankTier !== 'all') {
        filteredData = filteredData.filter(player => player.badge.includes(rankTier));
      }
      
      if (minLevel) {
        filteredData = filteredData.filter(player => player.level >= parseInt(minLevel));
      }
      
      if (maxLevel) {
        filteredData = filteredData.filter(player => player.level <= parseInt(maxLevel));
      }
      
      if (country) {
        filteredData = filteredData.filter(player => 
          player.country.toLowerCase().includes(country.toLowerCase())
        );
      }
    }
    
    // Sort the data
    filteredData.sort((a, b) => {
      const sortField = queryParams.sortBy;
      const sortOrder = queryParams.order === 'asc' ? 1 : -1;
      
      if (a[sortField] < b[sortField]) return -1 * sortOrder;
      if (a[sortField] > b[sortField]) return 1 * sortOrder;
      return 0;
    });
    
    // Apply pagination
    const startIndex = (queryParams.page - 1) * queryParams.perPage;
    const endIndex = startIndex + queryParams.perPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);
    
    // Return data in a format similar to what the API would return
    return {
      data: paginatedData,
      meta: {
        total: filteredData.length,
        per_page: queryParams.perPage,
        current_page: queryParams.page,
        last_page: Math.ceil(filteredData.length / queryParams.perPage),
        from: startIndex + 1,
        to: Math.min(endIndex, filteredData.length)
      }
    };
  } catch (error) {
    console.error('Error fetching full leaderboard data:', error);
    throw error;
  }
};

/**
 * Fetches a specific player's profile data
 * @param {string} username - The username of the player to fetch
 * @returns {Promise<Object>} - Player profile data
 */
export const fetchPlayerProfile = async (username) => {
  try {
    // Commented out actual API call - uncomment for production
    /*
    const response = await axios.get(`${API_BASE_URL}/players/${username}`);
    return response.data;
    */
    
    // Using mock data for development
    const player = mockLeaderboardData.find(p => p.username === username);
    
    if (!player) {
      throw new Error('Player not found');
    }
    
    // Enhance the player data with additional profile information
    return {
      ...player,
      bio: 'Passionate coder and competitive programmer with expertise in algorithms and data structures.',
      skills: ['JavaScript', 'Python', 'React', 'Algorithms'],
      achievements: [
        { id: 1, title: 'Algorithm Master', description: 'Solved 500 algorithmic challenges', date: '2023-01-15' },
        { id: 2, title: 'Winning Streak', description: 'Won 10 consecutive coding battles', date: '2023-02-20' }
      ],
      recentMatches: [
        { id: 101, opponent: 'ByteNinja', result: 'win', score: '120-85', date: '2023-04-01' },
        { id: 102, opponent: 'CodeWarrior', result: 'loss', score: '95-110', date: '2023-03-28' },
        { id: 103, opponent: 'AlgorithmQueen', result: 'win', score: '130-125', date: '2023-03-25' }
      ]
    };
  } catch (error) {
    console.error(`Error fetching player profile for ${username}:`, error);
    throw error;
  }
};

/**
 * Fetches challenge data for a specific player
 * @param {number} playerId - The ID of the player to challenge
 * @returns {Promise<Object>} - Challenge data
 */
export const fetchChallengeData = async (playerId) => {
  try {
    // Commented out actual API call - uncomment for production
    /*
    const response = await axios.get(`${API_BASE_URL}/challenge/${playerId}`);
    return response.data;
    */
    
    // Using mock data for development
    const player = mockLeaderboardData.find(p => p.id === parseInt(playerId));
    
    if (!player) {
      throw new Error('Player not found');
    }
    
    return {
      player: player,
      challengeTypes: [
        { id: 1, name: 'Algorithm Battle', description: 'Compete in solving algorithmic challenges', difficulty: 'Hard' },
        { id: 2, name: 'Code Golf', description: 'Write the shortest solution to a problem', difficulty: 'Medium' },
        { id: 3, name: 'Debug Race', description: 'Find and fix bugs in code', difficulty: 'Easy' }
      ],
      availableTimes: [
        { id: 1, time: '09:00', date: '2023-05-01', availability: 'available' },
        { id: 2, time: '14:00', date: '2023-05-01', availability: 'booked' },
        { id: 3, time: '19:00', date: '2023-05-01', availability: 'available' },
        { id: 4, time: '10:00', date: '2023-05-02', availability: 'available' }
      ]
    };
  } catch (error) {
    console.error(`Error fetching challenge data for player ID ${playerId}:`, error);
    throw error;
  }
};

/**
 * Submit a challenge request to a player
 * @param {Object} challengeData - Data for the challenge request
 * @returns {Promise<Object>} - Response data
 */
export const submitChallengeRequest = async (challengeData) => {
  try {
    // Commented out actual API call - uncomment for production
    /*
    const response = await axios.post(`${API_BASE_URL}/challenge`, challengeData);
    return response.data;
    */
    
    // Simulate successful response
    return {
      success: true,
      message: 'Challenge request sent successfully',
      challengeId: Math.floor(Math.random() * 1000) + 1
    };
  } catch (error) {
    console.error('Error submitting challenge request:', error);
    throw error;
  }
};
