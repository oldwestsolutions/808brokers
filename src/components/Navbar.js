import React from 'react';
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
  const showConnectWallet = !user && !isLibraryPage && !isStudioPage;

  const handleConnectWallet = () => {
    navigate('/login');
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <nav className={`navbar ${isHomePage ? 'home-navbar' : ''}`}>
      <div className="navbar-logo">
        {isLibraryPage ? (
          <button className="back-button" onClick={handleBack}>
            <FiArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        ) : (
          <Link to="/">
            <img src={dicelogo} alt="808 Brokers" className="logo-image" />
          </Link>
        )}
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