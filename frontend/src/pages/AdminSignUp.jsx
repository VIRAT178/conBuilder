import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/main.css";

export default function AdminSignup() {
  const backend = import.meta.env.VITE_Backend_URL;
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${backend}/api/v1/login/signup`, fields);

      if (data.success) {
        toast.success("Signup successful! Please log in.");
        navigate("/admin-login");
      } else {
        toast.error(data.message || "Signup failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error.");
    }
    setLoading(false);
  }

  return (
    <div className="login-overlay">
      <div className="login-modal sleek">
        <h2 className="login-title">Create Admin Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input name="firstName" value={fields.firstName} onChange={handleChange} required placeholder=" " />
            <label>First Name</label>
          </div>
          <div className="input-group">
            <input name="lastName" value={fields.lastName} onChange={handleChange} required placeholder=" " />
            <label>Last Name</label>
          </div>
          <div className="input-group">
            <input type="email" name="email" value={fields.email} onChange={handleChange} required placeholder=" " />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input type="password" name="password" value={fields.password} onChange={handleChange} required placeholder=" " />
            <label>Password</label>
          </div>
          <button className="login-btn neon-btn" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className="switch-link">
          Already have an account? <Link to="/admin-login">Log In</Link>
        </div>
      </div>
    </div>
  );
}
