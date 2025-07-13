import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking, createStripeSession } from '../../api/booking';
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if booking details are missing (e.g. direct access)
    if (!spotId || !vehicleType || !licensePlate || !bookingDate || !startTime || !endTime) {
      alert("Missing booking details. Redirecting to home.");
      navigate('/');
      return;
    }

    const submitBooking = async () => {
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
        console.error('Booking failed:', err);
        alert('Booking failed. Please try again.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    submitBooking();
  }, [userId, spotId, vehicleType, licensePlate, bookingDate, startTime, endTime, navigate]);

  const handlePayment = async () => {
    try {
      const { sessionUrl } = await createStripeSession(bookingId);
      window.location.href = sessionUrl;
    } catch (err) {
      console.error('Stripe session error:', err);
      alert('Stripe payment session could not be created. Please try again later.');
    }
  };

  if (loading) return <p>Processing your booking...</p>;

  if (!bookingId || totalPrice === null) return <p>Loading booking summary...</p>;

  return (
    <div className="booking">
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
    </div>
  );
};

export default Booking; 
