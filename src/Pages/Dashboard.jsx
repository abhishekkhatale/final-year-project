import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfileCard from '../components/UserProfileCard';
import LectureCard from '../components/LectureCard';
import TestsCard from '../components/TestsCard';
import AssignmentsCard from '../components/AssignmentsCard';
import AIMentorCard from '../components/AIMentorCard';
import AiMentor from '../components/AiMentor';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const storedUser = sessionStorage.getItem("user");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white pt-20 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <UserProfileCard />
          <LectureCard />
          <TestsCard />
          <AssignmentsCard />
          <AIMentorCard />
          {/* <AiMentor/> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;