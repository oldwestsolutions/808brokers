import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked');
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // For demo purposes, we'll just log in with any email/password
    // In a real app, you would validate credentials with your backend
    login({ email });
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="/DiceLogoTransparent.png" alt="808 Brokers" className="login-logo" />
        </div>

        <div className="login-options">
          <form className="email-login" onSubmit={handleEmailLogin}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="email-login-btn">Sign in with Email</button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <FaGoogle className="google-icon" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 