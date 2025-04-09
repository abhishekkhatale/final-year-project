import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./components/NotFound";
import Room from "./Pages/Meeting";
import AdminPanel from "./Pages/AdminPanel";
import NotesList from "./Pages/NotesList";
import NoteDetail from "./Pages/NoteDetail";

function App() {
  return (
    <Routes>
      
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginModal />} />
      <Route path="/signup" element={<SignupModal />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/meeting" element={<Room/>} />
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="/note" element={<NotesList/>} />
      <Route path="/note/:id" element={<NoteDetail/>} />
      <Route path="*" element={<NotFound/>} />
      
      
    </Routes>
  );
}

export default App;
