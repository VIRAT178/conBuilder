import React from "react";

const Navbar = () => {
  const navItems = ["Home", "Projects", "Testimonials", "Contact", ];
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-brand">conBulider</h1>
        <ul className="navbar-links">
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.toLowerCase()}`}
                className={item === "Home" ? "active" : ""}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


