import { useState } from 'react';
import { Link } from 'react-router-dom';
import { testQuestions, testDetails } from '../data/testData';
import Timer from '../components/Timer';
import SuccessModal from '../components/SuccessModal';

const TestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(Array(testQuestions.length).fill(null));
  const [showModal, setShowModal] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestion] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    setShowModal(true);
  };

  const calculateScore = () => {
    let score = 0;
    selectedOptions.forEach((selected, index) => {
      if (selected === testQuestions[index].correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  // Save results to localStorage before redirecting
  if (showModal) {
    localStorage.setItem('testResults', JSON.stringify({
      score: calculateScore(),
      totalQuestions: testQuestions.length,
      selectedOptions,
      questions: testQuestions
    }));
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      
      <header className="bg-black text-white py-6 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{testDetails.title}</h1>
            <p className="mt-2">Total Questions: {testDetails.totalQuestions}</p>
          </div>
          <Timer initialTime={testDetails.duration} onTimeUp={handleTimeUp} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200">
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">
                Question {currentQuestion + 1} of {testQuestions.length}
              </span>
              <span className="text-sm font-medium">
                {timeUp ? "Time's up!" : "Time remaining"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-black h-2.5 rounded-full" 
                style={{ width: `${((currentQuestion + 1) / testQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              {testQuestions[currentQuestion].question}
            </h2>
            
            {/* Options */}
            <div className="space-y-3">
              {testQuestions[currentQuestion].options.map((option, index) => (
                <div 
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedOptions[currentQuestion] === index 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 hover:border-black'
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <div>
              {currentQuestion > 0 && (
                <button
                  onClick={handlePrevQuestion}
                  className="bg-white text-black border border-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-all"
                >
                  Previous
                </button>
              )}
            </div>
            
            <div className="flex space-x-4">
              <Link 
                to="/dashboard" 
                className="bg-white text-black border border-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                Back to Dashboard
              </Link>
              
              {currentQuestion < testQuestions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all"
                  disabled={selectedOptions[currentQuestion] === null}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-black text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Study Test App</p>
        </div>
      </footer>
    </div>
  );
};

export default TestPage;