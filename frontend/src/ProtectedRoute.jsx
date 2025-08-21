import { Navigate } from "react-router-dom";
import jwtDecode from 'jwt-decode'



export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("admin-auth-token");
  if (!token) return <Navigate to="/admin-login" replace />;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
    
      return <Navigate to="/admin-login" replace />;
    }
  } catch {
   
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
