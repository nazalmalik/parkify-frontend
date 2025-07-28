// src/admin/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaListAlt, FaSignOutAlt, FaInfoCircle 
} from 'react-icons/fa';
import { toast } from 'react-toastify'; // ✅ Toastify import
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Admin logout successful!"); // ✅ Toast shown

    setTimeout(() => {
      navigate('/authpage');
    }, 500); // Optional: short delay for toast to display
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>

      <ul className="sidebar-nav">
        <li>
          <Link 
            to="/admin/dashboard" 
            className={`sidebar-link ${location.pathname === "/admin/dashboard" ? "active" : ""}`}
          >
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/bookings" 
            className={`sidebar-link ${location.pathname === "/admin/bookings" ? "active" : ""}`}
          >
            <FaListAlt /> All Bookings
          </Link>
        </li>
        <li>
          <Link 
            to="/admin/messages" 
            className={`sidebar-link ${location.pathname === "/admin/messages" ? "active" : ""}`}
          >
            <FaInfoCircle /> User Messages
          </Link>
        </li>
      </ul>

      <div className="sidebar-footer">
        <div className="sidebar-info">
          <FaInfoCircle style={{ marginRight: '6px' }} />
          <span>v1.0.0</span>
        </div>

        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt style={{ marginRight: '8px' }} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
