import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await fetch("https://conbuilder.onrender.com/api/v1/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Network error");

      setStatus(" Submitted successfully!");
      setFormData({ fullName: "", email: "", mobile: "", city: "" });
    } catch (err) {
      console.error("Form submission error:", err.message);
      setStatus(" Failed to submit.");
    }
  };

  return (
    <section id="contact" className="contact-section fade-in">
      <div className="contact-form-container">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group floating">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <label>Full Name</label>
          </div>
          <div className="form-group floating">
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            <label>Email Address</label>
          </div>
          <div className="form-group floating">
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
            <label>Mobile Number</label>
          </div>
          <div className="form-group floating">
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            <label>City</label>
          </div>
          <button type="submit" className="submit-btn pulse">Submit</button>
          {status && <p className="form-status slide-up">{status}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;

