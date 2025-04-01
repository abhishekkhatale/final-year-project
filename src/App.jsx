import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginModal />} />
      <Route path="/signup" element={<SignupModal />} />
    </Routes>
  );
}

export default App;
