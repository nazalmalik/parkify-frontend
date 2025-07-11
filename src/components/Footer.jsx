import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import "./Footer.css";
import logo from "../assets/logo.svg";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://www.facebook.com/profile.php?id=61578075785146",
      icon: <FaFacebook className="social-icon" />,
      label: "Facebook",
    },
    {
      href: "https://x.com/ParkifyP6306",
      icon: <FaTwitter className="social-icon" />,
      label: "Twitter",
    },
    {
      href: "https://www.instagram.com/parkify.pk/",
      icon: <FaInstagram className="social-icon" />,
      label: "Instagram",
    },
    {
      href: "https://www.linkedin.com/in/parkify-makes-parking-smooth-68323a374/",
      icon: <FaLinkedin className="social-icon" />,
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="footer-container">
      <motion.div
        className="footer-logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={logo} alt="Parkify Logo" />
      </motion.div>

      <motion.p
        className="footer-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <em>Make parking smooth and trendy</em>
      </motion.p>

      <motion.ul
        className="footer-nav"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <li><a href="/">Home</a></li>
        <li><a href="/about-us">About</a></li>
        <li><a href="/pricing">Pricing</a></li>
       <li><a href="/terms">Terms & Privacy</a></li>
        <li><a href="/contact">Contact</a></li> 
      
      </motion.ul>

      <div className="footer-socials">
        {socialLinks.map(({ href, icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {icon}
          </motion.a>
        ))}
      </div>

      <motion.div
        className="footer-copyright"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <hr />
        <p>&copy; 2025 Parkify. All rights reserved.</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
