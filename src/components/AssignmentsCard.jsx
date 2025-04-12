"use client"
import { useState, useEffect } from 'react';
import { FiBook, FiAlertCircle, FiCheckCircle, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from '../utils/Axios';

const AssignmentsCard = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/assignment/');
        setAssignments(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch assignments');
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  const formatDeadline = (deadline) => {
    const now = new Date();
    const dueDate = new Date(deadline);
    const timeDiff = dueDate - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) {
      return 'Overdue';
    } else if (daysDiff === 0) {
      return 'Today, ' + dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (daysDiff === 1) {
      return 'Tomorrow, ' + dueDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return `In ${daysDiff} days`;
    }
  };

  const getStatus = (deadline) => {
    const dueDate = new Date(deadline);
    const now = new Date();
    return dueDate < now ? 'Overdue' : 'Pending';
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Pending Assignments</h2>
          <div className="bg-black p-2 rounded-lg">
            <FiBook className="text-white" />
          </div>
        </div>
        <p className="text-gray-500">Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Pending Assignments</h2>
          <div className="bg-black p-2 rounded-lg">
            <FiBook className="text-white" />
          </div>
        </div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Pending Assignments</h2>
          <div className="bg-black p-2 rounded-lg">
            <FiBook className="text-white" />
          </div>
        </div>
        
        {assignments.length === 0 ? (
          <p className="text-gray-500">No pending assignments</p>
        ) : (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div 
                key={assignment._id} 
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-black">{assignment.title}</h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => toggleExpand(assignment._id)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {expandedId === assignment._id ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                    <button 
                      className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm transition-colors"
                      onClick={() => window.open(assignment.link, '_blank')}
                    >
                      Submit
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === assignment._id && (
                  <div className="mt-3 pt-3 border-t border-gray-200 space-y-2 animate-fadeIn">
                    <p className="text-gray-600 text-sm">{assignment.description}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className={`font-medium ${
                        getStatus(assignment.deadline) === 'Overdue' 
                          ? 'text-red-600' 
                          : 'text-yellow-600'
                      }`}>
                        {getStatus(assignment.deadline)}
                      </span>
                      <span className="mx-2">•</span>
                      <span>Due: {formatDeadline(assignment.deadline)}</span>
                    </div>
                    <p className="text-sm text-gray-600">Course: {assignment.course}</p>
                    <p className="text-sm text-gray-600">Instructor: {assignment.instructor}</p>
                    
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Dialog - Uncomment if you prefer modal instead of expandable */}
      {/* {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedAssignment.title}</h3>
              <button 
                onClick={() => setSelectedAssignment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <p className="text-gray-700 mb-4">{selectedAssignment.description}</p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <span className="font-medium w-24">Status:</span>
                <span className={`flex items-center ${
                  getStatus(selectedAssignment.deadline) === 'Overdue' 
                    ? 'text-red-600' 
                    : 'text-yellow-600'
                }`}>
                  {getStatus(selectedAssignment.deadline) === 'Overdue' ? (
                    <FiAlertCircle className="mr-1" />
                  ) : (
                    <FiCheckCircle className="mr-1" />
                  )}
                  {getStatus(selectedAssignment.deadline)}
                </span>
              </p>
              <p>
                <span className="font-medium w-24">Deadline:</span>
                {formatDeadline(selectedAssignment.deadline)}
              </p>
              <p>
                <span className="font-medium w-24">Course:</span>
                {selectedAssignment.course}
              </p>
              <p>
                <span className="font-medium w-24">Instructor:</span>
                {selectedAssignment.instructor}
              </p>
            </div>
            <div className="mt-6 flex space-x-3">
              <button 
                className="flex-1 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors"
                onClick={() => window.open(selectedAssignment.link, '_blank')}
              >
                Submit Assignment
              </button>
              <button 
                className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg transition-colors"
                onClick={() => setSelectedAssignment(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )} */}
    </>
  );
};

export default AssignmentsCard;