// components/SpotCard.jsx
import React from 'react';
import './SpotCard.css';
import { FaRupeeSign, FaCar, FaMotorcycle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const SpotCard = ({ spot, onReserve }) => {
  const VehicleIcon = spot.vehicleType === 'bike' ? FaMotorcycle : FaCar;
  const StatusIcon = spot.isAvailable ? FaCheckCircle : FaTimesCircle;

  return (
    <div className="spot-card">
      <div className={`status-badge ${spot.isAvailable ? 'available' : 'unavailable'}`}>
        <StatusIcon />
        {spot.isAvailable ? 'Available' : 'Unavailable'}
      </div>

      <div className="spot-id">Spot #{spot.spotId}</div>

      <div className="spot-info">
        <div className="info-line">
          <span className="icon"><VehicleIcon /></span>
          <span>{spot.vehicleType === 'bike' ? 'Bike' : 'Car'}</span>
        </div>
        <div className="info-line">
          <span className="icon">Rs.</span>
          <span> {spot.pricePerHour}</span>
        </div>
      </div>

      <button
        className="reserve-btn"
        disabled={!spot.isAvailable}
        onClick={() => onReserve(spot)}
      >
        Reserve
      </button>
    </div>
  );
};

export default SpotCard;
