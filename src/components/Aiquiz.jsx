import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { Link } from 'react-router-dom';

function Aiquiz() {
  const { questions } = useContext(Context);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    console.log("Questions from Gemini:", questions);
  }, [questions]);

  useEffect(() => {
    // Shuffle options only when the question changes
    if (questions.length > 0 && currentQuestion < questions.length) {
      const q = questions[currentQuestion];
      const options = [
        q.rightoption,
        q.wrongoption1,
        q.wrongoption2,
        q.wrongoption3,
      ].sort(() => Math.random() - 0.5);
      setShuffledOptions(options);
    }
  }, [currentQuestion, questions]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    const correct = questions[currentQuestion]?.rightoption;
    if (selectedOption === correct) {
      setScore(prev => prev + 1);
    }

    setSelectedOption('');

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-black bg-white h-screen flex items-center justify-center text-xl font-semibold">
        Loading quiz...
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="bg-white text-black min-h-screen flex flex-col justify-center items-center p-6">
        <h2 className="text-3xl font-bold mb-6">Quiz Completed ✅</h2>
        <p className="text-xl">Your Score:</p>
        <p className="text-5xl font-extrabold my-4">{score} / {questions.length}</p>
        <Link to = "/dashboard">
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
          }}
          className="mt-6 px-6 py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition"
        >
          Go to Dashboard
        </button>
        </Link>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="bg-white text-black min-h-screen p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl border border-black rounded-xl p-6 sm:p-8 shadow-md">
        <h2 className="text-sm font-medium mb-2 text-gray-500">
          Question {currentQuestion + 1} / {questions.length}
        </h2>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">{q.question}</h1>

        <div className="space-y-4">
          {shuffledOptions.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(opt)}
              className={`w-full text-left px-4 py-3 border border-black rounded-xl transition duration-200
                ${
                  selectedOption === opt
                    ? 'bg-black text-white font-bold'
                    : 'hover:bg-[#3f3f3f] hover:text-white'
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Link className="px-6 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed" to="/dashboard">
            Go to dashboard
          </Link>
          <button
            onClick={handleNext}
            disabled={!selectedOption}
            className="px-6 py-3 rounded-full border border-black text-black hover:bg-black hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {currentQuestion + 1 === questions.length ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Aiquiz;