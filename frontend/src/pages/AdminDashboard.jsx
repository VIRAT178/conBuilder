import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


import Sidebar from "../components/AdminPanel/components/Sidebar";
import Topbar from "../components/AdminPanel/components/Topbar";
import ProjectManager from "../components/AdminPanel/ProjectsManager";
import ClientsManager from "../components/AdminPanel/ClientsManager";
import ContactViewer from "../components/AdminPanel/ContactViewer";
import NewsletterViewer from "../components/AdminPanel/SubscribersList";


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authorized, setAuthorized] = useState(null);
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("admin-auth-token");


  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };


  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please login.");
      navigate("/admin-login", { replace: true });
      return;
    }


    axios
      .get(`${backend}/api/v1/auth/check`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.success) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          toast.error("Session expired. Please login.");
          navigate("/admin-login", { replace: true });
        }
      })
      .catch(() => {
        setAuthorized(false);
        toast.error("Session expired. Please login.");
        navigate("/admin-login", { replace: true });
      });
  }, [navigate, token, backend]);


  if (authorized === null) return <div>Loading Dashboard...</div>;
  if (!authorized) return <Navigate to="/admin-login" replace />;


  return (
    <div>
      <Topbar />
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <div
        className="dashboard-content"
        style={{
          marginLeft: sidebarOpen ? 220 : 0,
          transition: "margin-left 0.3s ease",
          paddingTop: 80,
          paddingLeft: 24,
          paddingRight: 24,
          minHeight: "calc(100vh - 80px)"
        }}
      >
        <Routes>
          <Route index element={<Navigate to="projects" />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="clients" element={<ClientsManager />} />
          <Route path="contacts" element={<ContactViewer />} />
          <Route path="newsletter" element={<NewsletterViewer />} />
        </Routes>
      </div>
    </div>
  );
};


export default AdminDashboard; 