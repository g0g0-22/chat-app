import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import LandingPage from "./components/LandingPage";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import AppLayout from "./components/Layout/AppLayout";

function PrivateRoute({ children }){
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login"/>;
}
export default function App(){
  const { currentUser } = useAuth();
  return (
      <Routes>
        {/*Landing page: if logged in go to chats*/}
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/chats" replace/>
            : <LandingPage/>
          }
        />

        <Route
          path="/login"
          element={
            currentUser ? <Navigate to="/chats" replace/>
            : <Login/>
          }
        />

        <Route
          path="/signup"
          element={
            !currentUser ? <Signup/> : <Navigate to="/chats" replace/>
          }
        />

        <Route
          path="/chats/*"
          element={
            <PrivateRoute>
              <AppLayout/>
            </PrivateRoute>
          }
        />
        
        <Route
          path="*"
          element={<Navigate to="/" replace/>}
        />

      </Routes>
  )
}