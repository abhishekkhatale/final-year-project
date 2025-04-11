import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TestResult = () => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const savedResults = sessionStorage.getItem('testResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  if (!results) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">No Test Results Found</h1>
          <Link
            to="/dashboard"
            className="text-black font-medium hover:underline transition-all"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const percentage = Math.round((results.score / results.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="bg-black text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">{results.title} - Results</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Score Summary */}
          <div className="bg-gray-50 rounded-lg shadow-md p-6 border border-gray-200 mb-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Your Score</h2>

            {/* Circular progress */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-black"
                  strokeWidth="8"
                  strokeDasharray={`${percentage * 2.51} 251`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-3xl font-bold">{percentage}%</span>
                <div className="text-sm">
                  {results.score}/{results.totalQuestions} correct
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Correct</div>
                <div className="text-2xl font-bold text-green-500">{results.score}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Incorrect</div>
                <div className="text-2xl font-bold text-red-500">
                  {results.totalQuestions - results.score}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-2xl font-bold">{results.totalQuestions}</div>
              </div>
            </div>

            <Link
              to="/dashboard"
              className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-all"
            >
              Back to Dashboard
            </Link>
          </div>

          {/* Question Review */}
          <h2 className="text-2xl font-bold mb-4">Question Review</h2>
          <div className="space-y-6">
            {results.details.map((q, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border ${
                  q.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">Question {index + 1}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      q.isCorrect
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {q.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <p className="mb-4">{q.question}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      Your Answer
                    </div>
                    <div
                      className={`p-3 rounded ${
                        q.isCorrect
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {q.studentAnswer || "Not Answered"}
                    </div>
                  </div>
                  {!q.isCorrect && (
                    <div>
                      <div className="text-sm font-medium text-gray-600 mb-1">
                        Correct Answer
                      </div>
                      <div className="p-3 rounded bg-green-100 text-green-800">
                        {q.correctAnswer}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
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

export default TestResult;
