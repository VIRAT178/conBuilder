import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    fetch('https://conbuilder.onrender.com/api/v1/auth/check', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => setAuthorized(res.ok))
      .catch(() => setAuthorized(false));
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  return authorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
