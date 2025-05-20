import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiBarChart2, FiTrendingUp, FiUsers, FiMusic, FiDollarSign } from 'react-icons/fi';
import blockchainService from '../services/blockchain';
import '../styles/Analytics.css';

const Analytics = () => {
  const [streamAnalytics, setStreamAnalytics] = useState([]);
  const [ownershipHistory, setOwnershipHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        // Fetch stream analytics for the current asset
        const streamData = await blockchainService.getStreamAnalytics('current_asset_id');
        setStreamAnalytics(JSON.parse(streamData));

        // Fetch ownership history
        const ownershipData = await blockchainService.getOwnershipHistory('current_asset_id');
        setOwnershipHistory(JSON.parse(ownershipData));
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const metrics = [
    {
      id: 1,
      title: 'Total Plays',
      value: streamAnalytics.length.toString(),
      change: '+12.5%',
      icon: <FiMusic />,
      color: '#0066ff'
    },
    {
      id: 2,
      title: 'Active Listeners',
      value: new Set(streamAnalytics.map(s => s.userId)).size.toString(),
      change: '+8.3%',
      icon: <FiUsers />,
      color: '#00c853'
    },
    {
      id: 3,
      title: 'Revenue',
      value: `$${(streamAnalytics.length * 0.004).toFixed(2)}`,
      change: '+15.2%',
      icon: <FiDollarSign />,
      color: '#ff6d00'
    },
    {
      id: 4,
      title: 'Engagement Rate',
      value: '68%',
      change: '+5.7%',
      icon: <FiTrendingUp />,
      color: '#7c4dff'
    }
  ];

  if (loading) {
    return (
      <div className="analytics-page">
        <div className="loading">Loading analytics data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="analytics-page">
        <div className="error">Error loading analytics: {error}</div>
      </div>
    );
  }

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <button className="back-button" onClick={() => window.history.back()}>
          <FiArrowLeft />
          <span>Back to Library</span>
        </button>
        <h1>Analytics Dashboard</h1>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric) => (
          <div key={metric.id} className="metric-card">
            <div className="metric-icon" style={{ color: metric.color }}>
              {metric.icon}
            </div>
            <div className="metric-info">
              <h3>{metric.title}</h3>
              <div className="metric-value">
                <span className="value">{metric.value}</span>
                <span className="change" style={{ color: metric.color }}>
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="analytics-content">
        <div className="chart-container">
          <h2>Performance Overview</h2>
          <div className="chart-placeholder">
            <FiBarChart2 />
            <p>Stream analytics visualization will be implemented here</p>
          </div>
        </div>

        <div className="insights-container">
          <h2>Ownership & Rights</h2>
          <div className="insights-list">
            {ownershipHistory.map((ownership, index) => (
              <div key={index} className="insight-item">
                <h3>{ownership.type.charAt(0).toUpperCase() + ownership.type.slice(1)} Rights</h3>
                <p>Owner: {ownership.ownerId}</p>
                <p>Rights: {ownership.rights.join(', ')}</p>
                <p>Terms: {ownership.terms}</p>
                <p>Recorded: {new Date(ownership.timestamp).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 