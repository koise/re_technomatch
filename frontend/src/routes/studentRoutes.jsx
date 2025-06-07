// src/routes/studentRoutes.jsx
import React from 'react';
import Dashboard from '../pages/student/Dashboard';
import Leaderboard from '../pages/Leaderboard';

export const studentRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/leaderboard', element: <Leaderboard /> },
]; 