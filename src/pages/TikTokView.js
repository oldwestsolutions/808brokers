import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiMessageCircle, FiShare2, FiMusic } from 'react-icons/fi';
import '../styles/TikTokView.css';

const TikTokView = ({ beat, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);

  return (
    <motion.div 
      className="tiktok-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="back-button" onClick={onBack}>
        <FiArrowLeft />
        <span>Back to Dashboard</span>
      </button>

      <div className="tiktok-container">
        <div className="video-container">
          <img src={beat.image} alt={beat.title} className="video-background" />
          <div className="video-overlay">
            <div className="video-info">
              <h2>{beat.title}</h2>
              <p className="producer">by {beat.producer}</p>
              <p className="description">{beat.description}</p>
            </div>
          </div>
        </div>

        <div className="interaction-buttons">
          <button className="interaction-btn">
            <FiHeart className={liked ? 'liked' : ''} />
            <span>2.5K</span>
          </button>
          <button className="interaction-btn">
            <FiMessageCircle />
            <span>1.2K</span>
          </button>
          <button className="interaction-btn">
            <FiShare2 />
            <span>Share</span>
          </button>
          <button className="interaction-btn">
            <FiMusic />
            <span>Use Sound</span>
          </button>
        </div>

        <div className="beat-details">
          <div className="detail-item">
            <span className="label">Genre</span>
            <span className="value">{beat.genre}</span>
          </div>
          <div className="detail-item">
            <span className="label">BPM</span>
            <span className="value">{beat.bpm}</span>
          </div>
          <div className="detail-item">
            <span className="label">Key</span>
            <span className="value">{beat.key}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TikTokView; 