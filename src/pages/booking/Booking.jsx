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
    bookingDate,
    startTime,
    endTime,
  } = location.state || {};

  const [totalPrice, setTotalPrice] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const submitBooking = async () => {
      if (!spotId || !vehicleType || !licensePlate || !bookingDate || !startTime || !endTime) {
        alert("Missing booking details.");
        navigate('/');
        return;
      }

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
        alert('Booking failed. Try again.');
        navigate('/');
      }
    };

    submitBooking();
  }, []);

  useEffect(() => {
    if (!bookingId) return;
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setShowSummary(true);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [bookingId]);

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
    <>
      <Navigation />
      <div className="booking-page">
        <div className="booking-content">
          {!showSummary ? (
            <div className="booking-loader">
              <h2>Confirming Booking in</h2>
              <div className="countdown-number">{countdown}</div>
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
              <p><strong>Total Price:</strong> PKR {totalPrice}</p>
              <button onClick={handlePayment}>Proceed to Payment</button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
