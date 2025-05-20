import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BackButton from './BackButton';
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
        <BackButton destination="/dashboard" text="Back to Dashboard" />
      </div>
    );
  }

  return (
    <nav className={`navbar ${isHomePage ? 'home-navbar' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={dicelogo} alt="808 Brokers" className="logo-image" />
        </Link>
      </div>

      <div className="navbar-actions">
        {showConnectWallet && (
          <button className="connect-wallet-btn" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 