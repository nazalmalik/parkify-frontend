import { useEffect, useRef, useState } from "react";
import carImage from "../assets/car.png"; // Ensure you have a car image in your assets folder

const ParkingAnimation = () => {
  const carRef = useRef(null);
  const scannerRef = useRef(null);
  const parkingSpotRefs = useRef([]);
  const [animationStatus, setAnimationStatus] = useState("Waiting");
  const [occupiedSpots, setOccupiedSpots] = useState(0);
  const totalSpots = 3;

  useEffect(() => {
    const animateCar = () => {
      if (!carRef.current) return;

      setAnimationStatus("Car Approaching");
      carRef.current.style.transition = "transform 1.5s ease-in-out";
      carRef.current.style.transform = "translateX(50px)";

      setTimeout(() => {
        setAnimationStatus("Scanning Vehicle");
        scannerRef.current.style.transition = "background-color 0.5s ease-in-out";
        scannerRef.current.style.backgroundColor = "#ff5555";

        setTimeout(() => {
          scannerRef.current.style.backgroundColor = "#22c55e";
          setAnimationStatus("Car Moving to Parking Spot");

          setTimeout(() => {
            carRef.current.style.transform = "translateX(250px)";

            setTimeout(() => {
              setAnimationStatus("Parking Vehicle");
              const occupiedIndex = occupiedSpots % totalSpots; // Pick the next available spot
              parkingSpotRefs.current[occupiedIndex].style.transition = "background-color 0.5s ease-in-out";
              parkingSpotRefs.current[occupiedIndex].style.backgroundColor = "#22c55e";

              setTimeout(() => {
                parkingSpotRefs.current[occupiedIndex].style.backgroundColor = "#1e293b";
                setOccupiedSpots((prev) => Math.min(prev + 1, totalSpots));

                setTimeout(() => {
                  setAnimationStatus("Completed");

                  setTimeout(() => {
                    setAnimationStatus("Waiting");
                    setOccupiedSpots((prev) => Math.max(prev - 1, 0));
                    carRef.current.style.transform = "translateX(-50px)";
                    setTimeout(animateCar, 1000);
                  }, 1000);
                }, 1500);
              }, 1000);
            }, 1000);
          }, 500);
        }, 500);
      }, 1000);
    };

    animateCar();
  }, [occupiedSpots]);

  return (
    <div className="p-4 bg-gray-900 rounded-lg text-white">
      <h3 className="text-center text-xl font-semibold mb-3">Parking Simulation</h3>
      <div className="relative w-full h-40 bg-gray-800 rounded-lg p-4 flex justify-center items-center">
        {/* Road */}
        <div className="absolute top-1/2 left-0 w-full h-10 bg-gray-700 rounded-lg"></div>

        {/* Scanner */}
        <div ref={scannerRef} className="absolute left-1/4 top-1/4 w-5 h-10 bg-gray-600 rounded"></div>

        {/* Parking Spots */}
        <div className="absolute right-10 top-1/4 w-32 h-16 bg-gray-700 rounded-lg flex justify-around items-center">
          {[...Array(totalSpots)].map((_, index) => (
            <div
              key={index}
              ref={(el) => (parkingSpotRefs.current[index] = el)}
              className="w-8 h-10 bg-gray-800 rounded-md"
            ></div>
          ))}
        </div>

        {/* Car with Image */}
        <img
          ref={carRef}
          src={carImage}
          alt="Car"
          className="absolute left-0 bottom-5 w-14 transition-transform"
          style={{ transition: "transform 1.5s ease-in-out" }}
        />
      </div>

      <p className="text-center mt-4">Status: {animationStatus}</p>
      <p className="text-center">Occupied Spots: {occupiedSpots} / {totalSpots}</p>
    </div>
  );
};

export default ParkingAnimation;
