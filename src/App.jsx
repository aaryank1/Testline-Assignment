import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import SummaryScreen from './components/SummaryScreen';
import axios from 'axios';

const QuizApp = () => {
  const [quizState, setQuizState] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0); // Track the maximum streak
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/api/Uw5CrX");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const transformedData = {
          questions: data.questions.map((question, index) => ({
            id: question.id,
            question: question.description,
            options: question.options.map(option => option.description),
            correctAnswer: question.options.findIndex(option => option.is_correct),
            points: 10 // Assuming each question has 10 points
          }))
        };
        // Randomize the sequence of the questions
        transformedData.questions = transformedData.questions.sort(() => Math.random() - 0.5);
        setQuizData(transformedData);
      } catch (error) {
        console.error('Fetch error:', error);
        setQuizData({ questions: [] }); // Set an empty quiz data to avoid null errors
      }
    };

    fetchQuizData();
  }, []);

  useEffect(() => {
    let timer;
    if (quizState === 'active' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [timeLeft, quizState]);

  const startQuiz = () => {
    if (quizData) {
      const randomizedQuestions = quizData.questions.sort(() => Math.random() - 0.5);
      setQuizData({ ...quizData, questions: randomizedQuestions });
    }
    setQuizState('active');
    setTimeLeft(30);
    setScore(0);
    setCurrentQuestion(0);
    setAnswers([]);
    setStreak(0);
    setMaxStreak(0); // Reset max streak
  };

  const quitQuiz = () => {
    setQuizState('complete');
  };

  const handleAnswer = (selectedOption) => {
    const currentQ = quizData.questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    let points = isCorrect ? currentQ.points : 0;
    if (isCorrect) {
      points += Math.floor(timeLeft / 2);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(maxStreak => Math.max(maxStreak, newStreak)); // Update max streak
        return newStreak;
      });
      points += streak * 2;
    } else {
      setStreak(0);
    }

    setScore(prev => prev + points);
    setAnswers(prev => [...prev, {
      questionId: currentQ.id,
      selectedOption: selectedOption !== null ? currentQ.options[selectedOption] : 'Not Attempted',
      correctAnswer: currentQ.options[currentQ.correctAnswer],
      isCorrect,
      points
    }]);

    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const currentQ = quizData.questions[currentQuestion];
    if (timeLeft === 0 && !answers.some(answer => answer.questionId === currentQ.id)) {
      setAnswers(prev => [...prev, {
        questionId: currentQ.id,
        selectedOption: 'Not Attempted',
        correctAnswer: currentQ.options[currentQ.correctAnswer],
        isCorrect: false,
        points: 0
      }]);
    }

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
    } else {
      setQuizState('complete');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {quizState === 'start' && <StartScreen startQuiz={startQuiz} />}
      {quizState === 'active' && quizData && quizData.questions.length > 0 && (
        <>
          <QuestionScreen
            question={quizData.questions[currentQuestion]}
            currentQuestion={currentQuestion}
            totalQuestions={quizData.questions.length}
            timeLeft={timeLeft}
            score={score}
            streak={streak}
            handleAnswer={handleAnswer}
          />
          <div className="text-center mt-6">
            <button 
              onClick={quitQuiz}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
            >
              Quit
            </button>
          </div>
        </>
      )}
      {quizState === 'complete' && quizData && quizData.questions.length > 0 && (
        <SummaryScreen
          score={score}
          answers={answers}
          totalQuestions={quizData.questions.length}
          startQuiz={startQuiz}
          streak={maxStreak} // Pass max streak to summary screen
        />
      )}
      {quizState === 'active' && quizData && quizData.questions.length === 0 && (
        <div className="text-center text-red-500">Failed to load quiz data.</div>
      )}
    </div>
  );
};

export default QuizApp;