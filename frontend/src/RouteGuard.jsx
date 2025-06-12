// src/RouteGuard.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Cookies from 'js-cookie';

const RouteGuard = ({ route }) => {
  const { userRole } = useAuth();
  const { element, allowedRoles, isSignup, path } = route;
  const location = useLocation();
  const currentPath = location.pathname;
  
  console.log('RouteGuard:', { 
    path: currentPath, 
    userRole, 
    allowedRoles
  });

  // Always allow access to guest routes
  if (allowedRoles && allowedRoles.includes('guest')) {
    console.log('Guest route - allowing access');
    return element;
  }

  // Always allow access to home page
  if (currentPath === '/') {
    console.log('Home page - allowing access');
    return element;
  }

  // Handle student dashboard routing
  if (currentPath === '/dashboard' && userRole === 'student') {
    console.log('Student accessing dashboard - granting access');
    return element;
  }

  // Check if this is a direct-access dashboard route
  if (['/student-dashboard', '/access-dashboard', '/direct-dashboard'].includes(currentPath)) {
    console.log('Direct dashboard access route - no auth required');
    return element;
  }

  // Handle signup flow
  if (isSignup) {
    // Get signup email from cookie first, then localStorage
    const signupEmailCookie = Cookies.get('signup_email');
    const signupEmail = signupEmailCookie || localStorage.getItem('signup_email');
    
    // Get registration progress from cookie first, then localStorage
    const registrationProgressCookie = Cookies.get('registration_progress');
    const registrationProgress = registrationProgressCookie || localStorage.getItem('registration_progress') || '';

    // Define the signup steps and their order
    const signupSteps = ['credentials', 'information', 'verification', 'completed'];
    const signupPaths = {
      'credentials': '/signup/credentials',
      'information': '/signup/information',
      'verification': '/signup/verification',
      'completed': '/signup/completed'
    };

    // Get the current signup step from the path
    let currentStep = '';
    for (const [step, path] of Object.entries(signupPaths)) {
      if (currentPath === path) {
        currentStep = step;
        break;
      }
    }

    // Handle credentials page - always accessible as entry point
    if (currentPath === '/signup/credentials') {
      console.log('Signup credentials page - always accessible');
      return element;
    }

    // If trying to access a step beyond credentials without an email, redirect to credentials
    if (currentStep !== 'credentials' && !signupEmail) {
      console.log(`Signup redirect: ${currentPath} → /signup/credentials (missing email)`);
      return <Navigate to="/signup/credentials" replace />;
    }

    // Handle progression through signup steps
    if (currentStep && currentStep !== 'credentials') {
      const currentStepIndex = signupSteps.indexOf(currentStep);
      const progressStepIndex = signupSteps.indexOf(registrationProgress);
      
      // Only allow access to the next step or a previous step
      if (currentStepIndex > progressStepIndex + 1) {
        console.log(`Signup redirect: ${currentPath} → ${signupPaths[registrationProgress]} (out of sequence)`);
        return <Navigate to={signupPaths[registrationProgress]} replace />;
      }
    }
    
    // If we made it here, allow access to the signup step
    console.log(`Signup access granted: ${currentPath}`);
    return element;
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
  return element;
};

export default RouteGuard;