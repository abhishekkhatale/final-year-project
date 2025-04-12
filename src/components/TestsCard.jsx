import React, { useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/Axios';

const TestsCard = () => {
  const [tests, setTests] = useState([]);
  const [startedTests, setStartedTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTests();

    //  Load started tests from sessionStorage if available
    const savedStarted = sessionStorage.getItem('startedTests');
    if (savedStarted) {
      setStartedTests(JSON.parse(savedStarted));
    }
  }, []);

  const fetchTests = async () => {
    try {
      const response = await axios.get('/Test/alltest');
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  const handleStartTest = (testId) => {
    const updatedStartedTests = [...startedTests, testId];
    setStartedTests(updatedStartedTests);

    //  Save to sessionStorage
    sessionStorage.setItem('startedTests', JSON.stringify(updatedStartedTests));

    navigate(`/test/${testId}`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-black">Upcoming Tests</h2>
        <div className="bg-black p-2 rounded-lg">
          <FiCalendar className="text-white" />
        </div>
      </div>

      <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
        {tests.map((test) => {
          const startDate = new Date(test.date);
          if (test.time) {
            const [hours, minutes] = test.time.split(':').map(Number);
            startDate.setHours(hours);
            startDate.setMinutes(minutes);
          }
          const dateStr = startDate.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });
          const timeStr = startDate.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          });

          const isStarted = startedTests.includes(test._id);

          return (
            <div key={test._id} className="border-b border-gray-200 pb-4">
              <h3 className="font-medium text-black">{test.title}</h3>
              <p className="text-gray-600 flex items-center">
                <FiCalendar className="mr-2 text-black" />
                {dateStr}, {timeStr}
              </p>
              <p className="text-gray-600">Duration: {test.duration} minutes</p>
              <button
                onClick={() => handleStartTest(test._id)}
                disabled={isStarted}
                className={`mt-2 w-full text-white py-2 px-4 rounded-lg transition-colors border 
                  ${isStarted
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800 border-black'}
                `}
              >
                {isStarted ? 'Test Started' : 'Start Test'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TestsCard;
