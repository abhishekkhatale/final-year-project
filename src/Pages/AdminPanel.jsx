
"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import AdminHeader from "../components/AdminHeader"
import AdminTabs from "../components/AdminTabs"
import AdminMeetingForm from "../components/AdminMeetingForm"
import AdminNoteForm from "../components/AdminNoteForm"
import AdminTestForm from "../components/AdminTestForm"
import AdminAssignmentForm from "../components/AdminAssignmentForm"
const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("meetings");
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
  
    // Meeting state and handlers
    const [newMeeting, setNewMeeting] = useState({
      title: "",
      date: "",
      time: "",
      duration: "",
      link: "",
    });
  
    const handleAddMeeting = (e) => {
      e.preventDefault();
      console.log("Adding meeting:", newMeeting);
      setNewMeeting({
        title: "",
        date: "",
        time: "",
        duration: "",
        link: "",
      });
    };
  
    // Note state and handlers
    const [newNote, setNewNote] = useState({
      title: "",
      content: "",
      course: "",
    });
  
    const handleAddNote = (e) => {
      e.preventDefault();
      console.log("Adding note:", newNote);
      setNewNote({
        title: "",
        content: "",
        course: "",
      });
    };
  
    // Test state and handlers
    const [newTest, setNewTest] = useState({
      title: "",
      date: "",
      time: "",
      duration: "",
      questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
    });
  
    const handleAddTest = (e) => {
      e.preventDefault();
      console.log("Adding test:", newTest);
      setNewTest({
        title: "",
        date: "",
        time: "",
        duration: "",
        questions: [{ question: "", options: ["", "", "", ""], correctAnswer: 0 }],
      });
    };
  
    const handleAddQuestion = () => {
      if (newTest.questions.length < 5) {
        setNewTest({
          ...newTest,
          questions: [...newTest.questions, { question: "", options: ["", "", "", ""], correctAnswer: 0 }],
        });
      }
    };
  
    const handleRemoveQuestion = (index) => {
      const updatedQuestions = [...newTest.questions];
      updatedQuestions.splice(index, 1);
      setNewTest({
        ...newTest,
        questions: updatedQuestions,
      });
    };
  
    const handleQuestionChange = (index, field, value) => {
      const updatedQuestions = [...newTest.questions];
  
      if (field === "question") {
        updatedQuestions[index].question = value;
      } else if (field.startsWith("option")) {
        const optionIndex = Number.parseInt(field.split("-")[1]);
        updatedQuestions[index].options[optionIndex] = value;
      } else if (field === "correctAnswer") {
        updatedQuestions[index].correctAnswer = Number.parseInt(value);
      }
  
      setNewTest({
        ...newTest,
        questions: updatedQuestions,
      });
    };
  
    // Assignment state and handlers
    const [newAssignment, setNewAssignment] = useState({
      title: "",
      description: "",
      deadline: "",
      course: "",
    });
  
    const handleAddAssignment = (e) => {
      e.preventDefault();
      console.log("Adding assignment:", newAssignment);
      setNewAssignment({
        title: "",
        description: "",
        deadline: "",
        course: "",
      });
    };
  
    // Authentication check
    useEffect(() => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        navigate("/");
      }
      setIsLoading(false);
    }, [navigate]);
  
    if (isLoading) {
      return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }
  
    return (
        <div className="min-h-screen bg-gray-50">
          <Header/>
          <div className="container mx-auto px-4 py-8">
            <AdminHeader />
            <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              {activeTab === "meetings" && (
                <AdminMeetingForm 
                  newMeeting={newMeeting}
                  setNewMeeting={setNewMeeting}
                  handleAddMeeting={handleAddMeeting}
                />
              )}
              
              {activeTab === "notes" && (
                <AdminNoteForm 
                  newNote={newNote}
                  setNewNote={setNewNote}
                  handleAddNote={handleAddNote}
                />
              )}
              
              {activeTab === "tests" && (
                <AdminTestForm 
                  newTest={newTest}
                  setNewTest={setNewTest}
                  handleAddTest={handleAddTest}
                  handleAddQuestion={handleAddQuestion}
                  handleRemoveQuestion={handleRemoveQuestion}
                  handleQuestionChange={handleQuestionChange}
                />
              )}
              
              {activeTab === "assignments" && (
                <AdminAssignmentForm 
                  newAssignment={newAssignment}
                  setNewAssignment={setNewAssignment}
                  handleAddAssignment={handleAddAssignment}
                />
              )}
            </div>
          </div>
        </div>
      )
    }
    
    export default AdminPanel