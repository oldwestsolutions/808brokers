import React from 'react';
import { FiHeart, FiPlay, FiClock, FiMoreVertical } from 'react-icons/fi';
import BackButton from '../components/BackButton';
import '../styles/Favorites.css';

const Favorites = () => {
  const favoriteSongs = [
    {
      id: 1,
      title: "Summer Vibes",
      artist: "808 Brokers",
      duration: "3:45",
      cover: "/DiceLogoTransparent.png"
    },
    {
      id: 2,
      title: "Midnight Dreams",
      artist: "808 Brokers",
      duration: "4:20",
      cover: "/DiceLogoTransparent.png"
    },
    {
      id: 3,
      title: "Urban Nights",
      artist: "808 Brokers",
      duration: "3:15",
      cover: "/DiceLogoTransparent.png"
    }
  ];

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <BackButton destination="/library" text="Back to Library" />
        <div className="favorites-title">
          <FiHeart className="favorites-icon" />
          <h2>Your Favorites</h2>
        </div>
      </div>

      <div className="favorites-content">
        <div className="favorites-list">
          {favoriteSongs.map((song) => (
            <div key={song.id} className="favorite-item">
              <div className="song-info">
                <img src={song.cover} alt={song.title} className="song-cover" />
                <div className="song-details">
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>
              <div className="song-actions">
                <button className="play-button">
                  <FiPlay />
                </button>
                <span className="duration">
                  <FiClock />
                  {song.duration}
                </span>
                <button className="more-button">
                  <FiMoreVertical />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorites; 