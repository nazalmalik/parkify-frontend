import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking, initiateJazzCashPayment } from '../../api/booking';
import './Booking.css';
import Navigation from '../../components/Navbar.jsx';
import Footer from '../../components/Footer.jsx';


const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    userId,
    spotId,
    vehicleType,
    licensePlate,
    bookingDate, // NEW FIELD (e.g., "2025-06-06")
    startTime,   // (e.g., "14:00")
    endTime,     // (e.g., "16:00")
  } = location.state || {};

  const [totalPrice, setTotalPrice] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const submitBooking = async () => {
      if (!spotId || !vehicleType || !licensePlate || !bookingDate || !startTime || !endTime) {
        alert("Missing booking details.");
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        const res = await createBooking({
          userId,
          spotId,
          vehicleType,
          licensePlate,
          bookingDate,
          startTime,
          endTime,
        });
        setBookingId(res.bookingId);
        setTotalPrice(res.totalPrice);
      } catch (err) {
        alert('Booking failed. Try again.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    submitBooking();
  }, []);

  const handlePayment = async () => {
    try {
      const { url } = await initiateJazzCashPayment(bookingId);
      window.location.href = url;
    } catch (err) {
      alert('JazzCash payment failed. Please try again.');
      console.error(err);
    }
  };

  if (loading || !bookingId) return <p>Processing your booking...</p>;

  return (
    <>
    <Navigation />
    <div className="booking">
      <div className="booking-summary">
        <h2>Booking Summary</h2>
        <p><strong>Spot ID:</strong> {spotId}</p>
        <p><strong>Vehicle Type:</strong> {vehicleType}</p>
        <p><strong>License Plate:</strong> {licensePlate}</p>
        <p><strong>Date:</strong> {new Date(bookingDate).toLocaleDateString()}</p>
        <p><strong>Start Time:</strong> {startTime}</p>
        <p><strong>End Time:</strong> {endTime}</p>
        <p><strong>Total Price:</strong> PKR {totalPrice}</p>

        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
    </div>
     <Footer />
    </>
  );
};

export default Booking;
