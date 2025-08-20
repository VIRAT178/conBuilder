import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/AdminPanel/components/Sidebar";
import Topbar from "../components/AdminPanel/components/Topbar";
import ProjectManager from "../components/AdminPanel/ProjectsManager";
import ClientManager from "../components/AdminPanel/ClientsManager";
import ContactViewer from "../components/AdminPanel/ContactViewer";
import NewsletterViewer from "../components/AdminPanel/SubscribersList";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(null);
  const backend = import.meta.env.VITE_Backend_URL;
  useEffect(() => {
    const token = localStorage.getItem("admin-auth-token");
    if (!token) {
      toast.error("Session expired. Please login again.");
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
      });
  }, [navigate]);

  if (authorized === null) return <div>Loading Dashboard...</div>;
  if (!authorized) return <Navigate to="/admin-login" replace />;

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <Routes>
          <Route index element={<Navigate to="projects" />} />
          <Route path="projects" element={<ProjectManager />} />
          <Route path="clients" element={<ClientManager />} />
          <Route path="contacts" element={<ContactViewer />} />
          <Route path="newsletter" element={<NewsletterViewer />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
