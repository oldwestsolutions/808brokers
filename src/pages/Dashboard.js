import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recent');
  const [activeView, setActiveView] = useState('library');

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

  const handleViewChange = (view) => {
    setActiveView(view);
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

          <div className="portal-grid">
            <div className="portal-card studio" onClick={() => handleViewChange('studio')}>
              <div className="portal-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zM13 21v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zM21 13v-2H11v2h10zM15 9h2V7h4V5h-4V3h-2v6z" fill="currentColor"/>
                </svg>
              </div>
              <div className="portal-info">
                <h3>Studio</h3>
                <p>Your music workspace</p>
              </div>
              <div className="portal-stats">
                <span>3 projects</span>
              </div>
            </div>

            <div className="portal-card foryou" onClick={() => handleViewChange('foryou')}>
              <div className="portal-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
                </svg>
              </div>
              <div className="portal-info">
                <h3>For You</h3>
                <p>Personalized recommendations</p>
              </div>
              <div className="portal-stats">
                <span>12 new</span>
              </div>
            </div>

            <div className="portal-card library" onClick={() => handleViewChange('library')}>
              <div className="portal-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" fill="currentColor"/>
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" fill="currentColor" transform="translate(0, -2)"/>
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z" fill="currentColor" transform="translate(0, -4)"/>
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

          {activeView === 'library' && (
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
          )}

          {activeView === 'studio' && (
            <div className="studio-section">
              <div className="studio-main">
                <div className="track-list">
                  <div className="track-header">
                    <div className="track-name">Track</div>
                    <div className="track-controls">Controls</div>
                  </div>
                  <div className="track">
                    <div className="track-info">
                      <div className="track-name">Vocals</div>
                      <div className="track-type">Audio</div>
                      <div className="track-color" style={{ backgroundColor: '#FF4444' }}></div>
                    </div>
                    <div className="track-controls">
                      <div className="volume-fader">
                        <input type="range" min="0" max="100" defaultValue="80" />
                        <span className="fader-value">-6 dB</span>
                      </div>
                      <div className="pan-control">
                        <input type="range" min="-50" max="50" defaultValue="0" />
                        <span className="pan-value">C</span>
                      </div>
                      <div className="track-buttons">
                        <button className="track-mute">
                          <i className="fas fa-volume-mute"></i>
                        </button>
                        <button className="track-solo">
                          <i className="fas fa-headphones"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="track">
                    <div className="track-info">
                      <div className="track-name">Instrumental</div>
                      <div className="track-type">Audio</div>
                      <div className="track-color" style={{ backgroundColor: '#44FF44' }}></div>
                    </div>
                    <div className="track-controls">
                      <div className="volume-fader">
                        <input type="range" min="0" max="100" defaultValue="75" />
                        <span className="fader-value">-8 dB</span>
                      </div>
                      <div className="pan-control">
                        <input type="range" min="-50" max="50" defaultValue="0" />
                        <span className="pan-value">C</span>
                      </div>
                      <div className="track-buttons">
                        <button className="track-mute">
                          <i className="fas fa-volume-mute"></i>
                        </button>
                        <button className="track-solo">
                          <i className="fas fa-headphones"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="timeline">
                  <div className="timeline-ruler">
                    <div className="time-marker">0:00</div>
                    <div className="time-marker">0:30</div>
                    <div className="time-marker">1:00</div>
                    <div className="time-marker">1:30</div>
                    <div className="time-marker">2:00</div>
                  </div>
                  <div className="timeline-tracks">
                    <div className="timeline-track">
                      <div className="track-region" style={{ left: '10%', width: '80%', backgroundColor: '#FF4444' }}></div>
                    </div>
                    <div className="timeline-track">
                      <div className="track-region" style={{ left: '5%', width: '90%', backgroundColor: '#44FF44' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mixer">
                  <div className="mixer-channel master">
                    <div className="channel-name">Master</div>
                    <div className="channel-fader">
                      <input type="range" min="0" max="100" defaultValue="90" />
                      <span className="fader-value">-2 dB</span>
                    </div>
                    <div className="channel-meter">
                      <div className="meter-level" style={{ height: '60%' }}></div>
                      <div className="meter-peak"></div>
                    </div>
                  </div>
                  <div className="mixer-channel">
                    <div className="channel-name">Vocals</div>
                    <div className="channel-fader">
                      <input type="range" min="0" max="100" defaultValue="80" />
                      <span className="fader-value">-6 dB</span>
                    </div>
                    <div className="channel-meter">
                      <div className="meter-level" style={{ height: '45%' }}></div>
                      <div className="meter-peak"></div>
                    </div>
                  </div>
                  <div className="mixer-channel">
                    <div className="channel-name">Instrumental</div>
                    <div className="channel-fader">
                      <input type="range" min="0" max="100" defaultValue="75" />
                      <span className="fader-value">-8 dB</span>
                    </div>
                    <div className="channel-meter">
                      <div className="meter-level" style={{ height: '50%' }}></div>
                      <div className="meter-peak"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'foryou' && (
            <div className="foryou-section">
              <div className="foryou-header">
                <div className="category-scroll">
                  <button className="category-btn active">All</button>
                  <button className="category-btn">Music</button>
                  <button className="category-btn">Beats</button>
                  <button className="category-btn">Live</button>
                  <button className="category-btn">Mixes</button>
                  <button className="category-btn">Tutorials</button>
                  <button className="category-btn">Producers</button>
                  <button className="category-btn">Artists</button>
                </div>
              </div>

              <div className="content-grid">
                {/* Video Card 1 */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img src="/DiceLogoTransparent.png" alt="Video thumbnail" />
                    <span className="video-duration">12:34</span>
                  </div>
                  <div className="video-info">
                    <h3>Summer Trap Beat 2024</h3>
                    <p className="channel-name">808 Brokers</p>
                    <p className="video-stats">1.2M views • 2 days ago</p>
                  </div>
                </div>

                {/* Video Card 2 */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img src="/DiceLogoTransparent.png" alt="Video thumbnail" />
                    <span className="video-duration">8:45</span>
                  </div>
                  <div className="video-info">
                    <h3>Chill Vibes Mix</h3>
                    <p className="channel-name">808 Brokers</p>
                    <p className="video-stats">856K views • 1 week ago</p>
                  </div>
                </div>

                {/* Video Card 3 */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img src="/DiceLogoTransparent.png" alt="Video thumbnail" />
                    <span className="video-duration">15:20</span>
                  </div>
                  <div className="video-info">
                    <h3>Producer Live Stream</h3>
                    <p className="channel-name">808 Brokers</p>
                    <p className="video-stats">2.3M views • 3 days ago</p>
                  </div>
                </div>

                {/* Video Card 4 */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img src="/DiceLogoTransparent.png" alt="Video thumbnail" />
                    <span className="video-duration">5:30</span>
                  </div>
                  <div className="video-info">
                    <h3>Beat Making Tutorial</h3>
                    <p className="channel-name">808 Brokers</p>
                    <p className="video-stats">450K views • 1 month ago</p>
                  </div>
                </div>

                {/* Video Card 5 */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img src="/DiceLogoTransparent.png" alt="Video thumbnail" />
                    <span className="video-duration">10:15</span>
                  </div>
                  <div className="video-info">
                    <h3>Artist Spotlight</h3>
                    <p className="channel-name">808 Brokers</p>
                    <p className="video-stats">678K views • 2 weeks ago</p>
                  </div>
                </div>

                {/* Video Card 6 */}
                <div className="video-card">
                  <div className="video-thumbnail">
                    <img src="/DiceLogoTransparent.png" alt="Video thumbnail" />
                    <span className="video-duration">7:45</span>
                  </div>
                  <div className="video-info">
                    <h3>New Beat Release</h3>
                    <p className="channel-name">808 Brokers</p>
                    <p className="video-stats">923K views • 5 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard; 