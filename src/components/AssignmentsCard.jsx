import { FiBook, FiAlertCircle } from 'react-icons/fi';

const AssignmentsCard = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-black">Pending Assignments</h2>
      <div className="bg-black p-2 rounded-lg">
        <FiBook className="text-white" />
      </div>
    </div>
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-black">Neural Network Implementation</h3>
          <span className="flex items-center text-sm text-red-600">
            <FiAlertCircle className="mr-1" /> Pending
          </span>
        </div>
        <p className="text-gray-600">Deadline: Today, 11:59 PM</p>
        <button className="mt-2 w-full bg-black hover:bg-gray-900 text-white border border-black py-2 px-4 rounded-lg transition-colors">
          View
        </button>
      </div>
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-black">Research Paper Review</h3>
          <span className="flex items-center text-sm text-red-600">
            <FiAlertCircle className="mr-1" /> Pending
          </span>
        </div>
        <p className="text-gray-600">Deadline: Tomorrow, 5:00 PM</p>
        <button className="mt-2 w-full bg-black hover:bg-gray-900 text-white border border-black py-2 px-4 rounded-lg transition-colors">
          View
        </button>
      </div>
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-black">Database Design Project</h3>
          <span className="flex items-center text-sm text-red-600">
            <FiAlertCircle className="mr-1" /> Pending
          </span>
        </div>
        <p className="text-gray-600">Deadline: In 3 days</p>
        <button className="mt-2 w-full bg-black hover:bg-gray-900 text-white border border-black py-2 px-4 rounded-lg transition-colors">
          View
        </button>
      </div>
    </div>
  </div>
);

export default AssignmentsCard;