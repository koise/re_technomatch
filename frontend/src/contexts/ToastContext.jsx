import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaTrophy, FaCheck, FaExclamationTriangle, FaInfoCircle, 
  FaStar, FaMedal, FaBell, FaEnvelope, FaUserPlus, FaHeart, 
  FaCoins, FaNewspaper 
} from 'react-icons/fa';
import '../styles/GameToast.scss';

// Create context
const ToastContext = createContext();

// Types of gamified toasts
const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  ACHIEVEMENT: 'achievement',
  LEVEL_UP: 'level-up',
  REWARD: 'reward',
  NOTIFICATION: 'notification',
  MESSAGE: 'message',
  FRIEND_REQUEST: 'friend-request',
  LIKE: 'like',
  POINTS: 'points',
  NEWS: 'news'
};

// Custom toast component based on type
const GameToast = ({ type, title, message, points, reward, avatar, username, action }) => {
  let icon;
  
  switch (type) {
    case TOAST_TYPES.SUCCESS:
      icon = <FaCheck className="toast-icon success" />;
      break;
    case TOAST_TYPES.ERROR:
      icon = <FaExclamationTriangle className="toast-icon error" />;
      break;
    case TOAST_TYPES.WARNING:
      icon = <FaExclamationTriangle className="toast-icon warning" />;
      break;
    case TOAST_TYPES.INFO:
      icon = <FaInfoCircle className="toast-icon info" />;
      break;
    case TOAST_TYPES.ACHIEVEMENT:
      icon = <FaTrophy className="toast-icon achievement" />;
      break;
    case TOAST_TYPES.LEVEL_UP:
      icon = <FaMedal className="toast-icon level-up" />;
      break;
    case TOAST_TYPES.REWARD:
      icon = <FaStar className="toast-icon reward" />;
      break;
    case TOAST_TYPES.NOTIFICATION:
      icon = <FaBell className="toast-icon notification" />;
      break;
    case TOAST_TYPES.MESSAGE:
      icon = <FaEnvelope className="toast-icon message" />;
      break;
    case TOAST_TYPES.FRIEND_REQUEST:
      icon = <FaUserPlus className="toast-icon friend-request" />;
      break;
    case TOAST_TYPES.LIKE:
      icon = <FaHeart className="toast-icon like" />;
      break;
    case TOAST_TYPES.POINTS:
      icon = <FaCoins className="toast-icon points" />;
      break;
    case TOAST_TYPES.NEWS:
      icon = <FaNewspaper className="toast-icon news" />;
      break;
    default:
      icon = <FaInfoCircle className="toast-icon info" />;
  }

  return (
    <div className={`game-toast ${type}`}>
      <div className="toast-content">
        {avatar ? (
          <div className="toast-avatar">
            <img src={avatar} alt={username || 'User'} />
          </div>
        ) : (
          <div className="toast-icon-container">{icon}</div>
        )}
        <div className="toast-text">
          {title && <h4>{title}</h4>}
          <p>{message}</p>
          
          {(points || reward) && (
            <div className="toast-rewards">
              {points && (
                <span className="toast-points">+{points} XP</span>
              )}
              {reward && (
                <span className="toast-reward">{reward}</span>
              )}
            </div>
          )}
          
          {action && (
            <div className="toast-action">
              <button className="action-button">{action}</button>
            </div>
          )}
        </div>
      </div>
      <div className="toast-progress-bar"></div>
    </div>
  );
};

// Provider component
export const ToastProvider = ({ children }) => {
  // Show regular toast
  const showToast = (type, message, duration = 3000) => {
    toast(<GameToast type={type} message={message} />, {
      className: 'game-toast-container',
      progressClassName: 'toast-progress',
      autoClose: duration
    });
  };

  // Show success toast
  const showSuccess = (message, duration) => {
    showToast(TOAST_TYPES.SUCCESS, message, duration);
  };

  // Show error toast
  const showError = (message, duration) => {
    showToast(TOAST_TYPES.ERROR, message, duration);
  };

  // Show warning toast
  const showWarning = (message, duration) => {
    showToast(TOAST_TYPES.WARNING, message, duration);
  };

  // Show info toast
  const showInfo = (message, duration) => {
    showToast(TOAST_TYPES.INFO, message, duration);
  };

  // Show achievement toast (more exciting)
  const showAchievement = (title, message, duration = 5000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.ACHIEVEMENT}
        title={title}
        message={message}
      />,
      {
        className: 'game-toast-container achievement',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
  };

  // Show level up toast (with animation and sound)
  const showLevelUp = (level, points, duration = 5000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.LEVEL_UP}
        title={`Level ${level} Reached!`}
        message="You've leveled up!"
        points={points}
      />,
      {
        className: 'game-toast-container level-up',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
    
    // Could trigger sound effect here if we add audio functionality
  };

  // Show reward toast
  const showReward = (title, message, reward, duration = 5000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.REWARD}
        title={title}
        message={message}
        reward={reward}
      />,
      {
        className: 'game-toast-container reward',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
  };

  // Show notification toast
  const showNotification = (title, message, duration = 4000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.NOTIFICATION}
        title={title}
        message={message}
      />,
      {
        className: 'game-toast-container notification',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
  };

  // Show message notification
  const showMessage = (username, message, avatar, duration = 5000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.MESSAGE}
        title={`New Message from ${username}`}
        message={message}
        avatar={avatar}
        action="Reply"
      />,
      {
        className: 'game-toast-container message',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
  };

  // Show friend request notification
  const showFriendRequest = (username, avatar, duration = 5000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.FRIEND_REQUEST}
        title="Friend Request"
        message={`${username} wants to be your friend`}
        avatar={avatar}
        action="Accept"
      />,
      {
        className: 'game-toast-container friend-request',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
  };

  // Show like notification
  const showLike = (username, content, avatar, duration = 4000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.LIKE}
        message={`${username} liked your ${content}`}
        avatar={avatar}
      />,
      {
        className: 'game-toast-container like',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
  };

  // Show points notification
  const showPoints = (points, reason, duration = 4000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.POINTS}
        title="Points Earned"
        message={reason}
        points={points}
      />,
      {
        className: 'game-toast-container points',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
  };

  // Show news notification
  const showNews = (title, message, duration = 5000) => {
    toast(
      <GameToast
        type={TOAST_TYPES.NEWS}
        title={title}
        message={message}
        action="Read More"
      />,
      {
        className: 'game-toast-container news',
        progressClassName: 'toast-progress',
        autoClose: duration
      }
    );
  };

  // Provide the toast functions to children components
  return (
    <ToastContext.Provider
      value={{
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showAchievement,
        showLevelUp,
        showReward,
        showNotification,
        showMessage,
        showFriendRequest,
        showLike,
        showPoints,
        showNews,
        TOAST_TYPES
      }}
    >
      {children}
      <ToastContainer
        position="bottom-left"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ToastContext.Provider>
  );
};

// Custom hook for using toast
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

export default ToastContext; 