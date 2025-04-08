import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserProfileCard from '../components/UserProfileCard';
import LectureCard from '../components/LectureCard';
import TestsCard from '../components/TestsCard';
import AssignmentsCard from '../components/AssignmentsCard';
import AIMentorCard from '../components/AIMentorCard';
import AiMentor from '../components/AiMentor';

function Dashboard() {
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
          <AiMentor/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;