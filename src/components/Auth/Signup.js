import { useAuth } from "../../contexts/AuthContext";
import React, { useState } from 'react';
import getAuthErrorMessage from "../../utils/getAuthErrorMessage";

function Signup(){
    const { signup } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSignup =async (e) =>{
        e.preventDefault();
        try{
            await signup(email, password, name);
        }catch(err){
            console.error("Signup Error: ", err.message);
            setError(getAuthErrorMessage(err.code || err.message));
        }
    };
    return(
        <form onSubmit={handleSignup}>
            <input type="text" placeholder="Username" value={name} onChange={e => setName(e.target.value)}/>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Sign up</button>
            
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    )
}
export default Signup;