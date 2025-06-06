import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthTopBar = () => {
  const { userRole, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="auth-topbar">
      <div className="logo">
        <Link to={`/${userRole}/dashboard`}>TechnoMatch</Link>
      </div>
      <nav className="nav-menu">
        <Link to={`/${userRole}/profile`}>Profile</Link>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>
    </header>
  );
};

export default AuthTopBar; 