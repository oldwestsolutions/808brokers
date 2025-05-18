import React, { useState } from 'react';
import '../styles/Library.css';

const Library = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const storyItems = [
    {
      id: 'recent-files',
      icon: 'clock',
      label: 'Recent Files',
      color: '#E1306C',
      files: [
        {
          name: 'Summer Trap Beat.mp3',
          type: 'audio',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: '2 hours ago',
          size: '4.2 MB'
        },
        {
          name: 'Lyrics Draft.docx',
          type: 'document',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: 'Yesterday',
          size: '1.8 MB'
        },
        {
          name: 'Album Cover.jpg',
          type: 'image',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: '3 days ago',
          size: '2.5 MB'
        }
      ]
    }
  ];

  return (
    <div className="library-page">
      <div className="library-sidebar desktop-only">
        <div className="storage-info">
          <div className="storage-header">
            <div className="storage-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" fill="currentColor"/>
              </svg>
            </div>
            <h3>Cloud Storage</h3>
          </div>
          <div className="storage-bar">
            <div className="storage-progress" style={{ width: '65%' }}></div>
          </div>
          <div className="storage-details">
            <span className="storage-used">65% used</span>
            <span className="storage-total">of 100GB</span>
          </div>
        </div>
        
        <nav className="library-nav">
          {storyItems.map(item => (
            <div key={item.id} className="sidebar-section">
              <div className="section-header">
                <i className={`fas fa-${item.icon}`} style={{ color: item.color }}></i>
                <h3>{item.label}</h3>
              </div>
              <div className="sidebar-files">
                {item.files && item.files.map((file, index) => (
                  <div key={index} className="sidebar-file-item">
                    <div className="file-thumbnail">
                      <img src={file.thumbnail} alt={file.name} />
                    </div>
                    <div className="file-info">
                      <h4>{file.name}</h4>
                      <p>{file.size} • {file.lastModified}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="library-main">
        <div className="stories-container mobile-only">
          <div className="stories-scroll">
            {storyItems.filter(item => item.id !== 'recent-files').map(item => (
              <div 
                key={item.id}
                className={`story-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <div 
                  className="story-ring"
                  style={{ 
                    background: `linear-gradient(45deg, ${item.color}, ${item.color}80)`
                  }}
                >
                  <div className="story-icon">
                    <i className={`fas fa-${item.icon}`}></i>
                  </div>
                </div>
                <span className="story-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="files-section">
          <div className="section-header">
            <h2>Files & Folders</h2>
            <div className="header-actions">
              <button className="action-btn">
                <i className="fas fa-upload"></i>
                Upload
              </button>
              <button className="action-btn">
                <i className="fas fa-folder-plus"></i>
                New Folder
              </button>
            </div>
          </div>

          <div className="search-container">
            <div className="search-input-wrapper">
              <i className="fas fa-search search-icon"></i>
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search files and folders..."
              />
            </div>
          </div>

          <div className="files-list">
            <div className="list-header">
              <div className="header-name">Name</div>
              <div className="header-modified">Last Modified</div>
              <div className="header-size">Size</div>
              <div className="header-actions">Actions</div>
            </div>

            <div className="list-items">
              {/* Music Projects Folder */}
              <div className="list-item folder-item">
                <div className="item-name">
                  <i className="fas fa-folder folder-icon"></i>
                  <span>Recent Files</span>
                </div>
                <div className="item-modified">2 hours ago</div>
                <div className="item-size">--</div>
                <div className="item-actions">
                  <button className="action-btn">
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </div>

              {/* Files in Recent Files */}
              <div className="list-item nested-item">
                <div className="item-name">
                  <i className="fas fa-file file-icon"></i>
                  <span>Summer Trap Beat.mp3</span>
                </div>
                <div className="item-modified">2 hours ago</div>
                <div className="item-size">4.2 MB</div>
                <div className="item-actions">
                  <button className="action-btn">
                    <i className="fas fa-download"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </div>

              <div className="list-item nested-item">
                <div className="item-name">
                  <i className="fas fa-file file-icon"></i>
                  <span>Lyrics Draft.docx</span>
                </div>
                <div className="item-modified">Yesterday</div>
                <div className="item-size">1.8 MB</div>
                <div className="item-actions">
                  <button className="action-btn">
                    <i className="fas fa-download"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </div>

              <div className="list-item nested-item">
                <div className="item-name">
                  <i className="fas fa-file file-icon"></i>
                  <span>Album Cover.jpg</span>
                </div>
                <div className="item-modified">3 days ago</div>
                <div className="item-size">2.5 MB</div>
                <div className="item-actions">
                  <button className="action-btn">
                    <i className="fas fa-download"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library; 