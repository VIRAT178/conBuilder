import React, { useEffect, useState } from "react";
import "../../styles/ad.css";

const baseURL = "https://conbuilder.onrender.com/api/v1/newsletter";

const NewsletterViewer = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [formData, setFormData] = useState({ email: "" });
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch(baseURL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setSubscribers(data))
      .catch((err) => {
        console.error("Fetch error:", err.message);
        setStatus("❌ Failed to load subscribers.");
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const url = editingId ? `${baseURL}/${editingId}` : baseURL;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");

      setSubscribers((prev) =>
        editingId
          ? prev.map((s) => (s._id === editingId ? data.data : s))
          : [...prev, data.data]
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
      const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      setStatus("🗑️ Deleted.");
    } catch (err) {
      console.error("Delete error:", err.message);
      setStatus("❌ Failed to delete.");
    }
  };

  return (
    <div className="admin-section">
      <h2>{editingId ? "Edit Subscriber" : "Newsletter Subscribers"}</h2>
      {status && <p className="form-status">{status}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Subscriber Email"
          required
        />
        <button type="submit">{editingId ? "Update" : "Add Subscriber"}</button>
      </form>

      {subscribers.length === 0 ? (
        <p>No subscriptions yet.</p>
      ) : (
        <table className="admin-table">
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
