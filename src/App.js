// src/App.js
import React, { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import UserSearch  from "./components/Chat/UserSearch";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login"
import welcomeMessage from "./components/welcomeMessage";
import WelcomeMessage from "./components/welcomeMessage";
function App() {
  
  const { currentUser, logout } = useAuth();
  const [view,setView] = useState("none"); //none | login | signup
  
  const renderAuthScreen = () =>{
    if(view==="signup") return <Signup />;
    if(view==="login") return <Login/>;
    return (
      <div>
        <p>Welcome to the chat app!</p>
        <button onClick={()=>setView("signup")}>Sign Up</button>
        <button onClick={()=>setView("login")}>Log in</button>
      </div>
    )
  }
  const renderLoggedInScreen = () => {
    return(
    <div>
      <p>You are logged in as {currentUser.email}</p>
      <button onClick={()=>{
        setView("none");
        logout();
      }}>Log out</button>
    </div>)
  }
  return (
    <div>
      <WelcomeMessage/>
      {currentUser ? renderLoggedInScreen() : renderAuthScreen()}
    </div>
  );
}

export default App;