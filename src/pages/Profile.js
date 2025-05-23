import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    twitter: '',
    soundcloud: ''
  });
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
    }
  };

  const handleSocialLinkChange = (platform, value) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }));
  };

  return (
    <div className="tiktok-profile-page">
      <div className="tiktok-profile-header">
        <div className="tiktok-profile-avatar-wrapper" onClick={handleImageClick}>
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="tiktok-profile-avatar" />
          ) : (
            <div className="tiktok-profile-avatar tiktok-profile-avatar-placeholder"></div>
          )}
          <div className="tiktok-profile-camera-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15.2C13.7673 15.2 15.2 13.7673 15.2 12C15.2 10.2327 13.7673 8.8 12 8.8C10.2327 8.8 8.8 10.2327 8.8 12C8.8 13.7673 10.2327 15.2 12 15.2Z" fill="white"/>
              <path d="M9 2L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4H16.83L15 2H9ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" fill="white"/>
            </svg>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <h1 className="tiktok-profile-username">{user?.username || 'User'}</h1>
        <div className="tiktok-profile-subtitle">Producer & Artist</div>
        <div className="tiktok-profile-stats">
          <div className="tiktok-profile-stat">
            <span className="stat-value">24</span>
            <span className="stat-label">Beats</span>
          </div>
          <div className="tiktok-profile-stat">
            <span className="stat-value">1.2k</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="tiktok-profile-stat">
            <span className="stat-value">450</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>
      <div className="tiktok-profile-bio-section">
        <textarea
          className="tiktok-profile-bio-textarea"
          placeholder="Write something about yourself..."
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
        <div className="tiktok-profile-social-links">
          <input
            type="text"
            className="tiktok-profile-social-input"
            placeholder="Instagram username"
            value={socialLinks.instagram}
            onChange={e => handleSocialLinkChange('instagram', e.target.value)}
          />
          <input
            type="text"
            className="tiktok-profile-social-input"
            placeholder="Twitter username"
            value={socialLinks.twitter}
            onChange={e => handleSocialLinkChange('twitter', e.target.value)}
          />
          <input
            type="text"
            className="tiktok-profile-social-input"
            placeholder="SoundCloud URL"
            value={socialLinks.soundcloud}
            onChange={e => handleSocialLinkChange('soundcloud', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile; 