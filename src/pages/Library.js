import React, { useState } from 'react';
import { FiSearch, FiFilter, FiMoreVertical, FiClock, FiMusic, FiList, FiFolder, FiFile, FiUpload, FiDownload, FiShare2, FiTrash2, FiArrowLeft, FiHeart, FiBarChart2, FiBook, FiTrendingUp, FiUsers, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import './Library.css';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [currentView, setCurrentView] = useState('library'); // 'library', 'dropbox', 'analytics', 'university'

  const filters = ['All', 'Albums', 'Playlists', 'Artists', 'Songs'];

  const libraryItems = [
    {
      id: 1,
      title: 'Liked Songs',
      artist: 'Your Collection',
      type: 'Playlist',
      duration: '2h 45m',
      isLikedSongs: true
    },
    {
      id: 2,
      title: 'Your Top Songs 2023',
      artist: 'Dropbox',
      type: 'Folder',
      duration: '1h 30m',
      isDropbox: true
    },
    {
      id: 3,
      title: 'Analytics',
      artist: 'Performance Metrics',
      type: 'Dashboard',
      duration: 'Updated daily',
      isAnalytics: true
    },
    {
      id: 4,
      title: 'University',
      artist: 'Educational Content',
      type: 'Course',
      duration: '4h 20m',
      isUniversity: true
    },
    {
      id: 5,
      title: 'Daily Mix 1',
      artist: 'Spotify',
      type: 'Playlist',
      duration: '1h 15m',
      cover: 'https://dailymix-images.scdn.co/v2/img/ab67616d0000b2732a038d3bf875d23e4aeaa84e/1/en/default',
    },
    {
      id: 6,
      title: 'Chill Mix',
      artist: 'Spotify',
      type: 'Playlist',
      duration: '2h 30m',
      cover: 'https://i.scdn.co/image/ab67706f00000002b0fe40a6e1692822f5a9d8f1',
    },
  ];

  const handleCardClick = (item) => {
    if (item.isDropbox) {
      setCurrentView('dropbox');
    } else if (item.isAnalytics) {
      setCurrentView('analytics');
    } else if (item.isUniversity) {
      setCurrentView('university');
    }
  };

  const handleBackClick = () => {
    setCurrentView('library');
  };

  const renderAnalyticsView = () => (
    <div className="dropbox-view">
      <div className="dropbox-header">
        <button className="back-button" onClick={handleBackClick}>
          <FiArrowLeft />
          <span>Back to Library</span>
        </button>
        <h2>Analytics Dashboard</h2>
      </div>

      <div className="tiktok-analytics">
        <div className="trending-stats">
          <div className="trending-card">
            <div className="trending-header">
              <FiTrendingUp className="trending-icon" />
              <h3>Trending Now</h3>
            </div>
            <div className="trending-content">
              <div className="trending-item">
                <span className="trending-number">#1</span>
                <div className="trending-info">
                  <h4>Your Latest Track</h4>
                  <p>+2.5M views in 24h</p>
                </div>
                <div className="trending-stats">
                  <span className="stat">
                    <FiUsers /> 45.2K
                  </span>
                  <span className="stat">
                    <FiHeart /> 12.8K
                  </span>
                </div>
              </div>
              <div className="trending-item">
                <span className="trending-number">#2</span>
                <div className="trending-info">
                  <h4>Viral Remix</h4>
                  <p>+1.8M views in 24h</p>
                </div>
                <div className="trending-stats">
                  <span className="stat">
                    <FiUsers /> 32.1K
                  </span>
                  <span className="stat">
                    <FiHeart /> 9.5K
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="engagement-metrics">
            <div className="metric-card">
              <div className="metric-header">
                <FiUsers className="metric-icon" />
                <h3>Followers</h3>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-header">
                <FiHeart className="metric-icon" />
                <h3>Likes</h3>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-header">
                <FiMusic className="metric-icon" />
                <h3>Plays</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-content">
          <div className="content-performance">
            <h3>Content Performance</h3>
            <div className="performance-grid">
              <div className="performance-card">
                <div className="performance-header">
                  <h4>Peak Hours</h4>
                  <span className="time">6PM - 9PM EST</span>
                </div>
                <div className="performance-stats">
                  <div className="stat-item">
                    <span className="label">Views</span>
                    <span className="value">2.5M</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Engagement</span>
                    <span className="value">68%</span>
                  </div>
                </div>
              </div>
              <div className="performance-card">
                <div className="performance-header">
                  <h4>Top Genre</h4>
                  <span className="genre">Hip Hop</span>
                </div>
                <div className="performance-stats">
                  <div className="stat-item">
                    <span className="label">Engagement</span>
                    <span className="value">+25%</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Growth</span>
                    <span className="value">+15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="audience-insights">
            <h3>Audience Insights</h3>
            <div className="insights-grid">
              <div className="insight-card">
                <div className="insight-header">
                  <FiUsers className="insight-icon" />
                  <h4>Demographics</h4>
                </div>
                <div className="insight-content">
                  <div className="demographic-item">
                    <span className="label">Age 18-24</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '65%' }}></div>
                    </div>
                    <span className="value">65%</span>
                  </div>
                  <div className="demographic-item">
                    <span className="label">Age 25-34</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '25%' }}></div>
                    </div>
                    <span className="value">25%</span>
                  </div>
                  <div className="demographic-item">
                    <span className="label">Age 35+</span>
                    <div className="progress-bar">
                      <div className="progress" style={{ width: '10%' }}></div>
                    </div>
                    <span className="value">10%</span>
                  </div>
                </div>
              </div>
              <div className="insight-card">
                <div className="insight-header">
                  <FiGlobe className="insight-icon" />
                  <h4>Top Locations</h4>
                </div>
                <div className="insight-content">
                  <div className="location-item">
                    <span className="location">United States</span>
                    <span className="percentage">45%</span>
                  </div>
                  <div className="location-item">
                    <span className="location">United Kingdom</span>
                    <span className="percentage">20%</span>
                  </div>
                  <div className="location-item">
                    <span className="location">Canada</span>
                    <span className="percentage">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUniversityView = () => (
    <div className="dropbox-view">
      <div className="dropbox-header">
        <button className="back-button" onClick={handleBackClick}>
          <FiArrowLeft />
          <span>Back to Library</span>
        </button>
        <h2>University Courses</h2>
      </div>
      <div className="university-content">
        <div className="course-list">
          <div className="course-item">
            <div className="course-icon">
              <FiBook />
            </div>
            <div className="course-info">
              <h3>Music Production 101</h3>
              <p>Learn the basics of music production and sound design</p>
              <div className="course-meta">
                <span>Duration: 2h 30m</span>
                <span>Level: Beginner</span>
              </div>
            </div>
          </div>
          <div className="course-item">
            <div className="course-icon">
              <FiMusic />
            </div>
            <div className="course-info">
              <h3>Advanced Mixing Techniques</h3>
              <p>Master the art of mixing and mastering</p>
              <div className="course-meta">
                <span>Duration: 3h 45m</span>
                <span>Level: Advanced</span>
              </div>
            </div>
          </div>
          <div className="course-item">
            <div className="course-icon">
              <FiTrendingUp />
            </div>
            <div className="course-info">
              <h3>Music Business Fundamentals</h3>
              <p>Understanding the business side of music</p>
              <div className="course-meta">
                <span>Duration: 2h 15m</span>
                <span>Level: Intermediate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (currentView === 'dropbox') {
    return (
      <div className="library-container">
        <div className="dropbox-view">
          <div className="dropbox-header">
            <button className="back-button" onClick={handleBackClick}>
              <FiArrowLeft />
              <span>Back to Library</span>
            </button>
            <h2>Your Top Songs 2023</h2>
          </div>
          <div className="dropbox-toolbar">
            <button className="toolbar-button">
              <FiUpload />
              <span>Upload</span>
            </button>
            <button className="toolbar-button">
              <FiDownload />
              <span>Download</span>
            </button>
            <button className="toolbar-button">
              <FiShare2 />
              <span>Share</span>
            </button>
            <button className="toolbar-button">
              <FiTrash2 />
              <span>Delete</span>
            </button>
          </div>
          <div className="dropbox-content">
            <div className="file-list">
              <div className="file-item">
                <FiFile className="file-icon" />
                <span>Song1.mp3</span>
              </div>
              <div className="file-item">
                <FiFile className="file-icon" />
                <span>Song2.mp3</span>
              </div>
              <div className="file-item">
                <FiFile className="file-icon" />
                <span>Song3.mp3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'analytics') {
    return (
      <div className="library-container">
        {renderAnalyticsView()}
      </div>
    );
  }

  if (currentView === 'university') {
    return (
      <div className="library-container">
        {renderUniversityView()}
      </div>
    );
  }

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
                ) : (
                  <button className="play-button">
                    <FiMusic />
                  </button>
                )}
              </div>
            </div>
            <div className="item-info">
              <h3>{item.title}</h3>
              <p className="item-artist">{item.artist}</p>
              <div className="item-meta">
                <span className="item-type">
                  <FiList />
                  {item.type}
                </span>
                <span className="item-duration">
                  <FiClock />
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