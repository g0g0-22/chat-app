// src/App.js
import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { currentUser, signup, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await signup(email, password);
      console.log("Signup successful!");
    } catch (error) {
      setError("Failed to create account: " + error.message);
      console.error("Signup error:", error);
    }
    setLoading(false);
  }

  async function handleLogin(e) {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      console.log("Login successful!");
    } catch (error) {
      setError("Failed to log in: " + error.message);
      console.error("Login error:", error);
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await logout();
      console.log("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }
  
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "400px" }}>
      {currentUser ? (
        <div>
          <p>Logged in as: {currentUser.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          
          {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
          
          <form style={{ marginBottom: "1rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "0.5rem" }}
              />
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button 
                type="button" 
                onClick={handleSignup} 
                disabled={loading}
                style={{ padding: "0.5rem 1rem" }}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              <button 
                type="button" 
                onClick={handleLogin} 
                disabled={loading}
                style={{ padding: "0.5rem 1rem" }}
              >
                {loading ? "Loading..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;