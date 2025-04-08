import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const LectureCard = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-black">Today's Lecture</h2>
      <div className="bg-black p-2 rounded-lg">
        <FiClock className="text-white" />
      </div>
    </div>
    <div className="space-y-4">
      <h3 className="font-medium text-black">Introduction to Neural Networks</h3>
      <p className="text-gray-600 flex items-center">
        <FiClock className="mr-2 text-black" />
        10:00 AM - 11:30 AM
      </p>
      <p className="text-gray-600">Instructor: Dr. Sarah Johnson</p>
      <Link to="/meeting">
      <button className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-colors">
        Attend Lecture
      </button></Link>
    </div>
  </div>
);

export default LectureCard;