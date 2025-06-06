// src/RouteGuard.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const RouteGuard = ({ route }) => {
  const { userRole } = useAuth();
  const { element, allowedRoles, isSignup } = route;
  const location = useLocation();
  const currentPath = location.pathname;

  if (isSignup) {
    const signupEmail = localStorage.getItem('signup_email');
    const registrationProgress = localStorage.getItem('registration_progress') || '';
    const signupProgressMap = {
      '/signup/credentials': 'credentials',
      '/signup/information': 'information',
      '/signup/verification': 'verification',
    };
    const progressRedirectMap = {
      credentials: '/signup/credentials',
      information: '/signup/information',
      verification: '/signup/verification',

    };

    if (currentPath === '/signup/credentials' && registrationProgress) {
      const redirectPath = progressRedirectMap[registrationProgress] || '/signup/credentials';
      return <Navigate to={redirectPath} replace />;
    }

    if (currentPath !== '/signup/credentials' && !signupEmail) {
      return <Navigate to="/signup/credentials" replace />;
    }

    const progressOrder = ['credentials', 'information', 'verification'];
    const requiredProgress = signupProgressMap[currentPath];
    const currentProgressIndex = progressOrder.indexOf(registrationProgress);
    const requiredProgressIndex = progressOrder.indexOf(requiredProgress);
    if (
      requiredProgress &&
      (currentProgressIndex < requiredProgressIndex ||
        currentProgressIndex > requiredProgressIndex)
    ) {
      return <Navigate to="/signup/credentials" replace />;
    }
  }
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    if (userRole === 'admin' || userRole === 'student' || userRole === 'professor') {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return element;
};

export default RouteGuard;