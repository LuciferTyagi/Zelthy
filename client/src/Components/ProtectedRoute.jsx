import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/log-in" />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; 

    
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/log-in" />;
    }

    return <Outlet />;
  } catch (error) {
    localStorage.removeItem("token");
    return <Navigate to="/log-in" />;
  }
};

export default ProtectedRoute;
