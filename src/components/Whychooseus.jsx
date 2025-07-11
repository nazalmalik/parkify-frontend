import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaClock, FaGasPump, FaMoneyBillWave, FaShieldAlt, FaThumbsUp } from "react-icons/fa";
import "./Whychooseus.css";

const benefits = [
  { icon: <FaClock />, title: "Save Time", text: "Book in advance and avoid searching for parking." },
  { icon: <FaGasPump />, title: "Optimize Fuel", text: "Reduce fuel wastage with smart navigation." },
  { icon: <FaMoneyBillWave />, title: "Budget Friendly", text: "Affordable rates with efficient parking management." },
  { icon: <FaShieldAlt />, title: "Secure Parking", text: "Safe and monitored parking spots for peace of mind." },
  { icon: <FaThumbsUp />, title: "User-Friendly", text: "Easy-to-use interface for a smooth experience." }
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <motion.section ref={sectionRef} className="why-choose-us-section">
      <Container>
        <motion.h2 
          className="section-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us?
        </motion.h2>

        <motion.p 
          className="section-subtitle"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          Experience the best smart parking system with these advantages.
        </motion.p>

        <Row className="benefits-container">
          {benefits.map((benefit, index) => (
            <Col lg={4} md={6} sm={12} key={index} className="benefit-col mb-4">
              <motion.div 
                className="benefit"
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h4>{benefit.title}</h4>
                <p>{benefit.text}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
};

export default WhyChooseUs;
