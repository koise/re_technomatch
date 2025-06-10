import React, { useState, useEffect, createContext, useContext } from 'react';

// Create Settings Context (renamed from ThemeContext)
const SettingsContext = createContext();

// Cookie helper functions
const setCookie = (name, value, days = 365) => {
  try {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    document.cookie = `${name}=${encodeURIComponent(stringValue)};${expires};path=/;SameSite=Strict`;
    return true;
  } catch (error) {
    console.error('Error setting cookie:', error);
    return false;
  }
};

const getCookie = (name) => {
  try {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        const rawValue = c.substring(nameEQ.length, c.length);
        const value = decodeURIComponent(rawValue);
        // Try to parse as JSON if it looks like a JSON string
        if ((value.startsWith('{') && value.endsWith('}')) || 
            (value.startsWith('[') && value.endsWith(']'))) {
          try {
            return JSON.parse(value);
          } catch (e) {
            return value;
          }
        }
        return value;
      }
    }
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// Default settings
const defaultSettings = {
  theme: 'dark',
  font: 'sans-serif',
  onlineStatus: true,
  notifications: true,
  soundEffects: true,
  animations: true,
  compactMode: false,
  language: 'en',
  colorAccent: 'red',
  sessionTimeout: 60
};

export const SettingsProvider = ({ children }) => {
  // Get initial settings from cookies or use defaults
  const getInitialSettings = () => {
    const savedSettings = getCookie('user_settings');
    if (savedSettings) {
      return { ...defaultSettings, ...savedSettings };
    }
    
    // If no saved settings, check system preference for theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return { 
      ...defaultSettings, 
      theme: prefersDark ? 'dark' : 'light'
    };
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize settings once component mounts
  useEffect(() => {
    setSettings(getInitialSettings());
    setIsInitialized(true);
  }, []);

  // Apply settings to document when they change
  useEffect(() => {
    if (!isInitialized) return;
    
    // Save to cookie
    setCookie('user_settings', settings);
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', settings.theme);
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    
    // Apply font
    document.body.style.fontFamily = settings.font;
    
    // Apply compact mode
    if (settings.compactMode) {
      document.body.classList.add('compact-mode');
    } else {
      document.body.classList.remove('compact-mode');
    }
    
    // Apply animations setting
    if (!settings.animations) {
      document.body.classList.add('disable-animations');
    } else {
      document.body.classList.remove('disable-animations');
    }
  }, [settings, isInitialized]);

  // Update a single setting
  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Toggle theme helper function
  const toggleTheme = () => {
    updateSetting('theme', settings.theme === 'light' ? 'dark' : 'light');
  };

  // Toggle compact mode helper function
  const toggleCompactMode = () => {
    updateSetting('compactMode', !settings.compactMode);
  };

  // Reset settings to defaults
  const resetSettings = () => {
    setSettings(defaultSettings);
    deleteCookie('user_settings');
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        settings, 
        updateSetting, 
        toggleTheme, 
        toggleCompactMode, 
        resetSettings,
        defaultSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to access the settings context
export const useSettings = () => useContext(SettingsContext);

// Theme Toggle Component (keeping for backward compatibility)
export const ThemeToggle = () => {
  const { settings, toggleTheme } = useSettings();
  
  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${settings.theme}`}
      aria-label={`Switch to ${settings.theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        {settings.theme === 'light' ? (
          <div className="dark-icon">🌙</div>
        ) : (
          <div className="light-icon">☀️</div>
        )}
        <div className="toggle-thumb"></div>
      </div>
    </button>
  );
};

// For backward compatibility
export const ThemeProvider = SettingsProvider;
export const useTheme = () => {
  const { settings, toggleTheme } = useSettings();
  return { theme: settings.theme, toggleTheme };
}; 