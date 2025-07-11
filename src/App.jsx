import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navbar';
import Footer from './components/Footer';
// Pages
import Home from './pages/Home';
import Howitworks from './pages/Howitworks';
import Pricing from './pages/Pricing';
import Aboutus from './pages/Aboutus';
import Contact from './pages/Contact';
import Loginsignup from "./pages/Loginsignup";
import Terms from './pages/Terms';
import IndexPage from './pages/booking/Index';
import AvailablePage from './pages/booking/Available';
import BookingPage from './pages/booking/Booking';
import PaymentSuccess from './components/PaymentSuccess';
import NavigationPage from './components/NavigationPage';
import MyProfile from './pages/MyProfile';

// Admin pages
import Dashboard from './admin/Dashboard';
import Bookings from './admin/Booking';

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {/* ✅ ToastContainer outside AnimatePresence to stay mounted */}
      <ToastContainer
        position="top-right"
        autoClose={1200}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        // theme="colored"
        style={{ zIndex: 999999 }}
      />

      <ScrollToTop />
  <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>

          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<Howitworks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about-us" element={<Aboutus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/authpage" element={<Loginsignup />} />
          <Route path="/index" element={<IndexPage />} />
          <Route path="/available1" element={<AvailablePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/navigate/:bookingId" element={<NavigationPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/profile" element={<MyProfile />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/bookings" element={<Bookings />} />

        </Routes>
      </AnimatePresence>
       <Footer />
    </>
  );
};

export default App;
