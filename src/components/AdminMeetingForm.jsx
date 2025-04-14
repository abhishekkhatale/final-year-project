"use client"
import { FaCalendarPlus, FaQuestionCircle } from "react-icons/fa";

const AdminMeetingForm = ({ newMeeting, setNewMeeting, handleAddMeeting }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Schedule a Lecture</h2>
        <button className="text-gray-500 hover:text-gray-700" title="Help">
          <FaQuestionCircle size={18} />
        </button>
      </div>
      <form onSubmit={handleAddMeeting} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Lecture Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            value={newMeeting.title}
            onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
            placeholder="Data Structures and Algorithms"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={newMeeting.date}
              onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Time</label>
            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={newMeeting.time}
              onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">Instructor</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500"
            value={newMeeting.instructor}
            onChange={(e) => setNewMeeting({ ...newMeeting, instructor: e.target.value })}
            placeholder="Prof. Deepa Mishra"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm"
          >
            <FaCalendarPlus /> Schedule Meeting
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminMeetingForm;