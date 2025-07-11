import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaCarSide, FaWifi, FaMobileAlt, FaShieldAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";
import "./Ourfeature.css";

const features = [
  { icon: <FaCarSide />, title: "Easy Parking", text: "Seamless parking experience with real-time availability." },
  { icon: <FaWifi />, title: "Smart Connectivity", text: "Stay connected with our app for instant updates." },
  { icon: <FaMobileAlt />, title: "Mobile Friendly", text: "Book and manage your spot through our app easily." },
  { icon: <FaShieldAlt />, title: "Secure Parking", text: "Monitored and safe parking spots for your peace of mind." },
  { icon: <FaClock />, title: "24/7 Access", text: "Park anytime with our round-the-clock availability." },
  { icon: <FaMoneyBillWave />, title: "Affordable Pricing", text: "Budget-friendly rates for a hassle-free parking experience." }
];

const OurFeature = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <motion.section id="feature" className="our-features-section text-center">


      <Container>
        <motion.h2 
          className="section-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Our Features
        </motion.h2>

        <motion.p 
          className="section-subtitle"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Discover the top features that make our parking system unique.
        </motion.p>

        <Row className="features-container">
          {features.map((feature, index) => (
           <Col lg={4} md={6} sm={12} key={index} className="feature-col mb-4">

              <motion.div 
                className="feature"
                whileHover={{ scale: 1.05, rotateY: 10 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.text}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default OurFeature;
