import React from "react";
import { motion } from "framer-motion";
import {
  FaRegCalendarCheck,
  FaMobileAlt,
  FaMapMarkedAlt,
  FaQrcode,
  FaCar,
} from "react-icons/fa";
import "./Working.css";

const steps = [
  {
    icon: <FaRegCalendarCheck />,
    title: "Book Your Spot",
    text: "Reserve your parking space in advance with our app.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Get Confirmation",
    text: "Receive a unique QR code for seamless access.",
  },
  
  {
    icon: <FaQrcode />,
    title: "Scan & Enter",
    text: "Scan the QR code at the entrance for quick access.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Navigate Easily",
    text: "Use built-in navigation to reach your spot effortlessly.",
  },
  {
    icon: <FaCar />,
    title: "Park & Relax",
    text: "Enjoy a stress-free parking experience without any hassle.",
  },
];

const HowItWorks = () => {
  return (
    <div className="how-it-works-page">
      {/* Tilted Hero Section */}
      <section className="tilted-hero">
  <div className="tilted-overlay">
    <h1>How It Works</h1>
    <p>Navigate the future of parking — simple, smart, seamless.</p>
  </div>

  <div className="tilted-wave">
    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#f9f9fa"
        fillOpacity="1"
        d="M0,224L80,218.7C160,213,320,203,480,213.3C640,224,800,256,960,240C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      />
    </svg>
  </div>
</section>

      {/* Working Steps Section */}
      <motion.section
        className="working-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="section-title">Smart Parking Steps</h2>
        <p className="section-subtitle">
          Follow these steps to enjoy a smooth and smart parking experience.
        </p>

        {/* Centered Wrapper for Cards */}
        <section className="how-we-work">
      <div className="steps-container">
        <div className="step-row">
          {steps.slice(0, 3).map((step, index) => (
            <div className="flow-step" key={index}>
              <div className="circle-icon">
                <span className="step-number">{index + 1}</span>
                <div className="icon">{step.icon}</div>
              </div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
              {index < 2 && <div className="connector-line" />} {/* Only for first 2 */}
            </div>
          ))}
        </div>
        <div className="step-row">
          {steps.slice(3).map((step, index) => (
            <div className="flow-step" key={index + 3}>
              <div className="circle-icon">
                <span className="step-number">{index + 4}</span>
                <div className="icon">{step.icon}</div>
              </div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </div>
              {index < 1 && <div className="connector-line" />} {/* Only for the first of this row */}
            </div>
          ))}
        </div>
      </div>
    </section>
      </motion.section>
    </div>
  );
};

export default HowItWorks;
