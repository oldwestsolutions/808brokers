import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import '../styles/DashboardHeader.css';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForYou, setShowForYou] = useState(false);
  const [showFinalBrokers, setShowFinalBrokers] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleNavigation = (path) => {
    if (path === 'profile') {
      navigate('/profile');
    } else if (path === 'settings') {
      navigate('/settings');
    } else if (path === 'library') {
      navigate('/library');
    } else {
      navigate(`/dashboard/${path}`);
    }
    setShowDropdown(false);
  };

  useEffect(() => {
    // Initial sequence: 808 Brokers -> For You -> 808 Brokers
    const sequence = async () => {
      // Wait 1 second before showing "For You"
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowForYou(true);
      // Wait 2 seconds before showing final "808 Brokers"
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowForYou(false);
      setShowFinalBrokers(true);
    };
    sequence();
  }, []);

  return (
    <header className="dashboard-header-nav">
      <div className="header-left">
        <div className="header-logo">
          <AnimatePresence mode="wait">
            {!showForYou && !showFinalBrokers ? (
              <motion.span
                key="initial-brokers"
                className="logo-text"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                808 Brokers
              </motion.span>
            ) : showForYou ? (
              <motion.span
                key="foryou"
                className="logo-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                For You
              </motion.span>
            ) : (
              <motion.span
                key="final-brokers"
                className="logo-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                808 Brokers
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {windowWidth > 768 ? (
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search beats, artists, or samples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              <svg viewBox="0 0 24 24" className="search-icon">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </form>
        ) : null}
      </div>

      {searchModalOpen && (
        <div className="search-modal-overlay" onClick={() => setSearchModalOpen(false)}>
          <div className="search-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSearchModalOpen(false)}>&times;</button>
            <input
              type="text"
              className="search-modal-input"
              placeholder="Search for beats, artists, or samples..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            {/* You can add search results here */}
          </div>
        </div>
      )}

      <div className="header-right">
        {windowWidth <= 768 && (
          <button className="search-icon-btn" onClick={() => setSearchModalOpen(true)}>
            <FaSearch />
          </button>
        )}
        <div className="header-profile">
          <motion.button 
            className="profile-trigger"
            onClick={() => setShowDropdown(!showDropdown)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="profile-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt="Profile" />
              ) : (
                <svg className="avatar-placeholder" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient id="metallic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#1F2937', stopOpacity: 1}} />
                      <stop offset="50%" style={{stopColor: '#111827', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#0F172A', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <circle cx="12" cy="12" r="11" fill="url(#metallic-gradient)" stroke="#374151" strokeWidth="1"/>
                  <path d="M12 13.5C14.21 13.5 16 11.71 16 9.5C16 7.29 14.21 5.5 12 5.5C9.79 5.5 8 7.29 8 9.5C8 11.71 9.79 13.5 12 13.5ZM12 15C9.33 15 4 16.34 4 19V20.5H20V19C20 16.34 14.67 15 12 15Z" fill="#374151"/>
                </svg>
              )}
            </div>
          </motion.button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div 
                className="profile-dropdown"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.button 
                  className="wallet-status connected" 
                  onClick={() => handleNavigation('wallet')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-circle"></i>
                  Wallet Connected
                </motion.button>
                <motion.button 
                  className="profile-dropdown-item" 
                  onClick={() => handleNavigation('library')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-music"></i>
                  Library
                </motion.button>
                <motion.button 
                  className="profile-dropdown-item" 
                  onClick={() => handleNavigation('profile')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-user"></i>
                  Profile
                </motion.button>
                <motion.button 
                  className="profile-dropdown-item" 
                  onClick={() => handleNavigation('settings')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-cog"></i>
                  Settings
                </motion.button>
                <motion.button 
                  className="profile-dropdown-item logout"
                  onClick={handleLogout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 