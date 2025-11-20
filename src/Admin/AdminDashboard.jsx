import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import "./AdminDashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  async function safeFetch(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn("API failed:", url, res.status);
        return [];
      }
      return await res.json();
    } catch (err) {
      console.error("Fetch error:", url, err);
      return [];
    }
  }

  async function loadStats() {
    setLoading(true);

    try {
      const [events, blogs, team, gallery, contact] = await Promise.all([
        safeFetch(`${API_BASE}/api/events`),
        safeFetch(`${API_BASE}/api/blog`),
        safeFetch(`${API_BASE}/api/team`),
        safeFetch(`${API_BASE}/api/gallery/images`),
        safeFetch(`${API_BASE}/api/contact`),
      ]);

      setStats({
        events: Array.isArray(events) ? events.length : 0,
        blogs: Array.isArray(blogs) ? blogs.length : 0,
        team: Array.isArray(team) ? team.length : 0,
        gallery: Array.isArray(gallery) ? gallery.length : 0,
        contact: Array.isArray(contact) ? contact.length : 0,

        // FIXED unread logic for PostgreSQL
        unread: contact.filter(
          (m) => m.is_read === false || m.is_read === "f"
        ).length,
      });
    } catch (err) {
      console.error("Dashboard load failed:", err);
      setStats({
        events: 0,
        blogs: 0,
        team: 0,
        gallery: 0,
        contact: 0,
        unread: 0,
      });
    } finally {
      setLoading(false);
    }
  }

  const adminPages = [
    {
      title: "Manage Events",
      icon: "bi-calendar-week",
      link: "/admin/events",
      color: "#0d6efd",
    },
    {
      title: "Manage Blog",
      icon: "bi-journal-richtext",
      link: "/admin/blog",
      color: "#6610f2",
    },
    {
      title: "Manage Team",
      icon: "bi-people",
      link: "/admin/team",
      color: "#198754",
    },
    {
      title: "Manage Gallery",
      icon: "bi-images",
      link: "/admin/gallery",
      color: "#fd7e14",
    },
    {
      title: "Upload Gallery Images",
      icon: "bi-cloud-upload",
      link: "/admin/gallery-upload",
      color: "#dc3545",
    },
    {
      title: "Contact Messages",
      icon: "bi-chat-dots",
      link: "/admin/contact",
      color: "#20c997",

      // FIXED red dot — no crash, no permanent dot
      showDot: stats?.unread > 0,
    },
  ];

  if (loading || !stats) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-2">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard p-4">
      <h2 className="fw-bold mb-4">Admin Analytics Overview</h2>

      <Row className="g-4 mb-5">
        <Col className="col-5-custom mb-3">
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <h3>{stats.events}</h3>
              <p>Events</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <h3>{stats.blogs}</h3>
              <p>Blogs</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <h3>{stats.team}</h3>
              <p>Team Members</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <h3>{stats.gallery}</h3>
              <p>Gallery Images</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card shadow-sm">
            <Card.Body>
              <h3>{stats.contact}</h3>
              <p>Contact Messages</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h3 className="fw-bold mb-4">Admin Tools</h3>

      <Row className="g-4">
        {adminPages.map((item, index) => (
          <Col md={4} key={index}>
            <Card
              className="admin-tool-card shadow-sm"
              onClick={() => (window.location.href = item.link)}
            >
              <div
                className="tool-icon position-relative"
                style={{ backgroundColor: item.color }}
              >
                <i className={`bi ${item.icon}`}></i>

                {item.showDot && <span className="red-dot"></span>}
              </div>

              <Card.Body className="text-center">
                <h5 className="fw-bold">{item.title}</h5>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
