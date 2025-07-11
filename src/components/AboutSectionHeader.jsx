import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSectionHeader.css';

const AboutSectionHeader = () => {
  return (
    <section className="about-section-header">
      <div className="overlay">
        <div className="content">
          <h1 className="about-heading">About Us</h1>
          <p>Make Your Parking Easier </p>
          <Link to="/" className="back-home-link">
            Home
          </Link>
        </div>
      </div>
   <div className="tiltedwave">
    <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#f9f9fa"
        fillOpacity="1"
        d="M0,224L80,218.7C160,213,320,203,480,213.3C640,224,800,256,960,240C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      />
    </svg>
  </div>
</section>
  );
};

export default AboutSectionHeader;
