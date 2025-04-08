"use client"
import { FaFileAlt, FaQuestionCircle } from "react-icons/fa";

const AdminNoteForm = ({ newNote, setNewNote, handleAddNote }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Add Study Notes</h2>
        <button className="text-gray-500 hover:text-gray-700" title="Help">
          <FaQuestionCircle size={18} />
        </button>
      </div>
      <form onSubmit={handleAddNote} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Note Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            placeholder="Data Structures: Binary Trees"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Course</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={newNote.course}
            onChange={(e) => setNewNote({ ...newNote, course: e.target.value })}
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
          <label className="block text-gray-700 mb-2 font-medium">Content</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 min-h-[200px]"
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            placeholder="Enter detailed notes here..."
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm"
          >
            <FaFileAlt /> Add Notes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminNoteForm;