import { FiCalendar } from 'react-icons/fi';

const TestsCard = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-black">Upcoming Tests</h2>
      <div className="bg-black p-2 rounded-lg">
        <FiCalendar className="text-white" />
      </div>
    </div>
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h3 className="font-medium text-black">Data Structures Quiz</h3>
        <p className="text-gray-600 flex items-center">
          <FiCalendar className="mr-2 text-black" />
          Today, 2:00 PM
        </p>
        <p className="text-gray-600">Duration: 45 minutes</p>
        <button className="mt-2 w-full bg-black hover:bg-gray-800 text-white border border-black py-2 px-4 rounded-lg transition-colors">
          Start Test
        </button>
      </div>
      <div>
        <h3 className="font-medium text-black">Machine Learning Mid-term</h3>
        <p className="text-gray-600 flex items-center">
          <FiCalendar className="mr-2 text-black" />
          Tomorrow, 10:00 AM
        </p>
        <p className="text-gray-600">Duration: 2 hours</p>
        <button className="mt-2 w-full bg-black hover:bg-gray-800 text-white border border-black py-2 px-4 rounded-lg transition-colors">
          Start Test
        </button>
      </div>
    </div>
  </div>
);

export default TestsCard;