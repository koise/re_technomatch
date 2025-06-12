import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import GuestNavBar from '../components/GuestNavBar';
import ProgressBar from '../components/ProgressBar';

const GuestLayout = ({ children }) => {
  const location = useLocation();
  console.log('GuestLayout rendering', { path: location.pathname });

  const signupPages = [
    '/signup/credentials',
    '/signup/information',
    '/signup/verification',
    '/signup/completed',
    '/signup', // Also include the base signup path
  ];

  const isSignupPage = signupPages.includes(location.pathname);
  
  return (
    <div className="guest-layout">
      {/* Always show GuestNavBar on all guest pages */}
      <GuestNavBar />
      
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default GuestLayout;