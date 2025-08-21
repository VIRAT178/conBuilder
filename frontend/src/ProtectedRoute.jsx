import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("admin-auth-token");

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  const decoded = parseJwt(token);
  if (!decoded || decoded.exp * 1000 < Date.now()) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}


function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
