import React from 'react';

const LeaderboardItem = ({ player }) => {
  return (
    <div className={`leaderboard-item ${player.isCurrentUser ? 'current-user' : ''}`}>
      <div className="medal">{player.medal}</div>
      <div className={`player-avatar ${player.avatar || ''}`}>
        {!player.avatar && player.name.charAt(0)}
      </div>
      <div className="player-info">
        <div className="player-name">{player.name}</div>
        <div className="player-level">Level {player.level}</div>
      </div>
      <div className="player-score">
        <div className="score-value">{player.score}</div>
        <div className="score-details">{player.winRate} WR · {player.matches} matches</div>
        <div className="problems-solved">{player.solved} problems solved</div>
      </div>
    </div>
  );
};

export default LeaderboardItem; 