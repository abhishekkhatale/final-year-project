import { FiUser } from 'react-icons/fi';

const UserProfileCard = () => (
  <div className="md:col-span-3 bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex items-center space-x-4">
      <div className="bg-black p-3 rounded-full">
        <FiUser className="text-white text-2xl" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-black">John Doe</h2>
        <p className="text-gray-600">Computer Science with AI Specialization</p>
        <p className="text-gray-500 text-sm">3rd Year</p>
      </div>
    </div>
  </div>
);

export default UserProfileCard;