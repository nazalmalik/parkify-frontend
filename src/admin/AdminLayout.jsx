// src/admin/AdminLayout.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [hasNewBooking, setHasNewBooking] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const prevBookingIds = useRef(new Set());
  const prevMessageIds = useRef(new Set());

  useEffect(() => {
    fetchUpdates();
    const interval = setInterval(fetchUpdates, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location.pathname === "/admin/bookings") {
      setHasNewBooking(false);
    }
    if (location.pathname === "/admin/messages") {
      setHasNewMessage(false);
    }
  }, [location.pathname]);

  const fetchUpdates = async () => {
    try {
      // BOOKINGS
      const bookingsRes = await axios.get('https://parkify-backend-six.vercel.app/api/bookings/admin/bookings');
      const paid = bookingsRes.data.filter((b) => b.isPaid);
      const currentBookingIds = new Set(paid.map(b => b.bookingId));
      const newBookings = [...currentBookingIds].filter(id => !prevBookingIds.current.has(id));

      if (prevBookingIds.current.size && newBookings.length > 0) {
        if (location.pathname !== "/admin/bookings") {
          setHasNewBooking(true);
          toast.info('🆕 New paid booking!');
        }
      }

      prevBookingIds.current = currentBookingIds;

      // MESSAGES
      const messagesRes = await axios.get('https://parkify-backend-six.vercel.app/api/contact/admin/messages');
      const currentMessageIds = new Set(messagesRes.data.map(m => m._id));
      const newMessages = [...currentMessageIds].filter(id => !prevMessageIds.current.has(id));

      if (prevMessageIds.current.size && newMessages.length > 0) {
        if (location.pathname !== "/admin/messages") {
          setHasNewMessage(true);
          toast.info('📩 New user message!');
        }
      }

      prevMessageIds.current = currentMessageIds;

    } catch (error) {
      console.error("Polling error:", error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar
        hasNewBooking={hasNewBooking}
        hasNewMessage={hasNewMessage}
        clearBookingDot={() => setHasNewBooking(false)}
        clearMessageDot={() => setHasNewMessage(false)}
      />
      <div style={{ marginLeft: '220px', padding: '20px', flex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
