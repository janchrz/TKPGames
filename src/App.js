import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Games from './components/Games'
import Features from './components/Features'
import Footer from './components/Footer'
import MatchTB from './games/matchtb'
import Tapple from './games/tapple'
import PicsGame from './games/picsgame'
import Quiz from './games/quiz'
import './App.css'

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Games />} />
        <Route path="/features" element={<Features />} />
        <Route path="/matchtb" element={<MatchTB />} />
        <Route path="/tapple" element={<Tapple />} />
        <Route path="/picsgame" element={<PicsGame />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#191717]">
        <Header className="bg-[#191717] text-white" />
        <main className="flex flex-col min-h-screen">
          <AnimatedRoutes />
        </main>
        <Footer className="bg-[#191717] text-white" />
      </div>
    </Router>
  )
}