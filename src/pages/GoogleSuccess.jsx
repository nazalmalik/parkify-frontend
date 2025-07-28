import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const userParam = query.get("user");

    if (!userParam) {
      toast.error("Login failed.");
      return navigate("/");
    }

    const { user, token } = JSON.parse(decodeURIComponent(userParam));

    // Store user info globally if needed (e.g., localStorage, context, etc.)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Automatically make a booking (with fallback/defaults)
    const bookForGoogleUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/bookings/create",
          {
            userId: user.id,
            spotId: "google-default-spot",         // Must exist in DB or be handled
            vehicleType: "car",
            licensePlate: "G-LOGIN",
            bookingDate: new Date().toISOString().split("T")[0],
            startTime: "10:00",
            endTime: "11:00",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Booking confirmed!");
        const bookingId = res.data.bookingId;

        // Go to payment page
        navigate(`/payment-success?bookingId=${bookingId}`);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Booking failed");
        navigate("/");
      }
    };

    bookForGoogleUser();
  }, [location, navigate]);

  return <div>Redirecting and booking...</div>;
};

export default GoogleSuccess;
