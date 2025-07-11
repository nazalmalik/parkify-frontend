// components/Loader.jsx
import React, { useEffect, useRef, useState } from "react";
import "./Loader.css";
import carImage from "../assets/car.png";

const Loader = ({ onFinish }) => {
  const redRef = useRef(null);
  const yellowRef = useRef(null);
  const greenRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!redRef.current || !yellowRef.current || !greenRef.current) return;

    redRef.current.classList.add("on");

    const yellowTimer = setTimeout(() => {
      redRef.current.classList.remove("on");
      yellowRef.current.classList.add("on");
    }, 800);

    const greenTimer = setTimeout(() => {
      yellowRef.current.classList.remove("on");
      greenRef.current.classList.add("on");
    }, 1500);

    const finishTimer = setTimeout(() => {
      greenRef.current.classList.remove("on");
      setShowLoader(false);
      if (onFinish) onFinish();
    }, 2500);

    return () => {
      clearTimeout(yellowTimer);
      clearTimeout(greenTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (!showLoader) return null;

  return (
    <div className="loader-container">
      <div className="road">
        <div className="car">
          <img src={carImage} alt="Car" className="car-img" />
        </div>
      </div>

      <div className="traffic-light">
        <div id="red" ref={redRef} className="light"></div>
        <div id="yellow" ref={yellowRef} className="light"></div>
        <div id="green" ref={greenRef} className="light"></div>
      </div>
    </div>
  );
};

export default Loader;
