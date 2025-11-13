import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [title, setTitle] = useState("");
  const [categoryKey, setCategoryKey] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const catRes = await fetch(`${API_BASE}/api/gallery/categories`);
    const imgRes = await fetch(`${API_BASE}/api/gallery/images`);
    setCategories(await catRes.json());
    setItems(await imgRes.json());
  }

  function startEdit(item) {
    setEditItem(item.id);
    setTitle(item.title);
    setCategoryKey(item.category_key);
  }

  async function saveEdit(id) {
    await fetch(`${API_BASE}/api/admin/gallery/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify({ title, category_key: categoryKey }),
    });
    setEditItem(null);
    load();
  }

  async function deleteItem(id) {
    if (!confirm("Delete this image?")) return;
    await fetch(`${API_BASE}/api/admin/gallery/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": ADMIN_TOKEN },
    });
    load();
  }

  return (
          <div className="container py-4 admin-gallery">     
           <h2>Manage Gallery</h2>

      <div className="row g-3 mt-3">
        {items.map((item) => (
          <div className="col-6 col-md-4 col-lg-3" key={item.id}>
            <div className="card h-100">
              <img
                src={item.src}
                className="card-img-top"
                alt=""
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

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => saveEdit(item.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditItem(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="card-body">
                  <div className="fw-bold">{item.title}</div>
                  <div className="small text-muted">{item.category_key}</div>
                </div>
              )}

              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => startEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
