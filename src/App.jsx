import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navbar';
import Footer from './components/Footer';
import GoogleSuccess from "./pages/GoogleSuccess"; // adjust path if needed
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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Admin pages
import Dashboard from './admin/Dashboard';
import Bookings from './admin/Booking';
import AdminMessages from './admin/AdminMessages';

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

    const isAdminRoute = location.pathname.startsWith('/admin');
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
        autoClose={400}
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
        // theme="colored"
        style={{ zIndex: 999999 }}
      />

      <ScrollToTop />
    {!isAdminRoute && <Navigation />}
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
          <Route path="/google-success" element={<GoogleSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />                                                                                                                                                                       
         
{/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Routes>
      </AnimatePresence>
        {!isAdminRoute && <Footer />}
        
    </>
  );
};

export default App;
