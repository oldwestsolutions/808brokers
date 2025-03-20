import React, { useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import BackButton from '../components/BackButton';
import AudioTrackRecorder from '../components/AudioTrackRecorder';
import '../styles/Studio.css';

const Studio = () => {
  const [mainTrack, setMainTrack] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [lyrics, setLyrics] = useState('');
  const mainWaveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  return (
    <div className="studio-page">
      <BackButton />
      <div className="studio-container">
        <div className="studio-header">
          <h1>Studio</h1>
          <div className="transport-controls">
            <button className="transport-btn">
              <i className="fas fa-backward"></i>
            </button>
            <button 
              className={`play-btn ${isPlaying ? 'playing' : ''}`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
            <button className="transport-btn">
              <i className="fas fa-forward"></i>
            </button>
          </div>
        </div>

        <div className="tracks-workspace">
          {!mainTrack ? (
            <div 
              className="track-dropzone"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="upload-prompt">
                <i className="fas fa-cloud-upload-alt"></i>
                <input 
                  type="file" 
                  id="audio-upload" 
                  accept="audio/*" 
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="audio-upload" className="upload-btn">
                  Upload Beat
                </label>
                <span className="or-text">or drag and drop audio file</span>
              </div>
            </div>
          ) : (
            <div className="main-track">
              <div className="track-header">
                <span className="track-name">{mainTrack.name}</span>
                <button 
                  className="remove-track"
                  onClick={() => setMainTrack(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div ref={mainWaveformRef} className="waveform-container"></div>
            </div>
          )}

          <div className="recordings-section">
            <AudioTrackRecorder onRecordingComplete={handleRecordingComplete} />
            
            <div className="recordings-list">
              {recordings.map(recording => (
                <div key={recording.id} className="recording-track">
                  <div className="track-header">
                    <span className="track-name">{recording.name}</span>
                    <div className="track-controls">
                      <button className="track-btn">
                        <i className="fas fa-volume-up"></i>
                      </button>
                      <button 
                        className="track-btn remove"
                        onClick={() => setRecordings(prev => 
                          prev.filter(r => r.id !== recording.id)
                        )}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  <div className="waveform-container recording"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="studio-sidebar">
          <div className="lyrics-editor">
            <h2>Lyrics</h2>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Write your lyrics here..."
            />
          </div>

          <div className="ai-assistant">
            <h2>AI Assistant</h2>
            <div className="ai-suggestions">
              <button className="suggestion-btn">
                <i className="fas fa-magic"></i>
                Generate Rhymes
              </button>
              <button className="suggestion-btn">
                <i className="fas fa-lightbulb"></i>
                Suggest Next Line
              </button>
              <button className="suggestion-btn">
                <i className="fas fa-sync"></i>
                Find References
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio; 