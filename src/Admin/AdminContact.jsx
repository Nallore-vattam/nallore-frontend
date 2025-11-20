import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminStyles.css";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/contact`);
      setMessages(res.data.sort((a, b) => a.is_read - b.is_read));

    } catch (err) {
      console.error("Error loading contact messages:", err);
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
  const markAsRead = async (id) => {
  try {
    await axios.put(`${API_BASE}/api/contact/read/${id}`);
    fetchMessages();
  } catch (err) {
    console.error("Mark read error:", err);
  }
};

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Contact Messages</h2>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No messages found
              </td>
            </tr>
          ) : (
            messages.map((msg, index) => (
             <tr
                key={msg.id}
                className={!msg.is_read ? "unread-row" : ""}
                onClick={() => markAsRead(msg.id)}>

                <td>
                 {index + 1}
                 {!msg.is_read && <span className="small-red-dot"></span>}
                 </td>

                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.subject}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.created_at).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContact;
