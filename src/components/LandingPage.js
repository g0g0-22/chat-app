// src/components/LandingPage.jsx
import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    
    <div className="landing-container">
      <img src="/assets/shapes/shape1.svg" alt="decorative shape" />
      <h1 className="landing-title">Welcome to Lynq!</h1>
      <p>Connect instantly with friends, groups, and your AI assistant in secure, real-time conversations.</p>
      <div className="landing-buttons">
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
        <Link to="/login" className="btn login-btn">Log In</Link>
      </div>

    </div>
  );
}
