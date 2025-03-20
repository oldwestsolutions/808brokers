import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import dicelogo from '../images/DiceLogoTransparent.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowDropdown(false);
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={dicelogo} alt="808 Brokers Dice Logo" className="navbar-logo-image" />
        <Link to="/" onClick={handleHomeClick}>808 Brokers</Link>
      </div>
      <div className="navbar-actions">
        {user ? (
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
                <div className="dropdown-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Profile" />
                      ) : (
                        <svg className="avatar-placeholder" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                      )}
                    </div>
                    <div className="user-details">
                      <p className="user-name">{user.name || 'User'}</p>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                  <div className="user-balance">
                    <i className="fas fa-wallet"></i>
                    <span>{user.balance || '0.00'} ETH</span>
                  </div>
                </div>

                <div className="dropdown-section">
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-columns"></i>
                    Dashboard
                  </Link>
                  <Link to="/profile" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-user"></i>
                    Profile
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-cog"></i>
                    Settings
                  </Link>
                </div>

                <div className="dropdown-section">
                  <Link to="/my-beats" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-music"></i>
                    My Beats
                  </Link>
                  <Link to="/purchases" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-shopping-bag"></i>
                    Purchases
                  </Link>
                  <Link to="/favorites" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-heart"></i>
                    Favorites
                  </Link>
                </div>

                <div className="dropdown-section">
                  <Link to="/help" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                    <i className="fas fa-question-circle"></i>
                    Help Center
                  </Link>
                  <button className="dropdown-item logout-btn" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            className="connect-wallet-btn" 
            onClick={() => navigate('/login')}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 