import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        <h2 className="auth-title">Sign in to your account</h2>
        <p className="auth-subtitle">
          Access your folders and continue your work securely.
        </p>

        <form onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <label className="auth-label">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="auth-input"
              onChange={onChange}
              value={form.email}
            />
          </div>

          {/* Password */}
          <div style={{ marginTop: "12px" }}>
            <label className="auth-label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="auth-input"
              onChange={onChange}
              value={form.password}
            />
          </div>

          {/* Error */}
          {error && <p className="auth-error">{error}</p>}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="auth-button"
            style={{ marginTop: "16px" }}
          >
            {loading ? "Please wait..." : "Sign in"}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          New user? <a href="/signup">Create account</a>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;