import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactViewer = () => {
  const backend =
    import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_Backend_URL;
  const baseURL = `${backend}/api/v1/contacts`;
  const token =
    localStorage.getItem("admin-token") ||
    localStorage.getItem("admin-auth-token");

  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(baseURL, axiosConfig)
      .then((res) => setContacts(res.data))
      .catch(() => setStatus("❌ Failed to load contacts"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (contact) => {
    setFormData({
      fullName: contact.fullName,
      email: contact.email,
      mobile: contact.mobile,
      city: contact.city,
    });
    setEditingId(contact._id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const res = await axios.put(
        `${baseURL}/${editingId}`,
        formData,
        axiosConfig
      );
      setContacts((prev) =>
        prev.map((c) => (c._id === editingId ? res.data.data || res.data : c))
      );
      setEditingId(null);
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
      setStatus("✅ Contact updated");
    } catch {
      setStatus("❌ Failed to update contact");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, axiosConfig);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setStatus("🗑️ Contact deleted");
    } catch {
      setStatus("❌ Failed to delete contact");
    }
  };

  return (
    <div className="admin-section">
      <h2>{editingId ? "Edit Contact" : "Contact Submissions"}</h2>
      {editingId && (
        <form onSubmit={handleUpdate} className="admin-form modern-form">
          <input
            name="fullName"
            placeholder="Full Name"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="modern-input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="modern-input"
          />
          <input
            name="mobile"
            placeholder="Mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="modern-input"
          />
          <input
            name="city"
            placeholder="City"
            required
            value={formData.city}
            onChange={handleChange}
            className="modern-input"
          />
          <button type="submit" className="modern-btn">
            Update Contact
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      )}
      <table className="admin-table modern-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td>{c.fullName}</td>
              <td>{c.email}</td>
              <td>{c.mobile}</td>
              <td>{c.city}</td>
              <td>
                <button className="modern-action-btn" onClick={() => handleEdit(c)}>✏️ Edit</button>
                <button className="modern-action-btn danger" onClick={() => handleDelete(c._id)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactViewer;
