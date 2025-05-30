import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHeader from '../components/DashboardHeader';
import TikTokView from './TikTokView';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('beats');
  const [selectedBeat, setSelectedBeat] = useState(null);

  const featuredBeats = [
    {
      id: 1,
      title: "Trending",
      producer: "808 Brokers",
      image: "/DiceLogoTransparent.png",
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
      featured: true,
      description: "Intense dark trap production with heavy 808s",
      maturityRating: "TV-MA",
      year: "2024",
      duration: "3:15"
    }
  ];

  const categories = [
    {
      id: 1,
      title: "Artists",
      description: "",
      beats: [
        {
          id: 4,
          title: "Midnight Trap",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Late night vibes with deep bass",
          maturityRating: "TV-MA",
          year: "2024",
          duration: "3:30"
        },
        {
          id: 5,
          title: "Cloud Rap",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Dreamy cloud rap production",
          maturityRating: "TV-14",
          year: "2024",
          duration: "3:45"
        },
        {
          id: 6,
          title: "Drill Beat",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Hard-hitting drill production",
          maturityRating: "TV-MA",
          year: "2024",
          duration: "3:15"
        }
      ]
    },
    {
      id: 2,
      title: "Producers",
      description: "",
      beats: [
        {
          id: 7,
          title: "Trap Anthem",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Epic trap anthem with cinematic elements",
          maturityRating: "TV-MA",
          year: "2024",
          duration: "4:00"
        },
        {
          id: 8,
          title: "Trap Wave",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Wave-inspired trap production",
          maturityRating: "TV-14",
          year: "2024",
          duration: "3:45"
        },
        {
          id: 9,
          title: "Trap Dreams",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Dreamy trap with ethereal melodies",
          maturityRating: "TV-14",
          year: "2024",
          duration: "3:30"
        }
      ]
    },
    {
      id: 3,
      title: "Samples",
      description: "",
      beats: [
        {
          id: 10,
          title: "Future Trap",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Futuristic trap with synth elements",
          maturityRating: "TV-MA",
          year: "2024",
          duration: "3:45"
        },
        {
          id: 11,
          title: "Melodic Trap",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Melodic trap with emotional depth",
          maturityRating: "TV-14",
          year: "2024",
          duration: "4:15"
        },
        {
          id: 12,
          title: "Trap Soul",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          description: "Soulful trap with R&B influences",
          maturityRating: "TV-14",
          year: "2024",
          duration: "3:30"
        }
      ]
    }
  ];

  const handleBeatClick = (beat) => {
    setSelectedBeat(beat);
  };

  const handleBack = () => {
    setSelectedBeat(null);
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      
      <AnimatePresence mode="wait">
        {selectedBeat ? (
          <TikTokView beat={selectedBeat} onBack={handleBack} />
        ) : (
          <motion.div 
            className="dashboard-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Featured Section */}
            <div className="featured-section">
              <div 
                className="featured-beat"
                onClick={() => handleBeatClick(featuredBeats[0])}
                style={{ cursor: 'pointer' }}
              >
                <div className="featured-info">
                  <div className="featured-title">
                    <h1>{featuredBeats[0].title}</h1>
                    <div className="featured-meta">
                      <span className="maturity-rating">{featuredBeats[0].maturityRating}</span>
                      <span className="year">{featuredBeats[0].year}</span>
                      <span className="duration">{featuredBeats[0].duration}</span>
                    </div>
                  </div>
                </div>
                <div className="featured-gradient"></div>
                <img src={featuredBeats[0].image} alt={featuredBeats[0].title} />
              </div>
            </div>

            {/* Categories */}
            {categories.map(category => (
              <div key={category.id} className="category-section">
                <div className="category-header">
                  <h2>{category.title}</h2>
                  <p className="category-description">{category.description}</p>
                </div>
                <div className="beats-row">
                  {category.beats.map(beat => (
                    <div 
                      key={beat.id} 
                      className="beat-card"
                      onClick={() => handleBeatClick(beat)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="beat-image">
                        <img src={beat.image} alt={beat.title} />
                        <div className="beat-overlay">
                          <button className="play-btn">
                            <i className="fas fa-play"></i>
                          </button>
                        </div>
                        <div className="beat-meta">
                          <span className="duration">{beat.duration}</span>
                        </div>
                      </div>
                      <div className="beat-info">
                        <h3>{beat.title}</h3>
                        <p className="producer">by {beat.producer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard; 