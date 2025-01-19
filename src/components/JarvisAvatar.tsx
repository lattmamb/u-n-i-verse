import React from 'react';
import { motion } from 'framer-motion';

export function JarvisAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-32 h-32 absolute bottom-24 right-4 z-50"
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse shadow-lg flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-4xl font-bold text-white"
        >
          J
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
    </motion.div>
  );
}