import React, { useEffect, useState } from "react";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://conbuilder.onrender.com/api/v1/projects", {
      method: "GET",
      credentials: "include", 
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => {
        console.error("Failed to fetch projects:", err.message);
        setProjects([
          {
            _id: 1,
            title: "Marketing & Design",
            category: "Mumbai",
            description: "Enhancing visibility via design.",
            imageUrl: "/assets/project1.jpg",
          },
          {
            _id: 2,
            title: "Consultation",
            category: "Delhi",
            description: "Real estate investment guidance.",
            imageUrl: "/assets/project2.jpg",
          },
        ]);
      });
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2>Our Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project._id}>
              <img
                src={
                  project.imageUrl.startsWith("/assets")
                    ? project.imageUrl
                    : `http://localhost:5000${project.imageUrl}`
                }
                alt={project.title}
              />
              <h3>{project.title}, {project.category}</h3>
              <p>{project.description}</p>
              <button className="read-btn">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
