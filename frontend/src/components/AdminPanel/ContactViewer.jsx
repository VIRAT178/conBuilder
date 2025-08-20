import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ad.css";

const baseURL = import.meta.env.VITE_Backend_URL + "/api/v1/contacts";

const ContactViewer = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("admin-auth-token");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => setContacts(res.data))
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setStatus("❌ Could not load contacts.");
      });
  }, []);

  const handleEdit = (c) => {
    setFormData({
      fullName: c.fullName,
      email: c.email,
      mobile: c.mobile,
      city: c.city,
    });
    setEditingId(c._id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const res = await axios.put(`${baseURL}/${editingId}`, formData, axiosConfig);
      setContacts((prev) =>
        prev.map((c) => (c._id === editingId ? res.data.data || res.data : c))
      );
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
      setEditingId(null);
      setStatus("✅ Contact updated!");
    } catch (err) {
      console.error("Update error:", err.response?.data?.error || err.message);
      setStatus("❌ Failed to update contact.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, axiosConfig);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      setStatus("🗑️ Contact deleted.");
    } catch (err) {
      console.error("Delete error:", err.response?.data?.error || err.message);
      setStatus("❌ Failed to delete.");
    }
  };

  return (
    <div className="admin-section" style={{ marginLeft: "240px", padding: "24px" }}>
      <h2>{editingId ? "Edit Contact" : "Contact Form Responses"}</h2>
      {status && <p className="form-status">{status}</p>}
      {editingId && (
        <form onSubmit={handleUpdate} className="admin-form modern-form">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="modern-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="modern-input"
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
            className="modern-input"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="modern-input"
          />
          <button type="submit" className="modern-btn">
            Update Contact
          </button>
        </form>
      )}

      <table className="admin-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email Address</th>
            <th>Mobile Number</th>
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

export default ContactViewer;
