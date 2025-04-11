import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from '../utils/Axios';
import Timer from '../components/Timer';
import SuccessModal from '../components/SuccessModal';

const TestPage = () => {
  const [testDetails, setTestDetails] = useState({});
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await axios.get(`/Test/${id}`);
        const data = res.data;

        if (!data || !data.title || !data.duration) {
          console.error("Invalid test data:", data);
          return;
        }

        const questionFields = ['question1', 'question2', 'question3', 'question4', 'question5'];
        const questions = questionFields
          .map(field => data[field]?.[0])
          .filter(Boolean);

        setTestDetails({
          title: data.title,
          totalQuestions: questions.length,
          duration: parseInt(data.duration)
        });

        setTestQuestions(questions);
        setSelectedOptions(Array(questions.length).fill(null));
      } catch (err) {
        console.error("Error fetching test data:", err);
      }
    };

    fetchTest();
  }, [id]);

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

  const handleTimeUp = () => {
    setTimeUp(true);
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const studentAnswers = selectedOptions.map((index, i) => {
        return index !== null ? testQuestions[i].options[index] : "";
      });

      const res = await axios.post('/Test/calculate-test', {
        testId: id,
        studentAnswers
      });

      const { score, details } = res.data;

      sessionStorage.setItem("testResults", JSON.stringify({
        score,
        details,
        totalQuestions: testQuestions.length,
        title: testDetails.title,
        selectedOptions,
        questions: testQuestions
      }));

      setShowModal(true);

      setTimeout(() => {
        navigate('/result');
      }, 2000);
    } catch (err) {
      console.error("Error submitting test:", err);
      alert("Failed to submit test. Try again.");
    }
  };

  if (!testQuestions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading test...</p>
      </div>
    );
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

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">
              {testQuestions[currentQuestion].title}
            </h2>
            
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

      
    </div>
  );
};

export default TestPage;
