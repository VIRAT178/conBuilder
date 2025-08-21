import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsletterViewer = () => {
  const backend =
    import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_Backend_URL;
  const baseURL = `${backend}/api/v1/newsletter`;
  const token =
    localStorage.getItem("admin-token") ||
    localStorage.getItem("admin-auth-token");

  const [subscribers, setSubscribers] = useState([]);
  const [formData, setFormData] = useState({ email: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    if (!token) {
      setStatus("❌ Unauthorized");
      return;
    }
    axios
      .get(baseURL, axiosConfig)
      .then((res) => setSubscribers(res.data))
      .catch(() => setStatus("❌ Failed to load subscribers"));
  }, []);

  const handleChange = (e) => setFormData({ email: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");
    try {
      const url = editingId ? `${baseURL}/${editingId}` : baseURL;
      const method = editingId ? "put" : "post";
      const res = await axios[method](url, formData, axiosConfig);

      setSubscribers((prev) =>
        editingId
          ? prev.map((s) =>
              s._id === editingId ? res.data.data || res.data : s
            )
          : [...prev, res.data.data || res.data]
      );
      setFormData({ email: "" });
      setEditingId(null);
      setStatus(`✅ Subscriber ${editingId ? "updated" : "added"}`);
    } catch {
      setStatus("❌ Failed to save subscriber");
    }
  };

  const handleEdit = (subscriber) => {
    setFormData({ email: subscriber.email });
    setEditingId(subscriber._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, axiosConfig);
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      setStatus("🗑️ Subscriber deleted");
    } catch {
      setStatus("❌ Failed to delete subscriber");
    }
  };

  return (
    <div className="admin-section">
      <h2 className="section-title">
        {editingId ? "Edit Subscriber" : "Newsletter Subscribers"}
      </h2>
      <form onSubmit={handleSubmit} className="admin-form modern-form">
        <label className="modern-label">Subscriber Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          required
          value={formData.email}
          onChange={handleChange}
          className="modern-input"
        />
        <button type="submit" className="modern-btn">
          {editingId ? "Update" : "Add"}
        </button>
        {status && <p className="form-status">{status}</p>}
      </form>
      {subscribers.length === 0 ? (
        <p>No subscribers found.</p>
      ) : (
        <table className="admin-table modern-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Subscribed At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub) => (
              <tr key={sub._id}>
                <td>{sub.email}</td>
                <td>{new Date(sub.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="modern-action-btn"
                    onClick={() => handleEdit(sub)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="modern-action-btn danger"
                    onClick={() => handleDelete(sub._id)}
                  >
                    🗑️ Delete
                  </button>
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
