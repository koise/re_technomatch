import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import './ToastDemo.scss';

const ToastDemo = () => {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('standard');

  // Sample user avatars
  const avatars = [
    'https://randomuser.me/api/portraits/women/44.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
  ];

  return (
    <div className="toast-demo">
      <h3>Toast Notification Demo</h3>
      
      <div className="toast-tabs">
        <button 
          className={`tab-btn ${activeTab === 'standard' ? 'active' : ''}`}
          onClick={() => setActiveTab('standard')}
        >
          Standard
        </button>
        <button 
          className={`tab-btn ${activeTab === 'gamified' ? 'active' : ''}`}
          onClick={() => setActiveTab('gamified')}
        >
          Gamified
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>
      
      {activeTab === 'standard' && (
        <div className="toast-buttons">
          <div className="button-group">
            <h4>Standard Toasts</h4>
            <button 
              className="toast-btn success"
              onClick={() => toast.showSuccess("Operation completed successfully!")}
            >
              Success Toast
            </button>
            <button 
              className="toast-btn error"
              onClick={() => toast.showError("Something went wrong!")}
            >
              Error Toast
            </button>
            <button 
              className="toast-btn warning"
              onClick={() => toast.showWarning("Warning: This action cannot be undone")}
            >
              Warning Toast
            </button>
            <button 
              className="toast-btn info"
              onClick={() => toast.showInfo("New features were added")}
            >
              Info Toast
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'gamified' && (
        <div className="toast-buttons">
          <div className="button-group">
            <h4>Gamified Toasts</h4>
            <button 
              className="toast-btn achievement"
              onClick={() => toast.showAchievement(
                "First Friend", 
                "You've added your first friend to your network!"
              )}
            >
              Achievement Toast
            </button>
            <button 
              className="toast-btn level-up"
              onClick={() => toast.showLevelUp(5, 250)}
            >
              Level Up Toast
            </button>
            <button 
              className="toast-btn reward"
              onClick={() => toast.showReward(
                "Daily Bonus", 
                "You've claimed your daily login reward!", 
                "Rare Profile Badge"
              )}
            >
              Reward Toast
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'notifications' && (
        <div className="toast-buttons">
          <div className="button-group">
            <h4>Social Notifications</h4>
            <button 
              className="toast-btn message"
              onClick={() => toast.showMessage(
                "Emma Wilson", 
                "Hey! Are you online for the tournament?", 
                avatars[0]
              )}
            >
              Message Notification
            </button>
            <button 
              className="toast-btn friend-request"
              onClick={() => toast.showFriendRequest(
                "Michael Brown", 
                avatars[1]
              )}
            >
              Friend Request
            </button>
            <button 
              className="toast-btn like"
              onClick={() => toast.showLike(
                "Sophia Clark", 
                "tournament submission",
                avatars[2]
              )}
            >
              Like Notification
            </button>
          </div>
          
          <div className="button-group">
            <h4>System Notifications</h4>
            <button 
              className="toast-btn notification"
              onClick={() => toast.showNotification(
                "System Update", 
                "New features have been added to the platform"
              )}
            >
              General Notification
            </button>
            <button 
              className="toast-btn points"
              onClick={() => toast.showPoints(
                50,
                "Daily login streak bonus"
              )}
            >
              Points Notification
            </button>
            <button 
              className="toast-btn news"
              onClick={() => toast.showNews(
                "Weekend Tournament", 
                "Join our special weekend coding competition with prizes!"
              )}
            >
              News Notification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToastDemo; 