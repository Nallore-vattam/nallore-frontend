import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

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

  // ⭐ ALWAYS LOAD FROM ADMIN API (IMPORTANT)
  async function loadEvents() {
    const res = await fetch(`${API_BASE}/api/admin/events`, {
      headers: {
        "x-admin-token": ADMIN_TOKEN,
      },
    });

    const data = await res.json();
    setEvents(data);
  }

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

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

    const imageUrl = await uploadToCloudinary();

    const res = await fetch(`${API_BASE}/api/admin/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify({
        title,
        date,
        location,
        category,
        image: imageUrl,
      }),
    });

    if (!res.ok) {
      alert("Error adding event");
      return;
    }

    await loadEvents();
    resetForm();
  }

  // ---------------- START EDIT ----------------
  function startEdit(event) {
    setEditId(event.id);
    setTitle(event.title);
    setDate(event.date);
    setLocation(event.location);
    setCategory(event.category || "");
    setPreview(event.image);
    setFile(null);
  }

  // ---------------- UPDATE EVENT ----------------
  async function updateEvent() {
    let imageUrl = preview;

    // Upload new image if selected
    if (file) imageUrl = await uploadToCloudinary();

    const res = await fetch(`${API_BASE}/api/admin/events/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify({
        title,
        date,
        location,
        category,
        image: imageUrl,
      }),
    });

    if (!res.ok) {
      alert("Failed to update event");
      return;
    }

    await loadEvents();
    resetForm();
  }

  // ---------------- DELETE EVENT ----------------
  async function deleteEvent(id) {
    if (!confirm("Delete this event?")) return;

    const res = await fetch(`${API_BASE}/api/admin/events/${id}`, {
      method: "DELETE",
      headers: {
        "x-admin-token": ADMIN_TOKEN,
      },
    });

    if (res.ok) {
      setEvents(events.filter((e) => e.id !== id));
    } else {
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
            <button className="btn btn-warning mt-3 me-2" onClick={updateEvent}>
              Update Event
            </button>

            <button className="btn btn-secondary mt-3" onClick={resetForm}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-primary mt-3" onClick={addEvent}>
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
              />
            </div>

            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => startEdit(ev)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteEvent(ev.id)}
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
