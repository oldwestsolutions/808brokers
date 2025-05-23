import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WaveSurfer from 'wavesurfer.js';
import { FiFolder, FiFile, FiMusic, FiPlus, FiMoreVertical, FiUpload, FiDownload, FiShare2, FiTrash2, FiX, FiPlay, FiEdit2, FiSearch, FiFolderPlus, FiChevronLeft, FiChevronRight, FiFolderPlus as FiMoveToFolder, FiArrowLeft, FiUploadCloud } from 'react-icons/fi';
import AudioTrackRecorder from '../components/AudioTrackRecorder';
import '../styles/Studio.css';

const Studio = () => {
  const navigate = useNavigate();
  const [mainTrack, setMainTrack] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [lyrics, setLyrics] = useState('');
  const [aiLyrics, setAiLyrics] = useState('');
  const [songTitle, setSongTitle] = useState('Untitled Track');
  const [lastSaved, setLastSaved] = useState(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const mainWaveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFolderPage, setCurrentFolderPage] = useState(1);
  const itemsPerPage = 8;
  const [showMoveToFolder, setShowMoveToFolder] = useState(false);
  const [selectedDestinationFolder, setSelectedDestinationFolder] = useState(null);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Summer Vibes',
      type: 'project',
      lastModified: '2 hours ago',
      size: '24.5 MB',
      icon: FiMusic,
      starred: true
    },
    {
      id: 2,
      name: 'Beat Collection',
      type: 'folder',
      lastModified: '1 day ago',
      items: 12,
      icon: FiFolder,
      starred: false
    },
    {
      id: 3,
      name: 'Mixing Sessions',
      type: 'folder',
      lastModified: '3 days ago',
      items: 8,
      icon: FiFolder,
      starred: true
    },
    {
      id: 4,
      name: 'Vocal Recordings',
      type: 'folder',
      lastModified: '1 week ago',
      items: 15,
      icon: FiFolder,
      starred: false
    },
    {
      id: 5,
      name: 'Drum Patterns',
      type: 'project',
      lastModified: '2 days ago',
      size: '18.2 MB',
      icon: FiMusic,
      starred: false
    },
    {
      id: 6,
      name: 'Sound Effects',
      type: 'folder',
      lastModified: '5 days ago',
      items: 24,
      icon: FiFolder,
      starred: true
    }
  ]);
  const [folderContents, setFolderContents] = useState({
    'Beat Collection': [
      { id: 101, name: 'Hip Hop Beats', type: 'folder', lastModified: '2 hours ago', items: 8, icon: FiFolder },
      { id: 102, name: 'Trap Beats', type: 'folder', lastModified: '1 day ago', items: 12, icon: FiFolder },
      { id: 103, name: 'Summer Mix.mp3', type: 'file', lastModified: '3 hours ago', size: '4.2 MB', icon: FiMusic },
      { id: 104, name: 'Bass Line.wav', type: 'file', lastModified: '5 hours ago', size: '8.7 MB', icon: FiMusic }
    ],
    'Mixing Sessions': [
      { id: 201, name: 'Vocal Mixes', type: 'folder', lastModified: '1 day ago', items: 5, icon: FiFolder },
      { id: 202, name: 'Final Mix.wav', type: 'file', lastModified: '2 days ago', size: '15.3 MB', icon: FiMusic },
      { id: 203, name: 'Rough Mix.mp3', type: 'file', lastModified: '3 days ago', size: '7.8 MB', icon: FiMusic }
    ],
    'Vocal Recordings': [
      { id: 301, name: 'Chorus Takes', type: 'folder', lastModified: '2 days ago', items: 6, icon: FiFolder },
      { id: 302, name: 'Verse 1.wav', type: 'file', lastModified: '1 day ago', size: '12.4 MB', icon: FiMusic },
      { id: 303, name: 'Adlibs.wav', type: 'file', lastModified: '1 day ago', size: '5.6 MB', icon: FiMusic }
    ],
    'Sound Effects': [
      { id: 401, name: 'Ambient', type: 'folder', lastModified: '1 week ago', items: 10, icon: FiFolder },
      { id: 402, name: 'Percussion', type: 'folder', lastModified: '5 days ago', items: 15, icon: FiFolder },
      { id: 403, name: 'Reverb.wav', type: 'file', lastModified: '2 days ago', size: '2.3 MB', icon: FiMusic }
    ]
  });
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDropboxModal, setShowDropboxModal] = useState(false);
  const [dropboxFiles, setDropboxFiles] = useState([]);
  const [selectedDropboxFile, setSelectedDropboxFile] = useState(null);

  // Hide navbar when Studio component mounts
  useEffect(() => {
    document.querySelector('.navbar')?.style.setProperty('display', 'none');
    
    // Show navbar when component unmounts
    return () => {
      document.querySelector('.navbar')?.style.setProperty('display', 'flex');
    };
  }, []);

  // Autosave functionality
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      handleAutoSave();
    }, 3000); // Autosave after 3 seconds of no changes

    return () => clearTimeout(saveTimer);
  }, [lyrics, aiLyrics, songTitle]);

  const handleAutoSave = async () => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise(resolve => setTimeout(resolve, 500));
    setLastSaved(new Date());
    setIsSaving(false);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMainTrack({
        id: Date.now(),
        name: file.name,
        url: url,
        type: 'beat'
      });

      // Initialize WaveSurfer for the main track
      if (mainWaveformRef.current) {
        const wavesurfer = WaveSurfer.create({
          container: mainWaveformRef.current,
          waveColor: '#4F4A85',
          progressColor: '#383351',
          height: 128,
          minPxPerSec: 50,
          cursorWidth: 2,
          cursorColor: '#fff',
          interact: true,
        });
        wavesurfer.load(url);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      handleFileUpload({ target: { files: [file] } });
    }
  };

  const handleRecordingComplete = (recording) => {
    setRecordings(prev => [...prev, {
      id: Date.now(),
      name: `Recording ${recordings.length + 1}`,
      url: recording.url,
      type: 'recording',
      duration: recording.duration
    }]);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      setSelectedFolder(item);
      setShowFolderModal(true);
    } else {
      setSelectedFile(item);
      setShowModal(true);
    }
  };

  const handleCloseFolderModal = () => {
    setShowFolderModal(false);
    setSelectedFolder(null);
  };

  const handleOpenProject = () => {
    console.log('Opening project:', selectedFile.name);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFile(null);
  };

  const getPaginatedItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const getPaginatedFolderFiles = (folderName) => {
    const files = (folderContents[folderName] || []).filter(item => item.type === 'file');
    const startIndex = (currentFolderPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return files.slice(startIndex, endIndex);
  };

  const getTotalPages = (items) => {
    return Math.ceil(items.length / itemsPerPage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFolderPageChange = (newPage) => {
    setCurrentFolderPage(newPage);
  };

  const renderPagination = (currentPage, totalPages, onPageChange) => {
    return (
      <div className="pagination">
        <button 
          className="pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FiChevronLeft />
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className="pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight />
        </button>
      </div>
    );
  };

  const handleMoveToFolder = (folder) => {
    if (selectedFile && folder) {
      // Add the file to the selected folder
      const updatedFolderContents = {
        ...folderContents,
        [folder.name]: [
          ...(folderContents[folder.name] || []),
          {
            ...selectedFile,
            id: Date.now(), // Generate new ID for the moved file
            lastModified: 'Just now'
          }
        ]
      };
      
      // Update the folder contents
      setFolderContents(updatedFolderContents);
      
      // Close the move to folder modal
      setShowMoveToFolder(false);
      setSelectedDestinationFolder(null);
      
      // Show success message or handle the move completion
      console.log(`Moved ${selectedFile.name} to ${folder.name}`);
    }
  };

  const renderMoveToFolderModal = () => (
    <div className="modal-overlay" onClick={() => setShowMoveToFolder(false)}>
      <div className="modal-content move-to-folder-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowMoveToFolder(false)}>
          <FiX />
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <FiMoveToFolder />
          </div>
          <h2>Move to Folder</h2>
        </div>
        <div className="modal-body">
          <div className="folder-list">
            {projects
              .filter(item => item.type === 'folder')
              .map(folder => (
                <div
                  key={folder.id}
                  className={`folder-option ${selectedDestinationFolder?.id === folder.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDestinationFolder(folder)}
                >
                  <div className="folder-option-icon">
                    <FiFolder />
                  </div>
                  <div className="folder-option-info">
                    <h3>{folder.name}</h3>
                    <span className="folder-item-count">{folder.items} items</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="modal-actions">
          <button 
            className="modal-btn primary"
            onClick={() => handleMoveToFolder(selectedDestinationFolder)}
            disabled={!selectedDestinationFolder}
          >
            Move Here
          </button>
          <button 
            className="modal-btn"
            onClick={() => setShowMoveToFolder(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = {
        id: Date.now(),
        name: newFolderName.trim(),
        type: 'folder',
        lastModified: 'Just now',
        items: 0,
        icon: FiFolder
      };

      // Add the new folder to the projects array
      const updatedProjects = [...projects, newFolder];
      setProjects(updatedProjects);

      // Initialize empty contents for the new folder
      setFolderContents(prev => ({
        ...prev,
        [newFolderName.trim()]: []
      }));

      // Reset and close the modal
      setNewFolderName('');
      setShowNewFolderModal(false);
    }
  };

  const renderNewFolderModal = () => (
    <div className="modal-overlay" onClick={() => setShowNewFolderModal(false)}>
      <div className="modal-content new-folder-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowNewFolderModal(false)}>
          <FiX />
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <FiFolderPlus />
          </div>
          <h2>Create New Folder</h2>
        </div>
        <div className="modal-body">
          <div className="input-group">
            <label htmlFor="folderName">Folder Name</label>
            <input
              type="text"
              id="folderName"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
              autoFocus
            />
          </div>
        </div>
        <div className="modal-actions">
          <button 
            className="modal-btn primary"
            onClick={handleCreateFolder}
            disabled={!newFolderName.trim()}
          >
            Create Folder
          </button>
          <button 
            className="modal-btn"
            onClick={() => setShowNewFolderModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const handleDeleteFolder = (folder) => {
    // Remove the folder from projects
    setProjects(prevProjects => prevProjects.filter(p => p.id !== folder.id));
    
    // Remove the folder's contents
    setFolderContents(prevContents => {
      const newContents = { ...prevContents };
      delete newContents[folder.name];
      return newContents;
    });
    
    // Close both modals
    setShowDeleteConfirm(false);
    handleCloseFolderModal();
  };

  const handleRenameFolder = (folder, newName) => {
    if (newName.trim()) {
      // Update the folder name in projects
      setProjects(prevProjects => 
        prevProjects.map(p => 
          p.id === folder.id 
            ? { ...p, name: newName.trim() }
            : p
        )
      );
      
      // Update the folder contents key
      setFolderContents(prevContents => {
        const newContents = { ...prevContents };
        newContents[newName.trim()] = newContents[folder.name] || [];
        delete newContents[folder.name];
        return newContents;
      });
      
      // Close the rename modal
      setShowRenameModal(false);
      setNewFolderName('');
    }
  };

  const renderRenameModal = () => (
    <div className="modal-overlay" onClick={() => setShowRenameModal(false)}>
      <div className="modal-content new-folder-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowRenameModal(false)}>
          <FiX />
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <FiEdit2 />
          </div>
          <h2>Rename Folder</h2>
        </div>
        <div className="modal-body">
          <div className="input-group">
            <label htmlFor="folderName">New Folder Name</label>
            <input
              type="text"
              id="folderName"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter new folder name"
              autoFocus
            />
          </div>
        </div>
        <div className="modal-actions">
          <button 
            className="modal-btn primary"
            onClick={() => handleRenameFolder(selectedFolder, newFolderName)}
            disabled={!newFolderName.trim()}
          >
            Rename
          </button>
          <button 
            className="modal-btn"
            onClick={() => setShowRenameModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderDeleteConfirmModal = () => (
    <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
      <div className="modal-content delete-confirm-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowDeleteConfirm(false)}>
          <FiX />
        </button>
        <div className="modal-header">
          <div className="modal-icon danger">
            <FiTrash2 />
          </div>
          <h2>Delete Folder</h2>
        </div>
        <div className="modal-body">
          <p className="delete-warning">
            Are you sure you want to delete "{selectedFolder?.name}"? This action cannot be undone.
          </p>
        </div>
        <div className="modal-actions">
          <button 
            className="modal-btn danger"
            onClick={() => handleDeleteFolder(selectedFolder)}
          >
            <FiTrash2 />
            Delete
          </button>
          <button 
            className="modal-btn"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const handleDropboxUpload = () => {
    setShowDropboxModal(true);
  };

  const handleDropboxFileSelect = (file) => {
    setSelectedDropboxFile(file);
    // Here you would implement the actual file import logic
    console.log('Selected Dropbox file:', file);
    setShowDropboxModal(false);
  };

  const renderDropboxModal = () => (
    <div className="modal-overlay" onClick={() => setShowDropboxModal(false)}>
      <div className="modal-content dropbox-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowDropboxModal(false)}>
          <FiX />
        </button>
        <div className="modal-header">
          <div className="modal-icon">
            <FiUploadCloud />
          </div>
          <h2>Upload from Dropbox</h2>
        </div>
        <div className="modal-body">
          <div className="dropbox-files">
            {dropboxFiles.length === 0 ? (
              <div className="empty-state">
                <p>No files found in your Dropbox. Please connect your Dropbox account first.</p>
                <button className="modal-btn primary" onClick={() => window.location.href = '/dropbox'}>
                  Connect Dropbox
                </button>
              </div>
            ) : (
              dropboxFiles.map(file => (
                <div 
                  key={file.id}
                  className="dropbox-file-item"
                  onClick={() => handleDropboxFileSelect(file)}
                >
                  <div className="file-icon">
                    <FiMusic />
                  </div>
                  <div className="file-info">
                    <h3>{file.name}</h3>
                    <span className="file-size">{file.size}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="studio-page">
      <div className="studio-header">
        <div className="header-left">
          <button className="back-btn" onClick={handleBack}>
            <FiArrowLeft />
          </button>
        </div>
        <div className="studio-actions">
          <button className="studio-gray-btn">
            Studio
          </button>
        </div>
      </div>

      <div className="studio-content">
        <div className="main-content">
          <div className="content-header">
            <div className="content-actions">
            <button className="new-folder-btn" onClick={() => setShowNewFolderModal(true)}>
              <FiFolderPlus />
              New Folder
            </button>
              <button className="dropbox-upload-btn" onClick={handleDropboxUpload}>
                <FiUploadCloud />
                Upload from Dropbox
              </button>
            </div>
          </div>

          <div className="items-container">
            {getPaginatedItems(projects).map(item => (
              <div key={item.id}>
                <div 
                  className="item"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="item-icon">
                    <item.icon />
                  </div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <div className="item-meta">
                      <span className="item-type">{item.type}</span>
                      <span className="item-date">{item.lastModified}</span>
                      {item.type === 'folder' ? (
                        <span className="item-count">{item.items} items</span>
                      ) : (
                        <span className="item-size">{item.size}</span>
                      )}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="item-more">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {renderPagination(currentPage, getTotalPages(projects), handlePageChange)}
        </div>
      </div>

      {showModal && selectedFile && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseModal}>
              <FiX />
            </button>
            <div className="modal-header">
              <div className="modal-icon">
                <selectedFile.icon />
              </div>
              <h2>{selectedFile.name}</h2>
            </div>
            <div className="modal-body">
              <div className="modal-info">
                <div className="info-row">
                  <span className="info-label">Type:</span>
                  <span className="info-value">{selectedFile.type}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Last Modified:</span>
                  <span className="info-value">{selectedFile.lastModified}</span>
                </div>
                {selectedFile.size && (
                  <div className="info-row">
                    <span className="info-label">Size:</span>
                    <span className="info-value">{selectedFile.size}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn primary" onClick={handleOpenProject}>
                <FiPlay />
                Open Project
              </button>
              <button className="modal-btn" onClick={() => setShowMoveToFolder(true)}>
                <FiMoveToFolder />
                Move to Folder
              </button>
              <button className="modal-btn">
                <FiEdit2 />
                Edit
              </button>
              <button className="modal-btn">
                <FiDownload />
                Download
              </button>
              <button className="modal-btn danger">
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showFolderModal && selectedFolder && (
        <div className="modal-overlay" onClick={handleCloseFolderModal}>
          <div className="modal-content folder-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={handleCloseFolderModal}>
              <FiX />
            </button>
            <div className="modal-header">
              <div className="modal-icon">
                <FiFolder />
              </div>
              <h2>{selectedFolder.name}</h2>
            </div>
            <div className="modal-body">
              <div className="folder-files">
                {getPaginatedFolderFiles(selectedFolder.name).map(item => (
                  <div 
                    key={item.id} 
                    className="folder-file-item"
                    onClick={() => {
                      handleCloseFolderModal();
                      handleItemClick(item);
                    }}
                  >
                    <div className="folder-file-icon">
                      <item.icon />
                    </div>
                    <div className="folder-file-info">
                      <h3>{item.name}</h3>
                      <div className="folder-file-meta">
                        <span className="item-type">{item.type}</span>
                        <span className="item-date">{item.lastModified}</span>
                        <span className="item-size">{item.size}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {renderPagination(
                currentFolderPage,
                getTotalPages((folderContents[selectedFolder.name] || []).filter(item => item.type === 'file')),
                handleFolderPageChange
              )}
            </div>
            <div className="modal-actions">
              <button 
                className="modal-btn"
                onClick={() => {
                  setNewFolderName(selectedFolder.name);
                  setShowRenameModal(true);
                }}
              >
                <FiEdit2 />
                Rename
              </button>
              <button 
                className="modal-btn danger"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <FiTrash2 />
                Delete Folder
              </button>
            </div>
          </div>
        </div>
      )}

      {showMoveToFolder && renderMoveToFolderModal()}

      {showNewFolderModal && renderNewFolderModal()}

      {showRenameModal && renderRenameModal()}

      {showDeleteConfirm && renderDeleteConfirmModal()}

      {showDropboxModal && renderDropboxModal()}
    </div>
  );
};

export default Studio; 