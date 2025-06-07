import React, { useState, useEffect, createContext, useContext } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Cookie helper functions 
// MAKE IT BASE ON SERVER TIME
const setCookie = (name, value, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
};

const getCookie = (name) => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));
  return cookieValue ? cookieValue.split('=')[1] : null;
};

export const ThemeProvider = ({ children }) => {
  // Check if there's a saved theme preference in cookies or use system preference
  const getInitialTheme = () => {
    const savedTheme = getCookie('theme');
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

  // Update cookie and document attributes when theme changes
  useEffect(() => {
    if (theme) {
      setCookie('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
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