import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getBooking, markAsPaid, getQRScanStatus } from '../api/booking';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [qrCode, setQrCode] = useState('');
  const [qrScanned, setQRScanned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const processPaymentSuccess = async () => {
      try {
        const bookingData = await getBooking(bookingId);
        setBooking(bookingData);

        const paymentResponse = await markAsPaid(bookingId);
        setQrCode(paymentResponse.qrCode);

        setLoading(false);
      } catch (err) {
        console.error('Error:', err);
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    };

    if (bookingId) {
      processPaymentSuccess();
    } else {
      setError('Missing booking ID in URL.');
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    if (!bookingId) return;

    const pollQRScan = async () => {
      try {
        const status = await getQRScanStatus(bookingId);
        if (status.qrScanned) {
          setQRScanned(true);
        }
      } catch (err) {
        console.error('Error checking scan status:', err);
      }
    };

    const interval = setInterval(pollQRScan, 3000);
    return () => clearInterval(interval);
  }, [bookingId]);

  // Auto navigate when QR scanned
  useEffect(() => {
    if (qrScanned) {
      navigate(`/navigate/${bookingId}`);
    }
  }, [qrScanned, navigate, bookingId]);

  const {
    spotId,
    vehicleType,
    licensePlate,
    bookingDate,
    startTime,
    endTime,
    totalPrice,
  } = booking || {};

  if (loading) {
    return <div className="status-message">🔄 Processing payment...</div>;
  }

  if (error) {
    return <div className="error-message">❌ {error}</div>;
  }

  return (
    <div className="payment-success-page">
      <main className="payment">
        <div className="payment-success-container">
          <h2>✅ Payment Successful!</h2>

          <div className="booking-info">
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p><strong>Parking Spot:</strong> {spotId}</p>
            <p><strong>Vehicle Type:</strong> {vehicleType}</p>
            <p><strong>License Plate:</strong> {licensePlate}</p>
            <p><strong>Date:</strong> {new Date(bookingDate).toLocaleDateString()}</p>
            <p><strong>Start Time:</strong> {startTime}</p>
            <p><strong>End Time:</strong> {endTime}</p>
            <p><strong>Total Price:</strong> Rs. {totalPrice}</p>
          </div>

          <div className="qr-section">
            <p>📱 Scan this QR Code at the entrance:</p>
            <img src={qrCode} alt="QR Code" className="qr-code" />
          </div>

          {qrScanned ? (
            <p className="navigation-starting-message">🚗 Starting Navigation...</p>
          ) : (
            <p className="waiting-message">⌛ Waiting for Approval from admin...</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;
