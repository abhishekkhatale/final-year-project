import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./components/NotFound";
import Room from "./Pages/Meeting";
import AdminPanel from "./Pages/AdminPanel";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginModal />} />
      <Route path="/signup" element={<SignupModal />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/meeting" element={<Room/>} />
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="*" element={<NotFound/>} />
      
      
      
    </Routes>
  );
}

export default App;
