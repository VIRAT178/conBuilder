import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/ad.css";

const baseURL = import.meta.env.VITE_Backend_URL + "/api/v1/newsletter";

const NewsletterViewer = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [formData, setFormData] = useState({ email: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("admin-auth-token");

  const axiosConfig = {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  };

  useEffect(() => {
    if (!token) {
      setStatus("❌ Unauthorized: Please login.");
      return;
    }

    axios
      .get(baseURL, axiosConfig)
      .then((res) => setSubscribers(res.data))
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setStatus("❌ Failed to load subscribers.");
      });
  }, [token]);

  const handleChange = (e) => setFormData({ email: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const url = editingId ? `${baseURL}/${editingId}` : baseURL;
      const method = editingId ? "put" : "post";
      const res = await axios[method](url, formData, axiosConfig);
      setSubscribers(
        editingId
          ? subscribers.map((s) => (s._id === editingId ? res.data.data || res.data : s))
          : [...subscribers, res.data.data || res.data]
      );
      setFormData({ email: "" });
      setEditingId(null);
      setStatus(editingId ? "✅ Updated!" : "✅ Added!");
    } catch (err) {
      console.error("Save error:", err.message);
      setStatus("❌ Save failed.");
    }
  };

  const handleEdit = (subscriber) => {
    setFormData({ email: subscriber.email });
    setEditingId(subscriber._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, axiosConfig);
      setSubscribers(subscribers.filter((s) => s._id !== id));
      setStatus("🗑️ Deleted.");
    } catch (err) {
      console.error("Delete error:", err.message);
      setStatus("❌ Failed to delete.");
    }
  };

  return (
    <div className="admin-section" style={{ marginLeft: "240px", padding: "24px" }}>
      <h2>{editingId ? "Edit Subscriber" : "Newsletter Subscribers"}</h2>
      {status && <p className="form-status">{status}</p>}

      <form onSubmit={handleSubmit} className="admin-form modern-form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Subscriber Email"
          required
          className="modern-input"
        />
        <button type="submit" className="modern-btn">
          {editingId ? "Update" : "Add Subscriber"}
        </button>
      </form>

      {subscribers.length === 0 ? (
        <p>No subscriptions yet.</p>
      ) : (
        <table className="admin-table modern-table">
          <thead>
            <tr>
              <th>Email Address</th>
              <th>Subscribed At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s._id}>
                <td>{s.email}</td>
                <td>{new Date(s.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(s)}>✏️</button>{" "}
                  <button onClick={() => handleDelete(s._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NewsletterViewer;
