import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleCoinbaseLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_COINBASE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const SCOPE = 'wallet:user:read';
    
    window.location.href = `https://www.coinbase.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}`;
  };

  const handleRobinhoodLogin = () => {
    // Implement Robinhood OAuth flow when available
    console.log('Robinhood login - coming soon');
  };

  return (
    <div className="login-page">
      <div className="login-modal">
        <div className="modal-header">
          <h2>Connect Your Wallet</h2>
          <p>Choose your preferred platform to continue</p>
        </div>
        
        <div className="login-options">
          <button 
            className="login-option coinbase"
            onClick={handleCoinbaseLogin}
          >
            <div className="option-icon">
              <img src="/coinbase-icon.svg" alt="Coinbase" />
            </div>
            <div className="option-info">
              <h3>Coinbase</h3>
              <p>Connect using Coinbase Wallet</p>
            </div>
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button 
            className="login-option robinhood"
            onClick={handleRobinhoodLogin}
          >
            <div className="option-icon">
              <img src="/robinhood-icon.svg" alt="Robinhood" />
            </div>
            <div className="option-info">
              <h3>Robinhood</h3>
              <p>Connect using Robinhood Account</p>
            </div>
          </button>
        </div>

        <div className="modal-footer">
          <p>By connecting, you agree to our <a href="/terms">Terms of Service</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login; 