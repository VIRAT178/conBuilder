import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = ["Home", "Projects", "Testimonials", "Contact"];
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">conBuilder</h1>
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => navigate("/login")}
              className="admin-login-btn"
            >
              Admin Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
