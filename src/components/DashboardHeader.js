import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/DashboardHeader.css';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleNavigation = (path) => {
    if (path === 'profile') {
      navigate('/profile');
    } else if (path === 'settings') {
      navigate('/settings');
    } else if (path === 'library') {
      navigate('/library');
    } else {
      navigate(`/dashboard/${path}`);
    }
    setShowDropdown(false);
  };

  return (
    <header className="dashboard-header-nav">
      <div className="header-left">
        <div className="header-logo">
          <span className="logo-text">808 Brokers</span>
        </div>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search beats, artists, or samples..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <svg viewBox="0 0 24 24" className="search-icon">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </form>
      </div>
      
      <div className="header-right">
        <div className="header-profile">
          <button 
            className="profile-trigger"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="profile-avatar">
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
          </button>

          {showDropdown && (
            <div className="profile-dropdown">
              <div className="wallet-status connected">
                <i className="fas fa-circle"></i>
                Wallet Connected
              </div>

              <button className="profile-dropdown-item" onClick={() => handleNavigation('profile')}>
                <i className="fas fa-user"></i>
                Profile
              </button>
              <button className="profile-dropdown-item" onClick={() => handleNavigation('settings')}>
                <i className="fas fa-cog"></i>
                Settings
              </button>
              <button className="profile-dropdown-item" onClick={() => handleNavigation('library')}>
                <i className="fas fa-music"></i>
                Library
              </button>
              <button className="profile-dropdown-item" onClick={() => handleNavigation('studio')}>
                <i className="fas fa-microphone"></i>
                Studio
              </button>
              <button className="profile-dropdown-item" onClick={() => handleNavigation('mailbox')}>
                <i className="fas fa-envelope"></i>
                Mailbox
              </button>
              <button 
                className="profile-dropdown-item logout"
                onClick={handleLogout}
              >
                <i className="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader; 