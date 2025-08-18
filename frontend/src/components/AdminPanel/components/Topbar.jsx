import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../../styles/ad.css"; 

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("https://conbuilder.onrender.com/api/v1/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    localStorage.removeItem("admin-auth");
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-left">
        <h2>Welcome, Admin ✌️</h2>
      </div>
      <div className="topbar-right">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Topbar;
