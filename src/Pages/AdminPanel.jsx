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
import { FaLink, FaUserTie, FaEdit, FaTrash, FaCalendarAlt, FaBook } from 'react-icons/fa'
import axios from "../utils/Axios"

const AdminPanel = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("meetings");
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isAssignmentLoading, setIsAssignmentLoading] = useState(false);
    const [error, setError] = useState(null);

    // Meeting state and handlers - REMAINS UNCHANGED
    const [newMeeting, setNewMeeting] = useState({
        title: "",
        date: "",
        time: "",
        instructor: ""
    });

    const handleAddMeeting = async (e) => {
        e.preventDefault();
        try {
            setIsMeetingLoading(true); // Optional loading state

            if (editingMeetingId) {
                // Edit mode
                await axios.put(`/lectures/${editingMeetingId}`, newMeeting);
            } else {
                // Add mode
                await axios.post("/lectures/", newMeeting);
            }

            await fetchMeetings(); // Refresh meeting list

            setNewMeeting({
                title: "",
                date: "",
                time: "",
                instructor: ""
            });

            setEditingMeetingId(null);
            setMeetingError(null);
        } catch (err) {
            setMeetingError("Failed to save meeting");
            console.error("Error saving meeting:", err);
        } finally {
            setIsMeetingLoading(false);
        }
    };


    const [meetings, setMeetings] = useState([]);
    const [isMeetingLoading, setIsMeetingLoading] = useState(false);
    const [editingMeetingId, setEditingMeetingId] = useState(null);
    const [meetingError, setMeetingError] = useState(null);


    const fetchMeetings = async () => {
        try {
            setIsMeetingLoading(true);
            const response = await axios.get("/lectures/");
            console.log('Meeting Fetched:', response.data);
            setMeetings(response.data.lectures);
            console.log('SetMeeting: ', meetings);

            setError(null);
        } catch (err) {
            setError("Failed to fetch meetings");
            console.error("Error fetching meetings:", err);
        } finally {
            setIsMeetingLoading(false);
        }
    };

    const handleEditMeeting = (meeting) => {
        setNewMeeting({
            title: meeting.title,
            instructor: meeting.instructor,
            date: meeting.date,
            time: meeting.time,
        });
        setEditingMeetingId(meeting._id);
    };

    const handleDeleteMeeting = async (id) => {
        try {
            setIsMeetingLoading(true);
            await axios.delete(`/lectures/${id}`);
            await fetchMeetings();
            setMeetingError(null);
        } catch (err) {
            setMeetingError("Failed to delete meeting");
            console.error("Error deleting meeting:", err);
        } finally {
            setIsMeetingLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "meetings") {
            try {
                fetchMeetings();
            } catch (error) {
                console.error('Error while fetching meetings,', error);

            }
        }
    }, [activeTab]);


    // Note state and handlers - REMAINS UNCHANGED
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

    // Test state and handlers - REMAINS UNCHANGED
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

    // Assignment state and handlers - UPDATED WITH API INTEGRATION
    const [newAssignment, setNewAssignment] = useState({
        title: "",
        description: "",
        deadline: "",
        link: "",
        course: "",
        instructor: ""
    });

    const [assignments, setAssignments] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const fetchAssignments = async () => {
        try {
            setIsAssignmentLoading(true);
            const response = await axios.get("/assignment/");
            setAssignments(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch assignments");
            console.error("Error fetching assignments:", err);
        } finally {
            setIsAssignmentLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "assignments") {
            fetchAssignments();
        }
    }, [activeTab]);

    const handleAddAssignment = async (e) => {
        e.preventDefault();
        try {
            setIsAssignmentLoading(true);

            if (editingId) {
                await axios.put(`/assignment/${editingId}`, newAssignment);
            } else {
                await axios.post("/assignment/", newAssignment);
            }

            await fetchAssignments();
            setNewAssignment({
                title: "",
                description: "",
                deadline: "",
                link: "",
                course: "",
                instructor: ""
            });
            setEditingId(null);
            setError(null);
        } catch (err) {
            setError("Failed to save assignment");
            console.error("Error saving assignment:", err);
        } finally {
            setIsAssignmentLoading(false);
        }
    };

    const handleEditAssignment = (assignment) => {
        setNewAssignment({
            title: assignment.title,
            description: assignment.description,
            deadline: assignment.deadline,
            link: assignment.link,
            course: assignment.course,
            instructor: assignment.instructor
        });
        setEditingId(assignment._id);
    };

    const handleDeleteAssignment = async (id) => {
        try {
            setIsAssignmentLoading(true);
            await axios.delete(`/assignment/${id}`);
            await fetchAssignments();
            setError(null);
        } catch (err) {
            setError("Failed to delete assignment");
            console.error("Error deleting assignment:", err);
        } finally {
            setIsAssignmentLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Authentication check - REMAINS UNCHANGED
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
            <Header />
            <div className="container mx-auto px-4 py-8">
                <AdminHeader />
                <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    {activeTab === "meetings" && (
                        <div className="flex flex-col md:flex-row gap-16">

                            <AdminMeetingForm
                                newMeeting={newMeeting}
                                setNewMeeting={setNewMeeting}
                                handleAddMeeting={handleAddMeeting} />

                            <div>
                                <h3 className="text-xl font-semibold mb-4">All Lectures</h3>
                                {isMeetingLoading && meetings.length === 0 ? (
                                    <p>Loading meetings...</p>
                                ) : meetings.length === 0 ? (
                                    <p className="text-gray-500">No meetings scheduled yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {meetings.map((meeting) => (
                                            <div
                                                key={meeting._id}
                                                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium text-lg">{meeting.title}</h4>
                                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                                            <FaUserTie className="mr-1" />
                                                            <span>{meeting.instructor}</span>
                                                            <span className="mx-2">•</span>
                                                            <FaCalendarAlt className="mr-1" />
                                                            <span>{meeting.date} at {meeting.time}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEditMeeting(meeting)}
                                                            className="text-gray-500 hover:text-gray-700"
                                                            title="Edit"
                                                            disabled={isMeetingLoading}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteMeeting(meeting._id)}
                                                            className="text-gray-500 hover:text-red-600"
                                                            title="Delete"
                                                            disabled={isMeetingLoading}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
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
                        <div className="space-y-8">
                            <AdminAssignmentForm
                                newAssignment={newAssignment}
                                setNewAssignment={setNewAssignment}
                                handleAddAssignment={handleAddAssignment}
                                editingId={editingId}
                                isLoading={isAssignmentLoading}
                            />

                            {error && (
                                <div className="text-red-500 bg-red-50 p-3 rounded-md">
                                    {error}
                                </div>
                            )}

                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4">Current Assignments</h3>
                                {isAssignmentLoading && assignments.length === 0 ? (
                                    <p>Loading assignments...</p>
                                ) : assignments.length === 0 ? (
                                    <p className="text-gray-500">No assignments scheduled yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {assignments.map((assignment) => (
                                            <div key={assignment._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium text-lg">{assignment.title}</h4>
                                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                                            <FaBook className="mr-1" />
                                                            <span>{assignment.course}</span>
                                                            <span className="mx-2">•</span>
                                                            <FaUserTie className="mr-1" />
                                                            <span>{assignment.instructor}</span>
                                                        </div>
                                                        <p className="mt-2 text-gray-700">{assignment.description}</p>
                                                        <div className="flex items-center text-sm text-gray-600 mt-2">
                                                            <FaCalendarAlt className="mr-1" />
                                                            <span>Due: {formatDate(assignment.deadline)}</span>
                                                            <span className="mx-2">•</span>
                                                            <FaLink className="mr-1" />
                                                            <a href={assignment.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                                Assignment Link
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEditAssignment(assignment)}
                                                            className="text-gray-500 hover:text-gray-700"
                                                            title="Edit"
                                                            disabled={isAssignmentLoading}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteAssignment(assignment._id)}
                                                            className="text-gray-500 hover:text-red-600"
                                                            title="Delete"
                                                            disabled={isAssignmentLoading}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;