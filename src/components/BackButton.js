import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import '../styles/BackButton.css';

const BackButton = ({ destination, text = 'Back' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(destination);
  };

  return (
    <button className="back-button" onClick={handleClick}>
      <FiArrowLeft className="back-icon" />
      <span>{text}</span>
    </button>
  );
};

export default BackButton; 