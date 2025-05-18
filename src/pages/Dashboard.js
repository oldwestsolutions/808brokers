import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('beats');

  const featuredBeats = [
    {
      id: 1,
      title: "Summer Trap Beat",
      producer: "808 Brokers",
      image: "/DiceLogoTransparent.png",
      genre: "Trap",
      bpm: 140,
      key: "C# Minor",
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
      genre: "Lo-fi",
      bpm: 90,
      key: "F Major",
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
      genre: "Trap",
      bpm: 150,
      key: "D Minor",
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
      title: "Trending Now",
      description: "Most popular beats this week",
      beats: [
        {
          id: 4,
          title: "Midnight Trap",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          genre: "Trap",
          bpm: 145,
          key: "E Minor",
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
          genre: "Cloud Rap",
          bpm: 130,
          key: "G Major",
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
          genre: "Drill",
          bpm: 160,
          key: "A Minor",
          description: "Hard-hitting drill production",
          maturityRating: "TV-MA",
          year: "2024",
          duration: "3:15"
        }
      ]
    },
    {
      id: 2,
      title: "Popular in Trap",
      description: "Top trap beats this month",
      beats: [
        {
          id: 7,
          title: "Trap Anthem",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          genre: "Trap",
          bpm: 150,
          key: "B Minor",
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
          genre: "Trap",
          bpm: 140,
          key: "C# Minor",
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
          genre: "Trap",
          bpm: 145,
          key: "D Minor",
          description: "Dreamy trap with ethereal melodies",
          maturityRating: "TV-14",
          year: "2024",
          duration: "3:30"
        }
      ]
    },
    {
      id: 3,
      title: "New Releases",
      description: "Fresh beats just dropped",
      beats: [
        {
          id: 10,
          title: "Future Trap",
          producer: "808 Brokers",
          image: "/DiceLogoTransparent.png",
          genre: "Trap",
          bpm: 155,
          key: "F# Minor",
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
          genre: "Trap",
          bpm: 135,
          key: "A Major",
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
          genre: "Trap",
          bpm: 125,
          key: "G Minor",
          description: "Soulful trap with R&B influences",
          maturityRating: "TV-14",
          year: "2024",
          duration: "3:30"
        }
      ]
    }
  ];

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      
      <div className="dashboard-content">
        {/* Featured Section */}
        <div className="featured-section">
          <div className="featured-beat">
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
                <div key={beat.id} className="beat-card">
                  <div className="beat-image">
                    <img src={beat.image} alt={beat.title} />
                    <div className="beat-overlay">
                      <button className="play-btn">
                        <i className="fas fa-play"></i>
                      </button>
                      <button className="more-info-btn">
                        <i className="fas fa-info-circle"></i>
                      </button>
                    </div>
                    <div className="beat-meta">
                      <span className="maturity-rating">{beat.maturityRating}</span>
                      <span className="duration">{beat.duration}</span>
                    </div>
                  </div>
                  <div className="beat-info">
                    <h3>{beat.title}</h3>
                    <p className="producer">by {beat.producer}</p>
                    <p className="description">{beat.description}</p>
                    <div className="beat-details">
                      <span>{beat.genre}</span>
                      <span>{beat.bpm} BPM</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard; 