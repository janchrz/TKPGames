import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Star, Zap } from 'lucide-react';

const features = [
  { icon: Trophy, title: 'Leaderboards', description: 'Compete with players worldwide and climb the ranks.' },
  { icon: Users, title: 'Multiplayer', description: 'Play with friends or make new ones in our multiplayer games.' },
  { icon: Star, title: 'Achievements', description: 'Unlock achievements and show off your gaming skills.' },
  { icon: Zap, title: 'Daily Challenges', description: 'Take on new challenges every day for extra rewards.' },
];

export default function Features() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col items-center justify-center bg-black"
    >
      <h1 className="text-4xl font-bold mb-8 text-center text-[#ed5b2d]">Features</h1>
      <div className="max-w-screen-lg w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-4"> {/* Added max width and margin auto */}
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <feature.icon className="w-12 h-12 text-[#ed5b2d] mb-4" />
            <h2 className="text-2xl font-semibold mb-2 text-[#ed5b2d]">{feature.title}</h2>
            <p className="text-[#333333]">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
