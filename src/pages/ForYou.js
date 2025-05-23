import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeart, FaShare, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/ForYou.css';

const ForYou = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const recommendedBeats = [
    {
      id: 1,
      title: "Summer Vibes",
      producer: "808Broker",
      genre: "Trap",
      bpm: 140,
      plays: "2.3K",
      image: "https://via.placeholder.com/300x300",
      audioUrl: "#"
    },
    {
      id: 2,
      title: "Midnight Dreams",
      producer: "BeatMaker",
      genre: "R&B",
      bpm: 95,
      plays: "1.8K",
      image: "https://via.placeholder.com/300x300",
      audioUrl: "#"
    },
    {
      id: 3,
      title: "Urban Flow",
      producer: "SoundSmith",
      genre: "Hip Hop",
      bpm: 85,
      plays: "1.5K",
      image: "https://via.placeholder.com/300x300",
      audioUrl: "#"
    }
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <Link to="/" className="logo-link">
          <img src="/DiceLogoTransparent.png" alt="808Brokers Logo" className="header-logo" />
        </Link>
        <button className="header-search-icon" onClick={() => setSearchModalOpen(true)}>
          <FaSearch />
        </button>
      </header>

      {searchModalOpen && (
        <div className="search-modal-overlay" onClick={() => setSearchModalOpen(false)}>
          <div className="search-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSearchModalOpen(false)}>&times;</button>
            <input
              type="text"
              className="search-modal-input"
              placeholder="Search for beats, producers, genres..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            {/* You can add search results here */}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="foryou-page"
      >
        <div className="foryou-header">
          <h1>For You</h1>
          <p className="subtitle">Your personalized collection of beats and samples</p>
        </div>

        <div className="foryou-content">
          <section className="recommended-section">
            <h2>Recommended for You</h2>
            <div className="beats-grid">
              {recommendedBeats.map((beat) => (
                <motion.div
                  key={beat.id}
                  className="beat-card"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="beat-image">
                    <img src={beat.image} alt={beat.title} />
                    <button 
                      className="play-button"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                  </div>
                  <div className="beat-info">
                    <h3>{beat.title}</h3>
                    <p className="producer">{beat.producer}</p>
                    <div className="beat-details">
                      <span className="genre">{beat.genre}</span>
                      <span className="bpm">{beat.bpm} BPM</span>
                      <span className="plays">{beat.plays} plays</span>
                    </div>
                    <div className="beat-actions">
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

          <section className="genres-section">
            <h2>Your Favorite Genres</h2>
            <div className="genres-grid">
              <div className="genre-card">
                <h3>Trap</h3>
                <p>12 new beats</p>
              </div>
              <div className="genre-card">
                <h3>R&B</h3>
                <p>8 new beats</p>
              </div>
              <div className="genre-card">
                <h3>Hip Hop</h3>
                <p>15 new beats</p>
              </div>
            </div>
          </section>

          <section className="producers-section">
            <h2>Top Producers You Follow</h2>
            <div className="producers-grid">
              {recommendedBeats.map((beat) => (
                <div key={beat.id} className="producer-card">
                  <img src={beat.image} alt={beat.producer} className="producer-avatar" />
                  <h3>{beat.producer}</h3>
                  <p>3 new beats</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default ForYou; 