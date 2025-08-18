import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from '../../frontend/src/pages/AdminDashboard';
import ProtectedRoute from '../../frontend/src/components/ProtecteddRaoute';
import './styles/main.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
