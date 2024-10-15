import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const AnimatedLogo = styled(motion(Link))`
  font-size: 1.5rem;
  font-family: 'GB Shinto', sans-serif;
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient_301 5s ease infinite;
  background-image: linear-gradient(
    137.48deg,
    #ffdb3b 10%,
    #fe53bb 45%,
    #8f51ea 67%,
    #0044ff 87%
  );

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const GradientText = styled(motion(Link))`
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient_301 5s ease infinite;
  background-image: linear-gradient(
    137.48deg,
    #ffdb3b 10%,
    #fe53bb 45%,
    #8f51ea 67%,
    #0044ff 87%
  );

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const GradientButton = styled(motion.button)`
  background-size: 300% 300%;
  animation: gradient_301 5s ease infinite;
  background-image: linear-gradient(
    137.48deg,
    #ffdb3b 10%,
    #fe53bb 45%,
    #8f51ea 67%,
    #0044ff 87%
  );
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'GB Shinto', sans-serif;
  font-weight: bold;

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/login', label: 'Login' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: 'afterChildren',
      },
    },
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        when: 'beforeChildren',
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  const linkHoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
  };

  const logoClickVariants = {
    initial: { scale: 1 },
    click: { scale: 1.2, transition: { type: "spring", stiffness: 300, damping: 10 } },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const isActive = (path) => location.pathname === path;

  const handleLogoClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-[#0c111c] shadow-lg">
      <div className="container mx-auto px-4 py-4 md:py-6 relative">
        <div className="flex justify-between items-center">
          <AnimatedLogo 
            to="/" 
            onClick={handleLogoClick}
            variants={logoClickVariants}
            initial="initial"
            whileTap="click"
          >
            TKPGames
          </AnimatedLogo>
          <nav className="hidden md:flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              {menuItems.map((item, index) => (
                <React.Fragment key={item.to}>
                  {index === 2 && (
                    <li className="h-6 w-px bg-gray-400 mx-2" aria-hidden="true" />
                  )}
                  <li>
                    {isActive(item.to) ? (
                      <GradientText
                        to={item.to}
                        className="text-lg font-bold"
                        style={{ fontFamily: 'GB Shinto' }}
                        variants={linkHoverVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        {item.label}
                      </GradientText>
                    ) : (
                      <motion.div
                        variants={linkHoverVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <Link
                          to={item.to}
                          className="text-lg text-[#f6f6e9] transition-colors inline-block"
                          style={{ fontFamily: 'GB Shinto' }}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <GradientButton
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              Signup
            </GradientButton>
          </nav>
          <button
            className="md:hidden z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className={`ham ham6 ${isMenuOpen ? 'active' : ''}`}
              viewBox="0 0 100 100"
              width="50"
              height="50"
            >
              <path
                className="line top"
                d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
              />
              <path
                className="line middle"
                d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
              />
              <path
                className="line bottom"
                d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
              />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="absolute top-full left-0 w-full bg-[#0c111c] z-40 md:hidden overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <motion.ul className="flex flex-col space-y-2 p-4">
                {menuItems.map((item) => (
                  <motion.li key={item.to} variants={itemVariants}>
                    {isActive(item.to) ? (
                      <GradientText
                        to={item.to}
                        className="block text-lg font-bold py-2 px-4 rounded-md bg-gray-800"
                        style={{ fontFamily: 'GB Shinto' }}
                        onClick={() => setIsMenuOpen(false)}
                        variants={linkHoverVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        {item.label}
                      </GradientText>
                    ) : (
                      <motion.div
                        variants={linkHoverVariants}
                        initial="initial"
                        whileHover="hover"
                      >
                        <Link
                          to={item.to}
                          className="block text-lg text-white transition-colors py-2 px-4 rounded-md hover:bg-gray-800"
                          onClick={() => setIsMenuOpen(false)}
                          style={{ fontFamily: 'GB Shinto' }}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    )}
                  </motion.li>
                ))}
                <motion.li variants={itemVariants}>
                  <GradientButton
                    className="w-full"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Signup
                  </GradientButton>
                </motion.li>
              </motion.ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .ham {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: transform 400ms;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .ham.active {
          transform: rotate(45deg);
        }
        .line {
          fill: none;
          transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
          stroke: #f6f6e9;
          stroke-width: 8;
          stroke-linecap: round;
        }
        .ham6 .top {
          stroke-dasharray: 40 172;
        }
        .ham6 .middle {
          stroke-dasharray: 40 111;
        }
        .ham6 .bottom {
          stroke-dasharray: 40 172;
        }
        .ham6.active .top {
          stroke-dashoffset: -132px;
        }
        .ham6.active .middle {
          stroke-dashoffset: -71px;
        }
        .ham6.active .bottom {
          stroke-dashoffset: -132px;
        }
      `}</style>
    </header>
  );
}