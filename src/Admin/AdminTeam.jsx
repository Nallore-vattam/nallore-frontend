import React, { useEffect, useState } from "react";
import "./AdminStyles.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function AdminTeam() {
  const [team, setTeam] = useState([]);

  // Form fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [level, setLevel] = useState("state");

  // Image
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Edit state
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadTeam();
  }, []);

  async function loadTeam() {
    try {
      const res = await fetch(`${API_BASE}/api/team`);
      const data = await res.json();
      setTeam(data || []);
    } catch (err) {
      console.error("LOAD TEAM ERROR:", err);
    }
  }

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
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

  // ---------------- ADD MEMBER ----------------
  async function addMember() {
    if (!name || !role || !file) {
      alert("Please fill all fields including photo.");
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary();
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/admin/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          name,
          role,
          level,
          image: imageUrl,
        }),
      });

      if (!res.ok) throw new Error("Add member failed");

      await loadTeam();
      resetForm();
    } catch (err) {
      console.error("ADD MEMBER ERROR:", err);
      alert("Error adding member");
    }
  }

  // ---------------- START EDIT ----------------
  function startEdit(member) {
    setEditId(member.id);
    setName(member.name || "");
    setRole(member.role || "");
    setLevel(member.level || "state");
    setPreview(member.image || null);
    setFile(null);
  }

  // ---------------- UPDATE MEMBER ----------------
  async function updateMember() {
    try {
      let imageUrl = preview;
      const token = localStorage.getItem("adminToken");

      if (file) {
        imageUrl = await uploadToCloudinary();
      }

      const res = await fetch(`${API_BASE}/api/admin/team/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          name,
          role,
          level,
          image: imageUrl,
          description: "",
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      await loadTeam();
      resetForm();
    } catch (err) {
      console.error("UPDATE MEMBER ERROR:", err);
      alert("Error updating member");
    }
  }

  // ---------------- DELETE MEMBER ----------------
  async function deleteMember(id) {
    if (!confirm("Delete this member?")) return;
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${API_BASE}/api/admin/team/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-token": token,
        },
      });

      if (!res.ok) throw new Error("Delete failed");

      setTeam((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("DELETE MEMBER ERROR:", err);
      alert("Error deleting member");
    }
  }

  // ---------------- RESET FORM ----------------
  function resetForm() {
    setName("");
    setRole("");
    setLevel("state");
    setFile(null);
    setPreview(null);
    setEditId(null);
  }

  return (
    <div>
      <h2 className="fw-bold mb-4">Manage Team</h2>

      {/* FORM */}
      <div className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <select
          className="form-control mb-2"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="state">State Coordinator</option>
          <option value="advisor">Advisor</option>
          <option value="zonal">Zonal Coordinator</option>
          <option value="domain">Domain Admin</option>
          <option value="district">District Coordinator</option>
        </select>

        <label>Select Image</label>
        <input type="file" className="form-control" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "10px",
              objectFit: "cover",
              marginTop: "10px",
            }}
          />
        )}

        {/* Buttons */}
        {editId ? (
          <>
            <button className="admin-btn admin-btn-warning mt-3 me-2" onClick={updateMember}>
              Update Member
            </button>
            <button className="admin-btn admin-btn-secondary mt-3" onClick={resetForm}>
              Cancel
            </button>
          </>
        ) : (
          <button className="admin-btn admin-btn-success mt-3" onClick={addMember}>
            Add Member
          </button>
        )}
      </div>

      {/* TEAM LIST */}
      <h4 className="mt-4">Team Members</h4>

      <ul className="list-group">
        {team.map((member) => (
          <li
            key={member.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div className="d-flex align-items-center">
              <img
                src={member.image}
                alt={member.name || ""}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "10px",
                  objectFit: "cover",
                }}
              />

              <div>
                <strong>{member.name}</strong> <br />
                <span className="text-muted">{member.role}</span> <br />
                <span className="badge bg-primary">{member.level}</span>
              </div>
            </div>

            <div className="admin-actions">
              <button
                type="button"
                className="admin-icon-btn edit-btn"
                onClick={() => startEdit(member)}
                title={`Edit ${member.name}`}
                aria-label={`Edit ${member.name}`}
              >
                <i className="bi bi-pencil-fill" />
              </button>

              <button
                type="button"
                className="admin-icon-btn delete-btn"
                onClick={() => deleteMember(member.id)}
                title={`Delete ${member.name}`}
                aria-label={`Delete ${member.name}`}
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
