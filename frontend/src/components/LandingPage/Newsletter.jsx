import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Subscribing...");

    try {
      const response = await fetch("http://localhost:5000/api/v1/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) throw new Error("Subscription failed");

      setEmail("");
      setStatus("You're subscribed! 📩");
    } catch (err) {
      console.error("Newsletter error:", err.message);
      setStatus("Failed to subscribe. Please try again.");
    }
  };

  return (
    <section id="newsletter" className="newsletter-section">
      <div className="newsletter-container">
        <h2>Subscribe to Our Newsletter</h2>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
          {status && <p className="newsletter-status">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
