import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, X } from 'lucide-react';

const questions = [
  {
    id: 1,
    type: 'multiple',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris'
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars'
  },
  {
    id: 3,
    type: 'multiple',
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctAnswer: 'Leonardo da Vinci'
  },
  {
    id: 4,
    type: 'multiple',
    question: 'What is the largest mammal in the world?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
    correctAnswer: 'Blue Whale'
  },
  {
    id: 5,
    type: 'multiple',
    question: 'Which of these is not a primary color?',
    options: ['Red', 'Blue', 'Yellow', 'Green'],
    correctAnswer: 'Green'
  },
  {
    id: 6,
    type: 'identification',
    question: 'What is the chemical symbol for gold?',
    correctAnswer: 'Au'
  },
  {
    id: 7,
    type: 'identification',
    question: 'Who wrote the play "Romeo and Juliet"?',
    correctAnswer: 'William Shakespeare'
  },
  {
    id: 8,
    type: 'identification',
    question: 'What year did World War II end?',
    correctAnswer: '1945'
  },
  {
    id: 9,
    type: 'identification',
    question: 'What is the largest organ in the human body?',
    correctAnswer: 'Skin'
  },
  {
    id: 10,
    type: 'identification',
    question: 'What is the capital of Japan?',
    correctAnswer: 'Tokyo'
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResults) {
      setShowResults(true);
    }
  }, [timeLeft, showResults]);

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer.toLowerCase() === userAnswers[index].toLowerCase()) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const questionVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  if (showResults) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-100 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Quiz Results</h2>
          <p className="text-xl mb-4 text-center">Your score: {score} out of {questions.length}</p>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="border-b pb-2">
                <p className="font-semibold">{index + 1}. {question.question}</p>
                <p className="text-sm">Your answer: <span className={userAnswers[index].toLowerCase() === question.correctAnswer.toLowerCase() ? 'text-green-600' : 'text-red-600'}>{userAnswers[index] || 'Not answered'}</span></p>
                <p className="text-sm">Correct answer: <span className="text-green-600">{question.correctAnswer}</span></p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Question {currentQuestion + 1}/{questions.length}</h2>
          <p className="text-xl font-semibold">{formatTime(timeLeft)}</p>
        </div>
        <motion.div
          key={currentQuestion}
          variants={questionVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg mb-4">{currentQuestionData.question}</p>
          {currentQuestionData.type === 'multiple' ? (
            <div className="space-y-2">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-2 text-left rounded ${
                    userAnswers[currentQuestion] === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={userAnswers[currentQuestion]}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Type your answer here"
            />
          )}
        </motion.div>
        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft size={24} />
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={handleNext}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}