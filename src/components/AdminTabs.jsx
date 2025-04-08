import { FaCalendarPlus, FaFileAlt, FaClipboardList, FaLink } from "react-icons/fa";

const AdminTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
        activeTab === "meetings" ? "bg-gray-900 text-white border-b-2 border-gray-900" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab("meetings")}
    >
      <FaCalendarPlus /> Create Meeting
    </button>
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
        activeTab === "notes" ? "bg-gray-900 text-white border-b-2 border-gray-900" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab("notes")}
    >
      <FaFileAlt /> Add Notes
    </button>
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
        activeTab === "tests" ? "bg-gray-900 text-white border-b-2 border-gray-900" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab("tests")}
    >
      <FaClipboardList /> Schedule Test
    </button>
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-colors ${
        activeTab === "assignments" ? "bg-gray-900 text-white border-b-2 border-gray-900" : "text-gray-600 hover:bg-gray-100"
      }`}
      onClick={() => setActiveTab("assignments")}
    >
      <FaLink /> Schedule Assignment
    </button>
  </div>
);

export default AdminTabs;