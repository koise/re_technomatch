// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import RouteGuard from './RouteGuard';
import { routes } from './routes';
import './styles/main.scss';

// Create a component that uses the useRoutes hook to handle routes
const AppRoutes = () => {
  // Transform our flat routes into the format needed for useRoutes
  const routeElements = routes.map(route => ({
    path: route.path,
    element: <RouteGuard route={route} />
  }));

  return useRoutes(routeElements);
};

const App = () => {
  console.log('App component rendering with consolidated routes');
  
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;