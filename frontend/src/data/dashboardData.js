// Problem Bank data
export const problems = [
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
export const recentMatches = [
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
export const leaderboardData = [
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

// Setting options
export const colorOptions = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Purple', value: 'purple' },
  { name: 'Orange', value: 'orange' }
];

export const fontOptions = [
  { name: 'Sans-serif', value: 'sans-serif' },
  { name: 'Serif', value: 'serif' },
  { name: 'Monospace', value: 'monospace' }
]; 