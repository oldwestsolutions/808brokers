import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WaveSurfer from 'wavesurfer.js';
import { FiArrowLeft, FiFolder, FiFile, FiMusic, FiPlus, FiMoreVertical, FiGrid, FiList, FiUpload, FiDownload, FiShare2, FiTrash2 } from 'react-icons/fi';
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
  const [activeTab, setActiveTab] = useState('projects');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedItems, setSelectedItems] = useState([]);

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

  const projects = [
    {
      id: 1,
      name: 'Summer Vibes',
      type: 'project',
      lastModified: '2 hours ago',
      size: '24.5 MB',
      icon: FiMusic
    },
    {
      id: 2,
      name: 'Beat Collection',
      type: 'folder',
      lastModified: '1 day ago',
      items: 12,
      icon: FiFolder
    },
    {
      id: 3,
      name: 'Mixing Sessions',
      type: 'folder',
      lastModified: '3 days ago',
      items: 8,
      icon: FiFolder
    },
    {
      id: 4,
      name: 'Vocal Recordings',
      type: 'folder',
      lastModified: '1 week ago',
      items: 15,
      icon: FiFolder
    },
    {
      id: 5,
      name: 'Drum Patterns',
      type: 'project',
      lastModified: '2 days ago',
      size: '18.2 MB',
      icon: FiMusic
    },
    {
      id: 6,
      name: 'Sound Effects',
      type: 'folder',
      lastModified: '5 days ago',
      items: 24,
      icon: FiFolder
    }
  ];

  const handleItemClick = (item) => {
    if (item.type === 'folder') {
      // Handle folder navigation
      console.log('Opening folder:', item.name);
    } else {
      // Handle project opening
      console.log('Opening project:', item.name);
    }
  };

  const handleItemSelect = (itemId, event) => {
    event.stopPropagation();
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="studio-page">
      <div className="studio-header">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate('/library')}>
            <FiArrowLeft />
          </button>
          <h1>Studio</h1>
        </div>
        <div className="studio-actions">
          <button className="action-btn primary">
            <FiPlus />
            New Project
          </button>
          <button className="action-btn">
            <FiUpload />
            Upload
          </button>
          <div className="view-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <FiGrid />
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      <div className="studio-content">
        <div className={`items-container ${viewMode}`}>
          {projects.map(item => (
            <div 
              key={item.id}
              className={`item ${selectedItems.includes(item.id) ? 'selected' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="item-select" onClick={(e) => handleItemSelect(item.id, e)}>
                <div className="select-checkbox"></div>
              </div>
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
              <button className="item-more">
                <FiMoreVertical />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Studio; 