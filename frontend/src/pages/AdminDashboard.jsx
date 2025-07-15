import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Sidebar from "../components/AdminPanel/components/Sidebar";
import Topbar from "../components/AdminPanel/components/Topbar";
import ProjectManager from "../components/AdminPanel/ProjectsManager";
import ClientManager from "../components/AdminPanel/ClientsManager";
import ContactViewer from "../components/AdminPanel/ContactViewer";
import NewsletterViewer from "../components/AdminPanel/SubscribersList";

const AdminDashboard = () => {
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
