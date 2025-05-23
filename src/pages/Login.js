import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import TransitionOverlay from '../components/TransitionOverlay';
import Navbar from '../components/Navbar';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showTransition, setShowTransition] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth();

  // If user is already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Google login clicked');
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Show transition animation
    setShowTransition(true);
    
    // Delay navigation to allow animation to play
    setTimeout(() => {
      login({ email });
      // Redirect to the page they tried to access, or dashboard if none
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }, 1500); // Adjust timing to match animation duration
  };

  return (
    <>
      <Navbar />
      <AnimatePresence>
        {showTransition && <TransitionOverlay />}
      </AnimatePresence>
      
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Welcome to 808 Brokers</h1>
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
              <button type="submit" className="email-login-btn">Login</button>
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
    </>
  );
};

export default Login; 