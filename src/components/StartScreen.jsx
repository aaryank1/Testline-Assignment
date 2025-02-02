import React from 'react';

const StartScreen = ({ startQuiz }) => (
  <div className="bg-white rounded-lg p-6 max-w-xl mx-auto mt-8 shadow-lg">
    <h1 className="text-2xl font-bold text-center mb-4">
      Welcome to the Quiz!
    </h1>
    <p className="text-center mb-4 text-gray-600">
      Test your knowledge and earn points!
    </p>
    <ul className="space-y-2 mb-6">
      <li className="flex items-center">✨ Answer quickly for bonus points</li>
      <li className="flex items-center">🔥 Maintain a streak for multipliers</li>
      <li className="flex items-center">⏱️ 30 seconds per question</li>
    </ul>
    <div className="text-center">
      <button 
        onClick={startQuiz}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
      >
        Start Quiz
      </button>
    </div>
  </div>
);

export default StartScreen;
