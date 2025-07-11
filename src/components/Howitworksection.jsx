import React from "react";
import "./Howitworksection.css";

const Howitworksection = () => {
    return (
        <section className="tilted-hero">
          <div className="tilted-overlay">
            <h1>How It Works</h1>
            <p>Navigate the future of parking — simple, smart, seamless.</p>
          </div>
    
          <div className="tilted-wave">
            <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
              {/* <path
                fill="#fff"
                // fillOpacity="1"
                d="M0,224L80,218.7C160,213,320,203,480,213.3C640,224,800,256,960,240C1120,224,1280,160,1360,128L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              /> */}
            </svg>
          </div>
        </section>
      );
    };
    

export default Howitworksection;
