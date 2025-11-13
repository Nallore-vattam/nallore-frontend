import React, { useState, useEffect } from "react";

const AdminGalleryUpload = () => {
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    file: null,
    title: "",
    category_key: "",
  });

  // Change this to match your ADMIN_TOKEN from backend `.env
const ADMIN_TOKEN = "anythingStrong123";

  useEffect(() => {
    fetch("/api/gallery/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.filter((c) => c.key !== "all")));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    setPreview(URL.createObjectURL(file));
  };

  async function uploadToCloudinary() {
    const data = new FormData();
    data.append("file", form.file);
   data.append("upload_preset", "gallery_upload");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dsvfhsusq/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();
    return json.secure_url;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.file || !form.title || !form.category_key) {
      alert("Please fill all fields");
      return;
    }

    const imageUrl = await uploadToCloudinary();

    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": ADMIN_TOKEN,
      },
      body: JSON.stringify({
        src: imageUrl,
        title: form.title,
        category_key: form.category_key,
      }),
    });

    if (response.ok) {
      alert("✅ Image Uploaded Successfully");
      setForm({ file: null, title: "", category_key: "" });
      setPreview(null);
    } else {
      alert("❌ Upload failed");
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "450px" }}>
      <h2>Upload New Gallery Image</h2>

      <form onSubmit={handleSubmit}>
        <label>Choose Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", borderRadius: "8px", marginTop: "10px" }}
          />
        )}

        <label style={{ marginTop: "10px" }}>Title</label>
        <input
          className="form-control"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label style={{ marginTop: "10px" }}>Category</label>
        <select
          className="form-control"
          value={form.category_key}
          onChange={(e) => setForm({ ...form, category_key: e.target.value })}
        >
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c.key} value={c.key}>
              {c.title}
            </option>
          ))}
        </select>

        <button className="btn btn-success mt-3" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default AdminGalleryUpload;
