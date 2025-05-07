import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recent');

  const storyItems = [
    {
      id: 'recent',
      icon: 'clock',
      label: 'Recent',
      color: '#E1306C'
    },
    {
      id: 'starred',
      icon: 'star',
      label: 'Starred',
      color: '#F77737'
    },
    {
      id: 'shared',
      icon: 'share-alt',
      label: 'Shared',
      color: '#833AB4'
    },
    {
      id: 'trash',
      icon: 'trash',
      label: 'Trash',
      color: '#405DE6'
    },
    {
      id: 'upload',
      icon: 'upload',
      label: 'Upload',
      color: '#FD1D1D'
    },
    {
      id: 'folder',
      icon: 'folder-plus',
      label: 'New Folder',
      color: '#FCAF45'
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
            <div className="storage-bar">
              <div className="storage-progress" style={{ width: '65%' }}></div>
            </div>
            <p>65% of 100GB used</p>
          </div>
          
          <nav className="dashboard-nav">
            {storyItems.map(item => (
              <button 
                key={item.id}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <i className={`fas fa-${item.icon}`}></i>
                {item.label}
              </button>
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
            <h1>{storyItems.find(item => item.id === activeTab)?.label || 'Recent Files'}</h1>
          </div>

          <div className="files-grid">
            {recentFiles.map(file => (
              <div key={file.id} className="file-card">
                <div className="file-thumbnail">
                  <img src={file.thumbnail} alt={file.name} />
                  <div className="file-overlay">
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
                <div className="file-info">
                  <h3>{file.name}</h3>
                  <p>{file.size} • {file.lastModified}</p>
                </div>
              </div>
            ))}
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