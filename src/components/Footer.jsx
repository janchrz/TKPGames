import React from 'react'
import { Mail, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const hoverScale = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 }
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0c111c] text-white py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg sm:text-xl mb-4" style={{ fontFamily: 'GB Shinto' }}>About Us</h3>
            <p className="text-xs sm:text-sm font-bold text-[#f6f6e9]">
              TKPGames is dedicated to creating fun and engaging games for all ages. Our mission is to bring joy and excitement to players worldwide.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <h3 className="text-lg sm:text-xl mb-4" style={{ fontFamily: 'GB Shinto' }}>Contact Us</h3>
            <ul className="text-xs sm:text-sm text-[#f6f6e9]">
              <motion.li 
                className="flex items-center mb-2"
                whileHover={hoverScale}
              >
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@tkpgames.com" className="hover:text-[#ed5b2d] transition-colors font-bold">tkp.updates@gmail.com</a>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={hoverScale}
              >
                <ExternalLink size={16} className="mr-2" />
                <a 
                  href="https://jcd-portfolio.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#ed5b2d] transition-colors font-bold"
                >
                  Developer
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
        <motion.div 
          className="mt-6 sm:mt-8 text-center"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <p className="text-xs sm:text-sm text-[#f6f6e9]" style={{ fontFamily: 'GB Shinto' }}>
            © {currentYear} <span style={{ color: '#ed5b2d' }}>TKP</span>Games. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
