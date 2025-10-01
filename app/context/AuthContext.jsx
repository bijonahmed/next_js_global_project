"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();

  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token") || null;
    }
    return null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [username, setUsername] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("username") || null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("username");

      if (savedToken) {
        setToken(savedToken);
        setIsLoggedIn(true);
        setUsername(savedUser);
      } else {
        setToken(null);
        setIsLoggedIn(false);
        setUsername(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken, user) => {
    localStorage.setItem("token", newToken.trim());
    localStorage.setItem("username", user);
    setIsLoggedIn(true);
    setUsername(user);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
    setToken(null);
    router.push("/login");
  };

  const protectRoute = () => {
    if (!isLoggedIn && !loading) {
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, token, login, logout, loading, protectRoute }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
