import React, { useState, useEffect } from 'react';
import { useTheme, useSettings } from '../../../contexts/ThemeContext';
import '../../../styles/main.scss';
import './dashboard.scss';
import { FaRocket } from 'react-icons/fa';

// Import components
import StatCard from '../../../components/dashboard/StatCard';
import MatchesSection from '../../../components/dashboard/MatchesSection';
import LeaderboardSection from '../../../components/dashboard/LeaderboardSection';
import ProfileSection from '../../../components/dashboard/ProfileSection';
import ProblemBank from '../../../components/dashboard/ProblemBank';

// Import mock data
import { problems, recentMatches, leaderboardData } from '../../../data/dashboardData';

const Dashboard = () => {
  const { theme } = useTheme();
  const { settings } = useSettings();
  const [animateStats, setAnimateStats] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [matchesPage, setMatchesPage] = useState(1);
  const [leaderboardPage, setLeaderboardPage] = useState(1);
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
  
  const handleGoProgressive = () => {
    window.location.href = '/progressive';
  };

  return (
    <div 
      className={`game-dashboard ${theme === 'light' ? 'light' : 'dark'}`} 
      style={{ fontFamily: currentFont }}
      data-color-accent={settings.colorAccent || 'blue'}
      data-animations={settings.animations ? 'enabled' : 'disabled'}
    >
      <div className="dashboard-content">
        <div className={`dashboard-stats-wrapper ${animateStats ? 'animate' : ''}`}>
          <div className="dashboard-left-column">
            <div className="progressive-banner">
              <div className="banner-content">
                <h3>Progressive Mode</h3>
                <p>Challenge yourself with increasingly difficult problems</p>
              </div>
              <button className="progressive-btn" onClick={handleGoProgressive}>
                <FaRocket className="icon-rocket" /> Go Progressive
              </button>
            </div>
            
            <div className="stats-cards">
              <StatCard 
                title="Rank"
                value="Unranked"
                subtext="Unranked"
              />
              
              <StatCard 
                title="Problems Solved"
                value="1"
                subtext="+1 in the last week"
                trend={{ direction: 'up', value: '1' }}
              />
              
              <StatCard 
                title="Win Rate"
                value="0%"
                subtext="No change from last month"
              />
            </div>
            
            <div className="content-grid">
              <MatchesSection 
                matches={currentMatches}
                currentPage={matchesPage}
                totalPages={totalMatchesPages}
                onPrevPage={handlePrevMatches}
                onNextPage={handleNextMatches}
              />
              
              <LeaderboardSection 
                players={currentLeaderboardData}
                currentPage={leaderboardPage}
                totalPages={totalLeaderboardPages}
                onPrevPage={handlePrevLeaderboard}
                onNextPage={handleNextLeaderboard}
              />
            </div>
          </div>
          
          <div className="right-column">
            <ProfileSection 
              username="koise"
              rating="1000"
              progressPercent={10}
            />
            
            <ProblemBank 
              problems={filteredProblems}
              difficultyFilter={difficultyFilter}
              onFilterChange={setDifficultyFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 