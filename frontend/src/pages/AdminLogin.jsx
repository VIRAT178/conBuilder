import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/main.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="login-overlay">
      <div className="login-modal sleek">
        <h2 className="login-title">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>

          <button type="submit" className="login-btn neon-btn">
            Log In
          </button>
        </form>
        <button className="close-btn">✖</button>
      </div>
    </div>
  );
}

export default AdminLogin;
