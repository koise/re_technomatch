import React from 'react';
import { Link } from 'react-router-dom';
import GuestNavBar from '../components/GuestNavBar';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <GuestNavBar />
      
      <div className="not-found-container" style={{
        paddingTop: '100px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'var(--bg)',
        color: 'var(--text)'
      }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
        <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
        <p style={{ marginBottom: '2rem' }}>
          The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
        <Link to="/" style={{
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'all 0.3s ease'
        }}>
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 