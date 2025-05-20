import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGlobe, FiUsers, FiTrendingUp, FiMusic, FiSearch, FiDownload, FiHeart, FiTrendingDown } from 'react-icons/fi';
import '../styles/Wallet.css';

const Wallet = () => {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');

  const analyticsData = {
    growthMetrics: {
      currentValue: 25000,
      change24h: 1250,
      changePercentage: 5.2,
      timeRanges: {
        '24h': {
          change: 1250,
          percentage: 5.2,
          data: [
            { time: '00:00', value: 23750 },
            { time: '02:00', value: 23900 },
            { time: '04:00', value: 24200 },
            { time: '06:00', value: 24400 },
            { time: '08:00', value: 24500 },
            { time: '10:00', value: 24700 },
            { time: '12:00', value: 24800 },
            { time: '14:00', value: 24900 },
            { time: '16:00', value: 25100 },
            { time: '18:00', value: 25000 },
            { time: '20:00', value: 25000 },
            { time: '22:00', value: 25000 }
          ]
        },
        '7d': {
          change: 3500,
          percentage: 16.3,
          data: [
            { time: 'Mon', value: 21500 },
            { time: 'Tue', value: 22200 },
            { time: 'Wed', value: 22800 },
            { time: 'Thu', value: 23500 },
            { time: 'Fri', value: 24200 },
            { time: 'Sat', value: 24800 },
            { time: 'Sun', value: 25000 }
          ]
        },
        '30d': {
          change: 8500,
          percentage: 51.5,
          data: [
            { time: 'Week 1', value: 16500 },
            { time: 'Week 2', value: 18500 },
            { time: 'Week 3', value: 21500 },
            { time: 'Week 4', value: 25000 }
          ]
        }
      }
    },
    listeningHistory: {
      totalSearches: 45000,
      uniqueAssets: 12500,
      averageSearchTime: 2.5,
      topSearches: [
        { term: '808 Bass', searches: 8500 },
        { term: 'Trap Hi-Hats', searches: 6200 },
        { term: 'Melodic Loops', searches: 4800 }
      ],
      assetInteractions: {
        previews: 25000,
        downloads: 8500,
        favorites: 4200
      },
      searchCategories: [
        { category: 'Drums', percentage: 45 },
        { category: 'Melodies', percentage: 30 },
        { category: 'Vocals', percentage: 25 }
      ]
    },
    listenerValue: {
      totalRevenue: 25000,
      averageValue: 0.55,
      topMarkets: [
        { market: 'Streaming', value: 15000 },
        { market: 'Downloads', value: 7500 },
        { market: 'Licensing', value: 2500 }
      ]
    }
  };

  const currentData = analyticsData.growthMetrics.timeRanges[selectedTimeRange];

  return (
    <div className="wallet-page">
      <div className="wallet-container">
        <div className="wallet-header">
          <h1>Wallet</h1>
          <p className="wallet-subtitle">Real-time blockchain analytics powered by IBM Hyperledger</p>
          <div className="wallet-info">
            <div className="info-item">
              <span className="info-label">Network</span>
              <span className="info-value">IBM Hyperledger Fabric</span>
            </div>
            <div className="info-item">
              <span className="info-label">Chain ID</span>
              <span className="info-value">0x1</span>
            </div>
            <div className="info-item">
              <span className="info-label">Block Height</span>
              <span className="info-value">1,234,567</span>
            </div>
          </div>
        </div>

        <div className="growth-chart">
          <div className="chart-header">
            <div className="chart-title">
              <h3>Wallet</h3>
              <div className="time-range-selector">
                <button 
                  className={`time-range-btn ${selectedTimeRange === '24h' ? 'active' : ''}`}
                  onClick={() => setSelectedTimeRange('24h')}
                >
                  24H
                </button>
                <button 
                  className={`time-range-btn ${selectedTimeRange === '7d' ? 'active' : ''}`}
                  onClick={() => setSelectedTimeRange('7d')}
                >
                  7D
                </button>
                <button 
                  className={`time-range-btn ${selectedTimeRange === '30d' ? 'active' : ''}`}
                  onClick={() => setSelectedTimeRange('30d')}
                >
                  30D
                </button>
              </div>
            </div>
            <div className="chart-value">
              <span className="current-value">${analyticsData.growthMetrics.currentValue.toLocaleString()}</span>
              <span className={`change-value ${currentData.percentage >= 0 ? 'positive' : 'negative'}`}>
                {currentData.percentage >= 0 ? '+' : ''}{currentData.percentage}%
                (${currentData.change.toLocaleString()})
              </span>
            </div>
          </div>
          <div className="chart-container">
            <div className="time-labels">
              {currentData.data.map((point, index) => (
                <span key={index} className="time-label">{point.time}</span>
              ))}
            </div>
            <div className="chart-area">
              <div className="chart-line"></div>
              {currentData.data.map((point, index) => (
                <div key={index} className="chart-point" style={{
                  left: `${(index / (currentData.data.length - 1)) * 100}%`,
                  bottom: `${((point.value - Math.min(...currentData.data.map(p => p.value))) / 
                    (Math.max(...currentData.data.map(p => p.value)) - 
                    Math.min(...currentData.data.map(p => p.value)))) * 100}%`
                }}>
                  <div className="point-tooltip">
                    <span className="point-time">{point.time}</span>
                    <span className="point-value">${point.value.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="analytics-grid">
          <div className="analytics-card">
            <h3><FiSearch /> Asset Search Analytics</h3>
            <div className="analytics-stats">
              <div className="stat-item">
                <span className="stat-label">Total Searches</span>
                <span className="stat-value">{analyticsData.listeningHistory.totalSearches.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Unique Assets</span>
                <span className="stat-value">{analyticsData.listeningHistory.uniqueAssets.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg. Search Time</span>
                <span className="stat-value">{analyticsData.listeningHistory.averageSearchTime} min</span>
              </div>
            </div>
            <div className="top-items">
              <h4>Top Search Terms</h4>
              {analyticsData.listeningHistory.topSearches.map((search, index) => (
                <div key={index} className="top-item">
                  <span>{search.term}</span>
                  <span>{search.searches.toLocaleString()} searches</span>
                </div>
              ))}
            </div>
            <div className="top-items">
              <h4>Asset Interactions</h4>
              <div className="interaction-stats">
                <div className="interaction-item">
                  <FiSearch className="interaction-icon" />
                  <span>{analyticsData.listeningHistory.assetInteractions.previews.toLocaleString()} Previews</span>
                </div>
                <div className="interaction-item">
                  <FiDownload className="interaction-icon" />
                  <span>{analyticsData.listeningHistory.assetInteractions.downloads.toLocaleString()} Downloads</span>
                </div>
                <div className="interaction-item">
                  <FiHeart className="interaction-icon" />
                  <span>{analyticsData.listeningHistory.assetInteractions.favorites.toLocaleString()} Favorites</span>
                </div>
              </div>
            </div>
            <div className="top-items">
              <h4>Search Categories</h4>
              {analyticsData.listeningHistory.searchCategories.map((category, index) => (
                <div key={index} className="top-item">
                  <span>{category.category}</span>
                  <span>{category.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analytics-card">
            <h3><FiTrendingUp /> Listener Value</h3>
            <div className="analytics-stats">
              <div className="stat-item">
                <span className="stat-label">Total Revenue</span>
                <span className="stat-value">${analyticsData.listenerValue.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg. Value</span>
                <span className="stat-value">${analyticsData.listenerValue.averageValue}</span>
              </div>
            </div>
            <div className="top-items">
              <h4>Top Markets</h4>
              {analyticsData.listenerValue.topMarkets.map((market, index) => (
                <div key={index} className="top-item">
                  <span>{market.market}</span>
                  <span>${market.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet; 