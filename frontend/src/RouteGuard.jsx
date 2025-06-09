// src/RouteGuard.jsx
import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const RouteGuard = ({ route }) => {
  const { userRole } = useAuth();
  const { element, allowedRoles, isSignup, path } = route;
  const location = useLocation();
  const currentPath = location.pathname;
  
  console.log('RouteGuard:', { 
    path: currentPath, 
    userRole, 
    allowedRoles,
    element: element ? 'Element exists' : 'No element'
  });

  // Always allow access to home page
  if (currentPath === '/') {
    console.log('Home page - allowing access');
    return element || <Outlet />;
  }

  // Handle student dashboard routing
  if (currentPath === '/dashboard' && userRole === 'student') {
    console.log('Student accessing dashboard - granting access');
    return element || <Outlet />;
  }

  // Check if this is a direct-access dashboard route
  if (['/student-dashboard', '/access-dashboard', '/direct-dashboard'].includes(currentPath)) {
    console.log('Direct dashboard access route - no auth required');
    return element || <Outlet />;
  }

  // Handle signup flow
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
      console.log(`Signup redirect: ${currentPath} → ${redirectPath}`);
      return <Navigate to={redirectPath} replace />;
    }

    if (currentPath !== '/signup/credentials' && !signupEmail) {
      console.log(`Signup redirect: ${currentPath} → /signup/credentials (missing email)`);
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

  // Check if user is allowed to access the route
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log(`Access denied: User role ${userRole} not allowed for ${currentPath}`);
    
    // If not allowed, redirect based on role
    if (userRole === 'student') {
      console.log('Redirecting student to dashboard');
      return <Navigate to="/dashboard" replace />;
    } else if (userRole === 'admin') {
      console.log('Redirecting admin to admin dashboard');
      return <Navigate to="/admin/dashboard" replace />;
    } else if (userRole === 'professor') {
      console.log('Redirecting professor to professor dashboard');
      return <Navigate to="/professor/dashboard" replace />;
    } else {
      console.log('Redirecting guest to home');
      return <Navigate to="/" replace />;
    }
  }

  // If all checks pass, render the route
  console.log(`Access granted: ${currentPath} for ${userRole}`);
  return element || <Outlet />;
};

export default RouteGuard;