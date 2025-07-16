// src/App.jsx
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext.js";

import LandingPage from "./components/LandingPage.js";
import Login       from "./components/Auth/Login.js";
import Signup      from "./components/Auth/Signup.js";
import AppLayout   from "./components/Layout/AppLayout.js";
import ChatRoom    from "./components/Chat/ChatRoom.jsx";
import SelectChatPlaceholder from "./components/Chat/SelectChatPlaceholder.jsx";
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

export default function App() {
  const { currentUser } = useAuth();

  return (
      <Routes>
        {/* Landing / Login / Signup */}
        <Route
          path="/"
          element={
            currentUser 
              ? <Navigate to="/chats" replace/> 
              : <LandingPage/>
          }
        />
        <Route
          path="/login"
          element={
            currentUser
              ? <Navigate to="/chats" replace/>
              : <Login/>
          }
        />
        <Route
          path="/signup"
          element={
            !currentUser
              ? <Signup/>
              : <Navigate to="/chats" replace/>
          }
        />

        {/* Protected chats “section” */}
        <Route
          path="/chats/*"
          element={
            <PrivateRoute>
              <AppLayout/>
            </PrivateRoute>
          }
        >
          {/* No chat selected */}
          <Route 
            index 
            element={<SelectChatPlaceholder/>} 
          />
          {/* Chat room for a given chatId */}
          <Route 
            path=":chatId" 
            element={<ChatRoom/>} 
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
  );
}
