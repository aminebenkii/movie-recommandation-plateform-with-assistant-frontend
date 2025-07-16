import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api"; // your configured axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // for first-time load

  const isAuthenticated = !!token;

  // Called after login
  const login = (accessToken) => {
    localStorage.setItem("token", accessToken);
    setToken(accessToken);

    // ✅ Delay to ensure token is readable by axios
    setTimeout(() => {
      fetchUserProfile();
    }, 0);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const fetchUserProfile = async () => {
    try {
      const res = await api.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile", err);
      logout(); // Token might be invalid
    } finally {
      setLoading(false); // ✅ Always stop loading
    }
  };

  // On app mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setTimeout(() => {
        fetchUserProfile();
      }, 0);
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    fetchUserProfile,
    setUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
