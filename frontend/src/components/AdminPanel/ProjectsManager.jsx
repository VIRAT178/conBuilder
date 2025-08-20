import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ad.css";

const baseURL = import.meta.env.VITE_Backend_URL + "/api/v1/projects";

const ProjectManager = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    category: "Consultation",
  });
  const [projects, setProjects] = useState([]);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("admin-auth-token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Fetch error:", err));
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

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    if (formData.image) payload.append("image", formData.image);

    try {
      const url = editingId ? `${baseURL}/${editingId}` : baseURL;
      const method = editingId ? "put" : "post";

      const res = await axios[method](url, payload, axiosConfig);

      const savedProject = res.data.data || res.data;

      setStatus(editingId ? "✅ Project updated!" : "✅ Project added!");
      setFormData({
        title: "",
        description: "",
        image: null,
        category: "Consultation",
      });
      setPreview(null);
      setEditingId(null);

      const updatedList = editingId
        ? projects.map((p) => (p._id === editingId ? savedProject : p))
        : [...projects, savedProject];

      setProjects(updatedList);
    } catch (err) {
      console.error("Submit error:", err.response?.data?.error || err.message);
      setStatus("❌ Failed to save project.");
    }
  };

  const handleEdit = (p) => {
    setFormData({
      title: p.title,
      description: p.description,
      image: null,
      category: p.category,
    });
    setPreview(import.meta.env.VITE_Backend_URL + p.imageUrl);
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, axiosConfig);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setStatus("🗑️ Project deleted.");
    } catch (err) {
      console.error("Delete error:", err.response?.data?.error || err.message);
      setStatus("❌ Failed to delete.");
    }
  };

  return (
    <div className="admin-section">
      <h2>{editingId ? "Edit Project" : "Add Project"}</h2>
      <form onSubmit={handleSubmit} className="admin-form modern-form">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="modern-input"
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
          className="modern-textarea"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="modern-select"
        >
          <option value="Consultation">Consultation</option>
          <option value="Design">Design</option>
          <option value="Marketing & Design">Marketing & Design</option>
          <option value="Consultation & Marketing">Consultation & Marketing</option>
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="modern-file-input"
        />
        {preview && <img src={preview} alt="Preview" className="image-preview modern-preview" />}
        <button type="submit" className="modern-btn">
          {editingId ? "Update Project" : "Upload Project"}
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>

      <h3>All Projects</h3>
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
          {projects.map((p) => (
            <tr key={p._id}>
              <td>
                <img
                  src={`${import.meta.env.VITE_Backend_URL}${p.imageUrl}`}
                  alt={p.title}
                  style={{ width: "90px", borderRadius: "6px", objectFit: "cover" }}
                />
              </td>
              <td>{p.title}</td>
              <td>{p.category}</td>
              <td>{p.description}</td>
              <td>
                <button onClick={() => handleEdit(p)}>✏️ Edit</button>{" "}
                <button onClick={() => handleDelete(p._id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectManager;
