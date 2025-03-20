import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import '../styles/Mailbox.css';

const Mailbox = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessages, setSelectedMessages] = useState([]);

  const dummyMessages = {
    inbox: [
      {
        id: 1,
        from: 'Producer Mike',
        subject: 'New Beat Collaboration',
        preview: 'Hey, I checked out your recent beats and would love to...',
        timestamp: '2:30 PM',
        unread: true,
        avatar: null
      },
      {
        id: 2,
        from: 'Studio Sessions',
        subject: 'Your Studio Booking Confirmation',
        preview: 'Your studio session has been confirmed for...',
        timestamp: 'Yesterday',
        unread: false,
        avatar: null
      },
      {
        id: 3,
        from: 'Beat Marketing',
        subject: 'Your Beat Stats Update',
        preview: 'Your beats have reached new milestones this week...',
        timestamp: 'Mar 20',
        unread: true,
        avatar: null
      }
    ],
    sent: [
      {
        id: 4,
        to: 'DJ Scratch',
        subject: 'Re: Beat Pack Review',
        preview: 'Thanks for checking out my beats. Here are some more...',
        timestamp: 'Mar 19',
        avatar: null
      }
    ],
    drafts: [
      {
        id: 5,
        to: 'Music Publisher',
        subject: 'License Agreement Draft',
        preview: 'Regarding the publishing rights for...',
        timestamp: 'Mar 15',
        avatar: null
      }
    ]
  };

  const handleSelectMessage = (messageId) => {
    setSelectedMessages(prev => {
      if (prev.includes(messageId)) {
        return prev.filter(id => id !== messageId);
      }
      return [...prev, messageId];
    });
  };

  const handleSelectAll = () => {
    const currentMessages = dummyMessages[activeTab];
    if (selectedMessages.length === currentMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(currentMessages.map(msg => msg.id));
    }
  };

  return (
    <div className="mailbox-page">
      <BackButton />
      <div className="mailbox-container">
        <div className="mailbox-sidebar">
          <button className="compose-button">
            <i className="fas fa-pen"></i>
            Compose
          </button>
          
          <div className="mailbox-nav">
            <button 
              className={`nav-item ${activeTab === 'inbox' ? 'active' : ''}`}
              onClick={() => setActiveTab('inbox')}
            >
              <i className="fas fa-inbox"></i>
              Inbox
              <span className="unread-count">2</span>
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'sent' ? 'active' : ''}`}
              onClick={() => setActiveTab('sent')}
            >
              <i className="fas fa-paper-plane"></i>
              Sent
            </button>
            
            <button 
              className={`nav-item ${activeTab === 'drafts' ? 'active' : ''}`}
              onClick={() => setActiveTab('drafts')}
            >
              <i className="fas fa-file-alt"></i>
              Drafts
            </button>
            
            <button className="nav-item">
              <i className="fas fa-trash-alt"></i>
              Trash
            </button>
          </div>
        </div>

        <div className="mailbox-content">
          <div className="mailbox-toolbar">
            <div className="toolbar-left">
              <label className="checkbox-container">
                <input 
                  type="checkbox"
                  checked={selectedMessages.length === dummyMessages[activeTab].length}
                  onChange={handleSelectAll}
                />
                <span className="checkmark"></span>
              </label>
              
              <button className="toolbar-btn" disabled={selectedMessages.length === 0}>
                <i className="fas fa-archive"></i>
              </button>
              <button className="toolbar-btn" disabled={selectedMessages.length === 0}>
                <i className="fas fa-trash-alt"></i>
              </button>
              <button className="toolbar-btn">
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>

            <div className="toolbar-right">
              <span className="message-count">
                {dummyMessages[activeTab].length} messages
              </span>
            </div>
          </div>

          <div className="messages-list">
            {dummyMessages[activeTab].map(message => (
              <div 
                key={message.id}
                className={`message-item ${message.unread ? 'unread' : ''} ${
                  selectedMessages.includes(message.id) ? 'selected' : ''
                }`}
              >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={() => handleSelectMessage(message.id)}
                  />
                  <span className="checkmark"></span>
                </label>

                <div className="message-avatar">
                  {message.avatar ? (
                    <img src={message.avatar} alt="Avatar" />
                  ) : (
                    <div className="avatar-placeholder">
                      {(message.from || message.to).charAt(0)}
                    </div>
                  )}
                </div>

                <div className="message-content">
                  <div className="message-header">
                    <span className="message-from">
                      {message.from || `To: ${message.to}`}
                    </span>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <div className="message-subject">{message.subject}</div>
                  <div className="message-preview">{message.preview}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mailbox; 