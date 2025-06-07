import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext.jsx';
import GuestNavBar from '../components/GuestNavBar';
import Footer from '../components/Footer';
import axios from 'axios'; // Import axios 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLaptopCode,
  faServer,
  faBrain,
  faChevronRight,
  faUsers,
  faGift,
  faTrophy,
  faGamepad,
  faStar,
  faFire,
  faShield,
  faLightbulb,
  faBolt,
  faClock,
  faRocket,
  faUser,
  faCrown,
  faMedal,
  faArrowDown,
  faCode,
  faDoorOpen,
  faChartLine,
  faLock,
  faPuzzlePiece,
  faGem,
  faPlus,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import './Home.scss';
  

// Mock data for the home page
const mockData = {
  stats: {
    activePlayers: '10K+',
    challenges: '500+',
    battles: '24/7'
  },
  features: [
    {
      id: 1,
      title: 'Real-time Competitive Coding',
      description: 'Engage in high-octane coding battles with real-time feedback and performance metrics.',
      icon: faGamepad,
      color: '#FF5757'
    },
    {
      id: 2,
      title: 'Custom Battle Arenas',
      description: 'Create your own coding battlegrounds with custom rules, time limits, and difficulty settings.',
      icon: faDoorOpen,
      color: '#57B8FF'
    },
    {
      id: 3,
      title: 'Skill Analytics Dashboard',
      description: 'Track your progress with detailed stats, heat maps, and performance insights.',
      icon: faChartLine,
      color: '#5CE1E6'
    },
    {
      id: 4,
      title: 'Multi-language Support',
      description: 'Level up in your preferred programming language or expand your skill set with new ones.',
      icon: faCode,
      color: '#9C57FF'
    },
    {
      id: 5,
      title: 'Algorithm Mastery Path',
      description: 'Follow a structured learning path to master essential programming algorithms.',
      icon: faRocket,
      color: '#FF914D'
    },
    {
      id: 6,
      title: 'Problem-Solving Quests',
      description: 'Embark on coding quests with increasing difficulty and earn exclusive rewards.',
      icon: faPuzzlePiece,
      color: '#38B000'
    }
  ],
  battleModes: [
    {
      id: 1,
      name: 'PROGRESSIVE MODE',
      description: 'Build your skills gradually with increasingly challenging coding exercises tailored to your learning journey.',
      difficulty: 'All Levels',
      xpReward: 75,
      unlockedAt: 1,
      completionRate: '92%',
      icon: faRocket,
      backgroundColor: 'rgba(87, 184, 255, 0.2)',
      borderColor: '#57B8FF'
    },
    {
      id: 2,
      name: 'RANKED MODE',
      description: 'Compete against other coders in your skill bracket. Win matches to climb the leaderboard and earn exclusive rewards.',
      difficulty: 'Competitive',
      xpReward: 200,
      unlockedAt: 2,
      completionRate: '78%',
      icon: faTrophy,
      backgroundColor: 'rgba(255, 87, 87, 0.2)',
      borderColor: '#FF5757'
    },
    {
      id: 3,
      name: 'CONTEST MODE',
      description: 'Special limited-time coding competitions with unique challenges and premium rewards. Coming soon!',
      difficulty: 'Special',
      xpReward: 350,
      unlockedAt: 3,
      completionRate: '0%',
      icon: faCrown,
      backgroundColor: 'rgba(156, 87, 255, 0.2)',
      borderColor: '#9C57FF',
      comingSoon: true
    }
  ],
  leaderboard: [
    { id: 1, username: 'CodeMaster', score: 9850, rank: 1, level: 42, achievements: 16, title: 'TechnoCrat Champion', avatar: '👑' },
    { id: 2, username: 'ByteNinja', score: 9720, rank: 2, level: 38, achievements: 14, title: 'Algorithm Virtuoso', avatar: '🥷' },
    { id: 3, username: 'AlgoWizard', score: 9580, rank: 3, level: 36, achievements: 15, title: 'Code Architect', avatar: '🧙' },
    { id: 4, username: 'DevGuru', score: 9410, rank: 4, level: 35, achievements: 13, title: 'Backend Titan', avatar: '🧠' },
    { id: 5, username: 'SyntaxHero', score: 9250, rank: 5, level: 33, achievements: 12, title: 'Syntax Savant', avatar: '⚔️' }
  ],
  userProgression: {
    level: 4,
    currentXP: 450,
    nextLevelXP: 600,
    rank: 127,
    streak: 7,
    skillData: [
      { day: 'Mon', value: 45 },
      { day: 'Tue', value: 60 },
      { day: 'Wed', value: 52 },
      { day: 'Thu', value: 78 },
      { day: 'Fri', value: 65 },
      { day: 'Sat', value: 85 },
      { day: 'Sun', value: 90 }
    ],
    achievements: [
      { id: 1, name: 'First Blood', description: 'Complete your first coding battle', earned: true, icon: '🏆' },
      { id: 2, name: 'Streak Master', description: 'Maintain a 7-day streak', earned: true, icon: '🔥' },
      { id: 3, name: 'Bug Slayer', description: 'Fix 50 bugs in Bug Hunter mode', earned: false, icon: '🐛' }
    ],
    badges: [
      { id: 1, name: 'JavaScript Mastery', progress: 75 },
      { id: 2, name: 'Python Expertise', progress: 40 },
      { id: 3, name: 'React Proficiency', progress: 20 }
    ]
  },
  dailyChallenges: [
    { id: 1, name: 'Algorithm of the Day', description: 'Solve today\'s featured algorithm', difficulty: 'Medium', reward: 150, completed: false },
    { id: 2, name: 'Community Challenge', description: 'Participate in the weekend community event', difficulty: 'Hard', reward: 300, completed: false }
  ]
};

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-logo">TECHNO<span>MATCH</span></div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <div className="loading-text">INITIALIZING SYSTEM</div>
      </div>
    </div>
  );
};

