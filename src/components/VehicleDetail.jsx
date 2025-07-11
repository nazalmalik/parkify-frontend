import React from 'react';
import { useNavigate } from 'react-router-dom';
import './VehicleDetail.css';

const VehicleDetail = () => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    localStorage.setItem('vehicleType', type);
    navigate('/available1');
  };

  return (
    <div className="vehicle-detail-container">
      <div className="vehicle-card">
        <h2>Choose Your Ride</h2>
        <p>Select the type of vehicle you're parking today.</p>

        <div className="vehicle-options">
          <button className="vehicle-button carr" onClick={() => handleSelect('car')}>
            🚗 Car
          </button>
          <button className="vehicle-button bike" onClick={() => handleSelect('bike')}>
            🏍️ Bike
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;
