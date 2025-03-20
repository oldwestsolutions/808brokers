import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const code = searchParams.get('code');
      
      if (code) {
        await login(code);
        navigate('/');
      } else {
        navigate('/');
      }
    };

    handleCallback();
  }, [location, login, navigate]);

  return (
    <div className="auth-callback">
      <div className="loading-spinner"></div>
      <p>Connecting your wallet...</p>
    </div>
  );
};

export default AuthCallback; 