import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./AdminContact.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [lastSeen, setLastSeen] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/contact`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error loading messages:", err);
    }
  };

  const markAllRead = async () => {
    try {
      const res = await axios.put(`${API_BASE}/api/contact/mark-all-read`);
      setLastSeen(res.data.read_at);
    } catch (err) {
      console.error("Mark all read error:", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API_BASE}/api/contact/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Export to Excel
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(messages);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Messages");
    XLSX.writeFile(wb, "Contact-Messages.xlsx");
  };

  useEffect(() => {
  const init = async () => {
    await fetchMessages();   
    await markAllRead();    
  };

  init();
}, []);


  const unread = messages.filter(m => !m.is_read);
  const read = messages.filter(m => m.is_read);

  return (
    <div className="contact-table-wrapper mt-4">

      {/* Top Section */}
      <div className="header-row">
        <h2 className="contact-table-title">Contact Messages</h2>

        <button className="btn-download" onClick={downloadExcel}>
          ⬇ Download Excel
        </button>
      </div>

      {/* Unread Table */}
      <h4 className="section-heading">📩 Unread Messages ({unread.length})</h4>
      <div className="table-responsive">
        <table className="contact-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Message</th><th>Date</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unread.length === 0 ? (
              <tr><td colSpan="8" className="no-messages">No unread messages</td></tr>
            ) : unread.map((msg, i) => (
              <tr key={msg.id} className="unread-row">
                <td>{i + 1} <span className="small-red-dot"></span></td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.created_at).toLocaleString()}</td>
                <td><button className="btn-delete" onClick={() => deleteMessage(msg.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Last Seen Display */}
      {lastSeen && (
        <p className="last-seen">🕒 Last visited: {new Date(lastSeen).toLocaleString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
})}
</p>
      )}

      {/* Read Table */}
      <h4 className="section-heading">📬 Read Messages ({read.length})</h4>
      <div className="table-responsive">
        <table className="contact-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th><th>Phone</th><th>Subject</th><th>Message</th><th>Date</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {read.length === 0 ? (
              <tr><td colSpan="8" className="no-messages">No read messages</td></tr>
            ) : read.map((msg, i) => (
              <tr key={msg.id}>
                <td>{i + 1}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>
               <td>
  {new Date(msg.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })},{" "}
  {new Date(msg.created_at).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })}
</td>

                <td><button className="btn-delete" onClick={() => deleteMessage(msg.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminContact;
