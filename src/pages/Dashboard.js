import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/dashboard/${path}`);
  };

  useEffect(() => {
    document.querySelector('.navbar')?.style.setProperty('display', 'none');
    
    // Show navbar when component unmounts
    return () => {
      document.querySelector('.navbar')?.style.setProperty('display', 'flex');
    };
  }, []);

  return (
    <>
      <DashboardHeader />
      <div className="dashboard">
        <div className="feature-bubbles">
          <div 
            className="bubble-card"
            onClick={() => handleNavigation('mailbox')}
          >
            <div className="bubble-icon">
              <svg className="silhouette-icon" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
            <h3>Mailbox</h3>
          </div>

          <div 
            className="bubble-card"
            onClick={() => handleNavigation('cloud')}
          >
            <div className="bubble-icon">
              <svg className="silhouette-icon" viewBox="0 0 24 24">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
              </svg>
            </div>
            <h3>Cloud</h3>
          </div>

          <div 
            className="bubble-card"
            onClick={() => handleNavigation('studio')}
          >
            <div className="bubble-icon">
              <svg className="silhouette-icon" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"/>
              </svg>
            </div>
            <h3>Studio</h3>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <h2>Notifications</h2>
            <div className="notifications-list">
              <div className="notification-item">
                <div className="notification-icon">
                  <i className="fas fa-bell"></i>
                </div>
                <div className="notification-content">
                  <p>New message from Producer Mike</p>
                  <span className="notification-time">2 minutes ago</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="notification-content">
                  <p>Your beat received 5 new likes</p>
                  <span className="notification-time">1 hour ago</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon">
                  <i className="fas fa-download"></i>
                </div>
                <div className="notification-content">
                  <p>New download of "Summer Trap Beat"</p>
                  <span className="notification-time">3 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <h2>Bulletin</h2>
            <div className="bulletin-list">
              <div className="bulletin-item">
                <div className="bulletin-icon">
                  <i className="fas fa-fire"></i>
                </div>
                <div className="bulletin-content">
                  <h3>Trending Artists</h3>
                  <p>Check out this week's top producers</p>
                </div>
              </div>
              <div className="bulletin-item">
                <div className="bulletin-icon">
                  <i className="fas fa-calendar"></i>
                </div>
                <div className="bulletin-content">
                  <h3>Upcoming Events</h3>
                  <p>Beat Battle Competition - March 25</p>
                </div>
              </div>
              <div className="bulletin-item">
                <div className="bulletin-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="bulletin-content">
                  <h3>Featured Content</h3>
                  <p>New Sample Pack Release</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 