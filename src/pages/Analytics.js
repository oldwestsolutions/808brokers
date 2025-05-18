import React from 'react';
import { FiArrowLeft, FiBarChart2, FiTrendingUp, FiUsers, FiMusic, FiDollarSign } from 'react-icons/fi';
import './Analytics.css';

const Analytics = () => {
  const metrics = [
    {
      id: 1,
      title: 'Total Plays',
      value: '1.2M',
      change: '+12.5%',
      icon: <FiMusic />,
      color: '#0066ff'
    },
    {
      id: 2,
      title: 'Active Listeners',
      value: '45.2K',
      change: '+8.3%',
      icon: <FiUsers />,
      color: '#00c853'
    },
    {
      id: 3,
      title: 'Revenue',
      value: '$12.5K',
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
            <p>Chart visualization will be implemented here</p>
          </div>
        </div>

        <div className="insights-container">
          <h2>Key Insights</h2>
          <div className="insights-list">
            <div className="insight-item">
              <h3>Peak Listening Hours</h3>
              <p>Your content performs best between 6 PM and 9 PM EST</p>
            </div>
            <div className="insight-item">
              <h3>Top Performing Genre</h3>
              <p>Hip Hop tracks show 25% higher engagement</p>
            </div>
            <div className="insight-item">
              <h3>Audience Growth</h3>
              <p>Monthly listener growth rate increased by 15%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 