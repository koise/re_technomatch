// src/routes/guestRoutes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Import standalone pages - update these paths to your actual standalone pages
import Login from '../pages/Login';
import StaticRedirect from '../pages/StaticRedirect';
import Signup from '../pages/Signup';

export const guestRoutes = [
  // Login routes
  { path: '/login', element: <Login />, allowedRoles: ['guest'] },
  { path: '/login-test', element: <Login />, allowedRoles: ['guest'] },
  { path: '/static-redirect', element: <StaticRedirect />, allowedRoles: ['guest'] },
  { path: '/to-dashboard', element: <StaticRedirect />, allowedRoles: ['guest'] },
  
  // Default signup route - redirects to credentials
  { 
    path: '/signup', 
    element: <Navigate to="/signup/credentials" replace />, 
    allowedRoles: ['guest'] 
  },
  
  // Signup routes
  { 
    path: '/signup/credentials', 
    element: <Signup />, 
    allowedRoles: ['guest'],
    isSignup: true 
  },
  { 
    path: '/signup/information', 
    element: <Signup />, 
    allowedRoles: ['guest'],
    isSignup: true 
  },
  { 
    path: '/signup/verification', 
    element: <Signup />, 
    allowedRoles: ['guest'],
    isSignup: true 
  },
  { 
    path: '/signup/completed', 
    element: <Signup />, 
    allowedRoles: ['guest'],
    isSignup: true 
  },
]; 