const HeroSection = () => {
  const [animateButton, setAnimateButton] = useState(false);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleButtonHover = () => {
    setAnimateButton(true);
  };

  const handleButtonLeave = () => {
    setAnimateButton(false);
  };
  
  // Function to fetch stats data from API
  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Uncomment for production use
      // const response = await axios.get(`${API_BASE_URL}/stats`);
      // setStats(response.data);
      
      // Mock data for development
      setStats(mockData.stats);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching stats data:', err);
      setError('Failed to fetch stats data');
      setLoading(false);
      
      // Fallback to mock data if API fails
      setStats(mockData.stats);
    }
  };
  
  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);
  
  return (
    <section id="hero" className="hero section-full">
      <div className="hero-bg-elements">
        <div className="circuit-lines">
          <div className="circuit line-1"></div>
          <div className="circuit line-2"></div>
          <div className="circuit line-3"></div>
        </div>
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">&#60;CODE. COMPETE. CONQUER.&#62;</span>
          </div>
          <h1 className="glitch-effect" data-text="TechnoMatch">TechnoMatch</h1>
          <p className="tagline">Level up your programming skills through <span className="highlight">competitive coding battles</span></p>
          
          <div className="hero-button-center" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              className={`btn btn-primary btn-lg ${animateButton ? 'super-pulse' : 'pulse-animation'}`}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              <span className="btn-icon">
                <FontAwesomeIcon icon={faGamepad} />
              </span>
              Enter The Arena
            </button>
          </div>
          
          <div className="power-indicator" style={{ margin: '1.5rem auto', maxWidth: '250px' }}>
            <div className="power-text">Battle Readiness</div>
            <div className="power-bar">
              <div className="power-progress" style={{width: '65%'}}></div>
            </div>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.activePlayers || '---'}</span>
              <span className="stat-label">Active Students</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{stats.challenges || '---'}</span>
              <span className="stat-label">Challenges</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">{stats.battles || '---'}</span>
              <span className="stat-label">Competitions</span>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="code-block">
            <div className="code-header">
              <div className="code-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="code-title">matchmaking.js</div>
            </div>
            <div className="code-content terminal">
              <pre><code>
                <span className="terminal-prompt">$</span> <span className="terminal-command">node matchmaking.js</span>
                
                <span className="terminal-output">[SYSTEM] Initializing battle system...</span>
                <span className="terminal-output">[SYSTEM] Loading arena configurations...</span>
                <span className="terminal-output">[SYSTEM] Starting matchmaking services...</span>
                
                <span className="terminal-prompt">$</span> <span className="terminal-command">cat BattleSystem.js</span>
                
                <span className="code-keyword">class</span> <span className="code-class">BattleSystem</span> {"{"}
                
                  <span className="code-function">constructor</span>() {"{"}
                    <span className="code-comment">// Initialize core battle components</span>
                    <span className="code-variable">this</span>.<span className="code-property">arenas</span> = <span className="code-keyword">new</span> <span className="code-class">Map</span>();
                    <span className="code-variable">this</span>.<span className="code-property">players</span> = <span className="code-keyword">new</span> <span className="code-class">Set</span>();
                    <span className="code-variable">this</span>.<span className="code-property">status</span> = <span className="code-string">"READY"</span>;
                    <span className="code-output">console.log</span>(<span className="code-string">"Battle system online"</span>);
                  {"}"}
                
                  <span className="code-function">initiateBattle</span>(<span className="code-variable">player</span>, <span className="code-variable">mode</span>) {"{"}
                    <span className="code-output">console.log</span>(<span className="code-string">"Matching player..."</span>);
                    <span className="code-keyword">const</span> <span className="code-variable">arena</span> = <span className="code-variable">this</span>.<span className="code-method">findArena</span>({"{"}
                      <span className="code-variable">skillRange</span>: <span className="code-string">"level ± 2"</span>,
                      <span className="code-variable">gameMode</span>: <span className="code-variable">mode</span>
                    {"}"});
                    <span className="code-output">console.log</span>(<span className="code-string">"Match found! Starting countdown..."</span>);
                    <span className="code-keyword">return</span> <span className="code-variable">arena</span>.<span className="code-method">startCountdown</span>();
                  {"}"}
                {"}"}
                
                <span className="terminal-prompt">$</span> <span className="terminal-command">./match_player.sh "CodeWarrior" --mode=competitive</span>
                
                <span className="terminal-output">[MATCH] Finding opponents for CodeWarrior...</span>
                <span className="terminal-output">[MATCH] Level range: 5-9</span>
                <span className="terminal-output">[MATCH] Compatible players found: 3</span>
                <span className="terminal-output">[MATCH] Starting battle in 5...</span>
                <span className="terminal-cursor"></span>
              </code></pre>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll to enter</span>
        <div className="scroll-arrow">
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to fetch features data from API
  const fetchFeatures = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Uncomment for production use
      // const response = await axios.get(`${API_BASE_URL}/features`);
      // setFeatures(response.data);
      
      // Mock data for development
      setFeatures(mockData.features);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching features data:', err);
      setError('Failed to fetch features data');
      setLoading(false);
      
      // Fallback to mock data if API fails
      setFeatures(mockData.features);
    }
  };
  
  // Fetch features on component mount
  useEffect(() => {
    fetchFeatures();
  }, []);
  
  // Scroll handler for arrow controls
  const scrollContainer = (direction) => {
    const container = document.querySelector('.features-scroll-container');
    if (container) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  // If loading, show loading indicator (optional)
  if (loading && features.length === 0) {
    return (
      <section id="features" className="features-section">
        <h2>Battle Arsenal</h2>
        <p className="section-subtitle">Loading battle arsenal data...</p>
      </section>
    );
  }
  
  // If error and no data, show error message (optional)
  if (error && features.length === 0) {
    return (
      <section id="features" className="features-section">
        <h2>Battle Arsenal</h2>
        <p className="section-subtitle">Error loading battle arsenal data. Please try again later.</p>
      </section>
    );
  }
  
  return (
    <section id="features" className="features-section">
      <div className="arsenal-header">
        <h2>Battle Arsenal</h2>
        <div className="arsenal-decorative-line"></div>
        <p className="section-subtitle">Discover the powerful tools at your disposal</p>
      </div>
      
      <div className="arsenal-container">
        <button 
          className="scroll-arrow scroll-left" 
          onClick={() => scrollContainer('left')}
          aria-label="Scroll left"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        <div className="features-scroll-container">
          {features.map(feature => (
            <div 
              className={`feature-card ${hoveredCard === feature.id ? 'feature-highlight' : ''}`} 
              key={feature.id}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="feature-glow" style={{ boxShadow: `0 0 25px ${feature.color}40` }}></div>
              <div className="feature-content">
                <div className="feature-icon-container">
                  <div className="feature-icon" style={{ backgroundColor: `${feature.color}20`, color: feature.color }}>
                    <FontAwesomeIcon icon={feature.icon} />
                  </div>
                  <div className="icon-ring" style={{ borderColor: feature.color }}></div>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-stats">
                  <div className="stat" style={{ color: feature.color }}>
                    <FontAwesomeIcon icon={faBolt} />
                    <span>{Math.floor(Math.random() * 30) + 70}</span>
                  </div>
                  <div className="stat" style={{ color: feature.color }}>
                    <FontAwesomeIcon icon={faShield} />
                    <span>{Math.floor(Math.random() * 40) + 60}</span>
                  </div>
                </div>
                <button className="equip-button" style={{ backgroundColor: feature.color }}>
                  Equip
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="scroll-arrow scroll-right" 
          onClick={() => scrollContainer('right')}
          aria-label="Scroll right"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </section>
  );
};

const BattleModesSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [hoverCard, setHoverCard] = useState(null);
  const [battleModes, setBattleModes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Function to fetch battle modes data from API
  const fetchBattleModes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Uncomment for production use
      // const response = await axios.get(`${API_BASE_URL}/battle-modes`);
      // setBattleModes(response.data);
      
      // Mock data for development
      setBattleModes(mockData.battleModes);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching battle modes data:', err);
      setError('Failed to fetch battle modes data');
      setLoading(false);
      
      // Fallback to mock data if API fails
      setBattleModes(mockData.battleModes);
    }
  };
  
  // Fetch battle modes on component mount
  useEffect(() => {
    fetchBattleModes();
  }, []);
  
  // If loading, show loading indicator (optional)
  if (loading && battleModes.length === 0) {
    return (
      <section id="battle-modes" className="battle-modes-section">
        <div className="battle-modes-header">
          <h2>Battle Arenas</h2>
          <p className="section-subtitle">Loading battle arenas...</p>
        </div>
      </section>
    );
  }
  
  // If error and no data, show error message (optional)
  if (error && battleModes.length === 0) {
    return (
      <section id="battle-modes" className="battle-modes-section">
        <div className="battle-modes-header">
          <h2>Battle Arenas</h2>
          <p className="section-subtitle">Error loading battle arenas. Please try again later.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="battle-modes" className="battle-modes-section">
      <div className="battle-modes-header">
      <h2>Battle Arenas</h2>
      <p className="section-subtitle">Choose your battlefield and prove your worth</p>
      </div>
      
      <div className="battle-modes-grid">
        {battleModes.map(mode => (
          <div 
            className={`battle-mode-card ${activeCard === mode.id ? 'active-card' : ''} ${hoverCard === mode.id ? 'hover-card' : ''}`} 
            key={mode.id}
            onClick={() => setActiveCard(activeCard === mode.id ? null : mode.id)}
            onMouseEnter={() => setHoverCard(mode.id)}
            onMouseLeave={() => setHoverCard(null)}
            style={{ 
              backgroundColor: mode.backgroundColor, 
              borderColor: mode.borderColor
            }}
          >
            <div className="card-glow" style={{ boxShadow: `0 0 30px ${mode.borderColor}40` }}></div>
            
            <div className="battle-mode-icon" style={{ color: mode.borderColor }}>
              <FontAwesomeIcon icon={mode.icon} />
              <div className="icon-pulse" style={{ borderColor: mode.borderColor }}></div>
            </div>
            
            <div className="card-content">
              <div className="card-header">
              <h3>{mode.name}</h3>
              </div>
              
              <p>{mode.description}</p>
              
              {mode.comingSoon ? (
                <div className="coming-soon-badge" style={{ backgroundColor: `${mode.borderColor}20`, color: mode.borderColor }}>
                  <FontAwesomeIcon icon={faClock} />
                  <span>Coming Soon</span>
                </div>
              ) : mockData.userProgression.level >= mode.unlockedAt ? (
                <button className="btn battle-btn" style={{ 
                  backgroundColor: mode.borderColor,
                  boxShadow: `0 5px 15px ${mode.borderColor}50` 
                }}>
                  <span className="battle-icon">
                    <FontAwesomeIcon icon={faGamepad} />
                  </span> 
                  Enter Arena
                </button>
              ) : (
                <div className="mode-locked">
                  <span className="lock-icon">
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                  <span className="lock-text">Unlock at Level {mode.unlockedAt}</span>
                </div>
              )}
              
              {activeCard === mode.id && !mode.comingSoon && (
                <div className="card-action-menu">
                  <div className="menu-item">
                    <FontAwesomeIcon icon={faUsers} />
                    <span>Find Team</span>
                  </div>
                  <div className="menu-item">
                    <FontAwesomeIcon icon={faGem} />
                    <span>View Rewards</span>
                </div>
                  <div className="menu-item">
                    <FontAwesomeIcon icon={faPlus} />
                    <span>Create Custom</span>
            </div>
          </div>
              )}
            </div>
            <div className="card-background"></div>
            
            {mode.difficulty === 'All Levels' ? (
              <div className="level-badge" style={{ color: mode.borderColor }}>
                <FontAwesomeIcon icon={faUser} />
                <span>All Levels</span>
                </div>
            ) : mode.difficulty === 'Competitive' ? (
              <div className="level-badge" style={{ color: mode.borderColor }}>
                <FontAwesomeIcon icon={faChartLine} />
                <span>Competitive</span>
                </div>
            ) : (
              <div className="level-badge" style={{ color: mode.borderColor }}>
                <FontAwesomeIcon icon={faStar} />
                <span>Special</span>
              </div>
            )}
              </div>
            ))}
          </div>
    </section>
  );
};

const LeaderboardSection = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [highlightRank, setHighlightRank] = useState(1);
  const [leaderboardPlayers, setLeaderboardPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Enhanced leaderboard data with more game-like details
  const mockLeaderboardData = [
    { 
      rank: 1, 
      name: 'CodingLegend', 
      score: 28750, 
      winRate: 89, 
      badge: 'Grandmaster', 
      avatarColor: '#E91E63',
      winStreak: 17,
      specialty: 'Algorithms',
      battles: 346,
      level: 52
    },
    { 
      rank: 2, 
      name: 'AlgorithmQueen', 
      score: 26543, 
      winRate: 87, 
      badge: 'Champion', 
      avatarColor: '#9C27B0',
      winStreak: 12,
      specialty: 'Data Structures',
      battles: 298,
      level: 48
    },
    { 
      rank: 3, 
      name: 'DragonCoder', 
      score: 24981, 
      winRate: 85, 
      badge: 'Master', 
      avatarColor: '#FF5722',
      winStreak: 9,
      specialty: 'Backend',
      battles: 312,
      level: 45
    },
    { 
      rank: 4, 
      name: 'HackerElite', 
      score: 23542, 
      winRate: 83, 
      badge: 'Legend', 
      avatarColor: '#673AB7',
      winStreak: 7,
      specialty: 'Security',
      battles: 276,
      level: 43
    },
    { 
      rank: 5, 
      name: 'ByteNinja', 
      score: 21687, 
      winRate: 81, 
      badge: 'Expert', 
      avatarColor: '#2196F3',
      winStreak: 6,
      specialty: 'Frontend',
      battles: 289,
      level: 41
    },
    { 
      rank: 6, 
      name: 'CodeWarrior', 
      score: 19845, 
      winRate: 79, 
      badge: 'Elite', 
      avatarColor: '#4CAF50',
      winStreak: 4,
      specialty: 'Full Stack',
      battles: 265,
      level: 39
    },
    { 
      rank: 7, 
      name: 'SyntaxKing', 
      score: 18120, 
      winRate: 76, 
      badge: 'Veteran', 
      avatarColor: '#FFC107',
      winStreak: 3,
      specialty: 'Databases',
      battles: 243,
      level: 37
    }
  ];
  
  const badgeColors = {
    'Novice': '#78909C',
    'Skilled': '#8BC34A',
    'Elite': '#00BCD4',
    'Expert': '#FFC107',
    'Veteran': '#9C27B0',
    'Master': '#FF5722',
    'Champion': '#E91E63',
    'Legend': '#673AB7',
    'Grandmaster': '#F44336'
  };
  
  // Function to fetch leaderboard data from API
  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Uncomment for production use
      // const response = await axios.get(`${API_BASE_URL}/leaderboard`);
      // setLeaderboardPlayers(response.data);
      
      // Mock data for development
      setLeaderboardPlayers(mockLeaderboardData);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError('Failed to fetch leaderboard data');
      setLoading(false);
      
      // Fallback to mock data if API fails
      setLeaderboardPlayers(mockLeaderboardData);
    }
  };
  
  // Animation effects and data fetching
  useEffect(() => {
    // Set up animations
    setShowAnimation(true);
    const animationTimer = setTimeout(() => setShowAnimation(false), 2000);
    
    // Create highlight effect that cycles through top ranks
    const highlightInterval = setInterval(() => {
      setHighlightRank(prev => (prev % 3) + 1);
    }, 3000);
    
    // Fetch leaderboard data
    fetchLeaderboardData();
    
    return () => {
      clearTimeout(animationTimer);
      clearInterval(highlightInterval);
    };
  }, []);
  
  // If loading, show loading indicator (optional)
  if (loading && leaderboardPlayers.length === 0) {
    return (
      <section id="leaderboard" className="leaderboard-section">
        <div className="leaderboard-header">
          <div className="leaderboard-title-container">
            <FontAwesomeIcon icon={faTrophy} className="leaderboard-icon" />
            <h2>Hall of Fame</h2>
          </div>
          <p className="section-subtitle">Loading leaderboard data...</p>
        </div>
      </section>
    );
  }
  
  // If error and no data, show error message (optional)
  if (error && leaderboardPlayers.length === 0) {
    return (
      <section id="leaderboard" className="leaderboard-section">
        <div className="leaderboard-header">
          <div className="leaderboard-title-container">
            <FontAwesomeIcon icon={faTrophy} className="leaderboard-icon" />
            <h2>Hall of Fame</h2>
          </div>
          <p className="section-subtitle">Error loading leaderboard data. Please try again later.</p>
        </div>
      </section>
    );
  }
  
  return (
    <section id="leaderboard" className="leaderboard-section">
      <div className="leaderboard-header">
        <div className="leaderboard-title-container">
          <FontAwesomeIcon 
            icon={faTrophy} 
            className="leaderboard-icon"
          />
          <h2>Hall of Fame</h2>
        </div>
        <p className="section-subtitle">Legendary coders who have conquered the TechnoMatch arenas</p>
      </div>
        
      {/* Top 3 Podium */}
      <div className="leaderboard-podium">
        {leaderboardPlayers.slice(0, 3).map((player, index) => (
          <div 
            key={player.rank} 
            className={`podium-position position-${player.rank} ${highlightRank === player.rank ? 'highlight' : ''}`}
          >
            <div className="podium-avatar" style={{ backgroundColor: player.avatarColor }}>
              <span>{player.name.charAt(0)}</span>
              {player.rank === 1 && <FontAwesomeIcon icon={faCrown} className="crown-icon" />}
            </div>
            <div className="podium-info">
              <div className="podium-name">{player.name}</div>
              <div className="podium-score">{player.score.toLocaleString()} pts</div>
              <div className="podium-badge" style={{ color: badgeColors[player.badge] }}>
                {player.badge}
              </div>
            </div>
            <div className="podium-stand">
              <span className="podium-rank">{player.rank}</span>
            </div>
          </div>
        ))}
      </div>
        
      {/* Leaderboard Table */}
      <div className="leaderboard-table-container">
        <div className="leaderboard-table">
          <div className="leaderboard-table-header">
            <div className="header-rank">Rank</div>
            <div className="header-player">Player</div>
            <div className="header-level">Level</div>
            <div className="header-battles">Battles</div>
            <div className="header-score">Score</div>
          </div>
          
          {leaderboardPlayers.map(player => (
            <div 
              key={player.rank}
              className={`leaderboard-row ${hoveredRow === player.rank ? 'hovered' : ''} ${player.rank <= 3 ? `top-${player.rank}` : ''}`}
              onMouseEnter={() => setHoveredRow(player.rank)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <div className="cell-rank">
                <div className="rank-circle" style={{ 
                  background: player.rank <= 3 
                    ? `linear-gradient(135deg, var(--primary-color), ${badgeColors[player.badge]})` 
                    : 'rgba(var(--text-rgb), 0.1)' 
                }}>
                  {player.rank}
                </div>
              </div>
              
              <div className="cell-player">
                <div className="player-avatar" style={{ backgroundColor: player.avatarColor }}>
                  {player.name.charAt(0)}
                </div>
                <div className="player-info">
                  <div className="player-name">{player.name}</div>
                  <div className="player-badge" style={{ color: badgeColors[player.badge] }}>
                    {player.badge}
                  </div>
                </div>
              </div>
              
              <div className="cell-level">
                <div className="level-display">
                  <FontAwesomeIcon icon={faMedal} />
                  <span>{player.level}</span>
                </div>
              </div>
              
              <div className="cell-battles">
                <FontAwesomeIcon icon={faGamepad} />
                <span>{player.battles}</span>
                </div>
                
              <div className="cell-score">
                <div className="score-value">{player.score.toLocaleString()}</div>
                <div className="score-bar">
                  <div className="score-fill" style={{ 
                    width: `${(player.score / leaderboardPlayers[0].score) * 100}%`,
                    background: `linear-gradient(90deg, ${player.avatarColor}, ${player.avatarColor}90)`
                  }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        
      <div className="leaderboard-footer">
        <a href="/leaderboard" className="join-leaderboard-btn">
          <FontAwesomeIcon icon={faRocket} />
          <span>Climb the Ranks</span>
        </a>
      </div>
    </section>
  );
};

const CTASection = () => {
  const [shake, setShake] = useState(false);
  
  const handleButtonHover = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };
  
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>Are you ready to accept the challenge?</h2>
        <p>Join the TechnoMatch arena and battle your way to coding greatness</p>
        <button 
          className={`btn btn-primary btn-large ${shake ? 'shake-animation' : ''}`}
          onMouseEnter={handleButtonHover}
        >
          Join The Battle
        </button>
      </div>
    </section>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { theme } = useTheme();

  // Handle loading effect
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    // Handle hash navigation for smooth scrolling
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };
    
    // Check for hash in URL on initial load
    handleHashChange();
    
    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="home-container">
      {isLoading && <LoadingScreen />}
      
      <GuestNavBar />
      
      <main className="main-content">
        <HeroSection />
        <FeaturesSection />
        <BattleModesSection />
        <LeaderboardSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
