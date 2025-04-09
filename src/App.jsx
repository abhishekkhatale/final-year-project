import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./components/NotFound";
import Room from "./Pages/Meeting";
import AdminPanel from "./Pages/AdminPanel";
<<<<<<< Updated upstream
import NotesList from "./Pages/NotesList";
import NoteDetail from "./Pages/NoteDetail";
import TestPage from "./Pages/TestPage";
import TestResult from "./Pages/TestResult";
<<<<<<< Updated upstream
=======
=======
import  NotesDisplay from "./components/Notes";
>>>>>>> Stashed changes
>>>>>>> Stashed changes

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<LoginModal />} />
      <Route path="/signup" element={<SignupModal />} />
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
>>>>>>> Stashed changes
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/meeting" element={<Room />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/note" element={<NotesList />} />
      <Route path="/note/:id" element={<NoteDetail />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/test-result" element={<TestResult />} />
      <Route path="*" element={<NotFound />} />
<<<<<<< Updated upstream
=======
=======
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/meeting" element={<Room/>} />
      <Route path="/admin" element={<AdminPanel/>} />
      <Route path="/notes" element={<NotesDisplay/>} />
      <Route path="*" element={<NotFound/>} />
      
      
      
>>>>>>> Stashed changes
>>>>>>> Stashed changes
    </Routes>
  );
}

export default App;
