import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import dicelogo from '../images/DiceLogoTransparent.png';

const Navbar = ({ hideWalletButton }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={dicelogo} alt="806brokers" className="logo-image" />
      </div>
      <div className="navbar-actions">
        {!hideWalletButton && !user && (
          <button 
            className="connect-wallet-btn" 
            onClick={() => navigate('/login')}
          >
            Connect Wallet
          </button>
        )}
        {user && (
          <div className="profile-menu">
            <button 
              className="profile-icon-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="profile-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" />
                ) : (
                  <svg className="avatar-placeholder" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                )}
              </div>
            </button>
            
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="wallet-status connected">
                  <i className="fas fa-circle"></i>
                  Wallet Connected
                </div>

                <button className="profile-dropdown-item">
                  <i className="fas fa-user"></i>
                  Profile
                </button>
                <button className="profile-dropdown-item">
                  <i className="fas fa-cog"></i>
                  Settings
                </button>
                <button className="profile-dropdown-item">
                  <i className="fas fa-question-circle"></i>
                  Help Center
                </button>
                <button 
                  className="profile-dropdown-item logout"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 