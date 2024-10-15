import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Users, Search, Zap, Filter, ArrowUp, Grid, List, Heart, Lock, X, Info } from 'lucide-react';

const gamesList = [
  { id: 1, title: <span style={{ fontFamily: 'GB Shinto', color: '#ed5b2d' }}>Match the Benefits</span>, image: '/images/matchtb.jpg', description: <span style={{ color: '#f6f6e9' }}>A memory game</span>, route: '/matchtb', difficulty: 'Easy', players: '1-4', timeToPlay: '1 min', category: 'Memory' },
  { id: 2, title: <span style={{ fontFamily: 'GB Shinto', color: '#3498db' }}>Tap! Tap!</span>, image: '/images/games picture/tap.png', description: <span style={{ color: '#f6f6e9' }}>A fast-paced word game</span>, route: '/tapple', difficulty: 'Medium', players: '2-8', timeToPlay: '10 sec each player', category: 'Word' },
  { id: 3, title: <span style={{ fontFamily: 'GB Shinto', color: '#9333ea' }}>one time <br /> 4 Pics</span>, image: '/images/games picture/4pics.png', description: <span style={{ color: '#f6f6e9' }}>Guess the word from 4 pictures</span>, route: '/picsgame', difficulty: 'Hard', players: '1-6', timeToPlay: '3 min', category: 'Puzzle' },
  { id: 4, title: <span style={{ fontFamily: 'GB Shinto', color: '#2ecc71' }}>ChzQuiz</span>, image: '/placeholder.svg?height=300&width=400', description: <span style={{ color: '#f6f6e9' }}>Test your knowledge</span>, route: '/quiz', difficulty: 'Medium', players: '1-4', timeToPlay: '5 min', category: 'Quiz', locked: true },
  { id: 5, title: <span style={{ fontFamily: 'GB Shinto', color: '#e74c3c' }}>Quickie Typer</span>, image: '/placeholder.svg?height=300&width=400', description: <span style={{ color: '#f6f6e9' }}>Coming Soon</span>, route: '/speedtyper', difficulty: 'Hard', players: '1', timeToPlay: '2 min', category: 'Typing', locked: true },
  { id: 6, title: <span style={{ fontFamily: 'GB Shinto', color: '#f39c12' }}>Puzzzle</span>, image: '/placeholder.svg?height=300&width=400', description: <span style={{ color: '#f6f6e9' }}>Coming Soon</span>, route: '/puzzlemania', difficulty: 'Medium', players: '1-2', timeToPlay: '10 min', category: 'Puzzle', locked: true },
  { id: 7, title: <span style={{ fontFamily: 'GB Shinto', color: '#8e44ad' }}>Guess this SHIT!</span>, image: '/placeholder.svg?height=300&width=400', description: <span style={{ color: '#f6f6e9' }}>Coming Soon</span>, route: '/guessthisshit', difficulty: 'Hard', players: '1-4', timeToPlay: '5 min', category: 'Puzzle', locked: true },
];

