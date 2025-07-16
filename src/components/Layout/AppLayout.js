import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"
import WelcomeMessage from "../welcomeMessage"
export default function AppLayout() {

  const { logout } = useAuth()

  const handleLogout = async () =>{
    try{
        await logout();
    }catch(err){
        console.error("Logout failed", err);
    }
  }
  return (
    <div className="app-layout">
        Hello!
        <button onClick={handleLogout}>Log out</button>
        <WelcomeMessage></WelcomeMessage>
    </div>
  );
}
