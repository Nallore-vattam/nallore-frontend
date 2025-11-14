import React, { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

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
    const res = await fetch(`${API_BASE}/api/team`);
    const data = await res.json();
    setTeam(data);
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

  // ---------------- ADD MEMBER ----------------
  async function addMember() {
    if (!name || !role || !file) {
      alert("Please fill all fields including photo.");
      return;
    }

    const imageUrl = await uploadToCloudinary();

    const res = await fetch(`${API_BASE}/api/admin/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify({
        name,
        role,
        level,
        image: imageUrl,
      }),
    });

    if (!res.ok) return alert("Error adding member");

    await loadTeam();
    resetForm();
  }

  // ---------------- START EDIT ----------------
  function startEdit(member) {
    setEditId(member.id);
    setName(member.name);
    setRole(member.role);
    setLevel(member.level);
    setPreview(member.image);
    setFile(null);
  }

  // ---------------- UPDATE MEMBER ----------------
  async function updateMember() {
    let imageUrl = preview;

    if (file) {
      imageUrl = await uploadToCloudinary();
    }

    const res = await fetch(`${API_BASE}/api/admin/team/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify({
        name,
        role,
        level,
        image: imageUrl,
        description: "",
      }),
    });

    if (!res.ok) return alert("Error updating member");

    await loadTeam();
    resetForm();
  }

  // ---------------- DELETE MEMBER ----------------
  async function deleteMember(id) {
    if (!confirm("Delete this member?")) return;

    const res = await fetch(`${API_BASE}/api/admin/team/${id}`, {
      method: "DELETE",
      headers: { "x-admin-token": ADMIN_TOKEN },
    });

    if (res.ok) {
      setTeam(team.filter((m) => m.id !== id));
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
            <button className="btn btn-warning mt-3 me-2" onClick={updateMember}>
              Update Member
            </button>
            <button className="btn btn-secondary mt-3" onClick={resetForm}>
              Cancel
            </button>
          </>
        ) : (
          <button className="btn btn-success mt-3" onClick={addMember}>
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
                alt=""
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

            <div>
              <button
                className="btn btn-success btn-sm me-2"
                onClick={() => startEdit(member)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteMember(member.id)}
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
