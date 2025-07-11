import { useState } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import "./Herosection.css"

const Herosection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }
  const navigate = useNavigate()

  const handleBookNow = () => {
    const user = localStorage.getItem("User"); // assuming you save user info as JSON string
    if (user) {
      navigate("/index");  // user is logged in
    } else {
      navigate("/authpage");            // user is not logged in
    }
  };


  return (
    <>
      {/* Hero Section */}
      <section className="modern-hero">
        <div className="hero-overlay"></div>

        <div className="container-fluid h-100">
          <Row className="h-100 align-items-center">
            <Col lg={6} className="text-white text-start">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="hero-content-left">
                <motion.h1 variants={itemVariants} className="modern-hero-title">
                  Park Smarter, <br />
                  <span className="text-warning">Not Harder</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="modern-hero-subtitle">
                  Find, reserve, and pay for parking spots in real time with our innovative smart parking platform. Save
                  time and eliminate parking stress.
                </motion.p>

                <motion.div variants={itemVariants} className="d-flex">
                  <Button onClick={handleBookNow} variant="warning" size="lg" className="modern-hero-btn">
                    Book Now
                  </Button>

                </motion.div>

                <motion.div variants={itemVariants} className="stats-container mt-5">
                  <div className="stat-item">
                    <h3>10+</h3>
                    <p>Parking Locations</p>
                  </div>
                  <div className="stat-item">
                    <h3>100+</h3>
                    <p>Happy Users</p>
                  </div>
                  <div className="stat-item">
                    <h3>99%</h3>
                    <p>Satisfaction Rate</p>
                  </div>
                </motion.div>
              </motion.div>
            </Col>

            <Col lg={6} className="d-none d-lg-flex justify-content-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="hero-image-container"
              >
                <div className="phone-mockup">
                  <div className="phone-screen">
                    <div className="map-container">
                      <div className="map-header">
                        <div className="map-search">
                          <div className="search-icon">🔍</div>
                          <div className="search-text">Find parking near me</div>
                        </div>
                      </div>
                      <div className="map-content">
                        <img
                          src="https://hammersmithbroadway.co.uk/wp-content/uploads/2018/07/hammersmith-store-map.png"
                          alt="Map Location"
                          className="map-image"
                        />
                        <div className="map-pin pin-1">
                          <div className="pin-icon">P</div>
                          <div className="pin-pulse"></div>
                        </div>
                        <div className="map-pin pin-2">
                          <div className="pin-icon">P</div>
                          <div className="pin-pulse"></div>
                        </div>
                        <div className="map-pin pin-3">
                          <div className="pin-icon">P</div>
                          <div className="pin-pulse"></div>
                        </div>
                        <div className="map-pin pin-user">
                          <div className="user-dot"></div>
                          <div className="user-pulse"></div>
                        </div>
                      </div>
                      <div className="map-footer">
                        <div className="nearest-spot">
                          <div className="spot-distance">0.2 mi</div>
                          <div className="spot-name">Central Parking</div>
                          <div className="spot-price">$5/hr</div>
                        </div>
                        <div className="action-button">Reserve</div>
                      </div>
                    </div>
                  </div>
                  <div className="phone-notch"></div>
                </div>

                <motion.div
                  className="floating-card card-1"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="card-icon">P</div>
                  <div className="card-text">
                    <p className="card-title">Available Spots</p>
                    <p className="card-value">12 nearby</p>
                  </div>
                </motion.div>

                <motion.div
                  className="floating-card card-2"
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                >
                  <div className="card-icon">Rs</div>
                  <div className="card-text">
                    <p className="card-title">Average Savings</p>
                    <p className="card-value">Rs.500/month</p>
                  </div>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          >
            <span>Scroll Down</span>
            <div className="scroll-arrow">↓</div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}

export default Herosection
