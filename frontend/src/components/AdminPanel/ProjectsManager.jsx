import React, { useState, useEffect } from "react";
import "../../styles/ad.css";

const baseURL = "https://conbuilder.onrender.com/api/v1/projects";

const ProjectManager = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    category: "Consultation"
  });
  const [projects, setProjects] = useState([]);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
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
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: payload });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed");

      setStatus(editingId ? "✅ Project updated!" : "✅ Project added!");
      setFormData({
        title: "",
        description: "",
        image: null,
        category: "Consultation"
      });
      setPreview(null);
      setEditingId(null);


      const updatedList = editingId
        ? projects.map((p) => (p._id === editingId ? data.data : p))
        : [...projects, data.data];

      setProjects(updatedList);
    } catch (err) {
      console.error("Submit error:", err.message);
      setStatus("❌ Failed to save project.");
    }
  };

  
  const handleEdit = (p) => {
    setFormData({
      title: p.title,
      description: p.description,
      image: null,
      category: p.category
    });
    setPreview(`http://localhost:5000${p.imageUrl}`);
    setEditingId(p._id);
  };


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Delete failed");
      setProjects((prev) => prev.filter((p) => p._id !== id));
      setStatus("🗑️ Project deleted.");
    } catch (err) {
      console.error("Delete error:", err.message);
      setStatus("❌ Failed to delete.");
    }
  };

  return (
    <div className="admin-section">
      <h2>{editingId ? "Edit Project" : "Add Project"}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
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
        />
        {preview && (
          <img src={preview} alt="Preview" className="image-preview" />
        )}
        <button type="submit">{editingId ? "Update Project" : "Upload Project"}</button>
        {status && <p className="form-status">{status}</p>}
      </form>

      <h3>All Projects</h3>
      <table className="admin-table">
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
                  src={`http://localhost:5000${p.imageUrl}`}
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
