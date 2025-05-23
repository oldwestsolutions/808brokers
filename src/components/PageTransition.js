import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Set transitioning state when animation starts
    navigate(location.pathname, { state: { transitioning: true } });
    
    // Clear transitioning state when animation ends
    const timer = setTimeout(() => {
      navigate(location.pathname, { state: { transitioning: false } });
    }, 300); // Match this with the animation duration

    return () => clearTimeout(timer);
  }, [location.pathname, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 