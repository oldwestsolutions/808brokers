import React from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <DashboardHeader />
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-large">
            {user?.avatar ? (
              <img src={user.avatar} alt="Profile" />
            ) : (
              <svg className="avatar-placeholder" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="metallic-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#1F2937', stopOpacity: 1}} />
                    <stop offset="50%" style={{stopColor: '#111827', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#0F172A', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <circle cx="12" cy="12" r="11" fill="url(#metallic-gradient)" stroke="#374151" strokeWidth="1"/>
                <path d="M12 13.5C14.21 13.5 16 11.71 16 9.5C16 7.29 14.21 5.5 12 5.5C9.79 5.5 8 7.29 8 9.5C8 11.71 9.79 13.5 12 13.5ZM12 15C9.33 15 4 16.34 4 19V20.5H20V19C20 16.34 14.67 15 12 15Z" fill="#374151"/>
              </svg>
            )}
          </div>
        </div>
        <div className="profile-info">
          <h1>{user?.username || 'User'}</h1>
          <p className="profile-bio">Producer & Artist</p>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">24</span>
              <span className="stat-label">Beats</span>
            </div>
            <div className="stat">
              <span className="stat-value">1.2k</span>
              <span className="stat-label">Followers</span>
            </div>
            <div className="stat">
              <span className="stat-value">450</span>
              <span className="stat-label">Following</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-music"></i>
              </div>
              <div className="activity-details">
                <h3>Uploaded new beat</h3>
                <p>Summer Trap Beat</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="activity-details">
                <h3>Received new like</h3>
                <p>Dark Trap Beat</p>
                <span className="activity-time">5 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Top Beats</h2>
          <div className="beats-grid">
            {[1, 2, 3, 4].map((beat) => (
              <div key={beat} className="beat-card">
                <div className="beat-image">
                  <img src="/DiceLogoTransparent.png" alt="Beat" />
                  <div className="beat-overlay">
                    <button className="play-btn">
                      <i className="fas fa-play"></i>
                    </button>
                  </div>
                </div>
                <div className="beat-info">
                  <h3>Beat Title {beat}</h3>
                  <p>1.2k plays</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 