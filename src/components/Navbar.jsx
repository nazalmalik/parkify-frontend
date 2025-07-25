import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button, Container, NavDropdown } from "react-bootstrap";
import logo from "../assets/logo.svg";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toast } from "react-toastify";

const Navigation = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("User"));
    setUser(storedUser);

    const handleUserChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("User"));
      setUser(updatedUser);
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    window.dispatchEvent(new Event("userChanged"));

    toast.success("Logout successful!");

    setTimeout(() => {
      window.location.href = "/authpage"; // Full reload
    }, 500);
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{
        background: "linear-gradient(150deg,rgb(0, 0, 0),rgba(24, 23, 23, 0.86)",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
      className="px-3"
    >
      <Container>
        <Navbar.Brand>
          <a href="/">
            <img src={logo} alt="Parkify Logo" style={{ height: "52px", width: "160px" }} />
          </a>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="custom-nav mx-auto text-center">
            <Nav.Link href="/" className="mx-2">Home</Nav.Link>
            <Nav.Link href="/about-us" className="mx-2">About Us</Nav.Link>
            <Nav.Link href="/how-it-works" className="mx-2">How It Works</Nav.Link>
            <Nav.Link href="/pricing" className="mx-2">Pricing</Nav.Link>
            <Nav.Link href="/contact" className="mx-2">Contact</Nav.Link>
          </Nav>

          {/* Desktop User/Login */}
          {user && user.role !== "admin" ? (
            <Nav className="d-none d-lg-flex">
              <NavDropdown
                title={
                  <span style={{
                    color: "#ffc107",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <FaUserCircle size={20} />
                    Welcome, {user.name}
                    <MdKeyboardArrowDown size={20} />
                  </span>
                }
                id="user-dropdown"
                align="end"
                className="ms-3 custom-user-dropdown"
              >
                <NavDropdown.Item href="/profile">👤 My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>🚪 Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <a
              href="/authpage"
              className="btn btn-warning custom-btn ms-auto d-none d-lg-inline-block"
            >
              Get Started
            </a>
          )}

          {/* Mobile User/Login */}
          <div className="d-lg-none text-center mt-3 w-100">
            {user && user.role !== "admin" ? (
              <NavDropdown
                title={
                  <span style={{
                    color: "#ffc107",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px"
                  }}>
                    <FaUserCircle size={20} />
                    Welcome, {user.name}
                    <MdKeyboardArrowDown size={20} />
                  </span>
                }
                id="user-dropdown-mobile"
                align="end"
                className="custom-user-dropdown"
              >
                <NavDropdown.Item href="/profile">👤 My Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>🚪 Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <a
                href="/authpage"
                className="btn btn-warning custom-btn w-100"
              >
                Get Started
              </a>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
