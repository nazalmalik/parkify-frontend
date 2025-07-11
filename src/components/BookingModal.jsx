import React, { useState } from 'react';
import { toast } from 'react-toastify'; // ✅ Toast import
import './BookingModal.css'; // Optional for styling

const BookingModal = ({ spot, onConfirm, onClose }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handleSubmit = () => {
    if (!bookingDate || !startTime || !endTime || !licensePlate) {
      toast.error('Please fill all fields'); // ✅ Show toast error instead of alert
      return;
    }

    toast.success('Booking confirmed!'); // ✅ Booking success toast

    onConfirm({
      bookingDate,
      startTime,
      endTime,
      licensePlate,
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h2>Book Spot {spot.spotId}</h2>

        <label>License Plate:</label>
        <input
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          placeholder="ABC-123"
        />

        <label>Booking Date:</label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
        />

        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />

        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />

        <div className="button-group">
          <button onClick={handleSubmit}>Confirm Booking</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
