import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';
// GuestNavBar now comes from the layout
// import GuestNavBar from '../components/GuestNavBar';
import Footer from '../../../components/Footer';
import LoginSidebar from '../../../components/LoginSidebar';
import axios from 'axios'; // Import axios 
import { motion } from 'framer-motion'; // Import motion from framer-motion
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
  faChevronLeft,
  faSkull,
  faDatabase,
  faSort,
  faSortUp,
  faSortDown,
  faFilter,
  faUserCircle,
  faRightToBracket
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

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const LoadingScreen = () => {
  return (
    <motion.div 
      className="loading-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ zIndex: 999 }}
    >
      <div className="loading-content">
        <motion.div 
          className="loading-logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          TECHNO<span>MATCH</span>
        </motion.div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <div className="loading-text">INITIALIZING SYSTEM</div>
      </div>
    </motion.div>
  );
};

const HeroSection = ({ onLoginClick }) => {
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
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div className="hero-badge" variants={itemVariant}>
            <span className="badge-text">&#60;CODE. COMPETE. CONQUER.&#62;</span>
          </motion.div>
          <motion.h1 
            className="glitch-effect" 
            data-text="TechnoMatch"
            variants={itemVariant}
          >
            TechnoMatch
          </motion.h1>
          <motion.p className="tagline" variants={itemVariant}>
            Level up your programming skills through <span className="highlight">competitive coding battles</span>
          </motion.p>
          
          <motion.div 
            className="hero-button-center" 
            style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
            variants={itemVariant}
          >
            <motion.button 
              className={`btn btn-primary btn-lg ${animateButton ? 'super-pulse' : 'pulse-animation'}`}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
              onClick={onLoginClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-icon">
                <FontAwesomeIcon icon={faGamepad} />
              </span>
              Enter The Arena
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="power-indicator" 
            style={{ margin: '1.5rem auto', maxWidth: '250px' }}
            variants={itemVariant}
          >
            <div className="power-text">Battle Readiness</div>
            <div className="power-bar">
              <motion.div 
                className="power-progress" 
                initial={{ width: "0%" }}
                animate={{ width: "65%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.div>
            </div>
          </motion.div>
          
          <motion.div className="hero-stats" variants={itemVariant}>
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
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
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
        </motion.div>
      </div>
      
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <span>Scroll to enter</span>
        <div className="scroll-arrow">
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </motion.div>
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
    <motion.section 
      id="features" 
      className="features-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <motion.div 
        className="arsenal-header"
        variants={slideUp}
      >
        <h2>Battle Arsenal</h2>
        <div className="arsenal-decorative-line"></div>
        <p className="section-subtitle">Discover the powerful tools at your disposal</p>
      </motion.div>
      
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
              </div>
            </div>
          ))}
          
          {/* Repeated features starting from "Real-time Competitive Coding" */}
          {features.map(feature => (
            <div 
              className={`feature-card ${hoveredCard === `repeat-${feature.id}` ? 'feature-highlight' : ''}`} 
              key={`repeat-${feature.id}`}
              onMouseEnter={() => setHoveredCard(`repeat-${feature.id}`)}
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
    </motion.section>
  );
};

const BattleModesSection = ({ onLoginClick }) => {
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
    <motion.section 
      id="battle-modes" 
      className="battle-modes-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      <motion.div 
        className="battle-modes-header"
        variants={slideUp}
      >
        <h2>Battle Arenas</h2>
        <p className="section-subtitle">Choose your battlefield and prove your worth</p>
      </motion.div>
      
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
                <button 
                  className="btn battle-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onLoginClick();
                  }}
                  style={{ 
                  backgroundColor: mode.borderColor,
                  boxShadow: `0 5px 15px ${mode.borderColor}50` 
                  }}
                >
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
    </motion.section>
  );
};

