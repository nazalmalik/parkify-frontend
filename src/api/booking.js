import axiosInstance from './axiosInstance.js';

export const createBooking = async (bookingData) => {
  const res = await axiosInstance.post('/bookings/book', bookingData);
  return res.data;
};

export const createStripeSession = async (bookingId) => {
  const res = await axiosInstance.post('/bookings/stripe', { bookingId });
  return res.data;
};

export const markAsPaid = async (bookingId) => {
  const res = await axiosInstance.post('/bookings/paid', { bookingId });
  return res.data;
};

export const getBooking = async (bookingId) => {
  const res = await axiosInstance.get(`/bookings/${bookingId}`);
  return res.data;
};

// NEW: Check if the QR has been scanned
export const getQRScanStatus = async (bookingId) => {
  const res = await axiosInstance.get(`/bookings/${bookingId}/scan-status`);
  return res.data;
};
