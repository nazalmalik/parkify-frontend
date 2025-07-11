import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBullseye, FaEye } from "react-icons/fa";
import "./Missionvision.css";

const MissionVision = () => {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <motion.section
      className="mission-vision-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2 className="section-heading mission-vision-title">
        Our Purpose and Future
      </motion.h2>

      <div className="tabs">
        <motion.button
          className={`tab-button ${activeTab === "mission" ? "active" : ""}`}
          onClick={() => setActiveTab("mission")}
        >
          Mission
        </motion.button>
        <motion.button
          className={`tab-button ${activeTab === "vision" ? "active" : ""}`}
          onClick={() => setActiveTab("vision")}
        >
          Vision
        </motion.button>
      </div>

      <div className="tab-content">
        {activeTab === "mission" && (
          <motion.div
            className="tab-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="icon-container">
              <FaBullseye className="icon" />
            </div>
            <h3>Our Mission</h3>
            <p>
              To revolutionize shopping mall parking by integrating smart
              technology, ensuring a seamless, secure, and stress-free
              experience for every visitor.
            </p>
          </motion.div>
        )}

        {activeTab === "vision" && (
          <motion.div
            className="tab-panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="icon-container">
              <FaEye className="icon" />
            </div>
            <h3>Our Vision</h3>
            <p>
              To be the leading provider of innovative parking solutions, making
              urban mobility smarter and more efficient with cutting-edge
              technology.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default MissionVision;
