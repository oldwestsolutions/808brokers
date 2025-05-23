import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft, FiUser, FiCreditCard } from 'react-icons/fi';
import '../styles/Navbar.css';
import dicelogo from '../images/DiceLogoTransparent.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const isLibraryPage = location.pathname === '/library';
  const isWalletPage = location.pathname === '/wallet';
  const isStudioPage = location.pathname === '/dashboard/studio';
  const isLoginPage = location.pathname === '/login';
  const isHomePage = location.pathname === '/';
  const isProfilePage = location.pathname === '/profile';
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
        <div className="library-nav-icons">
          <button className="nav-icon-button" onClick={() => navigate('/wallet')}>
            <FiCreditCard />
          </button>
          <button className="nav-icon-button" onClick={() => navigate('/profile')}>
            <FiUser />
          </button>
        </div>
      </div>
    );
  }

  if (isWalletPage) {
    return (
      <div className={`navbar wallet-navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="navbar-left">
          <button className="nav-back-button" onClick={() => navigate('/library')}>
            <FiArrowLeft />
            <span>Back to Library</span>
          </button>
        </div>
      </div>
    );
  }

  if (isProfilePage) {
    return (
      <div className={`navbar profile-navbar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="navbar-left">
          <button className="nav-back-dashboard-gray" onClick={() => navigate('/dashboard')}>
            <FiArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={dicelogo} alt="Logo" className="logo-image" />
        </Link>
        {!isHomePage && !isLoginPage && (
          <button className="nav-back-button" onClick={() => navigate('/library')}>
            <FiArrowLeft />
            <span>Back to Library</span>
          </button>
        )}
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