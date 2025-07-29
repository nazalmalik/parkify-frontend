import React, { useState, useEffect } from 'react';
import AvailableSpots from '../../components/AvailableSpots.jsx';
import './Available.css';


const AvailableBookingPage = () => {
  const [vehicleType, setVehicleType] = useState(null);

  useEffect(() => {
    const storedType = localStorage.getItem('vehicleType');
    if (storedType) {
      setVehicleType(storedType);
    } else {
      setVehicleType('car'); // fallback
    }
  }, []);

  if (!vehicleType) return <p>Loading vehicle type...</p>;

  return (
    <>
    
      <div className="available-booking-container">
        <h1>Available Parking Spots</h1>

        {/* Toggle Buttons Instead of Dropdown */}
        <div className="vehicle-toggle-group">
          <span className="vehicle-toggle-label">Select Vehicle Type:</span>
          <div className="vehicle-toggle-buttons">
            <button
              className={`vehicle-btn ${vehicleType === 'car' ? 'active' : ''}`}
              onClick={() => {
                setVehicleType('car');
                localStorage.setItem('vehicleType', 'car');
              }}
            >
              🚗 Car
            </button>
            <button
              className={`vehicle-btn ${vehicleType === 'bike' ? 'active' : ''}`}
              onClick={() => {
                setVehicleType('bike');
                localStorage.setItem('vehicleType', 'bike');
              }}
            >
              🏍️ Bike
            </button>
          </div>
        </div>

        <AvailableSpots vehicleType={vehicleType} />
      </div>
   
    </>
  );
};

export default AvailableBookingPage;
