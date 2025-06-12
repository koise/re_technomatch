import React from 'react';

const MatchItem = ({ match }) => {
  return (
    <div className={`match-item ${match.result}`}>
      <div className="match-result-indicator"></div>
      <div className="match-content">
        <div className="match-header">
          <div className="match-problem">{match.problem}</div>
          <div className={`match-points ${match.result}`}>{match.points}</div>
        </div>
        <div className="match-details">
          <div className="match-opponent">vs {match.opponent}</div>
          <div className="match-time">{match.time}</div>
        </div>
      </div>
    </div>
  );
};

export default MatchItem; 