import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import './Home.scss';
import { Link } from "react-router-dom";

// Create Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Check if there's a saved theme preference or use system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check if user prefers dark mode via system settings
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState('light'); // Default to light as fallback

  // Initialize theme once component mounts (to avoid SSR hydration issues)
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  // Update localStorage and document body class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
const useTheme = () => useContext(ThemeContext);

// Theme Toggle Component
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        {theme === 'light' ? (
          <div className="dark-icon">🌙</div>
        ) : (
          <div className="light-icon">☀️</div>
        )}
        <div className="toggle-thumb"></div>
      </div>
    </button>
  );
};

// New Header Component
const Header = () => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ensure theme is applied to body when header mounts
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  
  return (
    <header className={`site-header ${theme} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="header-bg-elements">
        <div className="bg-element"></div>
        <div className="bg-element"></div>
        <div className="bg-element"></div>
      </div>
      <div className="header-container">
        <div className="logo">
          <a href="#hero">
            <span className="logo-icon">&#60;/&#62;</span>
            <span className="logo-text">Techno<span className="logo-accent">Match</span></span>
          </a>
        </div>
        <nav className="main-nav">
          <ul className="nav-links">
            <li><a href="#features" className="nav-link"><span className="nav-icon">✨</span>Features</a></li>
            <li><a href="#battle-modes" className="nav-link"><span className="nav-icon">🎮</span>Battle Modes</a></li>
            <li><a href="#journey" className="nav-link"><span className="nav-icon">🗺️</span>Journey</a></li>
            <li><a href="#leaderboard" className="nav-link"><span className="nav-icon">🏆</span>Leaderboard</a></li>
          </ul>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <div className="auth-buttons">
            <button className="btn btn-ghost">Log In</button>
            <button className="btn btn-primary btn-glow">Sign Up</button>
          </div>
        </div>
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
};

const HeroSection = () => {
  const { theme } = useTheme();
  
  return (
    <section id="hero" className={`hero ${theme} section-full`}>
      <div className="hero-bg-elements">
        <div className="circuit-lines">
          <div className="circuit line-1"></div>
          <div className="circuit line-2"></div>
          <div className="circuit line-3"></div>
          <div className="circuit dot-1"></div>
          <div className="circuit dot-2"></div>
          <div className="circuit dot-3"></div>
        </div>
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ 
              '--size': `${Math.random() * 5 + 2}px`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--duration': `${Math.random() * 20 + 10}s`,
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-text">&#60;CODE. COMPETE. CONQUER.&#62;</span>
          </div>
          <h1 className="glitch-effect" data-text="TechnoMatch">TechnoMatch</h1>
          <p className="tagline">Elevate your programming skills through <span className="highlight">structured competition</span></p>
          <div className="hero-button-center">
            <button className="btn btn-primary btn-lg pulse-animation">
              <span className="btn-icon">⚔️</span>
              Join The Battle
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Active Players</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">500+</span>
              <span className="stat-label">Challenges</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Battles</span>
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
              <div className="code-title">battle.pseudo</div>
            </div>
            <div className="code-content">
              <pre><code>
                <span className="code-keyword">FUNCTION</span> <span className="code-function">StartBattle</span>()<br/>
                &nbsp;&nbsp;<span className="code-keyword">SET</span> <span className="code-variable">player</span> = <span className="code-keyword">NEW</span> <span className="code-class">Coder</span>(<span className="code-string">"you"</span>)<br/>
                &nbsp;&nbsp;<span className="code-keyword">SET</span> <span className="code-variable">challenge</span> = <span className="code-function">GetRandomChallenge</span>()<br/>
                &nbsp;&nbsp;<span className="code-keyword">CALL</span> <span className="code-variable">player</span>.<span className="code-method">PrepareForBattle</span>()<br/>
                &nbsp;&nbsp;<span className="code-keyword">RETURN</span> <span className="code-variable">player</span>.<span className="code-method">StartCoding</span>(<span className="code-variable">challenge</span>)<br/>
                <span className="code-keyword">END FUNCTION</span>
              </code></pre>
              <div className="code-cursor"></div>
            </div>
          </div>
          <div className="floating-elements">
            <div className="floating-element" style={{ "--delay": "0s" }}>{"<>"}</div>
            <div className="floating-element" style={{ "--delay": "1.5s" }}>{"{ }"}</div>
            <div className="floating-element" style={{ "--delay": "3s" }}>{"[]"}</div>
            <div className="floating-element" style={{ "--delay": "0.5s" }}>{"()"}</div>
            <div className="floating-element" style={{ "--delay": "2s" }}>{"//"}</div>
            <div className="floating-element" style={{ "--delay": "2.5s" }}>{";"}</div>
          </div>
          <div className="glow-orb"></div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, emoji, title, description, badge }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`feature-card ${theme}`}>
      <div className="tech-border top-left"></div>
      <div className="tech-border top-right"></div>
      <div className="tech-border bottom-left"></div>
      <div className="tech-border bottom-right"></div>
      <div className={`feature-icon ${icon}-icon`}>
        <span className="icon-emoji">{emoji}</span>
        <div className="icon-glow"></div>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="feature-badge">{badge}</div>
      <div className="feature-shine"></div>
      <div className="power-indicator"></div>
      <div className="data-line"></div>
    </div>
  );
};

const FeaturesSection = ({ isActive }) => {
  const { theme } = useTheme();
  const [xpProgress, setXpProgress] = useState(25);
  
  useEffect(() => {
    if (isActive) {
      // Animate XP bar from current to 100%
      const interval = setInterval(() => {
        setXpProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setXpProgress(25);
    }
  }, [isActive]);
  
  return (
    <section id="features" className={`features ${theme} ${isActive ? 'active' : ''} section-full`}>
      <div className="section-header">
        <div className="level-indicator">
          <span className="level">LEVEL 1</span>
        </div>
        <h2>Game-Changing Features</h2>
        <div className="xp-container">
          <div className="xp-bar"><div className="xp-progress" style={{ width: `${xpProgress}%` }}></div></div>
          <span className="xp-text">{xpProgress}/100 XP</span>
        </div>
      </div>
      
      <div className="feature-cards">
        <FeatureCard 
          icon="competitive"
          emoji="🏆"
          title="Competitive Battles"
          description="Challenge yourself with progressive difficulty levels and compete against peers in real-time coding battles."
          badge="BATTLE ZONE"
        />
        
        <FeatureCard 
          icon="matchmaking"
          emoji="⚔️"
          title="Smart Matchmaking"
          description="Get paired with opponents of similar skill levels for balanced and fair competition through our auto-matchmaking system."
          badge="FIND OPPONENT"
        />
        
        <FeatureCard 
          icon="ranking"
          emoji="🥇"
          title="Ranking System"
          description="Climb the leaderboards, earn badges, and track your progress with our gamified ranking system."
          badge="LEADERBOARD"
        />
        
        <FeatureCard 
          icon="tracking"
          emoji="📊"
          title="Progress Tracking"
          description="Monitor your skill development over time with detailed analytics and performance metrics."
          badge="SKILL TREE"
        />
      </div>
    </section>
  );
};

const ModeCard = ({ type, icon, title, children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`mode-card ${type} ${theme}`}>
      <div className="mode-header">
        <div className="mode-icon">
          <span className="mode-emoji">{icon}</span>
        </div>
        <h3>{title}</h3>
        {children[0]}
      </div>
      <div className="mode-content">
        {children.slice(1, -1)}
      </div>
      {children[children.length-1]}
    </div>
  );
};

const GameModesSection = ({ isActive }) => {
  const { theme } = useTheme();
  const [xpProgress, setXpProgress] = useState(65);
  
  useEffect(() => {
    if (isActive) {
      // Animate XP bar from current to 100%
      const interval = setInterval(() => {
        setXpProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 3;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setXpProgress(65);
    }
  }, [isActive]);
  
  return (
    <section id="battle-modes" className={`game-modes ${theme} ${isActive ? 'active' : ''} section-full`}>
      <div className="section-header">
        <div className="level-indicator">
          <span className="level">LEVEL 2</span>
        </div>
        <h2>Choose Your Battle Mode</h2>
        <div className="xp-container">
          <div className="xp-bar"><div className="xp-progress" style={{ width: `${xpProgress}%` }}></div></div>
          <span className="xp-text">{xpProgress}/100 XP</span>
        </div>
        <p className="section-desc">Master your skills through different competitive challenges</p>
      </div>

      <div className="modes-container">
        <ModeCard type="progressive" icon="🧩" title="Progressive Mode">
          <div className="difficulty-meter">
            <span className="difficulty beginner">Beginner</span>
            <span className="difficulty intermediate">Intermediate</span>
            <span className="difficulty advanced">Advanced</span>
          </div>
          
          <p>Step-by-step skill building with increasingly complex challenges. Master concepts and algorithms at your own pace with structured learning paths.</p>
          <ul className="mode-features">
            <li><span className="check">✓</span> Personalized learning path</li>
            <li><span className="check">✓</span> Immediate feedback</li>
            <li><span className="check">✓</span> Unlock new concepts as you progress</li>
          </ul>
          <div className="mode-stats">
            <div className="stat">
              <div className="stat-value">500+</div>
              <div className="stat-label">Challenges</div>
            </div>
            <div className="stat">
              <div className="stat-value">15+</div>
              <div className="stat-label">Skill Paths</div>
            </div>
          </div>
          
          <button className="mode-btn">Start Learning</button>
        </ModeCard>

        <ModeCard type="ranked" icon="🏅" title="Ranked Mode">
          <div className="rank-tiers">
            <span className="tier bronze">Bronze</span>
            <span className="tier silver">Silver</span>
            <span className="tier gold">Gold</span>
            <span className="tier platinum">Platinum</span>
            <span className="tier technocrat">Technocrat</span>
          </div>
          
          <p>Test your skills against equally matched opponents in competitive battles. Rise through ranks, earn points, and climb the global leaderboard.</p>
          <ul className="mode-features">
            <li><span className="check">✓</span> Skill-based matchmaking</li>
            <li><span className="check">✓</span> Seasonal ranking resets</li>
            <li><span className="check">✓</span> Win streaks and bonuses</li>
          </ul>
          <div className="mode-stats">
            <div className="stat">
              <div className="stat-value">1v1</div>
              <div className="stat-label">Battles</div>
            </div>
            <div className="stat">
              <div className="stat-value">10,000+</div>
              <div className="stat-label">Players</div>
            </div>
          </div>
          
          <button className="mode-btn">Compete Now</button>
        </ModeCard>

        <ModeCard type="contest" icon="🏆" title="Contest Mode">
          <div className="contest-label">Limited Time Events</div>
          
          <p>Participate in time-limited competitive events with specially designed challenges. Solve problems under pressure and win prestigious awards.</p>
          <ul className="mode-features">
            <li><span className="check">✓</span> Weekly and monthly events</li>
            <li><span className="check">✓</span> Live leaderboards</li>
            <li><span className="check">✓</span> Special badges and rewards</li>
          </ul>
          
          <button className="mode-btn">Register</button>
        </ModeCard>
      </div>
    </section>
  );
};

const JourneySection = ({ isActive }) => {
  const { theme } = useTheme();
  const [xpProgress, setXpProgress] = useState(75);
  
  useEffect(() => {
    if (isActive) {
      // Animate XP bar from current to 100%
      const interval = setInterval(() => {
        setXpProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setXpProgress(75);
    }
  }, [isActive]);
  
  return (
    <section id="journey" className={`journey-section ${theme} ${isActive ? 'active' : ''} section-full`}>
      <div className="section-header">
        <div className="level-indicator">
          <span className="level">LEVEL 3</span>
          <div className="xp-bar"><div className="xp-progress" style={{ width: `${xpProgress}%` }}></div></div>
          <span className="xp-text">{xpProgress}/100 XP</span>
        </div>
        <h2>Your Coding Journey</h2>
      </div>

      <div className="journey-path">
        <div className="journey-step">
          <div className="tech-border top-left"></div>
          <div className="tech-border top-right"></div>
          <div className="tech-border bottom-left"></div>
          <div className="tech-border bottom-right"></div>
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Create Your Profile</h3>
            <p>Set up your coder identity and track your programming journey.</p>
            <div className="step-highlight"></div>
          </div>
          <div className="data-circuit"></div>
        </div>
        
        <div className="journey-connector">
          <div className="connector-pulse"></div>
        </div>
        
        <div className="journey-step">
          <div className="tech-border top-left"></div>
          <div className="tech-border top-right"></div>
          <div className="tech-border bottom-left"></div>
          <div className="tech-border bottom-right"></div>
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Practice Mode</h3>
            <p>Sharpen your skills with progressive exercises and challenges.</p>
            <div className="step-highlight"></div>
          </div>
          <div className="data-circuit"></div>
        </div>
        
        <div className="journey-connector">
          <div className="connector-pulse"></div>
        </div>
        
        <div className="journey-step">
          <div className="tech-border top-left"></div>
          <div className="tech-border top-right"></div>
          <div className="tech-border bottom-left"></div>
          <div className="tech-border bottom-right"></div>
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Join Battles</h3>
            <p>Compete in live coding battles against students of similar skill levels.</p>
            <div className="step-highlight"></div>
          </div>
          <div className="data-circuit"></div>
        </div>
        
        <div className="journey-connector">
          <div className="connector-pulse"></div>
        </div>
        
        <div className="journey-step">
          <div className="tech-border top-left"></div>
          <div className="tech-border top-right"></div>
          <div className="tech-border bottom-left"></div>
          <div className="tech-border bottom-right"></div>
          <div className="step-number">4</div>
          <div className="step-content">
            <h3>Level Up</h3>
            <p>Gain experience, climb the ranks, and unlock achievements.</p>
            <div className="step-highlight"></div>
          </div>
          <div className="data-circuit"></div>
        </div>
      </div>
    </section>
  );
};

// Leaderboard Section with mock data
const LeaderboardItem = ({ rank, username, avatar, points, tier, isCurrentUser, isOnline }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`leaderboard-item ${theme} ${isCurrentUser ? 'current-user' : ''}`}>
      <div className="rank-highlight"></div>
      <div className="leaderboard-rank">{rank}</div>
      <div className="leaderboard-user">
        <div className="user-avatar" style={{ backgroundImage: `url(${avatar})` }}>
          {!avatar && <span>{username.charAt(0).toUpperCase()}</span>}
          {isOnline && <div className="online-indicator"></div>}
        </div>
        <div className="user-details">
          <div className="username">{username}</div>
          <div className="tier-badge">{tier}</div>
        </div>
      </div>
      <div className="leaderboard-points">
        <span className="points-value">{points.toLocaleString()}</span>
        <span className="points-label">Points</span>
      </div>
    </div>
  );
}

const LeaderboardSection = ({ isActive }) => {
  const { theme } = useTheme();
  const [xpProgress, setXpProgress] = useState(50);
  
  // Mock leaderboard data
  const leaderboardData = [
    { id: 1, username: "CodeMaster99", avatar: "", points: 9850, tier: "Technocrat", isOnline: true },
    { id: 2, username: "AlgoQueen", avatar: "", points: 8720, tier: "Platinum", isOnline: false },
    { id: 3, username: "DevNinja", avatar: "", points: 7655, tier: "Platinum", isOnline: true },
    { id: 4, username: "ByteWhisperer", avatar: "", points: 6980, tier: "Gold", isOnline: false },
    { id: 5, username: "SyntaxWizard", avatar: "", points: 5420, tier: "Gold", isOnline: true },
  ];
  
  useEffect(() => {
    if (isActive) {
      // Animate XP bar from current to 100%
      const interval = setInterval(() => {
        setXpProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 4;
        });
      }, 50);
      return () => clearInterval(interval);
    } else {
      setXpProgress(50);
    }
  }, [isActive]);
  
  return (
    <section id="leaderboard" className={`leaderboard-section ${theme} ${isActive ? 'active' : ''} section-full`}>
      <div className="section-header">
        <div className="level-indicator">
          <span className="level">LEVEL 4</span>
        </div>
        <h2>Top Technocrats</h2>
        <div className="xp-container">
          <div className="xp-bar"><div className="xp-progress" style={{ width: `${xpProgress}%` }}></div></div>
          <span className="xp-text">{xpProgress}/100 XP</span>
        </div>
        <p className="section-desc">Our highest-ranked coders this season</p>
      </div>

      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="header-rank">Rank</div>
          <div className="header-user">Coder</div>
          <div className="header-points">Points</div>
        </div>
        
        <div className="leaderboard-items">
          {leaderboardData.map((user, index) => (
            <LeaderboardItem 
              key={user.id}
              rank={index + 1}
              username={user.username}
              avatar={user.avatar}
              points={user.points}
              tier={user.tier}
              isCurrentUser={index === 2} // Example: Make the 3rd user the current user
              isOnline={user.isOnline}
            />
          ))}
        </div>
        
        <div className="leaderboard-footer">
          <button className="btn btn-outline">View Full Leaderboard</button>
          <div className="rank-info">
            <div className="rank-tiers">
              <span className="tier-item bronze">Bronze</span>
              <span className="tier-item silver">Silver</span>
              <span className="tier-item gold">Gold</span>
              <span className="tier-item platinum">Platinum</span>
              <span className="tier-item technocrat">Technocrat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Go Up Button Component
const GoUpButton = () => {
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <button 
      className={`go-up-button ${theme} ${visible ? 'visible' : ''}`} 
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <span className="arrow">↑</span>
    </button>
  );
};

const CTASection = () => {
  const { theme } = useTheme();
  
  return (
    <section className={`cta ${theme}`}>
      <div className="circuit-element"></div>
      <div className="circuit-element"></div>
      <div className="cta-content">
        <h2>Ready to Level Up Your Coding Skills?</h2>
        <p>Join thousands of students in competitive programming battles</p>
        <div className="cta-badges">
          <div className="achievement-badge">
            <span className="badge-icon">⚡</span>
            <span>50K+ Battles</span>
          </div>
          <div className="achievement-badge">
            <span className="badge-icon">🏆</span>
            <span>500+ Challenges</span>
          </div>
        </div>
        <button className="btn btn-cta pulse-animation">Start Your Journey</button>
      </div>
      <div className="cta-backdrop">
        <div className="backdrop-circle"></div>
        <div className="backdrop-circle"></div>
      </div>
    </section>
  );
};

// New Footer Component
const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className={`site-footer ${theme}`}>
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">TechnoMatch</h3>
          <p className="footer-description">
            The ultimate competitive programming platform for students.
            Level up your coding skills through structured competition.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="GitHub"><span className="social-icon">GitHub</span></a>
            <a href="#" aria-label="Twitter"><span className="social-icon">Twitter</span></a>
            <a href="#" aria-label="Discord"><span className="social-icon">Discord</span></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Platform</h3>
          <ul className="footer-links">
            <li><a href="#">Features</a></li>
            <li><a href="#">Battle Modes</a></li>
            <li><a href="#">Challenges</a></li>
            <li><a href="#">Leaderboard</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Resources</h3>
          <ul className="footer-links">
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Learning Path</a></li>
            <li><a href="#">API</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">Company</h3>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Legal</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">© {new Date().getFullYear()} TechnoMatch. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <span className="legal-separator">|</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const Home = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrolling = useRef(false);
  const sectionRefs = useRef({});
  const sections = ['hero', 'features', 'battle-modes', 'journey', 'leaderboard'];
  
  // Handle loading effect
  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  // Sound effect references
  const [soundEnabled, setSoundEnabled] = useState(false);
  const buttonClickSound = useRef(null);
  const sectionChangeSound = useRef(null);
  const hoverSound = useRef(null);

  useEffect(() => {
    // Initialize audio elements
    if (typeof window !== 'undefined') {
      buttonClickSound.current = new Audio('/sounds/button-click.mp3');
      sectionChangeSound.current = new Audio('/sounds/section-change.mp3');
      hoverSound.current = new Audio('/sounds/hover.mp3');
      
      // Set volume levels
      buttonClickSound.current.volume = 0.3;
      sectionChangeSound.current.volume = 0.2;
      hoverSound.current.volume = 0.1;
    }
  }, []);
  
  // Sound effect player
  const playSound = (sound) => {
    if (soundEnabled && sound?.current) {
      sound.current.currentTime = 0;
      sound.current.play().catch(e => console.log("Audio play error:", e));
    }
  };

  // Toggle sound effects
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    playSound(buttonClickSound);
  };
  
  // Initialize refs for each section
  useEffect(() => {
    sections.forEach(section => {
      sectionRefs.current[section] = document.getElementById(section);
    });
  }, []);
  
  // Handle scroll events to update active section
  const handleScroll = () => {
    if (scrolling.current) return;
    
    let newActiveSection = activeSection;
    let maxVisibility = 0;
    
    sections.forEach(section => {
      const element = sectionRefs.current[section];
      if (element) {
        const rect = element.getBoundingClientRect();
        const height = window.innerHeight;
        
        // Calculate how much of the section is visible
        const visiblePx = Math.min(rect.bottom, height) - Math.max(rect.top, 0);
        const visiblePercent = visiblePx / element.offsetHeight;
        
        if (visiblePercent > maxVisibility) {
          maxVisibility = visiblePercent;
          newActiveSection = section;
        }
      }
    });
    
    setActiveSection(newActiveSection);
  };
  
  // Handle wheel events for section scrolling
  const handleWheel = (e) => {
    e.preventDefault();
    
    // Prevent rapid scroll triggers
    if (isScrolling) return;
    setIsScrolling(true);
    
    // Determine scroll direction
    const direction = e.deltaY > 0 ? 'down' : 'up';
    
    // Get all section elements
    const sections = document.querySelectorAll('section[id]');
    let currentSectionIndex = -1;
    
    // Find the current section in view
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
      if (isInView) currentSectionIndex = index;
    });
    
    // Calculate the next section index
    let nextSectionIndex = direction === 'down' 
      ? Math.min(currentSectionIndex + 1, sections.length - 1)
      : Math.max(currentSectionIndex - 1, 0);
      
    // Scroll to next section if different from current
    if (nextSectionIndex !== currentSectionIndex && nextSectionIndex >= 0) {
      const nextSectionId = sections[nextSectionIndex].id;
      document.getElementById(nextSectionId).scrollIntoView({ 
        behavior: 'smooth'
      });
      
      setActiveSection(nextSectionId);
    }
    
    // Reset scroll lock after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return (
    <ThemeProvider>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-logo">TECHNO<span>MATCH</span></div>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
            <div className="loading-text">INITIALIZING SYSTEM</div>
          </div>
        </div>
      )}
      
      {/* Site Background with Tech Pattern */}
      <div className="site-background"></div>
      
      <div className="home-container">
        <Header />
        
        {/* HUD Frame Elements */}
        <div className="hud-frame">
          <div className="hud-corner top-left"></div>
          <div className="hud-corner top-right"></div>
          <div className="hud-corner bottom-left"></div>
          <div className="hud-corner bottom-right"></div>
          <div className="hud-line horizontal top"></div>
          <div className="hud-line horizontal bottom"></div>
          <div className="hud-line vertical left"></div>
          <div className="hud-line vertical right"></div>
        </div>
        
        <main className="main-content">
          <HeroSection />
          <FeaturesSection isActive={activeSection === 'features'} />
          <GameModesSection isActive={activeSection === 'battle-modes'} />
          <JourneySection isActive={activeSection === 'journey'} />
          <LeaderboardSection isActive={activeSection === 'leaderboard'} />
          <CTASection />
          <Footer />
        </main>
        
        {/* Floating Particles */}
        <div className="particles-container">
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="particle" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 30}s`,
              animationDelay: `${Math.random() * 10}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              opacity: 0.1 + Math.random() * 0.3
            }}></div>
          ))}
        </div>
        
        {/* Tech Audio Visualizer */}
        <div className="audio-visualizer">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bar"></div>
          ))}
        </div>
        
        <GoUpButton />
        
        {/* Game UI Navigation Dots */}
        <div className="section-navigator">
          {sections.map((section, index) => (
            <a 
              key={index} 
              href={`#${section}`} 
              className={`nav-dot ${activeSection === section ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
                setActiveSection(section);
              }}
              data-section={section}
            >
              <span className="dot-label">{section.replace('-', ' ')}</span>
            </a>
          ))}
        </div>
        
        {/* Tech Status Indicator */}
        <div className="tech-status">
          <div className="status-dot online"></div>
          <span className="status-text">SYSTEM ONLINE</span>
        </div>
        
        {/* Tech Coordinates Display */}
        <div className="tech-coordinates">
          <div className="coordinate x">X: 1420.8</div>
          <div className="coordinate y">Y: 793.2</div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home; 