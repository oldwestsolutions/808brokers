import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
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
    },
    {
      id: 'album-view',
      icon: 'images',
      label: 'Album View',
      color: '#F77737',
      files: [
        {
          name: 'Album Cover.jpg',
          type: 'image',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: '3 days ago',
          size: '2.5 MB'
        },
        {
          name: 'Promo Photo.jpg',
          type: 'image',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: '1 week ago',
          size: '3.1 MB'
        }
      ]
    },
    {
      id: 'music-folder',
      icon: 'music',
      label: 'Music Projects',
      color: '#833AB4',
      files: [
        {
          name: 'Summer Trap Beat.mp3',
          type: 'audio',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: '2 hours ago',
          size: '4.2 MB'
        },
        {
          name: 'Chill Vibes Mix.mp3',
          type: 'audio',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: '1 week ago',
          size: '6.7 MB'
        }
      ]
    },
    {
      id: 'artwork-folder',
      icon: 'image',
      label: 'Album Artwork',
      color: '#405DE6',
      files: [
        {
          name: 'Album Cover.jpg',
          type: 'image',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: '3 days ago',
          size: '2.5 MB'
        }
      ]
    },
    {
      id: 'lyrics-folder',
      icon: 'file-alt',
      label: 'Lyrics',
      color: '#FD1D1D',
      files: [
        {
          name: 'Lyrics Draft.docx',
          type: 'document',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: 'Yesterday',
          size: '1.8 MB'
        }
      ]
    },
    {
      id: 'contracts-folder',
      icon: 'file-contract',
      label: 'Contracts',
      color: '#FCAF45',
      files: [
        {
          name: 'Contract.pdf',
          type: 'document',
          thumbnail: '/DiceLogoTransparent.png',
          lastModified: '2 weeks ago',
          size: '3.1 MB'
        }
      ]
    }
  ];

  const recentFiles = [
    {
      id: 1,
      name: 'Summer Trap Beat.mp3',
      type: 'audio',
      thumbnail: '/DiceLogoTransparent.png',
      lastModified: '2 hours ago',
      size: '4.2 MB'
    },
    {
      id: 2,
      name: 'Lyrics Draft.docx',
      type: 'document',
      thumbnail: '/DiceLogoTransparent.png',
      lastModified: 'Yesterday',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Album Cover.jpg',
      type: 'image',
      thumbnail: '/DiceLogoTransparent.png',
      lastModified: '3 days ago',
      size: '2.5 MB'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'upload',
      user: 'Mike',
      file: 'Summer Trap Beat.mp3',
      time: '2 hours ago',
      avatar: '/DiceLogoTransparent.png'
    },
    {
      id: 2,
      type: 'share',
      user: 'Sarah',
      file: 'Lyrics Draft.docx',
      time: 'Yesterday',
      avatar: '/DiceLogoTransparent.png'
    },
    {
      id: 3,
      type: 'edit',
      user: 'John',
      file: 'Album Cover.jpg',
      time: '3 days ago',
      avatar: '/DiceLogoTransparent.png'
    }
  ];

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
        <div className="dashboard-sidebar desktop-only">
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
          
          <nav className="dashboard-nav">
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

        <div className="dashboard-main">
          <div className="stories-container mobile-only">
            <div className="stories-scroll">
              {storyItems.map(item => (
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

          <div className="dashboard-header">
            <h1>Your Portal</h1>
          </div>

          <div className="portal-grid">
            <div className="portal-card followers">
              <div className="portal-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.56 1.76 2.73V18H6v-1.62c0-1.17.68-2.25 1.76-2.73 1.17-.51 2.61-.9 4.24-.9zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1-.99 0-1.93.21-2.78.58C.48 14.9 0 15.62 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85-.85-.37-1.79-.58-2.78-.58-.39 0-.76.04-1.13.1.4.68.63 1.46.63 2.29V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" fill="currentColor"/>
                </svg>
              </div>
              <div className="portal-info">
                <h3>Followers</h3>
                <p>Your community</p>
              </div>
              <div className="portal-stats">
                <span>24 new</span>
              </div>
            </div>

            <div className="portal-card favorites">
              <div className="portal-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </div>
              <div className="portal-info">
                <h3>Favorites</h3>
                <p>Your favorite tracks</p>
              </div>
              <div className="portal-stats">
                <span>128 saved</span>
              </div>
            </div>

            <div className="portal-card library">
              <div className="portal-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" fill="currentColor"/>
                </svg>
              </div>
              <div className="portal-info">
                <h3>Library</h3>
                <p>Your music collection</p>
              </div>
              <div className="portal-stats">
                <span>256 tracks</span>
              </div>
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
                    <span>Music Projects</span>
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

                {/* Files in Music Projects */}
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
                    <span>Chill Vibes Mix.mp3</span>
                  </div>
                  <div className="item-modified">1 week ago</div>
                  <div className="item-size">6.7 MB</div>
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

                {/* Album Artwork Folder */}
                <div className="list-item folder-item">
                  <div className="item-name">
                    <i className="fas fa-folder folder-icon"></i>
                    <span>Album Artwork</span>
                  </div>
                  <div className="item-modified">Yesterday</div>
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

                {/* Files in Album Artwork */}
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

                {/* Lyrics Folder */}
                <div className="list-item folder-item">
                  <div className="item-name">
                    <i className="fas fa-folder folder-icon"></i>
                    <span>Lyrics</span>
                  </div>
                  <div className="item-modified">3 days ago</div>
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

                {/* Files in Lyrics */}
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

                {/* Contracts Folder */}
                <div className="list-item folder-item">
                  <div className="item-name">
                    <i className="fas fa-folder folder-icon"></i>
                    <span>Contracts</span>
                  </div>
                  <div className="item-modified">2 weeks ago</div>
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

                {/* Files in Contracts */}
                <div className="list-item nested-item">
                  <div className="item-name">
                    <i className="fas fa-file file-icon"></i>
                    <span>Contract.pdf</span>
                  </div>
                  <div className="item-modified">2 weeks ago</div>
                  <div className="item-size">3.1 MB</div>
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
    </>
  );
};

export default Dashboard; 