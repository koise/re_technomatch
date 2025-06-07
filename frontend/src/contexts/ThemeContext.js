import React, { useState, useEffect, createContext, useContext } from 'react';

// Create Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if there's a saved theme preference or use system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check if user prefers dark mode via system settings
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState('light'); // Default to light as fallback

  // Initialize theme once component mounts (to avoid SSR hydration issues)
  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  // Update localStorage and document body class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme Toggle Component
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${theme}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        {theme === 'light' ? (
          <div className="dark-icon">🌙</div>
        ) : (
          <div className="light-icon">☀️</div>
        )}
        <div className="toggle-thumb"></div>
      </div>
    </button>
  );
}; 