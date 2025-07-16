import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import api from "../utils/api";

function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, logout } = useAuth();

  // ✅ Clear stale token if user manually goes to /login
  useEffect(() => {
    logout(); // force logout if already logged in
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.access_token;
      login(token);
    } catch (err) {
      alert("Login failed.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    }
  }, [isAuthenticated]);

  return <AuthForm type="login" onSubmit={handleLogin} />;
}

export default Login;
