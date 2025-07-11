import React from "react";
import { motion } from "framer-motion";
import { FaParking, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";
import "./Aboutfeatures.css";

const Features = () => {
  return (
    <motion.section
      className="features-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2 className="section-heading features-title">
        Experience the Future of Parking
      </motion.h2>
      <div className="features-card-grid">
        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="feature-icon">
            <FaParking />
          </div>
          <h3>Easy & Quick Reservations</h3>
          {/* <p>
            Reserve your parking spot before you arrive with just a few taps.
            No more driving in circles—arrive and park effortlessly.
          </p> */}
        </motion.div>

        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="feature-icon">
            <FaShieldAlt />
          </div>
          <h3>Secure & Monitored Parking</h3>
          {/* <p>
            Your car's safety is our priority. Our system uses advanced
            monitoring to ensure every spot is secure.
          </p> */}
        </motion.div>

        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="feature-icon">
            <FaClock />
          </div>
          <h3>24/7 <br/>Accessibility</h3>
          {/* <p>
            Whether it's day or night, our parking system is always available,
            allowing you to park at your convenience.
          </p> */}
        </motion.div>

        <motion.div className="feature-card" whileHover={{ scale: 1.05 }}>
          <div className="feature-icon">
            <FaUsers />
          </div>
          <h3>User-Friendly Interface</h3>
          {/* <p>
            The Smart Parking system is intuitive and easy to use, making
            parking stress-free for everyone, no matter their tech-savviness.
          </p> */}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Features;
