import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import '../styles/Home.css';
import heroImage from '../images/downtown.gif';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="home">
      <div className="hero">
        <img 
          src={heroImage}
          alt="808 Brokers Hero"
          className="hero-image"
        />
        
        <h1 className="hero-title">808 Brokers</h1>
        <div className="hero-description">
          <small>Your Premium Marketplace for Beats and Samples</small>
        </div>
        
        <form className="search-container" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <svg className="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <input
              type="text"
              placeholder="Search for beats, samples, or producers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Home; 