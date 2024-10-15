import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, Maximize, Minimize, Apple, Globe, Cat, Dumbbell, Film, Pizza, Briefcase, Building2, Car, Plane, Book, Music, Shirt } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const letters = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'
]

const categories = [
  { name: 'Fruits', icon: Apple },
  { name: 'Countries', icon: Globe },
  { name: 'Animals', icon: Cat },
  { name: 'Sports', icon: Dumbbell },
  { name: 'Movies', icon: Film },
  { name: 'Food', icon: Pizza },
  { name: 'Jobs', icon: Briefcase },
  { name: 'Cities', icon: Building2 },
  { name: 'Cars', icon: Car },
  { name: 'Travel', icon: Plane },
  { name: 'Books', icon: Book },
  { name: 'Music', icon: Music },
  { name: 'Fashion', icon: Shirt }
]

export default function Tapple() {
  const navigate = useNavigate()
  const [pressedLetters, setPressedLetters] = useState([])
  const [currentCategory, setCurrentCategory] = useState('')
  const [customCategory, setCustomCategory] = useState('')
  const [timer, setTimer] = useState(10)
  const [isGameActive, setIsGameActive] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showEndModal, setShowEndModal] = useState(false)
  const [showInstructionsModal, setShowInstructionsModal] = useState(false)
  const [showCategoriesModal, setShowCategoriesModal] = useState(false)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const gameContainerRef = useRef(null)

  useEffect(() => {
    let interval
    if (isGameActive && isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0 || pressedLetters.length === letters.length) {
      endGame()
    }
    return () => clearInterval(interval)
  }, [isGameActive, isTimerRunning, timer, pressedLetters])

  const startGame = useCallback((category) => {
    setPressedLetters([])
    setCurrentCategory(category || getRandomCategory())
    setTimer(10)
    setIsGameActive(true)
    setIsTimerRunning(false)
    setShowCategoriesModal(false)
    setCustomCategory('')
  }, [])

  const endGame = useCallback(() => {
    setIsGameActive(false)
    setIsTimerRunning(false)
    setShowEndModal(true)
  }, [])

  const getRandomCategory = () => {
    return categories[Math.floor(Math.random() * categories.length)].name
  }

  const handleLetterPress = useCallback((letter) => {
    if (!pressedLetters.includes(letter) && isGameActive) {
      if (!isTimerRunning) {
        setIsTimerRunning(true)
      }
      const newPressedLetters = [...pressedLetters, letter]
      setPressedLetters(newPressedLetters)
      if (newPressedLetters.length === letters.length) {
        endGame()
      }
    }
  }, [pressedLetters, isGameActive, isTimerRunning, endGame])

  const handleTimerReset = useCallback(() => {
    if (isGameActive && isTimerRunning) {
      setTimer(10)
    }
  }, [isGameActive, isTimerRunning])

  const handleCustomCategorySubmit = useCallback((e) => {
    e.preventDefault()
    if (customCategory.trim()) {
      startGame(customCategory.trim())
    }
  }, [customCategory, startGame])

  const handleCustomCategoryChange = useCallback((e) => {
    setCustomCategory(e.target.value)
  }, [])

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }, [])

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
  }, [])

  const Modal = ({ children, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-sm relative max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        {children}
      </motion.div>
    </motion.div>
  )

  return (
    <div ref={gameContainerRef} className="min-h-screen bg-[#1a1a1a] py-4 px-2 sm:py-8 sm:px-4 flex items-center justify-center">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <motion.button
            onClick={() => navigate('/')}
            className="px-2 py-1 sm:px-3 sm:py-2 bg-white text-[#3498db] font-semibold rounded-lg shadow-md hover:bg-[#f0f0f0] text-xs sm:text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </motion.button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center text-[#3498db] flex-grow" style={{ fontFamily: 'GB Shinto' }}>Tap! Tap!</h1>
          <motion.button
            onClick={toggleFullScreen}
            className="px-2 py-1 sm:px-3 sm:py-2 bg-black text-[#3498db] font-semibold rounded-lg shadow-md text-xs sm:text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
          >
            {isFullScreen ? <Minimize size={20} className="sm:w-6 sm:h-6" /> : <Maximize size={20} className="sm:w-6 sm:h-6" />}
          </motion.button>
        </div>
        
        <motion.div 
          className="relative bg-[#3498db] shadow-xl rounded-full aspect-square flex flex-col items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isGameActive ? (
            <>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <motion.div 
                  className="w-1/3 h-1/3 bg-[#e74c3c] rounded-full flex items-center justify-center cursor-pointer mb-2 pointer-events-auto"
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTimerReset}
                >
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    {isTimerRunning ? `${timer}s` : 'Start!'}
                  </p>
                </motion.div>
                <div className="bg-[#f1c40f] px-2 py-1 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-[#2c3e50]">Category: {currentCategory}</p>
                </div>
              </div>
              <div className="absolute inset-0">
                {letters.map((letter, index) => {
                  const angle = (index / letters.length) * 2 * Math.PI
                  const radius = 46 // Percentage of container's width/height
                  const x = 50 + radius * Math.cos(angle - Math.PI / 2)
                  const y = 50 + radius * Math.sin(angle - Math.PI / 2)
                  return (
                    <button
                      key={letter}
                      className={`absolute w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold rounded-lg ${
                        pressedLetters.includes(letter)
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-white text-[#3498db] hover:bg-[#f0f0f0]'
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                      disabled={pressedLetters.includes(letter)}
                      onClick={() => handleLetterPress(letter)}
                    >
                      {letter}
                    </button>
                  )
                })}
              </div>
              <motion.button
                className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-1 sm:px-3 sm:py-2 bg-white text-[#3498db] font-semibold rounded-lg shadow-md hover:bg-[#f0f0f0] text-xs sm:text-sm md:text-base"
                onClick={() => setIsGameActive(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={16} className="sm:w-6 sm:h-6" />
              </motion.button>
            </>
          ) : (
            <div className="text-center z-10 w-full px-4">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mb-4">Choose a category or enter your own:</p>
              <div className="flex flex-col items-center gap-2 sm:gap-4 mb-4">
                <div className="flex gap-2 sm:gap-4">
                  <motion.button
                    className="px-2 py-1 sm:px-3 sm:py-2 bg-white text-[#3498db] font-semibold rounded-lg shadow-md hover:bg-[#f0f0f0] text-xs sm:text-sm md:text-base w-auto"
                    onClick={() => setShowCategoriesModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Categories
                  </motion.button>
                  <motion.button
                    className="px-2 py-1 sm:px-3 sm:py-2 bg-white text-[#3498db] font-semibold rounded-lg shadow-md hover:bg-[#f0f0f0] text-xs sm:text-sm md:text-base w-auto"
                    onClick={() => setShowInstructionsModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    How to Play
                  </motion.button>
                </div>
                <form onSubmit={handleCustomCategorySubmit} className="flex gap-2 w-full max-w-xs">
                  <input
                    type="text"
                    value={customCategory}
                    onChange={handleCustomCategoryChange}
                    placeholder="Custom category"
                    className="px-2 py-1 sm:px-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3498db] bg-white text-[#3498db] text-xs sm:text-sm md:text-base flex-grow"
                  />
                  <motion.button
                    type="submit"
                    className="px-2 py-1 sm:px-3 sm:py-2 bg-white text-[#3498db] font-semibold rounded-lg shadow-md hover:bg-[#f0f0f0] text-xs sm:text-sm md:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!customCategory.trim()}
                  >
                    Start
                  </motion.button>
                </form>
              </div>
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {showEndModal && (
            <Modal onClose={() => setShowEndModal(false)}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Game Over!</h2>
              <p className="mb-4 text-sm sm:text-base">You used {pressedLetters.length} letters.</p>
              <div className="flex justify-between">
                <motion.button
                  className="px-2 py-1 sm:px-3 sm:py-2 bg-[#3498db] text-white font-semibold rounded-lg shadow-md hover:bg-[#2980b9] text-xs sm:text-sm md:text-base"
                  onClick={() => {
                    setShowEndModal(false)
                    startGame(getRandomCategory())
                  }}
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                >
                  Restart
                </motion.button>
                <motion.button
                  className="px-2 py-1 sm:px-3 sm:py-2 bg-[#3498db] text-white font-semibold rounded-lg shadow-md hover:bg-[#2980b9] text-xs sm:text-sm md:text-base"
                  onClick={() => {
                    setShowEndModal(false)
                    setIsGameActive(false)
                  }}
                  whileHover={{scale: 1.05}}
                  whileTap={{scale: 0.95}}
                >
                  Exit
                </motion.button>
              </div>
            </Modal>
          )}

          {showInstructionsModal && (
            <Modal onClose={() => setShowInstructionsModal(false)}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">How to Play Tapple</h2>
              <ol className="list-decimal list-inside space-y-2 mb-4 text-xs sm:text-sm md:text-base">
                <li>Choose a category from the provided list or enter your own custom category.</li>
                <li>When the game starts, you'll see a circular board with 24 letter buttons (A to X).</li>
                <li>The timer will start when you click the first letter.</li>
                <li>Think of a word that fits the chosen category and begins with one of the available letters.</li>
                <li>Tap the corresponding letter button to select it. The button will then be disabled.</li>
                <li>You have 10 seconds to think of and select a word for each turn.</li>
                <li>If you can't think of a word within 10 seconds, the game ends.</li>
                <li>To get more time, tap the timer in the center of the board to reset it to 10 seconds.</li>
                <li>Continue selecting letters for new words until you can't think of any more or all letters are used.</li>
                <li>The game ends when you run out of time or all letters have been used.</li>
                <li>Your goal is to use as many letters as possible before the game ends.</li>
                <li>Challenge yourself to improve your score by playing with different categories!</li>
              </ol>
              <motion.button
                className="px-2 py-1 sm:px-3 sm:py-2 bg-[#3498db] text-white font-semibold rounded-lg shadow-md hover:bg-[#2980b9] w-full text-xs sm:text-sm md:text-base"
                onClick={() => setShowInstructionsModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Got it!
              </motion.button>
            </Modal>
          )}

          {showCategoriesModal && (
            <Modal onClose={() => setShowCategoriesModal(false)}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Choose a Category</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    className="px-2 py-1 bg-[#3498db] text-white font-semibold rounded-lg shadow-md hover:bg-[#2980b9] text-xs w-auto flex flex-col items-center justify-center"
                    onClick={() => startGame(category.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon size={16} className="mb-1" />
                    <span>{category.name}</span>
                  </motion.button>
                ))}
              </div>
              <motion.button
                className="px-2 py-1 sm:px-3 sm:py-2 bg-[#e74c3c] text-white font-semibold rounded-lg shadow-md hover:bg-[#c0392b] w-full text-xs sm:text-sm md:text-base"
                onClick={() => startGame(getRandomCategory())}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Random Category
              </motion.button>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}