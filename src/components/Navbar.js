import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleCoinbaseLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_COINBASE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const SCOPE = 'wallet:user:read';
    
    window.location.href = `https://www.coinbase.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">808 Brokers</Link>
      </div>
      <div className="navbar-actions">
        {user ? (
          <>
            <span className="user-balance">{user.balance} ETH</span>
            <button className="auth-button" onClick={logout}>
              Disconnect Wallet
            </button>
          </>
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