// src/admin/AdminMessages.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './AdminMessages.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact/admin/messages");
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      <Sidebar />
      <div className="admin-messages-container">
        <h2>User Queries</h2>
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          <ul className="message-list">
            {messages.map((msg) => (
              <li key={msg._id} className="message-card">
                <h4>{msg.name} ({msg.email})</h4>
                <p>{msg.message}</p>
                <span className="timestamp">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
