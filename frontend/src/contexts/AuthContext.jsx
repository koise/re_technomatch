import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie"; // Import js-cookie

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [username, setUsername] = useState(
        localStorage.getItem("username") || ""
    );
    const [userRole, setUserRole] = useState(
        localStorage.getItem("role") || "Guest"
    );
    const [userId, setUserId] = useState(
        localStorage.getItem("user_id") || null
    );
    
    // Get theme from localStorage first, then cookie, then system preference
    const getInitialTheme = () => {
        const localTheme = localStorage.getItem("theme");
        if (localTheme) return localTheme;
        
        const cookieTheme = Cookies.get("theme");
        if (cookieTheme) return cookieTheme;
        
        return window.matchMedia('(prefers-color-scheme: dark)').matches 
            ? 'dark' 
            : 'light';
    };
    
    const [theme, setTheme] = useState(getInitialTheme());

    // Apply theme when component mounts
    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, []);

    // Fetch auth data on mount - DISABLED API CALL
    useEffect(() => {
        // MOCK user validation instead of API call
        if (token) {
            // Instead of fetching from API, validate from stored data
            console.log("Using mock auth validation instead of API call");
            
            // Simulate successful validation with stored data
            const storedRole = localStorage.getItem("role");
            const storedUsername = localStorage.getItem("username");
            const storedUserId = localStorage.getItem("user_id");
            
            if (storedRole && storedUsername) {
                setUserRole(storedRole);
                setUsername(storedUsername);
                setUserId(storedUserId || '1'); // Default ID if not set
                
                console.log(`Auth context initialized with stored data: ${storedUsername} (${storedRole})`);
            } else {
                // Invalid or incomplete data, log out
                console.log("Invalid stored credentials, logging out");
                handleLogout();
            }
        }
    }, [token]);

    // Update theme and storage when theme changes
    useEffect(() => {
        // Update document classes
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        
        // Save to both localStorage and cookie for persistence
        localStorage.setItem("theme", theme);
        Cookies.set("theme", theme, { expires: 365, sameSite: 'Lax' });
        
        // Dispatch event for components that might not be using the context
        window.dispatchEvent(new CustomEvent('themechange', { 
            detail: { theme } 
        }));
    }, [theme]);
    
    // Listen for theme change events from other components
    useEffect(() => {
        const handleThemeChange = (event) => {
            if (event.detail && event.detail.theme) {
                setTheme(event.detail.theme);
            }
        };
        
        window.addEventListener('themechange', handleThemeChange);
        
        return () => {
            window.removeEventListener('themechange', handleThemeChange);
        };
    }, []);
    
    // Listen for system preference changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e) => {
            // Only apply if user preference isn't explicitly set in localStorage
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const login = (newToken, username, role) => {
        console.log(`AuthContext: Logging in user - Username: ${username}, Role: ${role}`);
        setToken(newToken);
        setUsername(username);
        setUserRole(role);
        localStorage.setItem("username", username);
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", role);
        localStorage.setItem("user_id", "1"); // Default mock user ID
        console.log(`AuthContext: User logged in successfully - Role set to: ${role}`);
    };

    const handleLogout = () => {
        // DISABLED API CALL - No need to call the server
        console.log("Logging out user (API call disabled)");
        
        // Just clear local data
        setToken(null);
        setUsername("");
        setUserRole("Guest");
        localStorage.removeItem("username");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
    };

    // Enhanced theme update function
    const updateTheme = (newTheme) => {
        if (newTheme === 'system') {
            // If system preference is selected, remove localStorage entry and use system preference
            localStorage.removeItem("theme");
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(isDarkMode ? 'dark' : 'light');
        } else {
            setTheme(newTheme);
        }
    };

    // Toggle theme function
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                username,
                userRole,
                login,
                logout: handleLogout,
                userId,
                theme,
                setTheme: updateTheme,
                toggleTheme
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);