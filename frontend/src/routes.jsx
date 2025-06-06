// src/routes.jsx
import React from 'react';

// Layouts
import GuestLayout from './layout/GuestLayout';
import AdminLayout from './layout/AdminLayout';
import StudentLayout from './layout/StudentLayout';
import ProfessorLayout from './layout/ProfessorLayout';
import NoLayout from './layout/NoLayout';

// Pages
import NotFound from './pages/NotFound';

// Import route configurations
import { adminRoutes } from './routes/adminRoutes';
import { studentRoutes } from './routes/studentRoutes';
import { professorRoutes } from './routes/professorRoutes';
import { guestRoutes } from './routes/guestRoutes';
import { fullscreenRoutes } from './routes/fullscreenRoutes';

export const routes = [
  // Not Found Route
  {
    element: <NoLayout />,
    children: [
      { path: '*', element: <NotFound /> },
    ],
  },

  // Guest Routes
  {
    element: <GuestLayout />,
    allowedRoles: ['guest'],
    children: guestRoutes,
  },
  
  // Admin Routes
  {
    element: <AdminLayout />,
    allowedRoles: ['admin'],
    children: adminRoutes,
  },
  
  // Fullscreen Routes (no navigation)
  {
    element: <NoLayout />,
    allowedRoles: ['student'],
    children: fullscreenRoutes,
  },
  
  // Student Routes
  {
    element: <StudentLayout />,
    allowedRoles: ['student'],
    children: studentRoutes,
  },
  
  // Professor Routes
  {
    element: <ProfessorLayout />,
    allowedRoles: ['professor'],
    children: professorRoutes,
  },
];