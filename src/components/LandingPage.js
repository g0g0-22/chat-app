// src/components/LandingPage.jsx
import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Drift!</h1>
      <div className="landing-buttons">
        <Link to="/signup">
        <button id="signup">Sign Up</button>
        </Link>
        <Link to="/login">
        <button id="login">Log In</button>
        </Link>
      </div>
    </div>
  );
}
