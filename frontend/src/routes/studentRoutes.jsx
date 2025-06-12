// src/routes/studentRoutes.jsx
import React from 'react';
import Dashboard from '../layouts/StudentLayout/pages/Dashboard';
import Home from '../layouts/GuestLayout/pages/Home';

export const studentRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/student-dashboard', element: <Dashboard /> },
  { path: '/leaderboard', element: <Home /> },
]; 