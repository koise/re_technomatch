import React from 'react';

const Spinner = ({ size = 'md' }) => {
  const sizeClass = {
    sm: 'spinner-sm',
    md: 'spinner-md',
    lg: 'spinner-lg',
  }[size] || 'spinner-md';

  return (
    <div className={`spinner ${sizeClass}`}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner; 