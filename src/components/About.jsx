import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaParking, FaShieldAlt, FaClock, FaUsers } from "react-icons/fa";

import "./About.css";

const AboutUs = () => {
  const videoRef = useRef(null);   // ✅ You need this!

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <motion.section
      className="about-section"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="about-container">
        <div className="about-left">
          <motion.h2 className="section-heading">Who We Are</motion.h2>
          <p className="about-description">
            We are a passionate team committed to transforming the parking experience. Our goal is to make parking at shopping malls and public spaces as effortless and efficient as possible. Through the use of advanced technology, we offer real-time navigation, easy booking, and intelligent parking management. We strive to enhance convenience and simplify everyday tasks, creating a smarter, more streamlined experience for everyone.
          </p>
        </div>
        <div className="about-right">
          <video
           ref={videoRef} autoPlay loop playsInline
          >
            <source src="/videos/smartparking.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
