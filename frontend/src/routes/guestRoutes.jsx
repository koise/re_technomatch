// src/routes/guestRoutes.jsx
import React from 'react';
import Home from '../pages/Home';

export const guestRoutes = [
  { path: '/', element: <Home />, allowedRoles: ['guest'] },
  // Additional guest routes go here
]; 