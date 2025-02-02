import React from 'react';

const QuestionScreen = ({
  question,
  currentQuestion,
  totalQuestions,
  timeLeft,
  score,
  streak,
  handleAnswer
}) => (
  <div className="bg-white rounded-lg p-6 max-w-xl mx-auto mt-8 shadow-lg">
    <div className="flex justify-between items-center mb-4">
      <span className="text-sm text-gray-600">
        Question {currentQuestion + 1}/{totalQuestions}
      </span>
      <span className="text-sm text-gray-600 flex items-center">
        ⏱️ {timeLeft}s
      </span>
    </div>

    {/* Progress bar */}
    <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
      <div 
        className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
        style={{ width: `${(timeLeft / 30) * 100}%` }}
      />
    </div>

    <h2 className="text-xl font-semibold mb-6">
      {question.question}
    </h2>

    <div className="space-y-3">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(index)}
          className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        >
          {option}
        </button>
      ))}
    </div>

    <div className="flex justify-between mt-6 text-gray-600">
      <span className="flex items-center">🏆 Score: {score}</span>
      <span className="flex items-center">🔥 Streak: {streak}</span>
    </div>
  </div>
);

export default QuestionScreen;
