import { createContext, useContext, useEffect, useState } from "react";

//creating the box that will be passed down;
const AuthContext = createContext();

// props is children
export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Only defining a def (that can be passed down)
  const login = (accessToken, userInfo = null) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setToken(accessToken);
    setUser(userInfo);
  };

  // Only defining a def (that can be passed down)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Runs one time at the beginning of app to read local storage for stuff.
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        setUser(null);
      }
    }
    setLoading(false)
  }, []);

  const value = {token, user, login, logout, loading};

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
