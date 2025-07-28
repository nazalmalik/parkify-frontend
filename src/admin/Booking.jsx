import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import './Booking.css';
import { toast } from 'react-toastify';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 30;
  const prevBookingIds = useRef(new Set());

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/bookings/admin/bookings');
      const data = res.data;

      const preferredBookingMap = new Map();
      data.forEach((booking) => {
        const existing = preferredBookingMap.get(booking.bookingId);

        if (!existing) {
          preferredBookingMap.set(booking.bookingId, booking);
        } else if (!existing.isPaid && booking.isPaid) {
          preferredBookingMap.set(booking.bookingId, booking);
        } else if (existing.isPaid === booking.isPaid) {
          const existingDate = new Date(existing.createdAt);
          const newDate = new Date(booking.createdAt);
          if (newDate > existingDate) {
            preferredBookingMap.set(booking.bookingId, booking);
          }
        }
      });

      const uniqueBookings = Array.from(preferredBookingMap.values()).sort(
        (a, b) => new Date(b.createdAt || b._id) - new Date(a.createdAt || a._id)
      );

      const paidBookings = uniqueBookings.filter((b) => b.isPaid); // ✅ only paid

      const newIds = new Set(paidBookings.map((b) => b.bookingId));
      const newBookingsCount = [...newIds].filter((id) => !prevBookingIds.current.has(id)).length;

      if (prevBookingIds.current.size && newBookingsCount > 0) {
        toast.info('🆕 New paid booking received!');
      }

      prevBookingIds.current = newIds;

      setBookings(paidBookings); // ✅ set paid bookings only
    } catch (error) {
      toast.error('❌ Error fetching bookings');
      console.error('Error fetching bookings:', error);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await axios.post(`http://localhost:5000/api/bookings/${bookingId}/approve`);
      toast.success('✅ Booking approved!');
      fetchBookings();
    } catch (error) {
      toast.error('❌ Failed to approve booking');
      console.error('Approval error:', error);
    }
  };

  const handleDelete = async (bookingId) => {
    const confirm = window.confirm('Are you sure you want to delete this booking?');
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/admin/bookings/${bookingId}`);
      toast.warn('🗑️ Booking deleted');
      fetchBookings();
    } catch (error) {
      toast.error('❌ Failed to delete booking');
      console.error('Delete error:', error);
    }
  };

  const indexOfLast = currentPage * bookingsPerPage;
  const indexOfFirst = indexOfLast - bookingsPerPage;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getRateByVehicleType = (type) => {
    if (type === 'bike') return 50;
    if (type === 'car') return 90;
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

  return (
    <div className="bookings-page">
      <Sidebar />
      <div className="bookings-content">
        <h2>📑 Paid Bookings</h2>

        {bookings.length === 0 ? (
          <p>No paid bookings found.</p>
        ) : (
          <>
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Spot</th>
                  <th>Vehicle No</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Rate</th>
                  <th>Total Price</th>
                  <th>Paid</th>
                  <th>Approved</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((booking, idx) => {
                  const rate = getRateByVehicleType(booking.vehicleType);
                  const totalPrice = calculateTotalPrice(booking.startTime, booking.endTime, rate);

                  return (
                    <tr key={booking._id}>
                      <td>{indexOfFirst + idx + 1}</td>
                      <td>{booking.userId}</td>
                      <td>{booking.spotId}</td>
                      <td>{booking.licensePlate}</td>
                      <td>{booking.bookingDate?.slice(0, 10)}</td>
                      <td>{booking.startTime} - {booking.endTime}</td>
                      <td>Rs.{rate}</td>
                      <td>Rs.{totalPrice}</td>
                      <td>{booking.isPaid ? 'Yes' : 'No'}</td>
                      <td>{booking.qrScanned ? '✅' : '❌'}</td>
                      <td>
                        {booking.isPaid && !booking.qrScanned && (
                          <button className="action-btn" onClick={() => handleApprove(booking.bookingId)}>Approve</button>
                        )}
                        <button className="action-btn delete-btn" onClick={() => handleDelete(booking.bookingId)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="pagination-container">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Bookings;
