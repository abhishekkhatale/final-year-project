"use client"
import { FaClipboardList, FaQuestionCircle, FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";
import axios from "../utils/Axios";

const AdminTestForm = () => {
  const [newTest, setNewTest] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    questions: [
      {
        question: "",
        answer: "", // Added answer field
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAddQuestion = () => {
    if (newTest.questions.length >= 5) return;
    
    setNewTest({
      ...newTest,
      questions: [
        ...newTest.questions,
        {
          question: "",
          answer: "", // Added answer field
          options: ["", "", "", ""],
          correctAnswer: 0,
        },
      ],
    });
  };

  const handleRemoveQuestion = (index) => {
    if (newTest.questions.length <= 1) return;
    
    const updatedQuestions = [...newTest.questions];
    updatedQuestions.splice(index, 1);
    setNewTest({
      ...newTest,
      questions: updatedQuestions,
    });
  };

  const handleQuestionChange = (qIndex, field, value) => {
    const updatedQuestions = [...newTest.questions];
    
    if (field.startsWith("option-")) {
      const optionIndex = parseInt(field.split("-")[1]);
      updatedQuestions[qIndex].options[optionIndex] = value;
    } else {
      updatedQuestions[qIndex][field] = field === "correctAnswer" ? parseInt(value) : value;
    }
    
    setNewTest({
      ...newTest,
      questions: updatedQuestions,
    });
  };

  const handleAddTest = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    
    try {
      const testData = {
        title: newTest.title,
        date: newTest.date,
        time: newTest.time,
        duration: newTest.duration,
        ...newTest.questions.reduce((acc, question, index) => ({
          ...acc,
          [`question${index + 1}`]: {
            title: question.question,
            answer: question.answer, // Include answer in submission
            options: question.options,
            correctAnswer: question.correctAnswer
          }
        }), {})
      };

      await axios.post("/Test/create", testData);
      
      setNewTest({
        title: "",
        date: "",
        time: "",
        duration: "",
        questions: [{
          question: "",
          answer: "", // Reset answer field
          options: ["", "", "", ""],
          correctAnswer: 0,
        }],
      });
      
      setError("Test scheduled successfully!");
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to schedule test");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Schedule a Test</h2>
        <button className="text-gray-500 hover:text-gray-700" title="Help">
          <FaQuestionCircle size={18} />
        </button>
      </div>

      {error && (
        <div className={`mb-4 p-3 rounded-md text-sm ${
          error.includes("success") 
            ? "bg-green-100 text-green-600" 
            : "bg-red-100 text-red-600"
        }`}>
          {error}
        </div>
      )}

      <form onSubmit={handleAddTest} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Test Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            value={newTest.title}
            onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
            placeholder="Midterm Exam - Data Structures"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={newTest.date}
              onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Time</label>
            <input
              type="time"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={newTest.time}
              onChange={(e) => setNewTest({ ...newTest, time: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium">Duration (minutes)</label>
            <input
              type="number"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              value={newTest.duration}
              onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })}
              placeholder="90"
              required
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Test Questions (Max 5)</h3>
            <button
              type="button"
              className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-sm ${
                newTest.questions.length >= 5
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              } transition-colors`}
              onClick={handleAddQuestion}
              disabled={newTest.questions.length >= 5}
            >
              <FaPlus /> Add Question
            </button>
          </div>

          {newTest.questions.map((question, qIndex) => (
            <div key={qIndex} className="border border-gray-200 rounded-lg p-4 space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-gray-900">Question {qIndex + 1}</h4>
                {newTest.questions.length > 1 && (
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => handleRemoveQuestion(qIndex)}
                    title="Remove question"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">Question Text</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)}
                  placeholder="What is the time complexity of binary search?"
                  required
                />
              </div>

              {/* Added Answer Field */}
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Correct Answer</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={question.answer}
                  onChange={(e) => handleQuestionChange(qIndex, "answer", e.target.value)}
                  placeholder="Answer"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="block text-gray-700 mb-2 font-medium">Options</label>
                {question.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-3">
                    <input
                      type="radio"
                      className="text-gray-700 focus:ring-gray-500"
                      name={`correct-answer-${qIndex}`}
                      value={oIndex}
                      checked={question.correctAnswer === oIndex}
                      onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", parseInt(e.target.value))}
                      required
                    />
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                      value={option}
                      onChange={(e) => handleQuestionChange(qIndex, `option-${oIndex}`, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className={`flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scheduling...
              </>
            ) : (
              <>
                <FaClipboardList /> Schedule Test
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTestForm;