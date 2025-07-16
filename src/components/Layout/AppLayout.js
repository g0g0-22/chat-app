import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js"
import WelcomeMessage from "../welcomeMessage.js"
import ChatList from "../Chat/ChatList.jsx";
import SelfCard from "../Chat/SelfCard.jsx";
import ChatRoom from "../Chat/ChatRoom.jsx";
import "./AppLayout.css"

export default function AppLayout() {
   const { logout } = useAuth()
   
   const handleLogout = async () => {
    try {
        await logout();
    } catch(err) {
        console.error("Logout failed", err);
    }
   }
   
   return (
        <div className="app-layout">
      <aside className="sidebar">
        <ChatList />
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>


   );
}