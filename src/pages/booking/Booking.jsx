// src/pages/Booking/Booking.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking,  initiateJazzCashPayment } from '../../api/booking';
import './Booking.css';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    userId,
    spotId,
    vehicleType,
    licensePlate,
    bookingDate,
    startTime,
    endTime,
  } = location.state || {};

  const [totalPrice, setTotalPrice] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!spotId || !vehicleType || !licensePlate || !bookingDate || !startTime || !endTime) {
      alert("Missing booking details. Redirecting to home.");
      navigate('/');
      return;
    }

    const submitBooking = async () => {
      try {
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
        console.error('Booking failed:', err);
        alert('Booking failed. Please try again.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    submitBooking();
  }, [userId, spotId, vehicleType, licensePlate, bookingDate, startTime, endTime, navigate]);

  useEffect(() => {
    if (loading || countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, loading]);

    const handlePayment = async () => {
    try {
      const { url } = await initiateJazzCashPayment(bookingId);
      window.location.href = url;
    } catch (err) {
      alert('JazzCash payment failed. Please try again.');
      console.error(err);
    }
  }; 

  return (
    <div className="booking-page">

      <div className="booking-content">
        {loading || countdown > 0 ? (
          <div className="booking-loader">
            <h2>🕒 Confirming Booking in</h2>
            <h1 className="countdown-number">{countdown}</h1>
          </div>
        ) : !bookingId || totalPrice === null ? (
          <div className="booking-loader">
            <p>Loading booking summary...</p>
          </div>
        ) : (
          <div className="booking-summary">
            <h2>Booking Summary</h2>
            <p><strong>Spot ID:</strong> {spotId}</p>
            <p><strong>Vehicle Type:</strong> {vehicleType}</p>
            <p><strong>License Plate:</strong> {licensePlate}</p>
            <p><strong>Date:</strong> {new Date(bookingDate).toLocaleDateString()}</p>
            <p><strong>Start Time:</strong> {startTime}</p>
            <p><strong>End Time:</strong> {endTime}</p>
            <p><strong>Total Price:</strong> Rs.{totalPrice}</p>

            <button onClick={handlePayment}>Proceed to Payment</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking; 
