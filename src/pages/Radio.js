import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeart, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Radio.css';

const Radio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  const radioStations = [
    {
      id: 1,
      title: "Trap Radio",
      description: "24/7 Trap Music",
      listeners: "2.3K",
      image: "https://via.placeholder.com/300x300",
      genre: "Trap"
    },
    {
      id: 2,
      title: "Hip Hop Hits",
      description: "Best Hip Hop Tracks",
      listeners: "1.8K",
      image: "https://via.placeholder.com/300x300",
      genre: "Hip Hop"
    },
    {
      id: 3,
      title: "R&B Vibes",
      description: "Smooth R&B Radio",
      listeners: "1.5K",
      image: "https://via.placeholder.com/300x300",
      genre: "R&B"
    }
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <Link to="/" className="logo-link">
          <img src="/DiceLogoTransparent.png" alt="808Brokers Logo" className="header-logo" />
        </Link>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="radio-page"
      >
        <div className="radio-header">
          <h1>Radio</h1>
          <p className="subtitle">Listen to the best beats and tracks</p>
        </div>

        <div className="radio-content">
          <section className="stations-section">
            <h2>Featured Stations</h2>
            <div className="stations-grid">
              {radioStations.map((station) => (
                <motion.div
                  key={station.id}
                  className="station-card"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="station-image">
                    <img src={station.image} alt={station.title} />
                    <button 
                      className="play-button"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                  </div>
                  <div className="station-info">
                    <h3>{station.title}</h3>
                    <p className="description">{station.description}</p>
                    <div className="station-meta">
                      <span className="genre">{station.genre}</span>
                      <span className="listeners">{station.listeners} listeners</span>
                    </div>
                    <div className="station-actions">
                      <button 
                        className={`like-button ${liked ? 'liked' : ''}`}
                        onClick={() => setLiked(!liked)}
                      >
                        <FaHeart />
                      </button>
                      <button className="share-button">
                        <FaShare />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default Radio; 