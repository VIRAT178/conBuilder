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

  useEffect(() => {
    fetch("https://conbuilder.onrender.com/api/v1/auth/check", {
      method: "GET",
      credentials: "include"
    })
      .then(res => setAuthorized(res.ok))
      .catch(() => {
        toast.error("Session expired. Please login again.");
        navigate("/login");
      });
  }, []);

  if (authorized === null) return <div>Loading Dashboard...</div>;
  if (authorized === false) return <Navigate to="/login" replace />;

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
