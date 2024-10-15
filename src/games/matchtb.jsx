'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, HelpCircle, Pause, ArrowLeft } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useNavigate } from 'react-router-dom'

const icons = Array.from({ length: 10 }, (_, i) => `/images/icons/icon${i + 1}.png`)

const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const buttonVariants = {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8, 
    y: 50,
    transition: { 
      duration: 0.2
    }
  }
}

export default function MatchTB() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [solved, setSolved] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(Infinity)
  const [gameStarted, setGameStarted] = useState(false)
  const [gamePaused, setGamePaused] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [timeLeft, setTimeLeft] = useState(60)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showInstructionsModal, setShowInstructionsModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const savedBestScore = localStorage.getItem('matchTBBestScore')
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore))
    }
    prepareNewGame()
  }, [])

  useEffect(() => {
    let timer
    if (gameStarted && !gamePaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      endGame('Time\'s up!')
    }
    return () => clearInterval(timer)
  }, [gameStarted, gamePaused, timeLeft])

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (gameStarted && !gamePaused) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [gameStarted, gamePaused])

  const prepareNewGame = () => {
    const gameIcons = shuffleArray([...icons, ...icons])
    setCards(gameIcons)
    setFlipped([])
    setSolved([])
    setScore(0)
    setTimeLeft(60)
    setFeedback('')
    setGameStarted(false)
    setGamePaused(false)
  }

  const startGame = () => {
    setGameStarted(true)
    setTimeLeft(60)
  }

  const togglePause = () => {
    setGamePaused(!gamePaused)
  }

  const handleConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const endGame = (message) => {
    setFeedback(message)
    if (message.includes('Congratulations')) {
      handleConfetti()
    }
    setTimeout(() => {
      setFeedback('')
      if (score > bestScore) {
        setBestScore(score)
        localStorage.setItem('matchTBBestScore', score.toString())
      }
      prepareNewGame()
    }, 2000)
  }

  const handleCardClick = (index) => {
    if (!gameStarted || gamePaused || flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      if (cards[newFlipped[0]] === cards[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped])
        setFlipped([])
        setScore(score + 10)
        setFeedback('Correct match!')
        if (solved.length === cards.length - 2) {  
          endGame('Congratulations! You won!')
        }
      } else {
        setFeedback('Wrong match. Try again!')
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
      setTimeout(() => {
        setFeedback('')
      }, 2000)
    }
  }

  const handleRestart = () => {
    if (gameStarted) {
      setShowConfirmModal(true)
      setConfirmAction(() => () => {
        prepareNewGame()
        setShowConfirmModal(false)
      })
    } else {
      prepareNewGame()
    }
  }

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col bg-gray-900 p-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Back Button */}
      <motion.button
        className="absolute top-4 left-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-12 h-12 flex items-center justify-center rounded-full transition-colors shadow-lg"
        onClick={() => navigate('/')}
        aria-label="Back to Games"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <ArrowLeft className="w-6 h-6" />
      </motion.button>

      <div className="flex-grow flex items-center justify-center mt-16">
        <div className="max-w-2xl w-full">
          <motion.h1 
            className="text-5xl mb-8 text-center font-extrabold"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ color: '#ed5b2d', textShadow: '0 0 10px rgba(237, 91, 45, 0.5)' }}
          >
            Match the Benefits!
          </motion.h1>
          <motion.div 
            className="flex flex-wrap justify-between mb-6 text-sm sm:text-base bg-white bg-opacity-10 rounded-lg p-4 shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <p className="font-semibold w-1/3 text-center">
              <span className="text-indigo-200">Your Score:</span>{' '}
              <span className="text-xl" style={{ color: '#ed5b2d' }}>{score}</span>
            </p>
            <p className="font-semibold w-1/3 text-center">
              <span className="text-indigo-200">Best Score:</span>{' '}
              <span className="text-xl" style={{ color: '#ed5b2d' }}>{bestScore === Infinity ? '-' : bestScore}</span>
            </p>
            <p className="font-semibold w-1/3 text-center">
              <span className="text-indigo-200">Time Left:</span>{' '}
              <span className="text-xl" style={{ color: '#ed5b2d' }}>{timeLeft}s</span>
            </p>
          </motion.div>
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-lg ${
                  feedback.includes('Correct') || feedback.includes('Congratulations') ? 'bg-green-500' : 'bg-red-500'
                } text-white font-bold text-lg`}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div 
            className="grid grid-cols-5 gap-3"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {cards.map((iconPath, index) => (
              <motion.div
                key={index}
                className="aspect-square cursor-pointer"
                onClick={() => handleCardClick(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-full h-full rounded-lg shadow-lg"
                  initial={false}
                  animate={{ 
                    rotateY: gameStarted && !flipped.includes(index) && !solved.includes(index) ? 180 : 0,
                    backgroundColor: solved.includes(index) ? '#4CAF50' : '#29303d'
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }} 
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <img src={iconPath} alt="Icon" className="w-12 h-12 sm:w-16 sm:h-16" />
                  </div>
                  <div
                    className="absolute w-full h-full backface-hidden bg-[#1e232c] rounded-lg flex items-center justify-center text-white text-3xl font-bold"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    ?
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            className="flex justify-center mt-8 space-x-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {!gameStarted ? (
              <>
                <motion.button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-16 h-16 flex items-center justify-center rounded-full transition-colors shadow-lg"
                  onClick={() => setShowInstructionsModal(true)}
                  aria-label="Instructions"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <HelpCircle className="w-8 h-8" />
                </motion.button>
                <motion.button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold w-16 h-16 flex items-center justify-center rounded-full transition-colors shadow-lg"
                  onClick={startGame}
                  aria-label="Start Game"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Play className="w-8 h-8" />
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold w-16 h-16 flex items-center justify-center rounded-full transition-colors shadow-lg"
                  onClick={togglePause}
                  aria-label={gamePaused ? "Resume Game" : "Pause Game"}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {gamePaused ? <Play className="w-8 h-8" /> : <Pause className="w-8 h-8" />}
                </motion.button>
                <motion.button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold w-16 h-16 flex items-center justify-center rounded-full transition-colors shadow-lg"
                  onClick={handleRestart}
                  aria-label="Restart Game"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <RotateCcw className="w-8 h-8" />
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {(showConfirmModal || gamePaused || showInstructionsModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-md w-full text-gray-800 dark:text-white shadow-2xl"
            >
              {gamePaused && (
                <>
                  <h2  className="text-2xl font-bold mb-6 text-center">Game  Paused</h2>
                  <motion.button
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg"
                    onClick={togglePause}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Resume
                  </motion.button>
                </>
              )}
              {showConfirmModal && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-center">Are you sure?</h2>
                  <p className="mb-6 text-center">You will lose your current progress.</p>
                  <div className="flex justify-center space-x-4">
                    <motion.button
                      className="px-6 py-3 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-lg font-semibold shadow-lg"
                      onClick={() => setShowConfirmModal(false)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      className="px-6 py-3 bg-red-500 text-white rounded-lg text-lg font-semibold shadow-lg"
                      onClick={confirmAction}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Confirm
                    </motion.button>
                  </div>
                </>
              )}
              {showInstructionsModal  && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-center">How to Play</h2>
                  <ul className="list-disc pl-5 mb-6 space-y-2">
                    <li>Click on cards to flip them over.</li>
                    <li>Try to find matching pairs of icons.</li>
                    <li>Match all pairs before the time runs out.</li>
                    <li>Each correct match earns you 10 points.</li>
                    <li>Try to beat your best score!</li>
                  </ul>
                  <motion.button
                    className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-semibold shadow-lg"
                    onClick={() => setShowInstructionsModal(false)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Got it!
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}