"use client"
import { FaClipboardList, FaQuestionCircle, FaPlus, FaTrash } from "react-icons/fa";

const AdminTestForm = ({ 
  newTest, 
  setNewTest, 
  handleAddTest, 
  handleAddQuestion, 
  handleRemoveQuestion, 
  handleQuestionChange 
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Schedule a Test</h2>
        <button className="text-gray-500 hover:text-gray-700" title="Help">
          <FaQuestionCircle size={18} />
        </button>
      </div>
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
                      onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
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
            className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors shadow-sm"
          >
            <FaClipboardList /> Schedule Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminTestForm;