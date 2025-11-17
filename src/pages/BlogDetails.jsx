import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/blog/${id}`)
      .then((r) => r.json())
      .then(setBlog);
  }, [id]);

  if (!blog) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="blog-details-page">

      {/* HERO IMAGE */}
      <section className="blog-details-hero">
        <img
          src={blog.thumbnail || "/images/fallback.png"}
          alt={blog.title}
          className="blog-details-banner"
        />
      </section>

      <Container className="my-5">

        {/* ⭐ BACK TO HOME BUTTON */}
        <Button
          variant="secondary"
          href="/"
          className="mb-4 px-4 py-2 fw-semibold"
        >
          ← Back to Home
        </Button>

        {/* TITLE */}
        <h1 className="fw-bold mb-3">{blog.title}</h1>

        {/* META INFO */}
        <p className="text-muted">
          {blog.author || "Admin"} •{" "}
          {new Date(blog.created_at).toLocaleDateString()}
        </p>

        {/* CONTENT */}
        <p className="mt-4 fs-5" style={{ whiteSpace: "pre-line" }}>
          {blog.content}
        </p>
      </Container>
    </div>
  );
}
