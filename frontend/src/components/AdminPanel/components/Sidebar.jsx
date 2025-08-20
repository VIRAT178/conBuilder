import { NavLink } from "react-router-dom";
import React from "react";

const Sidebar = () => {
  return (
    <nav className="admin-sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/admin/projects" className={({ isActive }) => isActive ? "active-link" : ""}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/clients" className={({ isActive }) => isActive ? "active-link" : ""}>
            Clients
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/contacts" className={({ isActive }) => isActive ? "active-link" : ""}>
            Contact Forms
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/newsletter" className={({ isActive }) => isActive ? "active-link" : ""}>
            Subscribers
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
