import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import '../styles/Cloud.css';

const Cloud = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);

  const dummyFiles = [
    {
      id: 1,
      name: 'Trap Beat Collection',
      type: 'folder',
      items: '12 items',
      size: '1.2 GB',
      modified: 'Modified 2 days ago',
      favorite: true,
      shared: true
    },
    {
      id: 2,
      name: 'Summer Vibes.mp3',
      type: 'audio',
      size: '8.5 MB',
      modified: 'Modified yesterday',
      favorite: false,
      shared: false
    },
    {
      id: 3,
      name: 'Drum Samples',
      type: 'folder',
      items: '45 items',
      size: '850 MB',
      modified: 'Modified 1 week ago'
    },
    {
      id: 4,
      name: 'Project Files',
      type: 'folder',
      items: '8 items',
      size: '2.1 GB',
      modified: 'Modified 3 days ago'
    },
    {
      id: 5,
      name: 'Beat Pack Vol.1',
      type: 'folder',
      items: '15 items',
      size: '1.8 GB',
      modified: 'Modified 5 days ago'
    },
    {
      id: 6,
      name: 'New Melody.wav',
      type: 'audio',
      size: '12.3 MB',
      modified: 'Modified 4 hours ago'
    },
    {
      id: 7,
      name: 'VST Plugins',
      type: 'folder',
      items: '25 items',
      size: '5.2 GB',
      modified: 'Modified 1 day ago',
      favorite: true,
      shared: true
    },
    {
      id: 8,
      name: 'Mix Sessions',
      type: 'folder',
      items: '8 items',
      size: '3.8 GB',
      modified: 'Modified 6 hours ago',
      favorite: false,
      shared: true
    }
  ];

  const quickAccessFolders = [
    { id: 1, name: 'Recent Uploads', icon: 'clock' },
    { id: 2, name: 'Shared with me', icon: 'share-alt' },
    { id: 3, name: 'Favorites', icon: 'star' },
    { id: 4, name: 'Offline files', icon: 'cloud-download-alt' }
  ];

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => {
      if (prev.includes(fileId)) {
        return prev.filter(id => id !== fileId);
      }
      return [...prev, fileId];
    });
  };

  const handleUpload = (type) => {
    // Handle different upload types
    console.log('Uploading:', type);
    setShowUploadMenu(false);
  };

  const handleFileAction = (action, fileId) => {
    // Handle file actions (download, share, delete, etc.)
    console.log('Action:', action, 'File:', fileId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search logic
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    // Implement sort logic
  };

  return (
    <div className="cloud-page">
      <BackButton />
      <div className="cloud-container">
        <div className="cloud-sidebar">
          <div className="storage-info">
            <h3>Storage</h3>
            <div className="storage-progress">
              <div className="progress-bar" style={{ width: '45.8%' }}></div>
            </div>
            <div className="storage-details">
              <div className="storage-text">
                <span className="storage-used">45.8 GB</span>
                <span className="storage-total">/ 100 GB</span>
              </div>
              <button className="upgrade-btn">
                <i className="fas fa-crown"></i>
                Upgrade
              </button>
            </div>
          </div>

          <div className="quick-access">
            <h3>Quick Access</h3>
            <div className="quick-access-grid">
              {quickAccessFolders.map(folder => (
                <button key={folder.id} className="quick-access-item">
                  <i className={`fas fa-${folder.icon}`}></i>
                  <span>{folder.name}</span>
                </button>
              ))}
            </div>
          </div>

          <nav className="cloud-nav">
            <h3>Categories</h3>
            <button className="nav-item active">
              <i className="fas fa-folder"></i>
              <span>All Files</span>
              <span className="item-count">358</span>
            </button>
            <button className="nav-item">
              <i className="fas fa-music"></i>
              <span>Audio Files</span>
              <span className="item-count">126</span>
            </button>
            <button className="nav-item">
              <i className="fas fa-image"></i>
              <span>Images</span>
              <span className="item-count">64</span>
            </button>
            <button className="nav-item">
              <i className="fas fa-file-alt"></i>
              <span>Documents</span>
              <span className="item-count">42</span>
            </button>
            <button className="nav-item">
              <i className="fas fa-archive"></i>
              <span>Archives</span>
              <span className="item-count">15</span>
            </button>
          </nav>
        </div>

        <div className="cloud-content">
          <div className="cloud-header">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search files and folders..."
                value={searchQuery}
                onChange={handleSearch}
              />
              <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
                <i className="fas fa-filter"></i>
              </button>
            </div>

            <div className="header-actions">
              <div className="sort-options">
                <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
                  <option value="name">Name</option>
                  <option value="date">Date</option>
                  <option value="size">Size</option>
                  <option value="type">Type</option>
                </select>
              </div>

              <div className="view-options">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <i className="fas fa-th-large"></i>
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="action-toolbar">
            <div className="toolbar-left">
              <div className="upload-wrapper">
                <button 
                  className="add-btn"
                  onClick={() => setShowUploadMenu(!showUploadMenu)}
                >
                  <i className="fas fa-plus"></i>
                </button>
                {showUploadMenu && (
                  <div className="upload-menu">
                    <button onClick={() => handleUpload('file')}>
                      <i className="fas fa-file-upload"></i>
                      Upload File
                    </button>
                    <button onClick={() => handleUpload('folder')}>
                      <i className="fas fa-folder-plus"></i>
                      Upload Folder
                    </button>
                    <button onClick={() => handleUpload('new-folder')}>
                      <i className="fas fa-folder"></i>
                      New Folder
                    </button>
                  </div>
                )}
              </div>

              {selectedFiles.length > 0 && (
                <div className="selection-actions">
                  <button onClick={() => handleFileAction('download')}>
                    <i className="fas fa-download"></i>
                  </button>
                  <button onClick={() => handleFileAction('share')}>
                    <i className="fas fa-share-alt"></i>
                  </button>
                  <button onClick={() => handleFileAction('delete')} className="delete-btn">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              )}
            </div>

            {selectedFiles.length > 0 && (
              <div className="selected-count">
                {selectedFiles.length} selected
              </div>
            )}
          </div>

          <div className={`files-container ${viewMode}`}>
            {dummyFiles.map(file => (
              <div 
                key={file.id}
                className={`file-item ${selectedFiles.includes(file.id) ? 'selected' : ''}`}
                onClick={() => handleFileSelect(file.id)}
              >
                <div className="file-icon">
                  <i className={`fas ${file.type === 'folder' ? 'fa-folder' : 'fa-file-audio'}`}></i>
                </div>
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <div className="file-meta">
                    <span className="file-details">
                      {file.type === 'folder' ? file.items : file.size}
                    </span>
                    <span className="file-modified">{file.modified}</span>
                  </div>
                </div>
                <div className="file-actions">
                  {file.favorite && <i className="fas fa-star favorite"></i>}
                  {file.shared && <i className="fas fa-users shared"></i>}
                  <button className="more-btn">
                    <i className="fas fa-ellipsis-v"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cloud; 