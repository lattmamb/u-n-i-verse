import React from 'react';
import { motion } from 'framer-motion';

export function IronMan() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        x: [-20, 20],
        y: [-10, 10],
        rotate: [-5, 5]
      }}
      transition={{ 
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
        ease: "easeInOut"
      }}
      className="w-24 h-24 absolute bottom-32 right-32 z-50"
    >
      <div className="relative w-full h-full">
        {/* Iron Man Body */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-700 rounded-xl">
          {/* Arc Reactor */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full animate-pulse">
            <div className="absolute inset-0 bg-blue-300 rounded-full blur-sm"></div>
          </div>
          
          {/* Armor Details */}
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-red-500 to-transparent rounded-t-xl"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-red-800 to-transparent rounded-b-xl"></div>
          
          {/* Thrusters */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity
            }}
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6"
          >
            <div className="w-full h-full bg-gradient-to-b from-yellow-400 via-orange-500 to-transparent blur-sm"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}