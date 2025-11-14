export async function uploadToCloudinary(file, preset = "gallery_upload") {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", preset);
  const res = await fetch("https://api.cloudinary.com/v1_1/dsvfhsusq/image/upload", {
    method: "POST",
    body: data
  });
  const json = await res.json();
  if (!json || !json.secure_url) throw new Error("Upload failed");
  return json.secure_url;
}








