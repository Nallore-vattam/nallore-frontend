import React, { useEffect, useState } from "react";
import "./AdminStyles.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);

  // Form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  // Image
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Edit state
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  // Load blogs (requires admin token)
  async function loadBlogs() {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/admin/blog`, {
        headers: {
          "x-admin-token": token,
        },
      });

      const data = await res.json();
      setBlogs(data || []);
    } catch (err) {
      console.error("LOAD BLOGS ERROR:", err);
    }
  }

  // Handle image change
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // Upload thumbnail to Cloudinary
  async function uploadToCloudinary() {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gallery_upload");

    const res = await fetch("https://api.cloudinary.com/v1_1/dsvfhsusq/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    return json.secure_url;
  }

  // ---------------- ADD BLOG ----------------
  async function addBlog() {
    if (!title || !content || !file) {
      alert("Fill all fields including thumbnail.");
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary();
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/admin/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          title,
          content,
          thumbnail: imageUrl,
          author,
        }),
      });

      if (!res.ok) throw new Error("Add blog failed");

      await loadBlogs();
      resetForm();
    } catch (err) {
      console.error("ADD BLOG ERROR:", err);
      alert("Blog not added");
    }
  }

  // ---------------- START EDIT ----------------
  function startEdit(blog) {
    setEditId(blog.id);
    setTitle(blog.title || "");
    setContent(blog.content || "");
    setAuthor(blog.author || "");
    setPreview(blog.thumbnail || null);
    setFile(null);
  }

  // ---------------- UPDATE BLOG ----------------
  async function updateBlog() {
    try {
      let imageUrl = preview;
      const token = localStorage.getItem("adminToken");

      if (file) {
        imageUrl = await uploadToCloudinary();
      }

      const res = await fetch(`${API_BASE}/api/admin/blog/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          title,
          content,
          thumbnail: imageUrl,
          author,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      await loadBlogs();
      resetForm();
    } catch (err) {
      console.error("UPDATE BLOG ERROR:", err);
      alert("Blog update failed");
    }
  }

  // ---------------- DELETE BLOG ----------------
  async function deleteBlog(id) {
    if (!confirm("Delete this blog?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/admin/blog/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": token,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("DELETE BLOG ERROR:", err);
      alert("Blog delete failed");
    }
  }

  // ---------------- RESET FORM ----------------
  function resetForm() {
    setTitle("");
    setContent("");
    setAuthor("");
    setFile(null);
    setPreview(null);
    setEditId(null);
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">Manage Blog</h2>

      {/* FORM */}
      <div className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          rows="4"
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Author (optional)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label className="mt-2">Thumbnail</label>
        <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "160px", borderRadius: "10px", marginTop: "10px" }}
          />
        )}

        {editId ? (
          <>
            <button className="admin-btn admin-btn-warning mt-3 me-2" onClick={updateBlog}>
              Update Blog
            </button>
            <button className="admin-btn admin-btn-secondary mt-3" onClick={resetForm}>
              Cancel
            </button>
          </>
        ) : (
          <button className="admin-btn admin-btn-primary mt-3" onClick={addBlog}>
            Add Blog
          </button>
        )}
      </div>

      {/* BLOG LIST */}
      <h4 className="mt-4">Blogs</h4>

      <ul className="list-group">
        {blogs.map((blog) => (
          <li key={blog.id} className="list-group-item d-flex justify-content-between">
            <div>
              <strong>{blog.title}</strong>
              <br />
              <img
                src={blog.thumbnail}
                style={{ width: "120px", borderRadius: "8px", marginTop: "8px" }}
                alt={blog.title || ""}
              />
              <br />
              <small className="text-muted">{blog.author}</small>
            </div>

            <div className="admin-actions">
              <button
                type="button"
                className="admin-icon-btn edit-btn"
                onClick={() => startEdit(blog)}
                title={`Edit ${blog.title}`}
                aria-label={`Edit ${blog.title}`}
              >
                <i className="bi bi-pencil-fill" />
              </button>

              <button
                type="button"
                className="admin-icon-btn delete-btn"
                onClick={() => deleteBlog(blog.id)}
                title={`Delete ${blog.title}`}
                aria-label={`Delete ${blog.title}`}
              >
                <i className="bi bi-trash-fill" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
