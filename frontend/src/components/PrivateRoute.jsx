import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Wait for AuthContext to finish loading (prevents flash-redirect on refresh)
  if (loading) {
    return null; // or return a loader/spinner here
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated → render child route
  return children;
}

export default PrivateRoute;
