import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Invalid password");
        setLoading(false);
        return;
      }

      // Save token
      localStorage.setItem("admin_auth", data.token);

      // Redirect
      navigate("/admin/dashboard");
    } catch (error) {
      setErrorMsg("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-container">
      <form className="admin-login-card" onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Admin Login</h2>

        {errorMsg && <div className="alert alert-danger py-2">{errorMsg}</div>}

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? "Checking…" : "Login"}
        </button>
      </form>
    </div>
  );
}
