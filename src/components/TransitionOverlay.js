import React from 'react';
import { motion } from 'framer-motion';
import '../styles/TransitionOverlay.css';

const TransitionOverlay = () => {
  return (
    <motion.div
      className="transition-overlay"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="transition-content">
        <motion.div
          className="transition-logo"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img src="/DiceLogoTransparent.png" alt="808 Brokers" />
        </motion.div>
        <motion.div
          className="transition-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Welcome to 808 Brokers
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TransitionOverlay; 