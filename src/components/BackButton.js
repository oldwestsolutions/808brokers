import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate('/dashboard')}>
      <svg className="back-icon" viewBox="0 0 24 24">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
      <span>Back to Dashboard</span>
    </button>
  );
};

export default BackButton; 