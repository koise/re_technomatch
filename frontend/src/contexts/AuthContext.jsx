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

    // Fetch auth data on mount
    useEffect(() => {
        // Existing auth logic
        if (token) {
            fetch("/api/user", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Invalid token");
                    return res.json();
                })
                .then((data) => {
                    setUserRole(data.data.role);
                    setUsername(
                        `${data.data.profile.username}`
                    );
                    setUserId(data.data.id);
                    localStorage.setItem(
                        "username",
                        `${data.data.profile.username}`
                    );
                    localStorage.setItem("role", data.data.role);
                    localStorage.setItem("user_id", data.data.id);
                })
                .catch(() => {
                    handleLogout();
                });
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
        setToken(newToken);
        setUsername(username);
        setUserRole(role);
        localStorage.setItem("username", username);
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", role);
        localStorage.setItem("user_id", userId);
    };

    const handleLogout = () => {
        fetch("/api/logout", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
        }).finally(() => {
            setToken(null);
            setUsername("");
            setUserRole("Guest");
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("user_id");
        });
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