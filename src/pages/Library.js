import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFilter, FiMoreVertical, FiClock, FiMusic, FiList, FiFolder, FiFile, FiUpload, FiDownload, FiShare2, FiTrash2, FiArrowLeft, FiHeart, FiBarChart2, FiBook, FiTrendingUp, FiUsers, FiDollarSign, FiGlobe, FiMic, FiMail } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import './Library.css';

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'Albums', 'Playlists', 'Artists', 'Songs'];

  const libraryItems = [
    {
      id: 1,
      title: 'Favorites',
      artist: 'Your Collection',
      type: '',
      duration: '',
      isLikedSongs: true
    },
    {
      id: 2,
      title: 'Dropbox',
      artist: 'Dropbox',
      type: 'Assets',
      duration: 'Modified 2h ago',
      isDropbox: true
    },
    {
      id: 3,
      title: 'Analytics',
      artist: 'Performance Metrics',
      type: 'Streams',
      duration: '2.5M plays',
      isAnalytics: true
    },
    {
      id: 4,
      title: 'University',
      artist: 'Educational Content',
      type: 'Harmony',
      duration: 'Resume',
      isUniversity: true
    },
    {
      id: 5,
      title: 'Studio',
      artist: 'Music Production',
      type: 'Beat_808.mp3',
      duration: '2h ago',
      isStudio: true
    },
    {
      id: 6,
      title: 'Mailbox',
      artist: 'Messages & Notifications',
      type: 'Inbox',
      duration: '0 unread',
      isMailbox: true
    },
  ];

  const handleCardClick = (item) => {
    if (item.isDropbox) {
      navigate('/dropbox');
    } else if (item.isLikedSongs) {
      navigate('/favorites');
    } else if (item.isAnalytics) {
      navigate('/analytics');
    } else if (item.isUniversity) {
      navigate('/university');
    } else if (item.isMailbox) {
      navigate('/dashboard/mailbox');
    } else if (item.isStudio) {
      navigate('/dashboard/studio');
    }
  };

  return (
    <div className="library-container">
      <div className="library-header">
        <div className="library-title">
          <h1>Your Library</h1>
        </div>
        <div className="library-controls">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search in Your Library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-container">
            <button 
              className="filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter />
              <span>Filter</span>
            </button>
            {showFilters && (
              <div className="filter-dropdown">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    className={`filter-option ${selectedFilter === filter ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedFilter(filter);
                      setShowFilters(false);
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="library-grid">
        {libraryItems.map((item) => (
          <div 
            key={item.id} 
            className="library-item"
            onClick={() => handleCardClick(item)}
          >
            <div className="item-cover">
              {item.isDropbox ? (
                <div className="dropbox-logo-container">
                  <FontAwesomeIcon icon={faDropbox} className="dropbox-logo" />
                </div>
              ) : item.isLikedSongs ? (
                <div className="liked-songs-container">
                  <FiHeart className="liked-songs-icon" />
                </div>
              ) : item.isAnalytics ? (
                <div className="analytics-container">
                  <FiBarChart2 className="analytics-icon" />
                </div>
              ) : item.isUniversity ? (
                <div className="university-container">
                  <FiBook className="university-icon" />
                </div>
              ) : item.isStudio ? (
                <div className="studio-container">
                  <FiMic className="studio-icon" />
                </div>
              ) : item.isMailbox ? (
                <div className="mailbox-container">
                  <FiMail className="mailbox-icon" />
                </div>
              ) : (
                <img src={item.cover} alt={item.title} />
              )}
              <div className="item-overlay">
                {item.isDropbox ? (
                  <FiFolder className="dropbox-icon" />
                ) : item.isAnalytics ? (
                  <FiBarChart2 className="analytics-icon" />
                ) : item.isUniversity ? (
                  <FiBook className="university-icon" />
                ) : item.isStudio ? (
                  <FiMic className="studio-icon" />
                ) : null}
              </div>
            </div>
            <div className="item-info">
              <h3>{item.title}</h3>
              <div className="item-meta">
                <span className="item-type">
                  {item.isDropbox ? <FiFolder /> : 
                   item.isAnalytics ? <FiBarChart2 /> : 
                   item.isUniversity ? <FiBook /> : 
                   item.isMailbox ? <FiMail /> :
                   item.isStudio ? <FiMusic /> :
                   item.type ? <FiList /> : null}
                  {item.type}
                </span>
                <span className="item-duration">
                  {item.duration}
                </span>
              </div>
            </div>
            <button className="item-more">
              <FiMoreVertical />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library; 