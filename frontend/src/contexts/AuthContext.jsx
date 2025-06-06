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
    const [theme, setTheme] = useState("light"); // Default theme

    // Fetch theme from cookie and auth data on mount
    useEffect(() => {
        // Get theme from cookie (e.g., 'light' or 'dark')
        const savedTheme = Cookies.get("theme") || "light";
        setTheme(savedTheme);

        // Apply theme to <body>
        document.body.classList.remove("light", "dark");
        document.body.classList.add(savedTheme);

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

    // Update theme and cookie when theme changes
    useEffect(() => {
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
        Cookies.set("theme", theme, { expires: 365 });
    }, [theme]);

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

    // Function to update theme
    const updateTheme = (newTheme) => {
        setTheme(newTheme);
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);