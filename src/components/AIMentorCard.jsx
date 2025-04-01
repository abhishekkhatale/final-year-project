import { FiAward } from 'react-icons/fi';

const AIMentorCard = () => (
  <div className="md:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-black">AI Mentor</h2>
      <div className="bg-black p-2 rounded-lg">
        <FiAward className="text-white" />
      </div>
    </div>
    <div className="space-y-4">
      <p className="text-gray-600">
        Generate a personalized study roadmap based on your current progress and goals.
      </p>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-black mb-2">Suggested Focus Areas:</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Neural Network Architectures (Priority)</li>
          <li>Machine Learning Fundamentals</li>
          <li>Python Programming Practice</li>
          <li>Mathematics for AI</li>
        </ul>
      </div>
      <button className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center">
        <FiAward className="mr-2" />
        Generate Roadmap
      </button>
    </div>
  </div>
);

export default AIMentorCard;