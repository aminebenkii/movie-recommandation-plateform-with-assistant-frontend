import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api"; // your configured axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until we check token

  const isAuthenticated = !!token;

  /**
   * Called after login/signup
   * @param {string} accessToken - JWT token
   * @param {object|null} userInfo - user data from backend (optional)
   */
  const login = (accessToken, userInfo = null) => {
    localStorage.setItem("token", accessToken);
    setToken(accessToken);

    if (userInfo) {
      setUser(userInfo);
      setLoading(false);
    } else {
      fetchUserProfile();
    }
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
      logout(); // invalid token
    } finally {
      setLoading(false);
    }
  };

  // On first app load: try to restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUserProfile();
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
