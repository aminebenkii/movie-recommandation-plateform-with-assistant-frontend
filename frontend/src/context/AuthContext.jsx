import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true until we check token

  const login = (accessToken, userInfo = null) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", userInfo);

    setToken(accessToken);
    setUser(userInfo);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };


  // On first app load: try to restore session from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    token,
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
