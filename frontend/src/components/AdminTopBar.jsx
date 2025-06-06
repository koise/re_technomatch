import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AdminTopBar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="admin-topbar">
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
      <div className="admin-actions">
        <div className="notifications">
          <button className="notification-btn">🔔</button>
        </div>
        <div className="admin-profile">
          <span className="admin-name">Admin</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default AdminTopBar; 