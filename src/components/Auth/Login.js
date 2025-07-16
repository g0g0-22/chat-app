import { useAuth } from "../../contexts/AuthContext.js";
import React, { useState } from 'react';
import getAuthErrorMessage from "../../utils/getAuthErrorMessage.js";
import "./Auth.css"
import { Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await login(email, password);
        }catch(err){
            console.error("Login error:", err.message);
            setError(getAuthErrorMessage(err.code || err.message));
        }
    }
    return(
        <div className="auth-container">
            <img src="assets/shapes/shape2.svg"/>
            <h2 className="auth-title">Log In</h2>
            <form onSubmit={handleLogin} className="auth-form">
                <input
                value={email}
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                value={password}
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <button type="submit">Log In</button>
                {error && <p className="auth-error">{error}</p>}
            </form>
            <div className="redirect">
                <p>Dont have an accout? <br></br> <Link className="redirectLink"to="/signup">Sign Up!</Link></p>
            </div>
            
        </div>
    )
}