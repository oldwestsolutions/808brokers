import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  // Hide navbar and prevent scroll
  useEffect(() => {
    document.querySelector('.navbar')?.style.setProperty('display', 'none');
    document.body.classList.add('login-active');
    
    // Cleanup
    return () => {
      document.querySelector('.navbar')?.style.setProperty('display', 'flex');
      document.body.classList.remove('login-active');
    };
  }, []);

  const handleCoinbaseLogin = () => {
    // Directly navigate to dashboard instead of Coinbase OAuth
    navigate('/dashboard');
  };

  const handleRobinhoodLogin = () => {
    // Directly navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
      
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