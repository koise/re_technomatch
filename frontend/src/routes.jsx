// src/routes.jsx
import React from 'react';

// Layouts
import GuestLayout from './layouts/GuestLayout';
import AdminLayout from './layouts/AdminLayout';
import StudentLayout from './layouts/StudentLayout';
import ProfessorLayout from './layouts/ProfessorLayout';
import NoLayout from './layouts/NoLayout';

// Pages
import NotFound from './pages/NotFound';
import Dashboard from './pages/student/Dashboard';

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

  // Direct Dashboard Access (No Auth Check)
  {
    element: <StudentLayout />,
    children: [
      { path: '/student-dashboard', element: <Dashboard /> },
      { path: '/access-dashboard', element: <Dashboard /> },
      { path: '/direct-dashboard', element: <Dashboard /> },
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