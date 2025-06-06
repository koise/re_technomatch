import React, { useEffect } from 'react';

const Notification = ({ 
  id, 
  type = 'info', 
  message, 
  onClose, 
  index = 0, 
  position = 'top-right',
  duration = 5000
}) => {
  useEffect(() => {
    if (duration !== Infinity) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div 
      className={`notification notification-${type} notification-${position}`}
      style={{ 
        zIndex: 1000 + index,
        animationDuration: `${duration}ms`
      }}
    >
      <div className="notification-icon">
        {getIcon()}
      </div>
      <div className="notification-content">
        <p>{message}</p>
      </div>
      <button className="notification-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Notification; 