export default function Games() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState(gamesList);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [favorites, setFavorites] = useState([]);
  const [showLikedGames, setShowLikedGames] = useState(false);
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const gamesListRef = useRef(null);
  const allButtonRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Load favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem('gameFavorites')) || [];
    setFavorites(storedFavorites);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let result = gamesList;
    if (searchTerm) {
      result = result.filter(game => 
        game.title.props.children.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.props.children.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter !== 'All') {
      result = result.filter(game => game.category === categoryFilter);
    }
    if (showLikedGames) {
      result = result.filter(game => favorites.includes(game.id));
    }

    setFilteredGames(result);
  }, [searchTerm, categoryFilter, favorites, showLikedGames]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (allButtonRef.current && !allButtonRef.current.contains(event.target)) {
        setIsAllOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const playGame = (game) => {
    if (!game.locked) {
      navigate(game.route);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleFavorite = (gameId) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      
      // Save to local storage
      localStorage.setItem('gameFavorites', JSON.stringify(newFavorites));
      
      return newFavorites;
    });
  };

  const categories = ['All', ...new Set(gamesList.map(game => game.category))];

  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    setIsAllOpen(false);
    if (category === 'All' && gamesListRef.current) {
      gamesListRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.5
      }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gray-900 text-white p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col items-center justify-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-screen-xl mx-auto mb-4 sm:mb-6 md:mb-8">
        <AnimatePresence>
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-screen"
            >
              <LayoutGroup>
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-12 h-12 sm:w-16 sm:h-16 m-1 sm:m-2 bg-gray-700 rounded-md"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                      transition: { duration: 1.5, repeat: Infinity, delay: index * 0.2 }
                    }}
                  />
                ))}
              </LayoutGroup>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="relative w-full sm:w-auto mb-2 sm:mb-0">
                  <input
                    type="text"
                    placeholder="Search games..."
                    className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <motion.div
                    className="relative"
                    ref={allButtonRef}
                  >
                    <motion.button
                      className="bg-gray-800 text-white rounded-full py-2 px-4 pl-10 appearance-none cursor-pointer text-xs sm:text-sm flex items-center justify-between w-20 sm:w-24"
                      onClick={() => setIsAllOpen(!isAllOpen)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>{categoryFilter}</span>
                      <motion.span
                        animate={{ rotate: isAllOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.span>
                    </motion.button>
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <AnimatePresence>
                      {isAllOpen && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-10"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {categories.map(category => (
                            <motion.button
                              key={category}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-xs sm:text-sm"
                              onClick={() => handleCategoryChange(category)}
                              whileHover={{ backgroundColor: '#374151' }}
                              transition={{ duration: 0.1 }}
                            >
                              {category}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <div className="flex bg-gray-800 rounded-full">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={`p-1 sm:p-2 rounded-full ${viewMode === 'grid' ? 'bg-blue-500' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid size={16} />
                    </motion.button>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className={`p-1 sm:p-2 rounded-full ${viewMode === 'list' ? 'bg-blue-500' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List size={16} />
                    </motion.button>
                  </div>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className={`p-1 sm:p-2 rounded-full bg-gray-800 ${showLikedGames ? 'text-red-500' : 'text-gray-500'}`}
                    onClick={() => setShowLikedGames(!showLikedGames)}
                  >
                    <Heart size={16} className={showLikedGames ? 'fill-current' : ''} />
                  </motion.button>
                </div>
              </div>

              <AnimatePresence>
                <LayoutGroup>
                  <motion.div
                    ref={gamesListRef}
                    key="list"
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: { duration: 0.5, staggerChildren: 0.1 }
                    }}
                    exit={{ opacity: 0 }}
                    className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4" : "space-y-2 sm:space-y-4"}
                  >
                    {filteredGames.map((game, index) => (
                      <motion.div
                        key={game.id}
                        layout
                        className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden relative ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}`}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.05 }}
                      >
                        <motion.div 
                          className={`relative ${viewMode === 'list' ? 'w-full sm:w-1/3' : 'h-32 sm:h-40'} overflow-hidden`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.img
                            src={game.image}
                            alt={game.title.props.children}
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <h2 className="text-lg sm:text-xl md:text-2xl text-center">
                              {game.title}
                            </h2>
                          </motion.div>
                        </motion.div>
                        <motion.div
                          className={`p-2 sm:p-3 md:p-4 ${viewMode === 'list' ? 'w-full sm:w-2/3' : ''}`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.2 }}
                        >
                          <p className="text-xs sm:text-sm md:text-base mb-1 sm:mb-2">{game.description}</p>
                          <div className="flex justify-between items-center mb-1 sm:mb-2">
                            <div className="flex items-center text-xs sm:text-sm">
                              <Users size={12} className="mr-1" />
                              <span>{game.players}</span>
                            </div>
                            <div className="flex items-center text-xs sm:text-sm">
                              <Clock size={12} className="mr-1" />
                              <span>{game.timeToPlay}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-1 sm:mb-2">
                            <span className="text-xs sm:text-sm bg-gray-700 rounded-full px-2 py-1">{game.category}</span>
                            <div className="flex items-center">
                              <Zap size={12} className="mr-1 text-yellow-400" />
                              <span className="text-xs sm:text-sm">{game.difficulty}</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <motion.button
                              className={`text-white py-1 px-2 sm:px-3 rounded-lg text-xs sm:text-sm md:text-base transition-all duration-200 ease-in-out flex items-center justify-center ${game.locked ? 'bg-gray-600 cursor-not-allowed' : ''}`}
                              style={{
                                fontFamily: 'GB Shinto',
                                backgroundColor: game.locked ? undefined : game.title.props.style.color,
                              }}
                              whileHover={game.locked ? {} : { 
                                scale: 1.05,
                                boxShadow: `0 0 15px ${game.title.props.style.color}`,
                              }}
                              whileTap={game.locked ? {} : { scale: 0.95 }}
                              onClick={() => playGame(game)}
                              disabled={game.locked}
                            >
                              {game.locked ? (
                                <>
                                  <Lock size={14} className="mr-1" />
                                  Coming Soon
                                </>
                              ) : (
                                <>
                                  Play Now
                                  <ChevronRight size={16} className="ml-1" />
                                </>
                              )}
                            </motion.button>
                            <div className="flex items-center space-x-2">
                              <motion.button
                                className="p-1 rounded-full bg-gray-700"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleFavorite(game.id)}
                              >
                                <Heart size={16} className={favorites.includes(game.id) ? 'text-red-500 fill-current' : ''} />
                              </motion.button>
                              <motion.button
                                className="p-1 rounded-full bg-gray-700"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedGame(game)}
                              >
                                <Info size={16} />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </LayoutGroup>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg"
            onClick={scrollToTop}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedGame && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-xl p-4 sm:p-6 max-w-lg w-full"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedGame.title}</h2>
                <motion.button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setSelectedGame(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>
              <img src={selectedGame.image} alt={selectedGame.title.props.children} className="w-full h-48 object-cover rounded-lg mb-4" />
              <p className="text-lg mb-4">{selectedGame.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold">Players</h3>
                  <p>{selectedGame.players}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Time to Play</h3>
                  <p>{selectedGame.timeToPlay}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Category</h3>
                  <p>{selectedGame.category}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Difficulty</h3>
                  <p>{selectedGame.difficulty}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <motion.button
                  className={`text-white py-2 px-4 rounded-lg text-lg transition-all duration-200 ease-in-out flex items-center justify-center ${selectedGame.locked ? 'bg-gray-600 cursor-not-allowed' : ''}`}
                  style={{
                    fontFamily: 'GB Shinto',
                    backgroundColor: selectedGame.locked ? undefined : selectedGame.title.props.style.color,
                  }}
                  whileHover={selectedGame.locked ? {} : { 
                    scale: 1.05,
                    boxShadow: `0 0 15px ${selectedGame.title.props.style.color}`,
                  }}
                  whileTap={selectedGame.locked ? {} : { scale: 0.95 }}
                  onClick={() => {
                    if (!selectedGame.locked) {
                      playGame(selectedGame);
                      setSelectedGame(null);
                    }
                  }}
                  disabled={selectedGame.locked}
                >
                  {selectedGame.locked ? (
                    <>
                      <Lock size={18} className="mr-2" />
                      Coming Soon
                    </>
                  ) : (
                    <>
                      Play Now
                      <ChevronRight size={24} className="ml-2" />
                    </>
                  )}
                </motion.button>
                <motion.button
                  className="p-2 rounded-full bg-gray-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(selectedGame.id)}
                >
                  <Heart size={24} className={favorites.includes(selectedGame.id) ? 'text-red-500 fill-current' : ''} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}