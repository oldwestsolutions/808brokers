import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/DashboardHeader.css';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
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

  return (
    <header className="dashboard-header-nav">
      <div className="header-left">
        <div className="header-logo">
          <span className="logo-text">806brokers</span>
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
        <button className="header-icon-btn shop-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 7.28V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V16.72C21.59 16.37 22 15.74 22 15V9C22 8.26 21.59 7.63 21 7.28ZM20 9V15H13V9H20ZM5 19V5H19V7H13C11.9 7 11 7.9 11 9V15C11 16.1 11.9 17 13 17H19V19H5Z" fill="currentColor"/>
            <path d="M16 13.5C16.83 13.5 17.5 12.83 17.5 12C17.5 11.17 16.83 10.5 16 10.5C15.17 10.5 14.5 11.17 14.5 12C14.5 12.83 15.17 13.5 16 13.5Z" fill="currentColor"/>
          </svg>
        </button>
        <button className="header-icon-btn mailbox-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM19.6 8.25L12.53 12.67C12.21 12.87 11.79 12.87 11.47 12.67L4.4 8.25C4.15 8.09 4 7.82 4 7.53C4 6.86 4.73 6.46 5.3 6.81L12 11L18.7 6.81C19.27 6.46 20 6.86 20 7.53C20 7.82 19.85 8.09 19.6 8.25Z" fill="currentColor"/>
          </svg>
        </button>
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

              <button className="profile-dropdown-item">
                <i className="fas fa-user"></i>
                Profile
              </button>
              <button className="profile-dropdown-item">
                <i className="fas fa-cog"></i>
                Settings
              </button>
              <button className="profile-dropdown-item">
                <i className="fas fa-question-circle"></i>
                Help Center
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