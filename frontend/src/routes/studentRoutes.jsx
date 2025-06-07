// src/routes/studentRoutes.jsx
import React from 'react';
import Dashboard from '../pages/student/Dashboard';
import Home from '../pages/Home';

export const studentRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/student-dashboard', element: <Dashboard /> }, // Direct route without auth check
  { path: '/leaderboard', element: <Home /> },
]; 