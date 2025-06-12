import React from 'react';
import { FaCode } from 'react-icons/fa';

const ProblemCard = ({ problem }) => {
  return (
    <div className="problem-card">
      <div className="problem-name">{problem.name}</div>
      <div className="problem-description">{problem.description}</div>
      <div className="problem-footer">
        <div className={`problem-difficulty ${problem.difficulty}`}>
          {problem.difficulty.toUpperCase()}
        </div>
        <button className="solve-btn" onClick={() => window.location.href = `/problems/${problem.id}`}>
          <FaCode className="btn-icon" /> Solve
        </button>
      </div>
    </div>
  );
};

export default ProblemCard; 