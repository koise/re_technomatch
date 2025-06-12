import React from 'react';
import { FaFilter } from 'react-icons/fa';
import SectionHeader from './SectionHeader';
import ProblemCard from './ProblemCard';

const ProblemBank = ({ problems, difficultyFilter, onFilterChange }) => {
  return (
    <div className="problem-bank-section">
      <SectionHeader title="Problem Bank">
        <div className="difficulty-filter">
          <select 
            className="filter-dropdown"
            value={difficultyFilter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <FaFilter className="filter-icon" />
        </div>
      </SectionHeader>
      
      <div className="problem-list">
        {problems.map(problem => (
          <ProblemCard key={problem.id} problem={problem} />
        ))}
      </div>
    </div>
  );
};

export default ProblemBank; 