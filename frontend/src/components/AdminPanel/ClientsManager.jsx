import React, { useEffect, useState } from "react";
import axios from "axios";

const ClientsManager = () => {
  const backend =
    import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_Backend_URL;
  const baseURL = `${backend}/api/v1/clients`;
  const token =
    localStorage.getItem("admin-token") ||
    localStorage.getItem("admin-auth-token");

  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    testimonial: "",
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
      .then((res) => setClients(res.data))
      .catch(() => setStatus("❌ Failed to load clients"));
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
      payload.append("name", formData.name);
      payload.append("role", formData.role);
      payload.append("testimonial", formData.testimonial);
      if (formData.image) payload.append("image", formData.image);

      const url = editingId ? `${baseURL}/${editingId}` : baseURL;
      const method = editingId ? "put" : "post";
      const res = await axios[method](url, payload, axiosConfig);
      const savedClient = editingId ? res.data.data : res.data;

      setClients((prev) =>
        editingId
          ? prev.map((c) => (c._id === editingId ? savedClient : c))
          : [...prev, savedClient]
      );

      setFormData({ name: "", role: "", testimonial: "", image: null });
      setPreview(null);
      setEditingId(null);
      setStatus(`✅ ${editingId ? "Updated" : "Added"} successfully!`);
    } catch {
      setStatus("❌ Failed to save client");
    }
  };

  const handleEdit = (client) => {
    setFormData({
      name: client.name,
      role: client.role,
      testimonial: client.testimonial,
      image: null,
    });
    setPreview(`${backend}${client.imageUrl}`);
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, axiosConfig);
      setClients((prev) => prev.filter((c) => c._id !== id));
      setStatus("🗑️ Deleted successfully");
    } catch {
      setStatus("❌ Failed to delete client");
    }
  };

  return (
    <div className="admin-section">
      <h2 className="section-title">
        {editingId ? "Edit Client" : "Add Client"}
      </h2>
      <form onSubmit={handleSubmit} className="admin-form modern-form">
        <label className="modern-label">Client Name</label>
        <input
          name="name"
          placeholder="Enter name"
          required
          value={formData.name}
          onChange={handleChange}
          className="modern-input"
        />
        <label className="modern-label">Client Role</label>
        <input
          name="role"
          placeholder="Role"
          required
          value={formData.role}
          onChange={handleChange}
          className="modern-input"
        />
        <label className="modern-label">Testimonial</label>
        <textarea
          name="testimonial"
          placeholder="Testimonial"
          rows={3}
          value={formData.testimonial}
          onChange={handleChange}
          className="modern-textarea"
        />
        <label className="modern-label">Image</label>
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
          {editingId ? "Update Client" : "Upload Client"}
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>
      <h3>Clients</h3>
      <table className="admin-table modern-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Testimonial</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>
                <img
                  src={`${backend}${client.imageUrl}`}
                  alt={client.name}
                  style={{ width: 80, borderRadius: "50%" }}
                />
              </td>
              <td>{client.name}</td>
              <td>{client.role}</td>
              <td>{client.testimonial}</td>
              <td>
                <button
                  className="modern-action-btn"
                  onClick={() => handleEdit(client)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="modern-action-btn danger"
                  onClick={() => handleDelete(client._id)}
                >
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

export default ClientsManager;
