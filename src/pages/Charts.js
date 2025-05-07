import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeart, FaShare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Charts.css';

const Charts = () => {
  const [playing, setPlaying] = useState(null);
  const [likedCharts, setLikedCharts] = useState([]);

  const togglePlay = (chartId) => {
    setPlaying(playing === chartId ? null : chartId);
  };

  const toggleLike = (chartId) => {
    setLikedCharts(prev => 
      prev.includes(chartId) 
        ? prev.filter(id => id !== chartId)
        : [...prev, chartId]
    );
  };

  const charts = [
    {
      id: 1,
      title: "Top 50 Global",
      description: "The most streamed tracks worldwide",
      listeners: "2.5M",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      genre: "Various"
    },
    {
      id: 2,
      title: "Hip Hop Hits",
      description: "The hottest hip hop tracks right now",
      listeners: "1.8M",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      genre: "Hip Hop"
    },
    {
      id: 3,
      title: "Electronic Beats",
      description: "The best electronic music tracks",
      listeners: "1.2M",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      genre: "Electronic"
    }
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <Link to="/" className="logo-link">
          <img src="/DiceLogoTransparent.png" alt="806brokers Logo" className="header-logo" />
        </Link>
      </header>

      <motion.div 
        className="charts-page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="charts-header">
          <h1>Charts</h1>
          <p className="subtitle">Discover the most popular tracks</p>
        </div>

        <div className="charts-content">
          <section className="charts-section">
            <h2>Featured Charts</h2>
            <div className="charts-grid">
              {charts.map(chart => (
                <motion.div
                  key={chart.id}
                  className="chart-card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="chart-image">
                    <img src={chart.image} alt={chart.title} />
                    <button 
                      className="play-button"
                      onClick={() => togglePlay(chart.id)}
                    >
                      {playing === chart.id ? <FaPause /> : <FaPlay />}
                    </button>
                  </div>
                  <div className="chart-info">
                    <h3>{chart.title}</h3>
                    <p className="description">{chart.description}</p>
                    <div className="chart-meta">
                      <span>{chart.genre}</span>
                      <span>{chart.listeners} listeners</span>
                    </div>
                    <div className="chart-actions">
                      <button 
                        className={`like-button ${likedCharts.includes(chart.id) ? 'liked' : ''}`}
                        onClick={() => toggleLike(chart.id)}
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

export default Charts; 