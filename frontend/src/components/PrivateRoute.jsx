import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isTokenExpired } from "@/utils/isTokenExpired";

function PrivateRoute({ children }) {

  const { token, loading } = useAuth();
  const expired = token ? isTokenExpired(token) : true;

  if (!loading && ( !token || expired)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
export default PrivateRoute;
