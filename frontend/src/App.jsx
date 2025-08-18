import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "../src/pages/LandingPage.jsx";
import AdminLogin from "../src/pages/AdminLogin";
import AdminSignup from "../src/pages/AdminSignUp.jsx"; 
import AdminDashboard from '../src/pages/AdminDashboard.jsx'
import "./styles/main.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        <Route
          path="/admin/*"
          element={
           
              <AdminDashboard />
         
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
