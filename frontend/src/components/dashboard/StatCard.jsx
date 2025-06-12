import React from 'react';

const StatCard = ({ title, value, subtext, trend }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">{title}</div>
      <div className="stat-value">
        {value}
        {trend && (
          <span className={`stat-trend-${trend.direction}`}>
            {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div className="stat-subtext">{subtext}</div>
    </div>
  );
};

export default StatCard; 