import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} conBuilder. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#testimonials">Testimonials</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <p className="footer-credit">Built by Vishal Pratap Singh</p>
      </div>
    </footer>
  );
};

export default Footer;
