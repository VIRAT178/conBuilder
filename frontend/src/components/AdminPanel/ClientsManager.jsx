import React, { useEffect, useState } from "react";
import "../../styles/ad.css";

const baseURL = "http://localhost:5000/api/v1/clients";

const ClientViewer = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    testimonial: "",
    image: null
  });
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setStatus("❌ Could not load clients.");
      });
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
    payload.append("name", formData.name);
    payload.append("role", formData.role);
    payload.append("testimonial", formData.testimonial);
    if (formData.image) payload.append("image", formData.image);

    try {
      const url = editingId ? `${baseURL}/${editingId}` : baseURL;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: payload });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setClients((prev) =>
        editingId ? prev.map((c) => (c._id === editingId ? data.data : c)) : [...prev, data.data]
      );

      setFormData({ name: "", role: "", testimonial: "", image: null });
      setPreview(null);
      setEditingId(null);
      setStatus(editingId ? "✅ Client updated!" : "✅ Client added!");
    } catch (err) {
      console.error("Submit error:", err.message);
      setStatus("❌ Failed to save client.");
    }
  };

  const handleEdit = (client) => {
    setFormData({
      name: client.name,
      role: client.role,
      testimonial: client.testimonial,
      image: null
    });
    setPreview(`http://localhost:5000${client.imageUrl}`);
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setClients((prev) => prev.filter((c) => c._id !== id));
      setStatus("🗑️ Client deleted.");
    } catch (err) {
      console.error("Delete error:", err.message);
      setStatus("❌ Failed to delete.");
    }
  };

  return (
    <div className="admin-section">
      <h2>{editingId ? "Edit Client" : "Add Client"}</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Client Role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <textarea
          name="testimonial"
          placeholder="Testimonial"
          value={formData.testimonial}
          onChange={handleChange}
          rows="3"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        {preview && (
          <img src={preview} alt="Preview" className="image-preview" />
        )}
        <button type="submit">{editingId ? "Update Client" : "Upload Client"}</button>
        {status && <p className="form-status">{status}</p>}
      </form>

      <h3>All Clients</h3>
      <table className="admin-table">
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
                  src={`http://localhost:5000${c.imageUrl}`}
                  alt={c.name}
                  style={{ width: "80px", borderRadius: "50%" }}
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

export default ClientViewer;
