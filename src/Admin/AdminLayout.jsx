import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  // -------------------------------
  // PROTECTED ROUTE CHECK
  // -------------------------------
  useEffect(() => {
    const token = localStorage.getItem("admin_auth");

    if (!token) {
      navigate("/admin/login");
    } else {
      setAuthenticated(true);
    }
  }, [navigate]);

  // -------------------------------
  // LOGOUT FUNCTION
  // -------------------------------
  function logout() {
    localStorage.removeItem("admin_auth");
    navigate("/admin/login");
  }

  if (!authenticated) return null; // Prevent flicker

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <div className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Admin Menu</h3>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>
            ✖
          </button>
        </div>

        <ul className="sidebar-links">
          <li onClick={() => navigate("/admin/dashboard")}>📊 Dashboard</li>
<li onClick={() => navigate("/admin/events")}>📅 Events</li>
<li onClick={() => navigate("/admin/blog")}>📝 Blog</li>
<li onClick={() => navigate("/admin/team")}>👥 Team</li>
<li onClick={() => navigate("/admin/gallery/manage")}>🖼 Gallery</li>
<li onClick={() => navigate("/admin/gallery-upload")}>⬆ Upload Images</li>
 </ul>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Top Bar */}
      <div className="admin-topbar">
        <button className="menu-toggle-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h4 className="topbar-title">Admin Panel</h4>
      </div>

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>

      {/* Background dim when sidebar open */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}
