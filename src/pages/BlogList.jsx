import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/blog`)
      .then((r) => r.json())
      .then(setBlogs);
  }, []);

  return (
    <div className="blog-list-page">
      
      {/* HERO SECTION */}
      <section className="page-hero blog-hero">
        <Container>
          <Row>
            <Col lg={10} className="mx-auto text-center">
              <h1 className="display-5 fw-bold text-white">Blogs & Articles</h1>
              <p className="text-light">Updates • Stories • Reports</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ⭐ Back to Home Button */}
      <Container className="mt-4 text-center">
        <Button 
          variant="secondary" 
          href="/" 
          className="px-4 py-2 fw-semibold"
        >
          ← Back to Home
        </Button>
      </Container>

      {/* BLOG LIST */}
      <Container className="my-5">
        <Row className="g-4">
          {blogs.map((blog) => (
            <Col lg={4} md={6} key={blog.id}>
              <Card className="shadow-sm blog-card">
                <Card.Img
                  src={blog.thumbnail || "/images/fallback.png"}
                  style={{ height: 200, objectFit: "cover" }}
                />

                <Card.Body>
                  <Card.Title>{blog.title}</Card.Title>

                  <Card.Text className="text-muted small">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </Card.Text>

                  <Card.Text>
                    {(blog.content || "").slice(0, 120)}...
                  </Card.Text>

                  <a href={`/blog/${blog.id}`} className="fw-bold text-primary">
                    Read More →
                  </a>
                </Card.Body>

              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
