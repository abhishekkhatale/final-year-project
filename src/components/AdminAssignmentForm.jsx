"use client"
import { FaLink, FaQuestionCircle, FaUserTie } from "react-icons/fa";

const AdminAssignmentForm = ({ newAssignment, setNewAssignment, handleAddAssignment }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Schedule an Assignment</h2>
        <button className="text-gray-500 hover:text-gray-700" title="Help">
          <FaQuestionCircle size={18} />
        </button>
      </div>
      <form onSubmit={handleAddAssignment} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Assignment Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={newAssignment.title}
            onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
            placeholder="Introduction to Data Structures"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Course</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={newAssignment.course}
            onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
            placeholder="CS101"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Instructor</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUserTie className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={newAssignment.instructor}
              onChange={(e) => setNewAssignment({ ...newAssignment, instructor: e.target.value })}
              placeholder="Dr. John Doe"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Description</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 min-h-[150px]"
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            placeholder="Complete the exercises on arrays and linked lists."
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Assignment Link</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLink className="text-gray-400" />
            </div>
            <input
              type="url"
              className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={newAssignment.link}
              onChange={(e) => setNewAssignment({ ...newAssignment, link: e.target.value })}
              placeholder="https://example.com/datastructures.pdf"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Deadline</label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={newAssignment.deadline}
            onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })}
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm"
          >
            <FaLink /> Schedule Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAssignmentForm;