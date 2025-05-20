import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiPlay, FiPause } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import '../styles/TikTokView.css';

const TikTokView = ({ beat, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [dropboxActive, setDropboxActive] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Sample videos data - replace with your actual data
  const videos = [
    {
      id: 1,
      title: "Trending",
      producer: "808 Brokers",
      image: "/DiceLogoTransparent.png",
      videoUrl: beat.videoUrl,
      featured: true,
      description: "A high-energy trap anthem perfect for your next hit",
      maturityRating: "TV-MA",
      year: "2024",
      duration: "3:45"
    },
    {
      id: 2,
      title: "Chill Vibes Mix",
      producer: "808 Brokers",
      image: "/DiceLogoTransparent.png",
      videoUrl: beat.videoUrl,
      featured: true,
      description: "Relaxing lo-fi beats to study and chill to",
      maturityRating: "TV-14",
      year: "2024",
      duration: "4:20"
    },
    {
      id: 3,
      title: "Dark Trap Beat",
      producer: "808 Brokers",
      image: "/DiceLogoTransparent.png",
      videoUrl: beat.videoUrl,
      featured: true,
      description: "Intense dark trap production with heavy 808s",
      maturityRating: "TV-MA",
      year: "2024",
      duration: "3:15"
    }
  ];

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
  }, [currentVideoIndex]);

  const handleMouseMove = () => {
    setShowControls(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 5000);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchmove', handleMouseMove);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchmove', handleMouseMove);
      };
    }
  }, []);

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

  const handleScroll = (e) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollPosition = container.scrollTop;
    const videoHeight = container.clientHeight;
    const newIndex = Math.round(scrollPosition / videoHeight);
    
    if (newIndex !== currentVideoIndex && newIndex >= 0 && newIndex < videos.length) {
      setCurrentVideoIndex(newIndex);
      setIsPlaying(true);
    }
  };

  return (
    <motion.div 
      className="tiktok-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div 
        className="tiktok-container" 
        ref={containerRef}
        onScroll={handleScroll}
      >
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className={`video-container ${index === currentVideoIndex ? 'active' : ''}`}
          >
            <img src={video.image} alt={video.title} className="video-background" />
            <video
              ref={index === currentVideoIndex ? videoRef : null}
              src={video.videoUrl}
              className="video-overlay"
              loop
              autoPlay={index === currentVideoIndex}
              muted
            />
            <AnimatePresence>
              {showControls && index === currentVideoIndex && (
                <>
                  <motion.button
                    className="back-button"
                    onClick={onBack}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiArrowLeft />
                  </motion.button>
                  <motion.div 
                    className="playback-controls"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="song-info">
                      <h2>{video.title}</h2>
                      <p className="producer">by {video.producer}</p>
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
                      <button 
                        className={`playback-dropbox-btn ${dropboxActive ? 'active' : ''}`}
                        onClick={handleDropbox}
                      >
                        <FontAwesomeIcon icon={faDropbox} className="playback-dropbox-icon" />
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
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TikTokView; 