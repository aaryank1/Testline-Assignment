import React from 'react';

const SummaryScreen = ({ score, answers, totalQuestions, startQuiz, streak }) => (
  <div className="bg-white rounded-lg p-6 max-w-xl mx-auto mt-8 shadow-lg">
    <div className="text-center mb-8">
      <span className="text-6xl mb-4 block">🏆</span>
      <h2 className="text-2xl font-bold mb-2">
        Quiz Complete!
      </h2>
      <p className="text-xl mb-2">
        Final Score: {score}
      </p>
      <p className="text-xl mb-2 flex justify-center items-center">
        🔥 Streak: {streak}
      </p>
      <p className="text-gray-600">
        You answered {answers.filter(a => a.isCorrect).length} out of {totalQuestions} questions correctly
      </p>
    </div>

    <div className="space-y-4">
      {answers.map((answer, index) => (
        <div key={index} className="bg-gray-50 p-4 rounded-lg">
          <p className="font-medium">Question {index + 1}</p>
          <p className="text-sm text-gray-600">
            {answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}
          </p>
          <p className="text-sm">Selected Option: {answer.selectedOption !== 'Not Attempted' ? answer.selectedOption : 'Not Attempted'}</p>
          <p className="text-sm">Correct Option: {answer.correctAnswer}</p>
          <p className="text-sm">Points earned: {answer.points}</p>
        </div>
      ))}
    </div>

    <div className="text-center mt-6">
      <button 
        onClick={startQuiz}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors mr-4 cursor-pointer"
      >
        Try Again
      </button>
      <button 
        onClick={() => window.location.reload()}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
      >
        Quit
      </button>
    </div>
  </div>
);

export default SummaryScreen;
