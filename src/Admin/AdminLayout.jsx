import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLayout.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread messages count
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/contact`);
        const unread = res.data.filter(msg => !msg.is_read).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("Unread fetch failed:", err);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 15000); // auto refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 768) setMenuOpen(false);
  };

  return (
    <div className="admin-layout">

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

         <li onClick={() => handleNavigate("/admin/contact")} className="contact-notif-item">
  💬 Contact Messages

  {/* Show bell only if unread exists */}
  {unreadCount > 0 && (
    <span className="contact-icons">🔔</span>
  )}
</li>

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

      {/* Page Content */}
      <main className="admin-content fade-in">
        <Outlet />
      </main>

      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
    </div>
  );
}