const LeaderboardSection = ({ onLoginClick }) => {
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
  const [hoveredRow, setHoveredRow] = useState(null);
  const [highlightRank, setHighlightRank] = useState(1);
  const navigate = useNavigate();

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

  // Updated badge colors for the new rank system
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

  // Badge styling to reflect rank progression
  const getBadgeStyle = (badge) => {
    // Base style
    const style = {
      backgroundColor: `${badgeColors[badge]}20`,
      color: badgeColors[badge]
    };
    
    // Special styling for highest rank
    if (badge === 'Technocrat') {
      style.background = 'linear-gradient(45deg, #E91E63, #9C27B0)';
      style.color = '#fff';
      style.textShadow = '0 0 5px rgba(0,0,0,0.5)';
    }
    
    return style;
  };

  const rankIcons = {
    1: faCrown,
    2: faMedal,
    3: faTrophy
  };
  
  useEffect(() => {
    // Set up highlight effect that cycles through top ranks
    const highlightInterval = setInterval(() => {
      setHighlightRank(prev => (prev % 3) + 1);
    }, 3000);
    
    // Fetch leaderboard data
    fetchLeaderboardData();
    
    return () => {
      clearInterval(highlightInterval);
    };
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

  return (
    <motion.section 
      id="leaderboard" 
      className="leaderboard-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn}
    >
      {/* Main Leaderboard Header Banner */}
      <div className="leaderboard-main-banner">
        <div className="banner-bg-elements">
          <div className="banner-glow"></div>
          <div className="banner-lines"></div>
        </div>
        <div className="banner-content">
          <FontAwesomeIcon icon={faTrophy} className="banner-icon" />
          <h2 className="banner-title">GLOBAL LEADERBOARDS</h2>
          <div className="banner-divider"></div>
          <p className="banner-subtitle">Compete, Rise, Conquer</p>
        </div>
      </div>
      
      {/* Enhanced Gaming-Style Header */}
      <div className="leaderboard-header">
        <div className="leaderboard-title-container">
          <div className="leaderboard-icon">
            <FontAwesomeIcon icon={faTrophy} />
          </div>
          <h2>Battle Rankings</h2>
        </div>
        <p className="section-subtitle">
          The most skilled warriors rise to the top. Do you have what it takes to join the elite?
        </p>
        
        {/* Champion Banner - displays current #1 player */}
        {leaderboardData.length > 0 && (
          <div className="champion-banner">
            <div className="banner-title">Current Champion</div>
            <div className="banner-content">
              <div className="champion-avatar">
                {leaderboardData[0].username.charAt(0)}
              </div>
              <div className="champion-info">
                <div className="champion-name">{leaderboardData[0].fullName}</div>
                <div className="champion-stats">
                  <span>
                    <FontAwesomeIcon icon={faStar} />
                    Lvl {leaderboardData[0].level}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faShield} />
                    {leaderboardData[0].badge} Rank
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faGamepad} />
                    {leaderboardData[0].matches} Matches
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faChartLine} />
                    {leaderboardData[0].winRate}% Win Rate
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Top 3 Podium */}
      <div className="leaderboard-podium">
        {leaderboardData.slice(0, 3).map((player) => (
          <motion.div 
            key={player.rank} 
            className={`podium-position position-${player.rank} ${highlightRank === player.rank ? 'highlight' : ''}`}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="podium-avatar" style={{ backgroundColor: player.avatarColor }}>
              <span>{player.username.charAt(0)}</span>
              {player.rank === 1 && <FontAwesomeIcon icon={faCrown} className="crown-icon" />}
            </div>
            <div className="podium-info">
              <div className="podium-fullname">{player.fullName}</div>
              <div className="podium-username">@{player.username}</div>
              <div className="podium-level">
                <span className="level-label">Level</span>
                <span className="level-value">{player.level}</span>
              </div>
              <div className="podium-badge" style={getBadgeStyle(player.badge)}>
                {player.badge}
              </div>
              <div className="podium-winrate">{player.winRate}% Win Rate</div>
            </div>
            <div className="podium-stand">
              <FontAwesomeIcon icon={rankIcons[player.rank] || faStar} className="rank-icon" />
              <span className="podium-rank">{player.rank}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Leaderboard Controls */}
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
      
      {/* Filter Panel */}
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

      {/* Leaderboard Table with Enhanced Header */}
      <div className="leaderboard-table-container">
        <div className="table-section-title">
          <FontAwesomeIcon icon={faServer} className="title-icon" />
          <h3>Server Rankings</h3>
        </div>
        
        <motion.div 
          className="leaderboard-table"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div className="leaderboard-table-header">
            <div className="header-rank">
              <FontAwesomeIcon icon={faTrophy} className="header-icon" />
              <span>Rank</span>
            </div>
            <div className="header-player">
              <FontAwesomeIcon icon={faUser} className="header-icon" />
              <span>Player</span>
            </div>
            <div className="header-level">
              <FontAwesomeIcon icon={faStar} className="header-icon" />
              <span>Level</span>
            </div>
            <div className="header-xp">
              <FontAwesomeIcon icon={faShield} className="header-icon" />
              <span>Rank</span>
            </div>
            <div className="header-matches">
              <FontAwesomeIcon icon={faGamepad} className="header-icon" />
              <span>Matches</span>
            </div>
            <div className="header-winrate">
              <FontAwesomeIcon icon={faChartLine} className="header-icon" />
              <span>Win Rate</span>
            </div>
          </div>
          
          {filteredData.map(player => (
            <motion.div 
              key={player.rank}
              className={`leaderboard-row ${hoveredRow === player.rank ? 'hovered' : ''} ${player.rank <= 3 ? `top-${player.rank}` : ''}`}
              onMouseEnter={() => setHoveredRow(player.rank)}
              onMouseLeave={() => setHoveredRow(null)}
              variants={itemVariant}
              whileHover={{ 
                backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                transition: { duration: 0.2 }
              }}
            >
              <div className="cell-rank">
                <div className="rank-circle" style={{ 
                  background: player.rank <= 3 
                    ? `linear-gradient(135deg, var(--primary-color), ${badgeColors[player.badge]})` 
                    : 'rgba(var(--text-rgb), 0.1)' 
                }}>
                  {player.rank <= 3 ? (
                    <FontAwesomeIcon icon={rankIcons[player.rank] || faStar} />
                  ) : player.rank}
                </div>
              </div>
              
              <div className="cell-player">
                <div className="player-avatar" style={{ 
                  backgroundColor: player.avatarColor,
                  boxShadow: `0 0 10px ${player.avatarColor}80`
                }}>
                  {player.username.charAt(0)}
                </div>
                <div className="player-info">
                  <div className="player-fullname">{player.fullName}</div>
                  <div className="player-username">@{player.username}</div>
                </div>
              </div>
              
              <div className="cell-level">
                <div className="level-badge">
                  <span className="level-value">{player.level}</span>
                </div>
              </div>
              
              <div className="cell-xp">
                <div className="xp-value">{player.badge}</div>
                <div className="xp-label">Rank</div>
                <div className="xp-bar-container">
                  <div className="xp-bar" style={{ 
                    width: `${(player.xp / leaderboardData[0].xp) * 100}%`,
                    background: `linear-gradient(90deg, ${player.avatarColor}, ${player.avatarColor}90)`
                  }}></div>
                </div>
              </div>
              
              <div className="cell-matches">
                <div className="matches-value">{player.matches}</div>
                <div className="matches-label">Matches</div>
                <div className="matches-icon">
                  <FontAwesomeIcon icon={faGamepad} />
                </div>
              </div>
              
              <div className="cell-winrate">
                <div className="winrate-value">{player.winRate}%</div>
                <div className="winrate-label">Win Rate</div>
                <div className="winrate-indicator">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
        
      <div className="leaderboard-footer">
        <motion.div>
          <motion.button 
            className="join-leaderboard-btn"
            onClick={onLoginClick}
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FontAwesomeIcon icon={faRocket} />
            <span>Join the Battle</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

const Home = () => {
  const [showLoginSidebar, setShowLoginSidebar] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [sidebarType, setSidebarType] = useState('guest'); // 'guest', 'student', 'admin', 'professor'
  const { theme } = useTheme();
  const { userRole, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';

  // Set sidebar type based on user role
  useEffect(() => {
    if (isAuthenticated) {
      setSidebarType(userRole);
    } else {
      setSidebarType('guest');
    }
  }, [userRole, isAuthenticated]);

  // Toggle login sidebar
  const toggleLoginSidebar = () => {
    setShowLoginSidebar(!showLoginSidebar);
  };

  // Handle dashboard navigation
  const handleDashboardNavigation = () => {
    if (isAuthenticated) {
      // Navigate based on role
      switch (userRole) {
        case 'student':
          navigate('/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'professor':
          navigate('/professor/dashboard');
          break;
        default:
          toggleLoginSidebar();
      }
    } else {
      // Show login sidebar for guests
      toggleLoginSidebar();
    }
  };

  // Handle loading effect
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
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

  // Add body class to prevent scrolling when sidebar is open
  useEffect(() => {
    if (showLoginSidebar) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [showLoginSidebar]);

  // Render appropriate sidebar based on role
  const renderSidebar = () => {
    switch (sidebarType) {
      case 'student':
        return <LoginSidebar isOpen={showLoginSidebar} onClose={toggleLoginSidebar} userRole="student" />;
      case 'admin':
        return <LoginSidebar isOpen={showLoginSidebar} onClose={toggleLoginSidebar} userRole="admin" />;
      case 'professor':
        return <LoginSidebar isOpen={showLoginSidebar} onClose={toggleLoginSidebar} userRole="professor" />;
      default:
        return <LoginSidebar isOpen={showLoginSidebar} onClose={toggleLoginSidebar} />;
    }
  };

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {showLoadingScreen && <LoadingScreen />}
      
      {renderSidebar()}
      
      <motion.main 
        className="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection onLoginClick={handleDashboardNavigation} />
        <FeaturesSection />
        <BattleModesSection onLoginClick={handleDashboardNavigation} />
        <LeaderboardSection onLoginClick={handleDashboardNavigation} />
      </motion.main>

      <Footer />
    </div>
  );
};

export default Home;
