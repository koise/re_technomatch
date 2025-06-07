// src/routes/guestRoutes.jsx
import React from 'react';
import Home from '../pages/Home';
import Login from '../pages/Guest/Login';
import StaticRedirect from '../pages/StaticRedirect';

export const guestRoutes = [
  { path: '/', element: <Home />, allowedRoles: ['guest'] },
  { path: '/login-test', element: <Login />, allowedRoles: ['guest'] },
  { path: '/static-redirect', element: <StaticRedirect />, allowedRoles: ['guest'] },
  { path: '/to-dashboard', element: <StaticRedirect />, allowedRoles: ['guest'] },
]; 