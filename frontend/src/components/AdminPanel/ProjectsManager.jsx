import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectManager = () => {
  const backend =
    import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_Backend_URL;
  const baseURL = `${backend}/api/v1/projects`;
  const token =
    localStorage.getItem("admin-token") ||
    localStorage.getItem("admin-auth-token");

  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Consultation",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    axios
      .get(baseURL, axiosConfig)
      .then((res) => setProjects(res.data))
      .catch(() => setStatus("❌ Failed to load projects"));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("category", formData.category);
      if (formData.image) payload.append("image", formData.image);

      const url = editingId ? `${baseURL}/${editingId}` : baseURL;
      const method = editingId ? "put" : "post";

      const res = await axios[method](url, payload, axiosConfig);
      const savedProject = res.data.data || res.data;

      setProjects((prev) =>
        editingId
          ? prev.map((p) => (p._id === editingId ? savedProject : p))
          : [...prev, savedProject]
      );

      setFormData({
        title: "",
        description: "",
        category: "Consultation",
        image: null,
      });
      setPreview(null);
      setEditingId(null);
      setStatus(`✅ ${editingId ? "Updated" : "Added"} project`);
    } catch {
      setStatus("❌ Failed to save project");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      image: null,
    });
    setPreview(`${backend}${project.imageUrl}`);
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, axiosConfig);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setStatus("🗑️ Project deleted");
    } catch {
      setStatus("❌ Failed to delete project");
    }
  };

  return (
    <div className="admin-section">
      <h2>{editingId ? "Edit Project" : "Add Project"}</h2>
      <form onSubmit={handleSubmit} className="admin-form modern-form">
        <input
          name="title"
          placeholder="Project Title"
          required
          value={formData.title}
          onChange={handleChange}
          className="modern-input"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          rows={4}
          required
          value={formData.description}
          onChange={handleChange}
          className="modern-textarea"
        />
        <select
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
          className="modern-select"
        >
          <option>Consultation</option>
          <option>Design</option>
          <option>Marketing & Design</option>
          <option>Consultation & Marketing</option>
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="modern-file-input"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="image-preview modern-preview"
          />
        )}
        <button type="submit" className="modern-btn">
          {editingId ? "Update Project" : "Upload Project"}
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>
      <h3>Projects</h3>
      <table className="admin-table modern-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>
                <img
                  src={`${backend}${project.imageUrl}`}
                  alt={project.title}
                  style={{ width: 90, borderRadius: 10, objectFit: "cover" }}
                />
              </td>
              <td>{project.title}</td>
              <td>{project.category}</td>
              <td>{project.description}</td>
              <td>
                <button onClick={() => handleEdit(project)}>✏️ Edit</button>
                <button onClick={() => handleDelete(project._id)}>
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectManager;
