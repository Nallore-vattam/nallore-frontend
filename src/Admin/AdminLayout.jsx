import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Restore saved theme
    const savedTheme = localStorage.getItem("adminTheme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  function toggleTheme() {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("adminTheme", newMode ? "dark" : "light");
  }

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  function handleNavigate(path) {
    navigate(path);
    if (window.innerWidth < 768) setMenuOpen(false);
  }

  return (
    <div className={`admin-layout ${darkMode ? "dark-mode" : ""}`}>

      {/* Sidebar */}
      <div className={`admin-sidebar ${menuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Admin Menu</h3>
          <button className="close-btn" onClick={() => setMenuOpen(false)}>✖</button>
        </div>

        <ul className="sidebar-links">
          <li onClick={() => handleNavigate("/admin/dashboard")}>📊 Dashboard</li>
          <li onClick={() => handleNavigate("/admin/events")}>📅 Events</li>
          <li onClick={() => handleNavigate("/admin/blog")}>📝 Blog</li>
          <li onClick={() => handleNavigate("/admin/team")}>👥 Team</li>
          <li onClick={() => handleNavigate("/admin/gallery")}>🖼 Gallery</li>
          <li onClick={() => handleNavigate("/admin/gallery-upload")}>⬆ Upload Images</li>
          <li onClick={() => handleNavigate("/admin/contact")}>💬 Contact Messages</li>
        </ul>

        <div className="sidebar-footer">
         
          <button className="logout-btn" onClick={logout}>🚪 Logout</button>
        </div>
      </div>

      {/* Top Bar */}
      <div className="admin-topbar">
        <button className="menu-toggle-btn" onClick={() => setMenuOpen(true)}>
          ☰
        </button>
        <h4 className="topbar-title">Admin Panel</h4>
      </div>

      {/* Main Content */}
      <main className="admin-content fade-in">
        <Outlet />
      </main>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}
