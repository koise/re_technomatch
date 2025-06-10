import React, { useState, useEffect, createContext, useContext } from 'react';

// Create Settings Context (renamed from ThemeContext)
const SettingsContext = createContext();

// Cookie helper functions - enhanced with better error handling and expiration
const setCookie = (name, value, days = 365) => {
  try {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
    document.cookie = `${name}=${encodeURIComponent(stringValue)};${expires};path=/;SameSite=Strict`;
    
    // Verify cookie was set successfully
    const savedValue = getCookie(name);
    if (savedValue === null) {
      console.warn("Cookie could not be verified after setting");
      // Fallback to localStorage
      localStorage.setItem(`settings_${name}`, stringValue);
    }
    return true;
  } catch (error) {
    console.error('Error setting cookie:', error);
    // Fallback to localStorage
    try {
      localStorage.setItem(`settings_${name}`, typeof value === 'object' ? JSON.stringify(value) : String(value));
    } catch (e) {
      console.error('Failed to save to localStorage as well:', e);
    }
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
    
    // If cookie not found, try localStorage as backup
    const localValue = localStorage.getItem(`settings_${name}`);
    if (localValue !== null) {
      try {
        if ((localValue.startsWith('{') && localValue.endsWith('}')) || 
            (localValue.startsWith('[') && localValue.endsWith(']'))) {
          return JSON.parse(localValue);
        }
        return localValue;
      } catch (e) {
        return localValue;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting cookie:', error);
    return null;
  }
};

const deleteCookie = (name) => {
  try {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    localStorage.removeItem(`settings_${name}`);
  } catch (error) {
    console.error('Error deleting cookie:', error);
  }
};

// Default settings
const defaultSettings = {
  theme: 'dark',
  font: 'sans-serif',
  onlineStatus: true,
  notifications: true,
  soundEffects: true,
  animations: true,
  language: 'en',
  colorAccent: 'red',
  sessionTimeout: 60
};

export const SettingsProvider = ({ children }) => {
  // Get initial settings from cookies or use defaults
  const getInitialSettings = () => {
    try {
      // First try to get settings from cookies
      const savedSettings = getCookie('user_settings');
      
      if (savedSettings && typeof savedSettings === 'object') {
        console.log("Loaded settings from cookies:", savedSettings);
        return { ...defaultSettings, ...savedSettings };
      }
      
      // If no saved settings or not an object, check system preference for theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      console.log("Using system theme preference:", systemTheme);
      
      // Check if we have individual settings stored
      const individualSettings = {};
      let hasIndividualSettings = false;
      
      Object.keys(defaultSettings).forEach(key => {
        const value = getCookie(`setting_${key}`);
        if (value !== null) {
          individualSettings[key] = value;
          hasIndividualSettings = true;
        }
      });
      
      if (hasIndividualSettings) {
        console.log("Found individual setting cookies:", individualSettings);
        return { ...defaultSettings, theme: systemTheme, ...individualSettings };
      }
      
      // Fall back to default with system theme
      return { ...defaultSettings, theme: systemTheme };
    } catch (error) {
      console.error("Error retrieving settings:", error);
      return defaultSettings;
    }
  };

  const [settings, setSettings] = useState(defaultSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize settings once component mounts
  useEffect(() => {
    const initialSettings = getInitialSettings();
    setSettings(initialSettings);
    setIsInitialized(true);
    console.log("Settings initialized:", initialSettings);
  }, []);

  // Apply settings to document when they change
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      // Save to cookie
      setCookie('user_settings', settings);
      
      // Also save individual settings for redundancy
      Object.entries(settings).forEach(([key, value]) => {
        setCookie(`setting_${key}`, value);
      });
      
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
      
      // Apply animations setting
      if (!settings.animations) {
        document.body.classList.add('disable-animations');
      } else {
        document.body.classList.remove('disable-animations');
      }
      
      console.log("Settings applied to document:", settings);
    } catch (error) {
      console.error("Error applying settings:", error);
    }
  }, [settings, isInitialized]);

  // Update a single setting
  const updateSetting = (key, value) => {
    console.log(`Updating setting "${key}" to:`, value);
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Also save the individual setting immediately
    try {
      setCookie(`setting_${key}`, value);
    } catch (error) {
      console.error(`Error saving individual setting ${key}:`, error);
    }
  };

  // Toggle theme helper function
  const toggleTheme = () => {
    updateSetting('theme', settings.theme === 'light' ? 'dark' : 'light');
  };

  // Reset settings to defaults
  const resetSettings = () => {
    try {
      setSettings(defaultSettings);
      deleteCookie('user_settings');
      
      // Delete individual settings
      Object.keys(defaultSettings).forEach(key => {
        deleteCookie(`setting_${key}`);
      });
      
      console.log("Settings reset to defaults");
    } catch (error) {
      console.error("Error resetting settings:", error);
    }
  };

  return (
    <SettingsContext.Provider 
      value={{ 
        settings, 
        updateSetting, 
        toggleTheme, 
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
  const { settings, toggleTheme, updateSetting } = useSettings();
  return { 
    theme: settings.theme, 
    toggleTheme,
    setTheme: (theme) => updateSetting('theme', theme)
  };
}; 