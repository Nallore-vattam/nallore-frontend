import React, { useEffect, useState } from "react";
import "./AdminStyles.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  // Form fields
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  // Image
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Edit state
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  // Load events (admin protected)
  async function loadEvents() {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/admin/events`, {
        headers: {
          "x-admin-token": token,
        },
      });

      const data = await res.json();
      setEvents(data || []);
    } catch (err) {
      console.error("LOAD EVENTS ERROR:", err);
    }
  }

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  // Upload to Cloudinary
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

  // ---------------- ADD EVENT ----------------
  async function addEvent() {
    if (!title || !date || !location || !file) {
      alert("Please fill all fields including image");
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary();
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/admin/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          title,
          date,
          location,
          category,
          image: imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Add event failed");

      await loadEvents();
      resetForm();
    } catch (err) {
      console.error("ADD EVENT ERROR:", err);
      alert("Error adding event");
    }
  }

  // ---------------- START EDIT ----------------
  function startEdit(ev) {
    setEditId(ev.id);
    setTitle(ev.title || "");
    setDate(ev.date || "");
    setLocation(ev.location || "");
    setCategory(ev.category || "");
    setPreview(ev.image || null);
    setFile(null);
  }

  // ---------------- UPDATE EVENT ----------------
  async function updateEvent() {
    try {
      let imageUrl = preview;
      const token = localStorage.getItem("adminToken");

      if (file) imageUrl = await uploadToCloudinary();

      const res = await fetch(`${API_BASE}/api/admin/events/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          title,
          date,
          location,
          category,
          image: imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      await loadEvents();
      resetForm();
    } catch (err) {
      console.error("UPDATE EVENT ERROR:", err);
      alert("Failed to update event");
    }
  }

  // ---------------- DELETE EVENT ----------------
  async function deleteEvent(id) {
    if (!confirm("Delete this event?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/admin/events/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": token,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("DELETE EVENT ERROR:", err);
      alert("Failed to delete");
    }
  }

  // ---------------- RESET FORM ----------------
  function resetForm() {
    setTitle("");
    setDate("");
    setLocation("");
    setCategory("");
    setFile(null);
    setPreview(null);
    setEditId(null);
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">Manage Events</h2>

      <div className="mb-4">
        {/* Title */}
        <input
          className="form-control mb-2"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Date */}
        <input
          type="date"
          className="form-control mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Location */}
        <input
          className="form-control mb-2"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Category */}
        <input
          className="form-control mb-2"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* Image upload */}
        <label>Event Image</label>
        <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "180px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "10px",
              marginTop: "10px",
            }}
          />
        )}

        {/* Buttons */}
        {editId ? (
          <>
            <button className="admin-btn admin-btn-warning mt-3 me-2" onClick={updateEvent}>
              Update Event
            </button>

            <button className="admin-btn admin-btn-secondary mt-3" onClick={resetForm}>
              Cancel
            </button>
          </>
        ) : (
          <button className="admin-btn admin-btn-primary mt-3" onClick={addEvent}>
            Add Event
          </button>
        )}
      </div>

      {/* EVENTS LIST */}
      <h4 className="mt-4">Events</h4>
      <ul className="list-group">
        {events.map((ev) => (
          <li
            key={ev.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{ev.title}</strong>
              <br />
              {ev.date} — {ev.location}
              <br />
              {ev.category && <span className="badge bg-primary">{ev.category}</span>}
              <br />
              <img
                src={ev.image}
                style={{
                  width: "120px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
                alt={ev.title || ""}
              />
            </div>

            <div className="admin-actions">
              <button
                type="button"
                className="admin-icon-btn edit-btn"
                onClick={() => startEdit(ev)}
                title={`Edit ${ev.title}`}
                aria-label={`Edit ${ev.title}`}
              >
                <i className="bi bi-pencil-fill" />
              </button>

              <button
                type="button"
                className="admin-icon-btn delete-btn"
                onClick={() => deleteEvent(ev.id)}
                title={`Delete ${ev.title}`}
                aria-label={`Delete ${ev.title}`}
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
