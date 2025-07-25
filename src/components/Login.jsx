import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import { FaUser, FaPhone, FaCar, FaEnvelope, FaLock } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setIsLogin] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    vehicleNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.message) {
      toast[location.state.type || "success"](location.state.message);
    }
  }, [location]);

  // Toggle User Login / Register
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      phoneNumber: "",
      vehicleNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Handle User Form Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Admin Form Changes
  const handleAdminChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  // Handle User Login/Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      if (isLogin) {
        // USER LOGIN
        const res = await axios.post("https://backend-parkify.vercel.app/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        const { token, user } = res.data;

        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("User", JSON.stringify(user));
          toast.success("Login successful!");

          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast.error("Login failed. Invalid response.");
        }
      } else {
        // USER REGISTER
        await axios.post("https://backend-parkify.vercel.app/api/auth/register", {
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          vehicleNumber: formData.vehicleNumber,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        });

        toast.success("Registered successfully!");
        setIsLogin(true);
      }

      setFormData({
        name: "",
        phoneNumber: "",
        vehicleNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ✅ Handle Admin Login
  const handleAdminLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://backend-parkify.vercel.app/api/admin/login', {
        username: adminData.username.trim(),
        password: adminData.password.trim(),
      });

      if (response.data.success) {
        localStorage.setItem("User", JSON.stringify({ role: "admin", name: "Admin" }));
        toast.success("Admin logged in successfully!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        toast.error("Invalid admin credentials");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Server error";
      toast.error(message);
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer />

      <div className="login-card">
        <div className="login-header">
          <h2>
            {showAdminLogin
              ? "Admin Portal"
              : isLogin
              ? "Welcome Back!"
              : "Create Account"}
          </h2>
          <p>
            {showAdminLogin
              ? "Login to the admin dashboard"
              : isLogin
              ? "Login to continue to Parkify"
              : "Sign up to start parking smart!"}
          </p>
        </div>

        {!showAdminLogin ? (
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <>
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Username"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-icon-wrapper">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+92 321 4975489"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-icon-wrapper">
                  <FaCar className="input-icon" />
                  <input
                    type="text"
                    name="vehicleNumber"
                    placeholder="ABC 312"
                    required
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div className="input-icon-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-icon-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {!isLogin && (
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            )}
            {!isLogin && (
              <label className="checkbox-container">
                <input type="checkbox" required />
                <span className="checkmark"></span>
                I agree to the Terms & Conditions
              </label>
            )}
            <button type="submit" className="login-button">
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
        ) : (
          <>
            <form onSubmit={handleAdminLogin} className="login-form">
              <div className="input-icon-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Admin Username"
                  required
                  value={adminData.username}
                  onChange={handleAdminChange}
                />
              </div>
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Admin Password"
                  required
                  value={adminData.password}
                  onChange={handleAdminChange}
                />
              </div>
              <button
                type="submit"
                className="login-button"
                style={{ backgroundColor: "#dc3545", color: "#fff" }}
              >
                Login as Admin
              </button>
            </form>
            <p className="switch-auth">
              Not an admin?{" "}
              <span onClick={() => setShowAdminLogin(false)}>Go back</span>
            </p>
          </>
        )}

        {!showAdminLogin && (
          <>
            <p className="switch-auth">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <span onClick={toggleForm}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
            <p className="switch-auth">
              Login as Admin?{" "}
              <span onClick={() => setShowAdminLogin(true)}>Click here</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
