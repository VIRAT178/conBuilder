import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ad.css";

const baseURL = import.meta.env.VITE_Backend_URL + "/api/v1/clients";

const ClientsManager = () => {
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
      .then((res) => setClients(res.data))
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setStatus("❌ Could not load clients.");
      });
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
    payload.append("name", formData.name);
    payload.append("role", formData.role);
    payload.append("testimonial", formData.testimonial);
    if (formData.image) payload.append("image", formData.image);

    try {
      const url = editingId ? `${baseURL}/${editingId}` : baseURL;
      const method = editingId ? "put" : "post";
      const res = await axios[method](url, payload, axiosConfig);

      const savedClient = editingId ? res.data.data : res.data.data || res.data;

      setClients((prev) =>
        editingId ? prev.map((c) => (c._id === editingId ? savedClient : c)) : [...prev, savedClient]
      );

      setFormData({ name: "", role: "", testimonial: "", image: null });
      setPreview(null);
      setEditingId(null);
      setStatus(editingId ? "✅ Client updated!" : "✅ Client added!");
    } catch (err) {
      console.error("Submit error:", err.response?.data?.error || err.message);
      setStatus("❌ Failed to save client.");
    }
  };

  const handleEdit = (client) => {
    setFormData({
      name: client.name,
      role: client.role,
      testimonial: client.testimonial,
      image: null,
    });
    setPreview(import.meta.env.VITE_Backend_URL + client.imageUrl);
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, axiosConfig);
      setClients((prev) => prev.filter((c) => c._id !== id));
      setStatus("🗑️ Client deleted.");
    } catch (err) {
      console.error("Delete error:", err.response?.data?.error || err.message);
      setStatus("❌ Failed to delete.");
    }
  };

  return (
    <div className="admin-section">
      <h2>{editingId ? "Edit Client" : "Add Client"}</h2>
      <form onSubmit={handleSubmit} className="admin-form modern-form">
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="modern-input"
        />
        <input
          type="text"
          name="role"
          placeholder="Client Role"
          value={formData.role}
          onChange={handleChange}
          required
          className="modern-input"
        />
        <textarea
          name="testimonial"
          placeholder="Testimonial"
          value={formData.testimonial}
          onChange={handleChange}
          rows="3"
          className="modern-textarea"
        />
        <input type="file" name="image" accept="image/*" onChange={handleChange} className="modern-file-input" />
        {preview && <img src={preview} alt="Preview" className="image-preview modern-preview" />}
        <button type="submit" className="modern-btn">
          {editingId ? "Update Client" : "Upload Client"}
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>

      <h3>All Clients</h3>
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
          {clients.map((c) => (
            <tr key={c._id}>
              <td>
                <img
                  src={`${import.meta.env.VITE_Backend_URL}${c.imageUrl}`}
                  alt={c.name}
                  style={{ width: "80px", borderRadius: "50%", objectFit: "cover" }}
                />
              </td>
              <td>{c.name}</td>
              <td>{c.role}</td>
              <td>{c.testimonial}</td>
              <td>
                <button onClick={() => handleEdit(c)}>✏️ Edit</button>{" "}
                <button onClick={() => handleDelete(c._id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsManager;
