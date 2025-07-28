import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './dashboard.css';
import {
  FaClipboardList,
  FaUsers,
  FaUserShield,
  FaCoins,
  FaClock,
  FaMotorcycle,
  FaCarSide
} from 'react-icons/fa';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [carCount, setCarCount] = useState(0);
  const [bikeCount, setBikeCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/admin/bookings');
      const allBookings = res.data;

      // Filter only paid bookings
      const paidBookings = allBookings.filter(booking => booking.isPaid);

      setBookings(paidBookings);
      calculateStats(paidBookings); // Pass only paid bookings to stats
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };


  const getRateByVehicleType = (type) => {
    if (type === 'bike') return 10;
    if (type === 'car') return 20;
    return 0;
  };

  const calculateTotalPrice = (startTime, endTime, rate) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const start = startHour + startMinute / 60;
    const end = endHour + endMinute / 60;
    const duration = Math.max(1, end - start);
    return Math.round(duration * rate);
  };

  const calculateStats = (data) => {
    let revenue = 0;
    let cars = 0;
    let bikes = 0;
    const userSet = new Set();

    data.forEach((booking) => {
      const rate = getRateByVehicleType(booking.vehicleType);
      const price = calculateTotalPrice(booking.startTime, booking.endTime, rate);

      if (booking.isPaid) {
        revenue += price;
      }

      if (booking.vehicleType === 'car') cars++;
      if (booking.vehicleType === 'bike') bikes++;

      userSet.add(booking.userId);
    });

    setTotalRevenue(revenue);
    setCarCount(cars);
    setBikeCount(bikes);
    setActiveUsers(userSet.size);
  };

  return (
    <div className="admin-dashboard-wrapper">
      <Sidebar />
      <div className="admin-dashboard-card">
        {/* Header */}
        <div className="admin-header">
          <FaUserShield className="admin-avatar" />
          <div>
            <h2>Welcome, Admin 👋</h2>
            <p className="admin-sub">Smart Parking Management Dashboard</p>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <FaClipboardList className="stat-icon" />
            <div>
              <p className="stat-label">Total Bookings</p>
              <h3 className="stat-value">{bookings.length}</h3>
            </div>
          </div>

          <div className="stat-card">
            <FaUsers className="stat-icon" />
            <div>
              <p className="stat-label">Active Users</p>
              <h3 className="stat-value">{activeUsers}</h3>
            </div>
          </div>

          <div className="stat-card">
            <FaCoins className="stat-icon" />
            <div>
              <p className="stat-label">Total Revenue</p>
              <h3 className="stat-value">PKR {totalRevenue}</h3>
            </div>
          </div>

          <div className="stat-card">
            <FaClock className="stat-icon" />
            <div>
              <p className="stat-label">System Uptime</p>
              <h3 className="stat-value">99.9%</h3>
            </div>
          </div>

          <div className="stat-card">
            <FaCarSide className="stat-icon" />
            <div>
              <p className="stat-label">Total Car Slots</p>
              <h3 className="stat-value">40</h3>
            </div>
          </div>

          <div className="stat-card">
            <FaMotorcycle className="stat-icon" />
            <div>
              <p className="stat-label">Total Bike Slots</p>
              <h3 className="stat-value">30</h3>
            </div>
          </div>

          <div className="stat-card">
            <FaCarSide className="stat-icon" />
            <div>
              <p className="stat-label">Booked Car Slots</p>
              <h3 className="stat-value">{carCount}</h3>
            </div>
          </div>

          <div className="stat-card">
            <FaMotorcycle className="stat-icon" />
            <div>
              <p className="stat-label">Booked Bike Slots</p>
              <h3 className="stat-value">{bikeCount}</h3>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Link to="/admin/bookings" className="admin-btn">
          Go to Bookings Panel
        </Link>

        {/* Footer */}
        <div className="admin-footer">
          <p><strong>System:</strong> Smart Parking Management</p>
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Last Updated:</strong> June 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;