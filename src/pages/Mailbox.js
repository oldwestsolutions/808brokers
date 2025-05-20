import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiSend, FiImage, FiMoreVertical, FiPaperclip, FiSmile } from 'react-icons/fi';
import '../styles/Mailbox.css';

const Mailbox = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Hide navbar when Mailbox component mounts
  useEffect(() => {
    document.querySelector('.navbar')?.style.setProperty('display', 'none');
    
    // Show navbar when component unmounts
    return () => {
      document.querySelector('.navbar')?.style.setProperty('display', 'flex');
    };
  }, []);

  const conversations = [
    {
      id: 1,
      user: {
        name: 'John Doe',
        avatar: '/DiceLogoTransparent.png',
        status: 'online'
      },
      lastMessage: 'Hey, I loved your latest beat!',
      timestamp: '2m ago',
      unread: 2
    },
    {
      id: 2,
      user: {
        name: 'Sarah Smith',
        avatar: '/DiceLogoTransparent.png',
        status: 'offline'
      },
      lastMessage: 'Can we collaborate on a new project?',
      timestamp: '1h ago',
      unread: 0
    },
    {
      id: 3,
      user: {
        name: 'Mike Johnson',
        avatar: '/DiceLogoTransparent.png',
        status: 'online'
      },
      lastMessage: 'The mix sounds great!',
      timestamp: '3h ago',
      unread: 1
    },
    {
      id: 4,
      user: {
        name: 'Emma Wilson',
        avatar: '/DiceLogoTransparent.png',
        status: 'offline'
      },
      lastMessage: 'Thanks for the feedback!',
      timestamp: '1d ago',
      unread: 0
    }
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="mailbox-page">
      <div className="mailbox-container">
        {/* Conversations List */}
        <div className="conversations-list">
          <div className="conversations-header">
            <button className="back-button" onClick={() => navigate('/dashboard')}>
              <FiArrowLeft />
            </button>
            <h1>Messages</h1>
          </div>
          
          <div className="search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="conversations">
            {conversations.map(chat => (
              <div
                key={chat.id}
                className={`conversation-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="user-avatar">
                  <img src={chat.user.avatar} alt={chat.user.name} />
                  <span className={`status-indicator ${chat.user.status}`} />
                </div>
                <div className="conversation-info">
                  <div className="conversation-header">
                    <h3>{chat.user.name}</h3>
                    <span className="timestamp">{chat.timestamp}</span>
                  </div>
                  <p className="last-message">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="unread-badge">{chat.unread}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat View */}
        <div className="chat-view">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="user-avatar">
                    <img src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                    <span className={`status-indicator ${selectedChat.user.status}`} />
                  </div>
                  <div className="user-details">
                    <h2>{selectedChat.user.name}</h2>
                    <span className="status-text">{selectedChat.user.status}</span>
                  </div>
                </div>
                <button className="more-options">
                  <FiMoreVertical />
                </button>
              </div>

              <div className="messages-container">
                {/* Messages will be rendered here */}
                <div className="message-date">Today</div>
                <div className="message received">
                  <p>Hey, I loved your latest beat!</p>
                  <span className="message-time">2:30 PM</span>
                </div>
                <div className="message sent">
                  <p>Thanks! I'm glad you liked it. What specifically caught your attention?</p>
                  <span className="message-time">2:32 PM</span>
                </div>
              </div>

              <form className="message-input" onSubmit={handleSendMessage}>
                <button type="button" className="input-action">
                  <FiPaperclip />
                </button>
                <button type="button" className="input-action">
                  <FiImage />
                </button>
                <input
                  type="text"
                  placeholder="Message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="button" className="input-action">
                  <FiSmile />
                </button>
                <button type="submit" className="send-button" disabled={!message.trim()}>
                  <FiSend />
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <h2>Select a conversation</h2>
              <p>Choose a chat from the list to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mailbox; 