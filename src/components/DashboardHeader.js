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
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
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
    </header>
  );
};

export default DashboardHeader; 