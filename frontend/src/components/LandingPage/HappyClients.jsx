import React, { useEffect, useState } from "react";

const HappyClients = () => {
  const [clients, setClients] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/clients")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch clients");
        return res.json();
      })
      .then((data) => setClients(data))
      .catch((err) => {
        console.error("Client fetch error:", err.message);
        setStatus("❌ Could not load clients.");
      });
  }, []);

  return (
    <section id="testimonials" className="happy-clients-section">
      <div className="happy-clients-container">
        <h2>Happy Clients</h2>
        {status && <p className="form-status">{status}</p>}
        <div className="clients-grid">
          {clients.map((client) => (
            <div className="client-card" key={client._id}>
              <img
                src={`http://localhost:5000${client.imageUrl}`}
                alt={client.name}
                className="client-avatar"
              />
              <h3>{client.name}</h3>
              <p className="client-role">{client.role}</p>
              <p className="client-feedback">“{client.testimonial}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyClients;
