import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("admin-auth") === "true";

  if (!isAuth) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
