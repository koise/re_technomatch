// src/routes.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Import all page components directly
// Standalone Pages
import StandaloneDashboard from './pages/Dashboard';
import StandaloneHome from './pages/Home';
import StandaloneNotFound from './pages/NotFound';

// Student Pages
import Dashboard from './layouts/StudentLayout/pages/Dashboard'; // This will be replaced by StandaloneDashboard eventually

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';

// Professor Pages
import ProfessorDashboard from './pages/professor/Dashboard';

// Guest Pages - Updated paths to match actual file locations
import Login from './layouts/GuestLayout/pages/Login';
import StaticRedirect from './layouts/GuestLayout/pages/StaticRedirect';
import Signup from './layouts/GuestLayout/pages/Signup';

// Single consolidated routes array
export const routes = [
  // Main routes with standalone components
  { path: '/', element: <StandaloneHome />, allowedRoles: ['guest'] },
  { path: '/dashboard', element: <StandaloneDashboard />, allowedRoles: ['student'] },
  { path: '*', element: <StandaloneNotFound />, allowedRoles: ['guest'] },
  
  // Guest routes
  { path: '/login', element: <Login />, allowedRoles: ['guest'] },
  { path: '/login-test', element: <Login />, allowedRoles: ['guest'] },
  { path: '/static-redirect', element: <StaticRedirect />, allowedRoles: ['guest'] },
  { path: '/to-dashboard', element: <StaticRedirect />, allowedRoles: ['guest'] },
  
  // Default signup route - redirects to credentials
  { path: '/signup', element: <Navigate to="/signup/credentials" replace />, allowedRoles: ['guest'] },
  
  // Signup routes
  { path: '/signup/credentials', element: <Signup />, allowedRoles: ['guest'], isSignup: true },
  { path: '/signup/information', element: <Signup />, allowedRoles: ['guest'], isSignup: true },
  { path: '/signup/verification', element: <Signup />, allowedRoles: ['guest'], isSignup: true },
  { path: '/signup/completed', element: <Signup />, allowedRoles: ['guest'], isSignup: true },
  
  // Student routes
  { path: '/student-dashboard', element: <StandaloneDashboard />, allowedRoles: ['student'] },
  { path: '/access-dashboard', element: <StandaloneDashboard />, allowedRoles: ['student'] },
  { path: '/direct-dashboard', element: <StandaloneDashboard />, allowedRoles: ['student'] },
  { path: '/leaderboard', element: <StandaloneHome />, allowedRoles: ['student'] },
  
  // Admin routes
  { path: '/admin/dashboard', element: <AdminDashboard />, allowedRoles: ['admin'] },
  
  // Professor routes
  { path: '/professor/dashboard', element: <ProfessorDashboard />, allowedRoles: ['professor'] },
  
  // Fullscreen routes (No nav/header)
  // Add any fullscreen routes here
];