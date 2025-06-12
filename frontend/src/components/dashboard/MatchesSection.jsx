import React from 'react';
import { FaCode, FaChevronRight } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import MatchItem from './MatchItem';
import Pagination from './Pagination';

const MatchesSection = ({ matches, currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="recent-matches-section">
      <SectionHeader 
        title="Recent Matches"
        subtitle="Your latest coding battles"
      />
      
      {matches.length > 0 ? (
        <>
          <div className="matches-list">
            {matches.map(match => (
              <MatchItem key={match.id} match={match} />
            ))}
          </div>
          
          <div className="section-footer">
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevious={onPrevPage}
              onNext={onNextPage}
            />
            
            <a href="/matches/history" className="view-all-link">
              View Match history <FaChevronRight className="icon-right" />
            </a>
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
  );
};

export default MatchesSection; 