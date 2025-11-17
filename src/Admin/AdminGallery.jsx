import React, { useEffect, useState } from "react";
import "./AdminStyles.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [title, setTitle] = useState("");
  const [categoryKey, setCategoryKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);

      const catRes = await fetch(`${API_BASE}/api/gallery/categories`);
      const imgRes = await fetch(`${API_BASE}/api/gallery/images`);

      const cats = await catRes.json();
      const imgs = await imgRes.json();

      setCategories(Array.isArray(cats) ? cats : []);
      setItems(Array.isArray(imgs) ? imgs : []);
    } catch (err) {
      console.error("LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  }

  function startEdit(item) {
    setEditItem(item.id);
    setTitle(item.title || "");
    setCategoryKey(item.category_key || "");
  }

  async function saveEdit(id) {
    try {
      const token = localStorage.getItem("adminToken");

      await fetch(`${API_BASE}/api/admin/gallery/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          title,
          category_key: categoryKey,
        }),
      });

      setEditItem(null);
      load();
    } catch (err) {
      console.error("SAVE EDIT ERROR:", err);
    }
  }

  async function deleteItem(id) {
    if (!confirm("Delete this image?")) return;
    try {
      const token = localStorage.getItem("adminToken");

      await fetch(`${API_BASE}/api/admin/gallery/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": token,
        },
      });

      load();
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading gallery...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4 admin-gallery">
      <h2>Manage Gallery</h2>

      <div className="row g-3 mt-3">
        {items.length === 0 && (
          <div className="text-center py-5 text-muted">
            <h5>No gallery images found</h5>
          </div>
        )}

        {items.map((item) => {
          const safeSrc =
            item?.src || item?.image || "https://via.placeholder.com/300x200?text=No+Image";

          return (
            <div className="col-6 col-md-4 col-lg-3" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={safeSrc}
                  alt={item.title || "Gallery Image"}
                  className="card-img-top"
                  style={{ height: "170px", objectFit: "cover" }}
                />

                {editItem === item.id ? (
                  <div className="card-body">
                    <input
                      className="form-control mb-2"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <select
                      className="form-control mb-2"
                      value={categoryKey}
                      onChange={(e) => setCategoryKey(e.target.value)}
                    >
                      {categories
                        .filter((c) => c.key !== "all")
                        .map((c) => (
                          <option key={c.key} value={c.key}>
                            {c.title}
                          </option>
                        ))}
                    </select>

                    <button className="admin-btn admin-btn-success btn-sm me-2" onClick={() => saveEdit(item.id)}>
                      Save
                    </button>

                    <button className="admin-btn admin-btn-secondary btn-sm" onClick={() => setEditItem(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="card-body">
                    <div className="fw-bold">{item.title}</div>
                    <div className="small text-muted">{item.category_key}</div>
                  </div>
                )}

                <div className="card-footer d-flex justify-content-end">
                  <div className="admin-actions">
                    <button
                      type="button"
                      className="admin-icon-btn edit-btn"
                      onClick={() => startEdit(item)}
                      title={`Edit ${item.title}`}
                      aria-label={`Edit ${item.title}`}
                    >
                      <i className="bi bi-pencil-fill" />
                    </button>

                    <button
                      type="button"
                      className="admin-icon-btn delete-btn"
                      onClick={() => deleteItem(item.id)}
                      title={`Delete ${item.title}`}
                      aria-label={`Delete ${item.title}`}
                    >
                      <i className="bi bi-trash-fill" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
