import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./Contact.css";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show toast
    toast.success("Message Sent! 🚀");
    // Clear form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <motion.section
      className="contact-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Floating Bubbles */}
      <ul className="bubbles">
        {[...Array(10)].map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>

      <Container>
        <Row className="contact-row mt-5 flex-column-reverse flex-md-row">
          {/* Left: Image */}
          <Col md={6} className="left-side order-2 order-md-1">
            <motion.div
              className="left-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/contact-us-illustration-download-in-svg-png-gif-file-formats--call-logo-customer-service-support-onboarding-pack-business-illustrations-4849052.png"
                alt="Contact Illustration"
                className="contact-image"
              />
            </motion.div>
          </Col>

          {/* Right: Form */}
          <Col md={6} className="right-side order-1 order-md-2">
            <motion.div
              className="contact-form-container"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="contact-form-title">Get in touch</h2>
              <p className="contact-form-p">
                We would love to hear from you! Drop a message,<br/> we'll connect with you soon.
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="message">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <motion.button
                  type="submit"
                  className="send-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Spark a Conversation 💡
                </motion.button>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

export default Contactus;
