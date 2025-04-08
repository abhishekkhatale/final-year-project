"use client"
import { FaLink, FaQuestionCircle } from "react-icons/fa";

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
            placeholder="Binary Search Tree Implementation"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Course</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={newAssignment.course}
            onChange={(e) => setNewAssignment({ ...newAssignment, course: e.target.value })}
            required
          >
            <option value="">Select Course</option>
            <option value="cs101">CS101: Introduction to Computer Science</option>
            <option value="cs201">CS201: Data Structures and Algorithms</option>
            <option value="cs301">CS301: Machine Learning</option>
            <option value="cs401">CS401: Neural Networks</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Description</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 min-h-[150px]"
            value={newAssignment.description}
            onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
            placeholder="Implement a binary search tree with insert, delete, and search operations..."
            required
          />
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