import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css"; // same CSS reuse

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
      await signup(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Set up your account to organize folders and upload images.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="auth-label">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="Your full name"
              className="auth-input"
              onChange={onChange}
              value={form.name}
            />
          </div>

          {/* Email */}
          <div style={{ marginTop: "12px" }}>
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
              placeholder="Create a strong password"
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
            {loading ? "Please wait..." : "Create account"}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          Already registered? <a href="/login">Sign in</a>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;