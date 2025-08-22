import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import '../styles/ad.css'
import Sidebar from "../components/AdminPanel/components/Sidebar";
import Topbar from "../components/AdminPanel/components/Topbar";
import ProjectManager from "../components/AdminPanel/ProjectsManager";
import ClientsManager from "../components/AdminPanel/ClientsManager";
import ContactViewer from "../components/AdminPanel/ContactViewer";
import NewsletterViewer from "../components/AdminPanel/SubscribersList";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_Backend_URL;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authorized, setAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("admin-auth-token"));

  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please login again.");
      setAuthorized(false);
      setLoading(false);
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
          toast.error("Session expired. Please login again.");
          navigate("/admin-login", { replace: true });
        }
      })
      .catch(() => {
        setAuthorized(false);
        toast.error("Session expired. Please login again.");
        navigate("/admin-login", { replace: true });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, backend, navigate]);

  if (loading) return <div>Loading Dashboard...</div>;
  if (!authorized) return <Navigate to="/admin-login" replace />;

  return (
    <div>
      <Topbar />
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen((prev) => !prev)} />
      <main
        className="main-content"
        style={{
          marginLeft: sidebarOpen ? "220px" : "0",
          transition: "margin-left 0.3s ease",
          paddingTop: "60px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "24px",
          minHeight: "calc(100vh - 60px)",
        }}
      >
        <Routes>
          <Route index element={<Navigate to="projects" />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="clients" element={<ClientsManager />} />
          <Route path="contacts" element={<ContactViewer />} />
          <Route path="newsletter" element={<NewsletterViewer />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
