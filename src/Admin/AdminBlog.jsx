import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

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

  // ⭐ Load blogs from admin API ALWAYS
  async function loadBlogs() {
    const res = await fetch(`${API_BASE}/api/admin/blog`, {
      headers: { "x-admin-token": ADMIN_TOKEN }
    });

    const data = await res.json();
    setBlogs(data);
  }

  // Handle image change
  const handleFileChange = (e) => {
    const f = e.target.files[0];
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

    const imageUrl = await uploadToCloudinary();

    const res = await fetch(`${API_BASE}/api/admin/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify({
        title,
        content,
        thumbnail: imageUrl,
        author,
      }),
    });

    if (!res.ok) return alert("Blog not added");

    await loadBlogs();
    resetForm();
  }

  // ---------------- START EDIT ----------------
  function startEdit(blog) {
    setEditId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author || "");
    setPreview(blog.thumbnail);
    setFile(null);
  }

  // ---------------- UPDATE BLOG ----------------
  async function updateBlog() {
    let imageUrl = preview;

    if (file) {
      imageUrl = await uploadToCloudinary();
    }

    const res = await fetch(`${API_BASE}/api/admin/blog/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify({
        title,
        content,
        thumbnail: imageUrl,
        author,
      }),
    });

    if (!res.ok) return alert("Blog update failed");

    await loadBlogs();
    resetForm();
  }

  // ---------------- DELETE BLOG ----------------
  async function deleteBlog(id) {
    if (!confirm("Delete this blog?")) return;

    const res = await fetch(`${API_BASE}/api/admin/blog/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": ADMIN_TOKEN },
    });

    if (res.ok) {
      setBlogs(blogs.filter((b) => b.id !== id));
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
            <button className="btn btn-warning mt-3 me-2" onClick={updateBlog}>
              Update Blog
            </button>
            <button className="btn btn-secondary mt-3" onClick={resetForm}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-primary mt-3" onClick={addBlog}>
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
              />
              <br />
              <small className="text-muted">{blog.author}</small>
            </div>

            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => startEdit(blog)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteBlog(blog.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
