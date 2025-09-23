"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true); // <-- define loading

    // Check token from localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("username");

        if (token) {
            setIsLoggedIn(true);
            setUsername(user);
        } else {
            setIsLoggedIn(false);
            setUsername(null);
        }

        setLoading(false); // <-- finished checking
    }, []);

    const login = (token, user) => {
        localStorage.setItem("token", token);
        localStorage.setItem("username", user);
        setIsLoggedIn(true);
        setUsername(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
        setUsername(null);
        router.push("/login");
        // redirect to login and prevent back button
        //router.replace("/login"); // replace history
        window.history.pushState(null, "", window.location.href);
        window.onpopstate = () => window.history.go(1);
    };

    const protectRoute = () => {
        if (!isLoggedIn && !loading) {
            router.push("/login");
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout, loading, protectRoute }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
