import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../utils/Axios';

const LectureCard = () => {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/lectures/');
        setLectures(response.data.lectures);
        setError(null);
      } catch (err) {
        setError('Failed to fetch lectures');
        console.error('Error fetching lectures:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  const isLectureActive = (lecture) => {
    const now = new Date();
    const [hours, minutes] = lecture.time.split(':').map(Number);
    const lectureDate = new Date(lecture.date);
    lectureDate.setHours(hours, minutes, 0, 0);
    
    // Check if lecture is within 30 minutes before or after the scheduled time
    const timeDiff = Math.abs(now - lectureDate);
    return timeDiff <= 30 * 60 * 1000; // 30 minutes in milliseconds
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Today's Lecture</h2>
          <div className="bg-black p-2 rounded-lg">
            <FiClock className="text-white" />
          </div>
        </div>
        <p className="text-gray-600">Loading lectures...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Today's Lecture</h2>
          <div className="bg-black p-2 rounded-lg">
            <FiClock className="text-white" />
          </div>
        </div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  const todayLectures = lectures.filter(lecture => lecture.date === today);

  if (todayLectures.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-black">Today's Lecture</h2>
          <div className="bg-black p-2 rounded-lg">
            <FiClock className="text-white" />
          </div>
        </div>
        <p className="text-gray-600">No lectures scheduled for today</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-black">Today's Lecture</h2>
        <div className="bg-black p-2 rounded-lg">
          <FiClock className="text-white" />
        </div>
      </div>
      <div className="space-y-4">
        {todayLectures.map((lecture) => (
          <div key={lecture._id} className="space-y-4">
            <h3 className="font-medium text-black">{lecture.title}</h3>
            <p className="text-gray-600 flex items-center">
              <FiClock className="mr-2 text-black" />
              {lecture.time}
            </p>
            <p className="text-gray-600">Instructor: {lecture.instructor}</p>
            <Link to={`/meeting/${lecture._id}`}>
              <button 
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  isLectureActive(lecture)
                    ? 'bg-black hover:bg-gray-800 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isLectureActive(lecture)}
              >
                {isLectureActive(lecture) ? 'Attend Lecture' : 'Lecture Not Started'}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LectureCard;