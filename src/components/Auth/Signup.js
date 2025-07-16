import { useAuth } from "../../contexts/AuthContext.js";
import React, { useState } from "react";
import getAuthErrorMessage from "../../utils/getAuthErrorMessage.js";
import "./Auth.css"; // Reuse the same CSS for both Login and Signup
import { Link } from "react-router-dom";

function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
    } catch (err) {
      console.error("Signup Error: ", err.message);
      setError(getAuthErrorMessage(err.code || err.message));
    }
  };

  return (
    <div className="auth-container">
      <img src="assets/shapes/shape3.svg"/>
      <h2 className="auth-title">Sign Up</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>

        {error && <p className="auth-error">{error}</p>}
      </form>
      <div className="redirect">
          <p>Already have an account? <br></br> <Link to="/login" className="redirectLink">Log In</Link> </p>
      </div>
    </div>
  );
}

export default Signup;
