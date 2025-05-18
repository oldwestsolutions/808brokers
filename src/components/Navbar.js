import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import dicelogo from '../images/DiceLogoTransparent.png';

const Navbar = ({ isHomePage }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleConnectWallet = () => {
    navigate('/login');
  };

  return (
    <nav className={`navbar ${isHomePage ? 'home-navbar' : ''}`}>
      <div className="navbar-logo">
        <Link to="/">
          <img src={dicelogo} alt="808 Brokers" className="logo-image" />
        </Link>
      </div>

      <div className="navbar-actions">
        {!user && (
          <button className="connect-wallet-btn" onClick={handleConnectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 