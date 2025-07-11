import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaMotorcycle, FaCarSide, FaTruckPickup } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PricingPlans.css";

const parkingRates = [
  {
    name: "Bike",
    price: "Rs. 50/day",
    icon: <FaMotorcycle size={50} color="#ffc107" />,
    features: ["Bike Stand", "24/7 Security", "Secure Locking"],
  },
  {
    name: "Car",
    price: "Rs. 200/day",
    icon: <FaCarSide size={50} color="#ffc107" />,
    features: ["Single Spot", "24/7 Access", "Basic Security"],
  },
  {
    name: "Loader",
    price: "Rs. 500/day",
    icon: <FaTruckPickup size={50} color="#ffc107" />,
    features: ["Spacious Spot", "High Security", "Priority Access"],
  },
];

const subscriptions = [
  {
    name: "Monthly Plan",
    price: "Rs. 3,000",
    features: ["Unlimited Access", "Reserved Spot", "Priority Support"],
  },
  {
    name: "Yearly Plan",
    price: "Rs. 30,000",
    features: ["Best Value", "VIP Parking", "24/7 Assistance"],
  },
];

const cardVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState("rates");
  const navigate = useNavigate();

  const handleBookNow = () => {
    const user = localStorage.getItem("User");
    if (user) {
      navigate("/index");
    } else {
      navigate("/authpage", { state: { from: "/index" } });
    }
  };

  return (
    <motion.section
      className="pricing-section vibrant-bg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Container>
        <motion.h2
          className="section-title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Pricing Plans
        </motion.h2>

        <h3 className="tab-heading m-4">
          {activeTab === "rates"
            ? "Explore Our Daily Parking Rates"
            : "Choose a Subscription Plan That Suits You"}
        </h3>

        <div className="toggle-buttons mb-4 text-center">
          <Button
            className={activeTab === "rates" ? "active" : ""}
            onClick={() => setActiveTab("rates")}
            variant="outline-warning"
          >
            Parking Rates
          </Button>{" "}
          <Button
            className={activeTab === "subscription" ? "active" : ""}
            onClick={() => setActiveTab("subscription")}
            variant="outline-warning"
          >
            Subscription Plans
          </Button>
        </div>

        {/* Daily Rates */}
        {activeTab === "rates" && (
          <Row className="justify-content-center">
            {parkingRates.map((plan, index) => (
              <Col lg={3} md={6} sm={12} key={index} className="mb-4">
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <Card className="plan-card text-center gradient-card">
                    <Card.Body>
                      <div className="icon-wrapper mb-3">{plan.icon}</div>
                      <h4 className="plan-name">{plan.name}</h4>
                      <h3 className="plan-price">{plan.price}</h3>
                      <ul className="plan-features text-center">
                        {plan.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                      <Button
                        onClick={handleBookNow}
                        variant="warning"
                        className="plans-btn"
                      >
                        Reserve Now
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}

        {/* Subscriptions */}
        {activeTab === "subscription" && (
          <Row className="justify-content-center gx-2 gy-4">
            {subscriptions.map((plan, index) => (
              <Col
                key={index}
                lg={4}
                md={6}
                sm={12}
                className="d-flex justify-content-center mb-4"
              >
                <motion.div
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <Card className="subscription-card new-subscription">
                    <Card.Body>
                      <h4 className="plan-name">{plan.name}</h4>
                      <h3 className="plan-price">{plan.price}</h3>
                      <ul className="plan-features">
                        {plan.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </motion.section>
  );
};

export default PricingPlans;
