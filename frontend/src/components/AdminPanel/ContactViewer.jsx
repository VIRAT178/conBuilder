import React, { useEffect, useState } from "react";
import "../../styles/ad.css";

const baseURL = "https://conbuilder.onrender.com/api/v1/contacts";

const ContactViewer = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(baseURL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contacts");
        return res.json();
      })
      .then((data) => setContacts(data))
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
      city: c.city
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
      const res = await fetch(`${baseURL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      setContacts((prev) =>
        prev.map((c) => (c._id === editingId ? data.data : c))
      );

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        city: ""
      });
      setEditingId(null);
      setStatus("✅ Contact updated!");
    } catch (err) {
      console.error("Update error:", err.message);
      setStatus("❌ Failed to update contact.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setContacts((prev) => prev.filter((c) => c._id !== id));
      setStatus("🗑️ Contact deleted.");
    } catch (err) {
      console.error("Delete error:", err.message);
      setStatus("❌ Failed to delete.");
    }
  };

  return (
    <div className="admin-section">
      <h2>{editingId ? "Edit Contact" : "Contact Form Responses"}</h2>
      {status && <p className="form-status">{status}</p>}

      {editingId && (
        <form onSubmit={handleUpdate} className="admin-form">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <button type="submit">Update Contact</button>
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
