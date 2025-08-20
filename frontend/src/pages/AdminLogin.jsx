import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/main.css";

export default function AdminLogin() {
  const backend = import.meta.env.VITE_Backend_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backend}/api/v1/login`,
        { email, password },
        { withCredentials: true }
      );
      if (data.success) {
        localStorage.setItem("admin-auth-token", data.token);
        localStorage.setItem("admin-auth", "true"); 
        toast.success("Login successful!");
        navigate("/admin");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server Error");
    }
    setLoading(false);
  }

  return (
    <div className="login-overlay">
      <div className="login-modal sleek">
        <h2 className="login-title">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              autoComplete="username"
            />
            <label>Email</label>
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              autoComplete="current-password"
            />
            <label>Password</label>
          </div>
          <button
            type="submit"
            className="login-btn neon-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        <div className="switch-link">
          Don&apos;t have an account? <Link to="/admin-signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
