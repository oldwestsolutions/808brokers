import React, { useState, useRef, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import BackButton from '../components/BackButton';
import AudioTrackRecorder from '../components/AudioTrackRecorder';
import '../styles/Studio.css';

const Studio = () => {
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

  return (
    <div className="studio-page">
      <div className="studio-header">
        <h1>Studio</h1>
        <div className="studio-actions">
          <button className="action-btn">
            <i className="fas fa-plus"></i>
            New Project
          </button>
        </div>
      </div>

      <div className="studio-tabs">
        <button 
          className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <i className="fas fa-folder"></i>
          Projects
        </button>
        <button 
          className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <i className="fas fa-layer-group"></i>
          Templates
        </button>
        <button 
          className={`tab-btn ${activeTab === 'collaborations' ? 'active' : ''}`}
          onClick={() => setActiveTab('collaborations')}
        >
          <i className="fas fa-users"></i>
          Collaborations
        </button>
      </div>

      <div className="studio-content">
        {activeTab === 'projects' && (
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-thumbnail">
                <img src="/DiceLogoTransparent.png" alt="Project thumbnail" />
                <div className="project-overlay">
                  <button className="play-btn">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
              <div className="project-info">
                <h3>Summer Trap Beat</h3>
                <p>Last modified: 2 hours ago</p>
              </div>
            </div>
            {/* Add more project cards here */}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className="templates-grid">
            <div className="template-card">
              <div className="template-icon">
                <i className="fas fa-music"></i>
              </div>
              <div className="template-info">
                <h3>Hip Hop Template</h3>
                <p>120 BPM • 4/4 Time</p>
              </div>
            </div>
            {/* Add more template cards here */}
          </div>
        )}

        {activeTab === 'collaborations' && (
          <div className="collaborations-list">
            <div className="collaboration-item">
              <div className="collaboration-avatar">
                <img src="/DiceLogoTransparent.png" alt="Collaborator" />
              </div>
              <div className="collaboration-info">
                <h3>John Doe</h3>
                <p>Working on: Summer Trap Beat</p>
              </div>
              <div className="collaboration-status">
                <span className="status-badge online">Online</span>
              </div>
            </div>
            {/* Add more collaboration items here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Studio; 