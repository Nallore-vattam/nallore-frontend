import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./AdminDashboard.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    blogs: 0,
    team: 0,
    gallery: 0,
  });

  useEffect(() => {
    (async () => {
      const e = await fetch(`${API_BASE}/api/events`).then(r => r.json());
      const b = await fetch(`${API_BASE}/api/blog`).then(r => r.json());
      const t = await fetch(`${API_BASE}/api/team`).then(r => r.json());
      const g = await fetch(`${API_BASE}/api/gallery/images`).then(r => r.json());

      setStats({
        events: e.length,
        blogs: b.length,
        team: t.length,
        gallery: g.length
      });
    })();
  }, []);

  const adminPages = [
    { title: "Manage Events", icon: "bi-calendar-week", link: "/admin/events", color: "#0d6efd" },
    { title: "Manage Blog", icon: "bi-journal-richtext", link: "/admin/blog", color: "#6610f2" },
    { title: "Manage Team", icon: "bi-people", link: "/admin/team", color: "#198754" },
    { title: "Manage Gallery", icon: "bi-images", link: "/admin/gallery", color: "#fd7e14" },
    { title: "Upload Gallery Images", icon: "bi-cloud-upload", link: "/admin/gallery-upload", color: "#dc3545" }
  ];

  return (
    <div className="admin-dashboard p-4">

      <h2 className="fw-bold mb-4">Admin Analytics Overview</h2>

      {/* Analytics */}
      <Row className="g-4 mb-5">
        <Col md={3}><Card className="stat-card"><Card.Body><h3>{stats.events}</h3><p>Events</p></Card.Body></Card></Col>
        <Col md={3}><Card className="stat-card"><Card.Body><h3>{stats.blogs}</h3><p>Blogs</p></Card.Body></Card></Col>
        <Col md={3}><Card className="stat-card"><Card.Body><h3>{stats.team}</h3><p>Team Members</p></Card.Body></Card></Col>
        <Col md={3}><Card className="stat-card"><Card.Body><h3>{stats.gallery}</h3><p>Gallery Images</p></Card.Body></Card></Col>
      </Row>

      <h3 className="fw-bold mb-4">Admin Tools</h3>

      {/* Admin Tools */}
      <Row className="g-4">
        {adminPages.map((item, index) => (
          <Col md={4} key={index}>
            <Card className="admin-tool-card shadow-sm" onClick={() => (window.location.href = item.link)}>
              <div className="tool-icon" style={{ backgroundColor: item.color }}>
                <i className={`bi ${item.icon}`}></i>
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
