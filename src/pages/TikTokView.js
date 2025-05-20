import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiHeart, FiCheck, FiPlay, FiPause } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import '../styles/TikTokView.css';

const TikTokView = ({ beat, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [dropboxActive, setDropboxActive] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [showInteractions, setShowInteractions] = useState(true);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const interactionsTimeoutRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        }
      };
    }
  }, []);

  const handleMouseMove = () => {
    setShowControls(true);
    setShowInteractions(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (interactionsTimeoutRef.current) {
      clearTimeout(interactionsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 8000);
    
    interactionsTimeoutRef.current = setTimeout(() => {
      setShowInteractions(false);
    }, 9000);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
      const newTime = clickPosition * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleDropbox = () => {
    setDropboxActive(!dropboxActive);
    setShowLetter(true);
    setTimeout(() => {
      setShowLetter(false);
      setShowCheckmark(true);
      setTimeout(() => {
        setShowCheckmark(false);
      }, 1000);
    }, 500);
  };

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

      <div className="tiktok-container" onMouseMove={handleMouseMove}>
        <div className="video-container">
          <img src={beat.image} alt={beat.title} className="video-background" />
          <video
            ref={videoRef}
            src={beat.videoUrl}
            className="video-overlay"
            loop
            autoPlay
            muted
          />
          <AnimatePresence>
            {showControls && (
              <motion.div 
                className="playback-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="song-info">
                  <h2>{beat.title}</h2>
                  <p className="producer">by {beat.producer}</p>
                </div>
                <div className="controls-container">
                  <button className="play-pause-btn" onClick={handlePlayPause}>
                    {isPlaying ? <FiPause /> : <FiPlay />}
                  </button>
                  <div className="time-display">{formatTime(currentTime)}</div>
                  <div className="progress-bar" onClick={handleProgressClick}>
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                  </div>
                  <div className="time-display">{formatTime(duration)}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {showInteractions && (
            <motion.div 
              className="interaction-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.button 
                className={`interaction-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
                whileTap={{ scale: 0.9 }}
              >
                <FiHeart className={liked ? 'liked' : ''} />
              </motion.button>
              <motion.button 
                className={`interaction-btn ${dropboxActive ? 'active' : ''}`}
                onClick={handleDropbox}
                whileTap={{ scale: 0.9 }}
              >
                <div className="dropbox-container">
                  <FontAwesomeIcon icon={faDropbox} className="dropbox-icon" />
                  <AnimatePresence>
                    {showLetter && (
                      <motion.div
                        className="flying-letter"
                        initial={{ 
                          opacity: 1,
                          x: -100,
                          y: -100,
                          scale: 1
                        }}
                        animate={{ 
                          opacity: 0,
                          x: 0,
                          y: 0,
                          scale: 0.5
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span>📄</span>
                      </motion.div>
                    )}
                    {showCheckmark && (
                      <motion.div
                        className="checkmark"
                        initial={{ 
                          opacity: 0,
                          scale: 0.8
                        }}
                        animate={{ 
                          opacity: 1,
                          scale: 1
                        }}
                        exit={{ 
                          opacity: 0,
                          scale: 0.8
                        }}
                        transition={{ 
                          duration: 0.2,
                          ease: "easeInOut"
                        }}
                      >
                        <FiCheck />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TikTokView; 