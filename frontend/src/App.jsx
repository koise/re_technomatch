// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import RouteGuard from './RouteGuard';
import { routes } from './routes';
import './styles/main.scss';
import Home from './pages/Home';

const App = () => {
  console.log('App component rendering');
  
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
          {/* Direct route for home page */}
          <Route
            path="/"
            element={<Home />}
          />
          
          {/* Other routes using the RouteGuard */}
          {routes.map((route, index) => (
            <Route key={index} element={<RouteGuard route={route} />}>
              {route.children && route.children.map((childRoute, childIndex) => (
                childRoute.path !== '/' && (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={<RouteGuard route={childRoute} />}
                  />
                )
              ))}
            </Route>
          ))}
        </Routes>
              </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;