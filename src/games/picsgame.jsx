import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Home, Shuffle, X } from 'lucide-react';

const originalQuestions = [
  { 
    images: [
      './images/picsgame/q1/1.jpg',
      './images/picsgame/q1/2.jfif',
      './images/picsgame/q1/3.jpg',
      './images/picsgame/q1/4.jfif'
    ],
    answer: 'MANG PADONG'
  },
  { 
    images: [
      './images/picsgame/q2/1.jpg',
      './images/picsgame/q2/2.avif',
      './images/picsgame/q2/3.jpg',
      './images/picsgame/q2/4.webp'
    ],
    answer: 'FIBONACCI'
  },
  { 
    images: [
      './images/picsgame/q3/1.jpg',
      './images/picsgame/q3/2.jpg',
      './images/picsgame/q3/3.jpg',
      './images/picsgame/q3/4.webp'
    ],
    answer: 'BILYAR'
  },
  { 
    images: [
      './images/picsgame/q4/1.jfif',
      './images/picsgame/q4/2.jpg',
      './images/picsgame/q4/3.jfif',
      './images/picsgame/q4/4.jpg'
    ],
    answer: 'PAA NI MAKENG'
  },
  { 
    images: [
      './images/picsgame/q5/1.jpg',
      './images/picsgame/q5/2.jfif',
      './images/picsgame/q5/3.jpg',
      './images/picsgame/q5/4.png'
    ],
    answer: 'TAMBAY'
  },
  { 
    images: [
      './images/picsgame/q6/1.jpg',
      './images/picsgame/q6/2.webp',
      './images/picsgame/q6/3.jfif',
      './images/picsgame/q6/4.jpg'
    ],
    answer: 'MAMA PAM'
  },
  { 
    images: [
      './images/picsgame/q7/1.jpg',
      './images/picsgame/q7/2.jpg',
      './images/picsgame/q7/3.webp',
      './images/picsgame/q7/4.jpg'
    ],
    answer: 'BENEFITS'
  },
  { 
    images: [
      './images/picsgame/q8/1.jpg',
      './images/picsgame/q8/2.jpg',
      './images/picsgame/q8/3.jfif',
      './images/picsgame/q8/4.png'
    ],
    answer: 'CHZZ'
  },
  { 
    images: [
      './images/picsgame/q9/1.png',
      './images/picsgame/q9/2.png',
      './images/picsgame/q9/3.jpg',
      './images/picsgame/q9/4.webp'
    ],
    answer: 'RONA'
  },
  { 
    images: [
      './images/picsgame/q10/1.jfif',
      './images/picsgame/q10/2.jfif',
      './images/picsgame/q10/3.jfif',
      './images/picsgame/q10/4.png'
    ],
    answer: 'KUYA LONG HAIR'
  },
  {
    images: [
      './images/picsgame/q11/1.jpg',
      './images/picsgame/q11/1.jpg',
      './images/picsgame/q11/1.jpg',
      './images/picsgame/q11/1.jpg'
    ],
    answer: 'TAY LO'
  },
  {
    images: [
      './images/picsgame/q12/1.png',
      './images/picsgame/q12/2.jfif',
      './images/picsgame/q12/3.jfif',
      './images/picsgame/q12/4.jfif'
    ],
    answer: 'KINAKABAHAN AKO'
  },
  {
    images: [
      './images/picsgame/q13/1.jfif',
      './images/picsgame/q13/2.jfif',
      './images/picsgame/q13/3.jfif',
      './images/picsgame/q13/4.jfif'
    ],
    answer: 'JUNIOR POLICE'
  },
  {
    images: [
      './images/picsgame/q14/1.jfif',
      './images/picsgame/q14/2.jpg',
      './images/picsgame/q14/3.jpg',
      './images/picsgame/q14/4.jpg'
    ],
    answer: 'LOLA POKPOK'
  },
  {
    images: [
      './images/picsgame/q15/1.jpg',
      './images/picsgame/q15/2.png',
      './images/picsgame/q15/3.jfif',
      './images/picsgame/q15/4.png'
    ],
    answer: 'PRANK'
  },
  {
    images: [
      './images/picsgame/q16/1.jfif',
      './images/picsgame/q16/2.jpg',
      './images/picsgame/q16/3.jfif',
      './images/picsgame/q16/4.jpg'
    ],
    answer: 'OMSIM'
  },
  {
    images: [
      './images/picsgame/q17/1.jfif',
      './images/picsgame/q17/2.jfif',
      './images/picsgame/q17/3.jpg',
      './images/picsgame/q17/4.jfif'
    ],
    answer: 'OGERD'
  },
  {
    images: [
      './images/picsgame/q18/1.jpg',
      './images/picsgame/q18/2.jfif',
      './images/picsgame/q18/3.png',
      './images/picsgame/q18/4.jfif'
    ],
    answer: 'DON ROBERT'
  },
  {
    images: [
      './images/picsgame/q19/1.jfif',
      './images/picsgame/q19/2.webp',
      './images/picsgame/q19/3.jfif',
      './images/picsgame/q19/4.webp'
    ],
    answer: 'PAA'
  },
  {
    images: [
      './images/picsgame/q20/1.jfif',
      './images/picsgame/q20/2.jpg',
      './images/picsgame/q20/3.webp',
      './images/picsgame/q20/4.png'
    ],
    answer: 'KOLOIPNOM'
  },
  {
    images: [
      './images/picsgame/q21/1.jfif',
      './images/picsgame/q21/2.jpg',
      './images/picsgame/q21/3.jfif',
      './images/picsgame/q21/4.png'
    ],
    answer: 'KATYANG'
  },
  {
    images: [
      './images/picsgame/q22/1.jpg',
      './images/picsgame/q22/2.png',
      './images/picsgame/q22/3.jfif',
      './images/picsgame/q22/4.jfif'
    ],
    answer: 'SIPA'
  },
  {
    images: [
      './images/picsgame/q23/1.png',
      './images/picsgame/q23/2.jpg',
      './images/picsgame/q23/3.jpeg',
      './images/picsgame/q23/4.jfif'
    ],
    answer: 'JAYRO'
  },
  {
    images: [
      './images/picsgame/q24/1.jfif',
      './images/picsgame/q24/2.png',
      './images/picsgame/q24/3.jpg',
      './images/picsgame/q24/4.png'
    ],
    answer: 'PRESKO'
  },
  {
    images: [
      './images/picsgame/q25/1.jfif',
      './images/picsgame/q25/2.jpg',
      './images/picsgame/q25/3.jfif',
      './images/picsgame/q25/4.jpg'
    ],
    answer: 'MAM DEVERA'
  },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generateLetters = (answer) => {
  const answerLetters = answer.replace(/\s/g, '').split('');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const remainingLetters = alphabet.split('').filter(letter => !answerLetters.includes(letter));
  const shuffled = shuffleArray([...answerLetters, ...remainingLetters.slice(0, 26 - answerLetters.length)]);
  return shuffled;
};

const Notification = ({ children, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
      >
        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
          {children}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const NavigationButtons = ({ onBackClick, onHomeClick, gameStarted, showBonusGame }) => (
  <div className="absolute top-4 left-4 flex space-x-2">
    {(!gameStarted && !showBonusGame) && (
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onBackClick}
        className="bg-gray-700 text-gray-200 hover:bg-gray-600 p-2 rounded-full"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="sr-only">Back to Games</span>
      </motion.button>
    )}
    {(gameStarted || showBonusGame) && (
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onHomeClick}
        className="bg-gray-700 text-gray-200 hover:bg-gray-600 p-2 rounded-full"
      >
        <Home className="w-6 h-6" />
        <span className="sr-only">Back to Menu</span>
      </motion.button>
    )}
  </div>
);

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.1 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

const ImageModal = ({ isOpen, onClose, imageUrl }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="relative bg-gray-800 p-2 rounded-lg max-w-3xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={imageUrl} alt="Zoomed" className="w-full h-full object-contain" />
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white bg-gray-700 rounded-full p-1"
          >
            <X size={24} />
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4"
        >
          <h2 className="text-xl font-bold mb-4 text-white">{message}</h2>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const BonusGame = ({ onFinish, onHomeClick }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const bonusQuestions = [
    { image: '/images/picsgame/bonus/1.jpg', answer: 'digger' },
    { image: '/images/picsgame/bonus/2.jpg', answer: 'trigger' },
    { image: '/images/picsgame/bonus/3.jpg', answer: 'bigger' },
    { image: '/images/picsgame/bonus/4.jpg', answer: 'singer' },
    { image: '/images/picsgame/bonus/5.jpg', answer: 'rigger' },  
    { image: '/images/picsgame/bonus/6.jpg', answer: 'anger' }, 
    { image: '/images/picsgame/bonus/7.webp', answer: 'nagger' },
    { image: '/images/picsgame/bonus/8.webp', answer: 'farmer' },  
    { image: '/images/picsgame/bonus/9.jpg', answer: 'boxer' },  
    { image: '/images/picsgame/bonus/10.jpg', answer: 'miner' },            
  ];

  useEffect(() => {
    let interval;
    if (timer > 0 && !showCorrectAnswer && !showInstructions) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowCorrectAnswer(true);
      setTimeout(() => {
        if (currentQuestion < bonusQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setUserAnswer('');
          setTimer(10);
          setShowCorrectAnswer(false);
          setIsCorrect(false);
        } else {
          setShowResult(true);
        }
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [timer, currentQuestion, showCorrectAnswer, showInstructions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correct = userAnswer.toLowerCase() === bonusQuestions[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
    setShowCorrectAnswer(true);
    
    setTimeout(() => {
      if (currentQuestion < bonusQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setUserAnswer('');
        setTimer(10);
        setShowCorrectAnswer(false);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const handleHomeClick = () => {
    setShowConfirmation(true);
  };

  if (showInstructions) {
    return (
      <div className="text-center">
        <h2 className="text-2xl mb-4" style={{ fontFamily: 'GB Shinto' }}>Instructions</h2>
        <p className="mb-4">
          You will be shown 10 images. For each image, you have 10 seconds to guess the word. <br />
          Type your answer and submit before the timer runs out. Good luck!
        </p>
        <button
          onClick={() => setShowInstructions(false)}
          className="bg-purple-600 text-white px-4 py-2 rounded-full"
          style={{ fontFamily: 'GB Shinto' }}>
          Start
        </button>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="text-center">
        <h2 className="text-2xl mb-4" style={{ fontFamily: 'GB Shinto' }}>Bonus Game Over!</h2>
        <p className="text-xl mb-4">Your score: {score} / {bonusQuestions.length}</p>
        <button
          onClick={() => onFinish(score)}
          className="bg-purple-600 text-white px-4 py-2 rounded-full mr-4"
          style={{ fontFamily: 'GB Shinto' }}>
          Back to Main Game
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <NavigationButtons onHomeClick={handleHomeClick} gameStarted={true} showBonusGame={true} />
      <h2 className="text-2xl mb-4">Bonus Game</h2>
      <p className="mb-2">Question {currentQuestion + 1} of {bonusQuestions.length}</p>
      <p className="mb-2">Time left: {timer} seconds</p>
      <div className="relative">
        <img
          src={bonusQuestions[currentQuestion].image}
          alt={`Bonus question ${currentQuestion + 1}`}
          className="w-full max-w-md mx-auto mb-4 rounded-lg cursor-pointer"
          onClick={() => setModalOpen(true)}
        />
        {showCorrectAnswer && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="text-center">
              {isCorrect ? (
                <p className="text-4xl font-bold mb-2 text-green-400">
                  Correct!
                </p>
              ) : (
                <p className="text-4xl font-bold mb-2 text-red-400">
                  {bonusQuestions[currentQuestion].answer}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg mb-4 w-full max-w-xs"
          placeholder="Type your answer"
          disabled={showCorrectAnswer}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-full"
          disabled={showCorrectAnswer}
        >
          Submit
        </button>
      </form>
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={bonusQuestions[currentQuestion].image}
      />
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={() => {
          setShowConfirmation(false);
          onHomeClick();
        }}
        message="Are you sure you want to go back to the main menu? Your progress will be lost."
      />
    </div>
  );
};

export default function PicsGame() {
  const [questions, setQuestions] = useState(originalQuestions);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [letters, setLetters] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [timer, setTimer] = useState(180);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(0);
  const [shuffledImages, 

 setShuffledImages] = useState([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [powerupsAvailable, setPowerupsAvailable] = useState(3);
  const [nextPlayTime, setNextPlayTime] = useState(null);
  const [showBonusGame, setShowBonusGame] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nextBonusGameTime, setNextBonusGameTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    resetGame();
    const savedScores = JSON.parse(localStorage.getItem('picsGameHighScores') || '[]');
    setHighScores(savedScores);
    const savedBestScore =   localStorage.getItem('picsGameBestScore');
    setBestScore(savedBestScore ? parseInt(savedBestScore, 10) : 0);
    const savedNextPlayTime = localStorage.getItem('picsGameNextPlayTime');
    if (savedNextPlayTime) {
      setNextPlayTime(new Date(savedNextPlayTime));
    }
    const savedNextBonusGameTime = localStorage.getItem('picsGameNextBonusGameTime');
    if (savedNextBonusGameTime) {
      setNextBonusGameTime(new Date(savedNextBonusGameTime));
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0 && gameStarted) {
      const generatedLetters = generateLetters(questions[currentQuestion].answer);
      setLetters(generatedLetters);
      setUserAnswer(questions[currentQuestion].answer.split('').map(char => char === ' ' ? ' ' : ''));
      setIsCorrect(false);
      setIsWrong(false);
      setShuffledImages(shuffleArray([...questions[currentQuestion].images]));
    }
  }, [currentQuestion, questions, gameStarted]);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameOver(true);
      setShowResult(true);
      saveScore(score);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, timer, score]);

  const handleLetterClick = (letter, index) => {
    if (!letter) return;
    const emptyIndex = userAnswer.findIndex(l => l === '');
    if (emptyIndex !== -1) {
      const newUserAnswer = [...userAnswer];
      newUserAnswer[emptyIndex] = letter;
      setUserAnswer(newUserAnswer);
      const newLetters = [...letters];
      newLetters[index] = '';
      setLetters(newLetters);

      if (!newUserAnswer.includes('')) {
        checkAnswer(newUserAnswer.join(''));
      }
    }
  };

  const handleClear = (index) => {
    if (userAnswer[index] !== '' && userAnswer[index] !== ' ') {
      const newUserAnswer = [...userAnswer];
      const clearedLetter = newUserAnswer[index];
      newUserAnswer[index] = '';
      setUserAnswer(newUserAnswer);
      const newLetters = [...letters];
      const emptyIndex = newLetters.findIndex(l => l === '');
      if (emptyIndex !== -1) {
        newLetters[emptyIndex] = clearedLetter;
      } else {
        newLetters.push(clearedLetter);
      }
      setLetters(newLetters);
    }
  };

  const checkAnswer = (answer) => {
    if (answer === questions[currentQuestion].answer) {
      setScore(score + 1);
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          saveScore(score + 1);
          setShowResult(true);
        }
      }, 1500);
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
        setUserAnswer(questions[currentQuestion].answer.split('').map(char => char === ' ' ? ' ' : ''));
        setLetters(generateLetters(questions[currentQuestion].answer));
      }, 1500);
    }
  };

  const saveScore = (finalScore) => {
    const newHighScores = [...highScores, finalScore].sort((a, b) => b - a).slice(0, 5);
    setHighScores(newHighScores);
    localStorage.setItem('picsGameHighScores', JSON.stringify(newHighScores));
    if (finalScore > bestScore) {
      setBestScore(finalScore);
      localStorage.setItem('picsGameBestScore', finalScore.toString());
    }
    const newNextPlayTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
    setNextPlayTime(newNextPlayTime);
    localStorage.setItem('picsGameNextPlayTime', newNextPlayTime.toISOString());
  };

  const resetGame = () => {
    const shuffledQuestions = shuffleArray(originalQuestions);
    setQuestions(shuffledQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setGameStarted(false);
    setIsCorrect(false);
    setIsWrong(false);
    setTimer(180);
    setGameOver(false);
    setShuffledImages(shuffleArray([...shuffledQuestions[0].images]));
    setHintsUsed(0);
    setPowerupsAvailable(3);
  };

  const startGame = () => {
    if (nextPlayTime && new Date() < nextPlayTime) {
      alert(`You can play again at ${nextPlayTime.toLocaleString()}`);
      return;
    }
    setGameStarted(true);
    setShowBonusGame(false); 
    setLetters(generateLetters(questions[0].answer));
    setUserAnswer(questions[0].answer.split('').map(char => char === ' ' ? ' ' : ''));
    setShuffledImages(shuffleArray([...questions[0].images]));
    const newNextPlayTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
    setNextPlayTime(newNextPlayTime);
    localStorage.setItem('picsGameNextPlayTime', newNextPlayTime.toISOString());
  };

  const useHint = () => {
    if (hintsUsed < 3) {
      const answer = questions[currentQuestion].answer;
      const emptyIndices = userAnswer.map((letter, index) => letter === '' ? index : -1).filter(index => index !== -1);
      if (emptyIndices.length > 0) {
        const randomEmptyIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const newUserAnswer = [...userAnswer];
        newUserAnswer[randomEmptyIndex] = answer[randomEmptyIndex];
        setUserAnswer(newUserAnswer);
        setHintsUsed(hintsUsed + 1);
      }
    }
  };

  const usePowerup = () => {
    if (powerupsAvailable > 0) {
      setTimer(prevTimer => prevTimer + 30);
      setPowerupsAvailable(prevPowerups => prevPowerups - 1);
    }
  };

  const startBonusGame = () => {
    setShowBonusGame(true);
    setGameStarted(false);
    setScore(0);
  };

  const handleBonusGameFinish = (bonusScore) => {
    setShowBonusGame(false);
    setScore(prevScore => prevScore + bonusScore);
    setGameStarted(false);
    const nextBonusGame = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    setNextBonusGameTime(nextBonusGame);
    localStorage.setItem('picsGameNextBonusGameTime', nextBonusGame.toISOString());
  };

  const isBonusGameAvailable = () => {
    return !nextBonusGameTime || new Date() >= nextBonusGameTime;
  };

  const handleHomeClick = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  const confirmHomeClick = () => {
    setShowConfirmation(false);
    setGameStarted(false);
    setShowBonusGame(false);
    resetGame();
    if (!nextPlayTime || new Date() >= nextPlayTime) {
      const newNextPlayTime = new Date(Date.now() + 8 * 60 * 60 * 1000);
      setNextPlayTime(newNextPlayTime);
      localStorage.setItem('picsGameNextPlayTime', newNextPlayTime.toISOString());
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -50 }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20
  };

  if (showResult) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 font-sans relative p-4"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <NavigationButtons onBackClick={() => navigate('/games')} onHomeClick={handleHomeClick} gameStarted={gameStarted} showBonusGame={showBonusGame}/>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl p-8 w-full max-w-md"
        >
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl mb-6 text-center text-purple-400"
            style={{ fontFamily: 'GB Shinto' }}>
            Game Over!
          </motion.h2>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl mb-4 text-center"
          >
            Your score: {score}
          </motion.p>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-6 text-center"
          >
            Best score: {bestScore}
          </motion.p>
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-700 p-4 rounded-lg mb-6"
          >
            <h3 className="text-xl font-bold mb-2 text-purple-400">High Scores:</h3>
            <ul>
              {highScores.map((highScore, index) => (
                <li key={index} className="text-lg">{index + 1}. {highScore}</li>
              ))}
            </ul>
          </motion.div>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg mb-6 text-center text-yellow-400"
          >
            You can play again in 8 hours.
          </motion.p>
          <motion.button 
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/games')}
            className="w-full bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-full shadow-lg font-bold text-lg"
          >
            Back
          </motion.button>
        </motion.div>
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={confirmHomeClick}
          message="Are you sure you want to return to the main menu? Your progress will be lost."
        />
      </motion.div>
    );
  } else if (showBonusGame) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 font-sans relative p-4"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <BonusGame onFinish={handleBonusGameFinish} onHomeClick={handleHomeClick} />
      </motion.div>
    );
  } else if (!gameStarted) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-200 font-sans relative p-4"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <NavigationButtons onBackClick={() => navigate('/games')} onHomeClick={() => navigate('/')} gameStarted={gameStarted} showBonusGame={showBonusGame} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 rounded-xl p-8 w-full max-w-md"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl mb-8 text-center text-purple-400"
            style={{ fontFamily: 'GB Shinto' }}
          >
            one time <br />
            4 Pics
          </motion.h1>
          <motion.p 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl mb-8 text-center"
          >
            Best Score: {bestScore}
          </motion.p>
          <div className="space-y-4">
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={startGame}
              disabled={nextPlayTime && new Date() < nextPlayTime}
              className="w-full bg-purple-600 text-white hover:bg-purple-700 px-6 py-3 rounded-full shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {nextPlayTime && new Date() < nextPlayTime ? (
                <>
                  <span style={{ fontFamily: 'GB Shinto' }}>Play again at </span>
                  <span>{nextPlayTime.toLocaleString()}</span>
                </>
              ) : (
                <span style={{ fontFamily: 'GB Shinto' }}>Start</span>
              )}
            </motion.button>
            <motion.button 
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => setShowInstructions(true)}
              className="w-full bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full shadow-lg text-lg"
              style={{ fontFamily: 'GB Shinto' }}
            >
              Instructions
            </motion.button>
            {isBonusGameAvailable() && (
              <motion.button 
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={startBonusGame}
                className="w-full bg-yellow-600 text-white hover:bg-yellow-700 px-6 py-3 rounded-full shadow-lg text-lg"
                style={{ fontFamily: 'GB Shinto' }}
              >
                Bonus Game
              </motion.button>
            )}
          </div>
        </motion.div>
        <AnimatePresence>
          {showInstructions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setShowInstructions(false)}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="bg-gray-800 p-6 rounded-lg max-w-md w-11/12"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 
                  className="text-2xl mb-4 text-purple-400"
                  style={{ fontFamily: 'GB Shinto' }}
                >
                  How to Play
                </h2>
                <p className="text-gray-300 mb-4">
                  1. Look at the four images shown.<br/>
                  2. Guess the word/s that connects all four images.<br/>
                  3. Use the provided letters to spell out your answer.<br/>
                  4. You have 3 minutes to answer as many questions as possible.<br/>
                  5. Use hints to reveal a letter (max 3 times).<br/>
                  6. Use powerups to add 30 seconds to the timer (max 3 times).<br/>
                  7. Try to beat your best score of {bestScore}!<br/>
                  8. You can only play once every 8 hours.<br/>
                  9. The bonus game is available once a week.
                </p>
                <motion.button 
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setShowInstructions(false)}
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-full shadow-lg"
                  style={{ fontFamily: 'GB Shinto' }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  } else {
    return (
      <motion.div 
        className="flex flex-col items-center justify-start min-h-screen bg-gray-900 text-gray-200 p-4 font-sans relative"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <div className="w-full max-w-md">
          <NavigationButtons onBackClick={() => navigate('/games')} onHomeClick={handleHomeClick} gameStarted={gameStarted} showBonusGame={showBonusGame} />
          
          <motion.div 
            className="flex flex-wrap justify-between items-center bg-gray-800 p-4 rounded-xl shadow-lg mb-6 mt-16"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="font-bold text-lg">Score: {score}</span>
            <motion.span 
              className="font-bold text-2xl text-yellow-400"
              animate={{ scale: timer <= 10 ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: timer <= 10 ? Infinity : 0, duration: 0.5 }}
            >
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </motion.span>
            <div className="flex space-x-2">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={useHint}
                disabled={hintsUsed >= 3}
                className="bg-purple-600 text-white p-2 rounded-full disabled:opacity-50 shadow-md relative"
                aria-label="Use Hint"
              >
                <Zap className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {3 - hintsUsed}
                </span>
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={usePowerup}
                disabled={powerupsAvailable <= 0}
                className="bg-yellow-600 text-white p-2 rounded-full disabled:opacity-50 shadow-md relative"
                aria-label="Use Powerup"
              >
                <Zap className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {powerupsAvailable}
                </span>
              </motion.button>
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setLetters(shuffleArray(letters))}
                className="bg-blue-600 text-white p-2 rounded-full shadow-md"
                aria-label="Shuffle Letters"
              >
                <Shuffle className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 gap-2 mb-6 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {shuffledImages.map((imageUrl, index) => (
              <motion.div 
                key={index} 
                className="aspect-square bg-gray-700 flex items-center justify-center overflow-hidden rounded-xl shadow-lg cursor-pointer"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                onClick={() => {
                  setSelectedImage(imageUrl);
                  setModalOpen(true);
                }}
              >
                <img
                  src={imageUrl}
                  alt={`Hint ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
            <Notification isVisible={isCorrect || isWrong}>
              <p className={`font-bold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct! Moving to next question...' : 'Wrong answer. Try again!'}
              </p>
            </Notification>
          </motion.div>

          <motion.div 
            className="flex mb-4 flex-wrap justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {userAnswer.map((letter, index) => (
              <motion.button
                key={index}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className={`w-10 h-10 m-1 text-xl rounded-lg flex items-center justify-center ${
                  letter === ' ' ? 'bg-transparent' : 'bg-gray-700 text-white border-2 border-gray-600 cursor-pointer hover:bg-gray-600'
                } transition-all duration-100 shadow-md`}
                onClick={() => letter !== ' ' && handleClear(index)}
              >
                {letter}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="grid grid-cols-7 sm:grid-cols-9 gap-1 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {letters.map((letter, index) => (
              <motion.button
                key={index}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="w-10 h-10 bg-gray-700 text-white rounded-lg disabled:opacity-50 text-lg font-bold hover:bg-gray-600 transition-all duration-100 shadow-md flex items-center justify-center"
                onClick={() => handleLetterClick(letter, index)}
                disabled={!letter}
              >
                {letter}
              </motion.button>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-lg text-center"
          >
            Question {currentQuestion + 1} of {questions.length}
          </motion.p>
        </div>
        <ImageModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          imageUrl={selectedImage}
        />
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={confirmHomeClick}
          message="Are you sure you want to return to the main menu? Your progress will be lost."
        />
      </motion.div>
    );
  }
}