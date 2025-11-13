const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/api/gallery/categories`);
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function fetchImages(category = "all") {
  const url = new URL(`${API_BASE}/api/gallery/images`);
  if (category) url.searchParams.set("category", category);
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load images");
  return res.json();
}

// Admin APIs
export async function adminCreateImage(payload, adminToken) {
  const res = await fetch(`${API_BASE}/api/admin/gallery`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": adminToken
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error((await res.json()).error || "Create failed");
  return res.json();
}

export async function adminUpdateImage(id, payload, adminToken) {
  const res = await fetch(`${API_BASE}/api/admin/gallery/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": adminToken
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error((await res.json()).error || "Update failed");
  return res.json();
}

export async function adminDeleteImage(id, adminToken) {
  const res = await fetch(`${API_BASE}/api/admin/gallery/${id}`, {
    method: "DELETE",
    headers: { "x-admin-token": adminToken }
  });
  if (!res.ok) throw new Error((await res.json()).error || "Delete failed");
  return res.json();
}
