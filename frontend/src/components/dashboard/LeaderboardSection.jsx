import React from 'react';
import { FaTrophy, FaChevronRight } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import LeaderboardItem from './LeaderboardItem';
import Pagination from './Pagination';

const LeaderboardSection = ({ players, currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="leaderboard-section">
      <SectionHeader 
        title="Leaderboard"
        subtitle="Top players this season"
        icon={<FaTrophy />}
      />
      
      <div className="leaderboard-list">
        {players.map(player => (
          <LeaderboardItem key={player.id} player={player} />
        ))}
      </div>
      
      <div className="section-footer">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={onPrevPage}
          onNext={onNextPage}
        />
        
        <a href="/leaderboards" className="view-all-link">
          See all leaderboards <FaChevronRight className="icon-right" />
        </a>
      </div>
    </div>
  );
};

export default LeaderboardSection; 