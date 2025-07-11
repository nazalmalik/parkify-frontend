//component/NavigationMap
import { useEffect, useRef, useState } from 'react';
import svgPathRenderer from '../utils/svgPathRenderer';
import './NavigationMap.css';

const NavigationMap = ({ pathData }) => {
  const svgRef = useRef();
  const [isSvgLoaded, setIsSvgLoaded] = useState(false);

  const [vehicleEl, setVehicleEl] = useState(null);
  const [progress, setProgress] = useState(0);

  // Called when the SVG is fully loaded
  const handleLoad = () => {
    setIsSvgLoaded(true);
  };

  useEffect(() => {
    if (!isSvgLoaded || !pathData || !pathData.coordinates) return;

    const svgDoc = svgRef.current?.contentDocument;
    const svgRoot = svgDoc?.querySelector('svg');

    if (!svgRoot) return;

    // Draw the path
    svgPathRenderer(svgRoot, pathData.pathD, pathData.coordinates);

    // Add animated vehicle icon
    const vehicle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    vehicle.setAttribute('r', '5');
    vehicle.setAttribute('fill', 'blue'); // Default vehicle icon
    svgRoot.appendChild(vehicle);
    setVehicleEl(vehicle);

    // Animate vehicle along the path
    const animateVehicle = () => {
      const coords = pathData.coordinates;
      if (progress >= coords.length) {
        // Spot reached, turn spot red
        const endNode = svgRoot.getElementById(pathData.destinationNode);
        if (endNode) endNode.setAttribute('fill', 'red');
        return;
      }

      const { x, y } = coords[progress];
      vehicle.setAttribute('cx', x);
      vehicle.setAttribute('cy', y);
      setProgress(prev => prev + 1);

      setTimeout(animateVehicle, 400); // 400ms between steps
    };

    animateVehicle();
  }, [isSvgLoaded, pathData]);

  return (
    <div className="map-container">
      <object
        ref={svgRef}
        type="image/svg+xml"
        data="/assets/parking_map.svg"
        className="w-full h-auto"
        onLoad={handleLoad}
      />
    </div>
  );
};

export default NavigationMap;
