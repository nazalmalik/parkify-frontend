import React, { useEffect, useState } from 'react';
import { fetchAvailableSpots } from '../api/spot.js';
import SpotCard from './SpotCard.jsx';
import BookingModal from './BookingModal.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // ✅ Toastify import

const AvailableSpots = ({ vehicleType }) => {
  const user = JSON.parse(localStorage.getItem("User"));
  const userId = user._id;
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSpots = async () => {
      try {
        setLoading(true);
        const data = await fetchAvailableSpots(vehicleType);
        setSpots(data);
      } catch (err) {
        toast.error('Error fetching spots'); // ✅ Show error as toast
      } finally {
        setLoading(false);
      }
    };

    if (vehicleType) {
      loadSpots();
    }
  }, [vehicleType]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px',
  };

  if (loading) return <p>Loading spots...</p>;
  if (!spots.length) return <p>No available spots for {vehicleType}</p>;

  return (
    <div>
      <div style={gridStyle}>
        {spots.map((spot) => {
          const pricePerHour = spot.vehicleType === 'car' ? 90 : 50;
          return (
            <SpotCard
              key={spot._id}
              spot={{ ...spot, pricePerHour }}
              onReserve={() => setSelectedSpot(spot)}
            />
          );
        })}
      </div>

      {selectedSpot && (
        <BookingModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
          onConfirm={(details) => {
            console.log("Navigating to booking with:", {
              userId,
              spotId: selectedSpot.spotId,
              vehicleType,
              ...details,
            });

            navigate('/booking', {
              state: {
                userId,
                spotId: selectedSpot.spotId,
                vehicleType,
                ...details,
              },
            });
          }}
        />
      )}
    </div>
  );
};

export default AvailableSpots;
