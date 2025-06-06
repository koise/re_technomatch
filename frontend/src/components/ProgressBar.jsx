import React from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const steps = [
    { path: '/signup/credentials', label: 'Credentials' },
    { path: '/signup/information', label: 'Information' },
    { path: '/signup/verification', label: 'Verification' },
    { path: '/signup/completed', label: 'Completed' }
  ];
  
  const currentStepIndex = steps.findIndex(step => step.path === currentPath);
  
  return (
    <div className="progress-container">
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`progress-step ${index <= currentStepIndex ? 'active' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar; 