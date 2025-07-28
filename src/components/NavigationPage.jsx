import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBooking } from '../api/booking';
import NavigationMap from './NavigationMap';
import { coordinatesToPathD } from '../utils/svgHelpers';
import axiosInstance from '../api/axiosInstance';
import './NavigationPage.css';


const NavigationPage = () => {
  const { bookingId } = useParams();

  const [pathData, setPathData] = useState(null);
  const [pathSteps, setPathSteps] = useState([]);
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [startPoint, setStartPoint] = useState('entrance-1');
  const [endPoint, setEndPoint] = useState('');
  const [vehicleType, setVehicleType] = useState('car'); // Default to car

  useEffect(() => {
    const fetchPath = async () => {
      try {
        // 1. Get booking info
        const booking = await getBooking(bookingId);
        setEndPoint(booking.spotId);
        setVehicleType(booking.vehicleType || 'car');

        // 2. Call navigation API
        const res = await axiosInstance.get('/navigation/path', {
          params: {
            start: startPoint,
            end: booking.spotId,
          },
        });

        const { path: pathArray, distance, coordinates } = res.data;
        setPathSteps(pathArray);
        setDistance(distance);

        // 3. Convert coordinates to SVG path
        const svgD = coordinatesToPathD(coordinates);
        setPathData({
          pathD: svgD,
          coordinates: coordinates,
          destinationNode: booking.spotId,
        });

        setLoading(false);
      } catch (err) {
        console.error('Navigation error:', err);
        setError('Unable to fetch navigation path.');
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchPath();
    } else {
      setError('Missing booking ID in URL.');
      setLoading(false);
    }
  }, [bookingId, startPoint]);

  if (loading) return <div className="status-message">🚗 Loading navigation path...</div>;
  if (error) return <div className="error-message">❌ {error}</div>;

  return (
    <>
  
      <div className="navigation-page">
        <div className="navigation-container">
          <h2>🧭 Navigation to Your Parking Spot</h2>

          <div className="navigation-summary">
            You're moving from <strong>{startPoint}</strong> to <strong>{endPoint}</strong>.
            <br />
            Estimated distance: <strong>{distance} meters</strong>
          </div>

          <div className="path-list">
            <h4>📍 Path Steps:</h4>
            <ul>
              {pathSteps.map((node, index) => (
                <li key={index}>{node}</li>
              ))}
            </ul>
          </div>

          {/* ✅ Pass vehicleType explicitly */}
          {pathData && (
            <NavigationMap pathData={pathData} vehicleType={vehicleType} />
          )}

          <p className="nav-instruction">🗺️ Follow the highlighted path to your parking spot.</p>
        </div>
      </div>

    </>
  );
};

export default NavigationPage;     