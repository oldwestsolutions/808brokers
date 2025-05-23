import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSearch, FiSend, FiImage, FiMoreVertical, FiPaperclip, FiSmile, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '../styles/Mailbox.css';

const Mailbox = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState([]);
  const [messagePage, setMessagePage] = useState(1);
  const messagesPerPage = 10;
  const conversationMessagesPerPage = 20;

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
        status: 'online',
        bio: 'Music Producer | Beat Maker'
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
        status: 'offline',
        bio: 'Vocalist | Songwriter'
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
        status: 'online',
        bio: 'Sound Engineer | Mixing'
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
        status: 'offline',
        bio: 'Artist | Composer'
      },
      lastMessage: 'Thanks for the feedback!',
      timestamp: '1d ago',
      unread: 0
    }
  ];

  // Calculate conversation pagination
  const indexOfLastConversation = currentPage * messagesPerPage;
  const indexOfFirstConversation = indexOfLastConversation - messagesPerPage;
  const currentMessages = conversations.slice(indexOfFirstConversation, indexOfLastConversation);
  const totalPages = Math.ceil(conversations.length / messagesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Add new message to the conversation
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Initialize messages for the selected chat
    setMessages([
      {
        id: 1,
        text: chat.lastMessage,
        sender: 'them',
        timestamp: chat.timestamp
      }
    ]);
  };

  const handleBackToMailbox = () => {
    setSelectedChat(null);
    setMessages([]);
    setMessagePage(1);
  };

  // Calculate message pagination
  const indexOfLastMessage = messagePage * conversationMessagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - conversationMessagesPerPage;
  const currentConversationMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);
  const totalMessagePages = Math.ceil(messages.length / conversationMessagesPerPage);

  const handleMessagePageChange = (pageNumber) => {
    setMessagePage(pageNumber);
  };

  return (
    <div className="mailbox-page">
      <div className="mailbox-nav">
        <button className="nav-back-btn" onClick={() => navigate(-1)}>
          <FiArrowLeft />
        </button>
        <h1>Messages</h1>
      </div>

      <div className="mailbox-container">
        <div className="chat-view">
          <div className="search-bar">
            <FiSearch />
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {selectedChat ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <button className="back-to-mailbox" onClick={handleBackToMailbox}>
                    <FiArrowLeft />
                  </button>
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
                {totalMessagePages > 1 && (
                  <div className="message-pagination">
                    <button 
                      className="pagination-btn"
                      onClick={() => handleMessagePageChange(messagePage - 1)}
                      disabled={messagePage === 1}
                    >
                      <FiChevronLeft />
                    </button>
                    <span className="page-info">
                      Page {messagePage} of {totalMessagePages}
                    </span>
                    <button 
                      className="pagination-btn"
                      onClick={() => handleMessagePageChange(messagePage + 1)}
                      disabled={messagePage === totalMessagePages}
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                )}
                {currentConversationMessages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                    <p>{msg.text}</p>
                    <span className="message-time">{msg.timestamp}</span>
                  </div>
                ))}
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
            <>
              <div className="conversations-grid">
                {currentMessages.map(chat => (
                  <div
                    key={chat.id}
                    className="conversation-card"
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="card-avatar">
                      <img src={chat.user.avatar} alt={chat.user.name} />
                      {chat.unread > 0 && (
                        <div className="unread-indicator" />
                      )}
                    </div>
                    <div className="card-info">
                      <div className="card-header">
                        <h3>{chat.user.name}</h3>
                        <span className="card-time">{chat.timestamp}</span>
                      </div>
                      <div className="card-bio">{chat.user.bio}</div>
                      <div className="card-message">{chat.lastMessage}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <FiChevronLeft />
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button 
                    className="pagination-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mailbox; 