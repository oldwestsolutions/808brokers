import React, { useState } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic will go here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to 808 Brokers</h1>
        <p>Your Premium Marketplace for Beats and Samples</p>
        
        <form className="search-container" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for beats, samples, or producers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <h3>Top 100 Artists</h3>
        </div>
        <div className="feature-card">
          <h3>Top 100 Instrumentals</h3>
        </div>
        <div className="feature-card">
          <h3>Trending</h3>
        </div>
      </div>
    </div>
  );
};

export default Home; 