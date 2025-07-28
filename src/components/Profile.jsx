import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { FaUser, FaEnvelope, FaPhone, FaCar, FaIdBadge } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileAndBookings = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const userRes = await axios.get("http://localhost:5000/api/auth/profile", { headers });
        setUser(userRes.data);

        const bookingsRes = await axios.get("http://localhost:5000/api/bookings/my-bookings", { headers });
        setBookings(bookingsRes.data);
      } catch (error) {
        console.error("Error fetching profile or bookings:", error);
      }
    };

    if (token) {
      fetchProfileAndBookings();
    }
  }, [token]);

  const paidBookings = bookings.filter(booking => booking.isPaid); // ✅ Only keep paid bookings

  return (
    <div className="profile-wrapper">
      <h2 className="profile-title"> 👤 My Profile</h2>

      {user ? (
        <div className="user-card">
          <p><FaUser /> <strong>Name:</strong> {user.name}</p>
          <p><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
          <p><FaPhone /> <strong>Phone Number:</strong> {user.phoneNumber}</p>
          <p><FaCar /> <strong>Vehicle Number:</strong> {user.vehicleNumber}</p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}

      <h3 className="profile-title"> 📜 My Bookings</h3>
      {paidBookings.length > 0 ? (
        <div className="bookings-list">
          {paidBookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <p><strong>Spot:</strong> {booking.spotId?.name || booking.spotId || "N/A"}</p>
              <p><strong>Date:</strong> {new Date(booking.bookingDate).toDateString()}</p>
              <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
              <p><strong>Vehicle:</strong> {booking.vehicleType} ({booking.licensePlate})</p>
              <p><strong>Total:</strong> ${booking.totalPrice}</p>
              <span className="status-badge status-paid">Paid</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No paid bookings found.</p>
      )}
    </div>
  );
};

export default Profile;
