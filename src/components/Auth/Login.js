import { useAuth } from "../../contexts/AuthContext";
import React, { useState } from 'react';
import getAuthErrorMessage from "../../utils/getAuthErrorMessage";
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
            console.error("Login Error: ", err.message);
            setError(getAuthErrorMessage(err.code || err.message));
        }
    }
    return(
        <form onSubmit={handleLogin}>
            <input value={email} placeholder="Email" type="text" onChange={e => setEmail(e.target.value)}/>
            <input value={password} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Log In</button>
            
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>


    )
}