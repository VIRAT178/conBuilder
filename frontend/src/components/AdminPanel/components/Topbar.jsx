import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Topbar = () => {
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_Backend_URL;

  const handleLogout = async () => {
    try {
      await axios.post(
        `${backend}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("admin-auth-token");
      localStorage.removeItem("admin-auth");
      toast.info("Logged out successfully");
      navigate("/admin-login");
    } catch {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h2>
          Welcome, Admin{" "}
          <span role="img" aria-label="peace">
            ✌️
          </span>
        </h2>
      </div>
      <div className="topbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
