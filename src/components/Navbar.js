import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/Navbar.css';
import dicelogo from '../images/DiceLogoTransparent.png';

const Navbar = ({ isHomePage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isLibraryPage = location.pathname === '/library';
  const isStudioPage = location.pathname === '/dashboard/studio';
  const isLoginPage = location.pathname === '/login';
  const showConnectWallet = !user && !isLibraryPage && !isStudioPage && !isLoginPage;
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleConnectWallet = () => {
    navigate('/login');
  };

  if (isLibraryPage) {
    return (
      <div className={`navbar library-navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <button className="nav-back-button" onClick={() => navigate('/dashboard')}>
          <FiArrowLeft />
          <span>Back to Dashboard</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="navbar-left">
        {!isHomePage && (
          <button className="nav-back-button" onClick={() => navigate('/library')}>
            <FiArrowLeft />
            <span>Back to Library</span>
          </button>
        )}
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-logo">
          <img src={dicelogo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <div className="navbar-right">
        {showConnectWallet && (
          <button className="connect-wallet-button" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar; 