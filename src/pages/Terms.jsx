import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaLock, FaGavel, FaFileContract, FaUserShield, FaShieldAlt, FaExclamationTriangle } from "react-icons/fa";

const SectionCard = ({ icon, title, children }) => (
  <motion.div
    className="bg-white p-4 rounded-3 shadow-sm mb-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
  >
    <h4 className="fw-semibold d-flex align-items-center mb-3">
      <span className="me-2 text-warning">{icon}</span> {title}
    </h4>
    {children}
  </motion.div>
);

const TermsAndPrivacy = () => {
  return (
    <div style={{ background: "#f9f9fa", padding: "60px 0", minHeight: "100vh" }}>
      <Container style={{ maxWidth: "900px" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h1 className="fw-bold mb-3 m-5">Terms of Use & Privacy Policy</h1>
          <p className="text-muted">We value your trust. Here's how we protect and use your information.</p>
        </motion.div>

        {/* --- Terms of Use Section --- */}
        <SectionCard icon={<FaFileContract />} title="1. Introduction">
          <p>
            By using Parkify, you agree to our terms and policies. Please review this information carefully before using our services.
          </p>
        </SectionCard>

        <SectionCard icon={<FaGavel />} title="2. Acceptable Use">
          <ul className="mb-0">
            <li>Use Parkify for lawful parking purposes only.</li>
            <li>Do not misuse or attempt to interfere with the platform.</li>
            <li>Respect parking slot time limits and policies.</li>
          </ul>
        </SectionCard>

        <SectionCard icon={<FaExclamationTriangle />} title="3. Cancellation & Refund">
          <p>
            You may cancel a booking before the scheduled time. Refunds (if applicable) will be processed within 7 business days.
          </p>
        </SectionCard>

        <SectionCard icon={<FaShieldAlt />} title="4. Limitation of Liability">
          <p>
            Parkify is not responsible for any loss, damage, or inconvenience resulting from your use of the app or parking space. Always park at your own risk.
          </p>
        </SectionCard>

        <SectionCard icon={<FaUserShield />} title="5. Account Security">
          <p>
            You are responsible for maintaining the confidentiality of your account. Notify us immediately if you suspect unauthorized activity.
          </p>
        </SectionCard>

        <hr className="my-5" />

        {/* --- Privacy Policy Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="fw-bold mb-2">Privacy Policy</h2>
          <p className="text-muted">
            Learn what we collect and how we protect your personal information.
          </p>
        </motion.div>

        <SectionCard icon={<FaLock />} title="1. What We Collect">
          <ul className="mb-0">
            <li>Basic personal info: name, phone, vehicle details</li>
            <li>Location data (only with permission)</li>
            <li>Booking and payment history</li>
          </ul>
        </SectionCard>

        <SectionCard icon={<FaUserShield />} title="2. How We Use It">
          <p>
            We use your data to manage bookings, send confirmations, and improve service quality. We do <strong>not</strong> sell your data.
          </p>
        </SectionCard>

        <SectionCard icon={<FaShieldAlt />} title="3. Data Protection">
          <p>
            Your data is encrypted and stored securely. We use the latest security measures to keep your info safe.
          </p>
        </SectionCard>

        <SectionCard icon={<FaFileContract />} title="4. Your Rights">
          <p>
            You can request access to or deletion of your data anytime. Email us at <strong>support@parkify.pk</strong>.
          </p>
        </SectionCard>

        {/* Footer note */}
        <p className="text-center text-muted small mt-5">
          If you have any questions, feel free to contact us at <strong>legal@parkify.pk</strong>
        </p>
      </Container>
    </div>
  );
};

export default TermsAndPrivacy;
