import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>
      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={`settings-tab ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
          >
            <i className="fas fa-user"></i>
            Account
          </button>
          <button 
            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <i className="fas fa-bell"></i>
            Notifications
          </button>
          <button 
            className={`settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <i className="fas fa-lock"></i>
            Privacy
          </button>
          <button 
            className={`settings-tab ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <i className="fas fa-credit-card"></i>
            Billing
          </button>
        </div>
        <div className="settings-main">
          {activeTab === 'account' && (
            <div className="settings-section">
              <h2>Account Settings</h2>
              <form className="settings-form">
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" defaultValue={user?.username || ''} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue={user?.email || ''} />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <div className="toggle-group">
                <span>Email Notifications</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-group">
                <span>Push Notifications</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-group">
                <span>Marketing Emails</span>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.marketing}
                    onChange={() => handleNotificationChange('marketing')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              <div className="toggle-group">
                <span>Profile Visibility</span>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="toggle-group">
                <span>Activity Status</span>
                <label className="switch">
                  <input type="checkbox" defaultChecked />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="settings-section">
              <h2>Billing Information</h2>
              <div className="billing-info">
                <h3>Current Plan</h3>
                <div className="plan-card">
                  <div className="plan-header">
                    <h4>Pro Plan</h4>
                    <span className="plan-price">$9.99/month</span>
                  </div>
                  <ul className="plan-features">
                    <li>Unlimited beats</li>
                    <li>Priority support</li>
                    <li>Advanced analytics</li>
                  </ul>
                </div>
              </div>
              <div className="payment-methods">
                <h3>Payment Methods</h3>
                <div className="payment-card">
                  <i className="fab fa-cc-visa"></i>
                  <span>•••• •••• •••• 4242</span>
                  <button className="remove-btn">Remove</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 