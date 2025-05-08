import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Line } from 'react-konva';
import * as Tone from 'tone';
import '../styles/Studio.css';

const Studio = () => {
  const [tracks, setTracks] = useState([
    { id: 1, name: 'Beat Track', color: '#8A2BE2', volume: 0.8, pan: 0, mute: false, solo: false, recording: false },
    { id: 2, name: 'Vocals', color: '#1DA1F2', volume: 0.8, pan: 0, mute: false, solo: false, recording: false },
    { id: 3, name: 'Effects', color: '#E1306C', volume: 0.8, pan: 0, mute: false, solo: false, recording: false },
  ]);

  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutes in seconds
  const [showMixer, setShowMixer] = useState(true);
  const [showInspector, setShowInspector] = useState(true);
  const [zoom, setZoom] = useState(1);

  const stageRef = useRef(null);
  const timelineRef = useRef(null);
  const recorderRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Initialize Tone.js
  useEffect(() => {
    // Create a recorder
    recorderRef.current = new Tone.Recorder();
    
    // Set up audio context
    Tone.start();
    
    return () => {
      if (recorderRef.current) {
        recorderRef.current.dispose();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle playback
  const handlePlay = async () => {
    if (!isPlaying) {
      await Tone.start();
      setIsPlaying(true);
      startPlayback();
    } else {
      setIsPlaying(false);
      stopPlayback();
    }
  };

  // Handle recording
  const handleRecord = async () => {
    if (!isRecording) {
      await Tone.start();
      setIsRecording(true);
      startRecording();
    } else {
      setIsRecording(false);
      stopRecording();
    }
  };

  // Start playback
  const startPlayback = () => {
    const updateTime = () => {
      setCurrentTime(prev => {
        const newTime = prev + 0.1;
        if (newTime >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return newTime;
      });
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };
    animationFrameRef.current = requestAnimationFrame(updateTime);
  };

  // Stop playback
  const stopPlayback = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setCurrentTime(0);
  };

  // Start recording
  const startRecording = async () => {
    try {
      await recorderRef.current.start();
      // Start recording visualization
      startRecordingVisualization();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  // Stop recording
  const stopRecording = async () => {
    try {
      const recording = await recorderRef.current.stop();
      // Here you would typically save the recording
      console.log('Recording stopped, blob:', recording);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  // Start recording visualization
  const startRecordingVisualization = () => {
    const updateRecording = () => {
      if (isRecording) {
        // Update recording visualization
        animationFrameRef.current = requestAnimationFrame(updateRecording);
      }
    };
    animationFrameRef.current = requestAnimationFrame(updateRecording);
  };

  // Timeline markers
  const markers = Array.from({ length: 13 }, (_, i) => i * 15); // 15-second intervals

  return (
    <div className="studio-container">
      <div className="studio-toolbar">
        <div className="toolbar-left">
          <button className="toolbar-btn" onClick={() => setShowInspector(!showInspector)}>
            <i className="fas fa-sliders-h"></i>
          </button>
          <button className="toolbar-btn" onClick={() => setShowMixer(!showMixer)}>
            <i className="fas fa-sliders"></i>
          </button>
          <div className="zoom-controls">
            <button className="toolbar-btn" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
              <i className="fas fa-minus"></i>
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button className="toolbar-btn" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="toolbar-center">
          <div className="transport-controls">
            <button className="control-btn" onClick={stopPlayback}>
              <i className="fas fa-step-backward"></i>
            </button>
            <button 
              className={`control-btn play-btn ${isPlaying ? 'active' : ''}`}
              onClick={handlePlay}
            >
              <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
            </button>
            <button className="control-btn stop-btn" onClick={stopPlayback}>
              <i className="fas fa-stop"></i>
            </button>
            <button 
              className={`control-btn record-btn ${isRecording ? 'active' : ''}`}
              onClick={handleRecord}
            >
              <i className="fas fa-circle"></i>
            </button>
            <button className="control-btn" onClick={() => setCurrentTime(duration)}>
              <i className="fas fa-step-forward"></i>
            </button>
          </div>
          <div className="time-display">
            {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="toolbar-btn">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>

      <div className="studio-main">
        {showInspector && (
          <div className="inspector-panel">
            <div className="inspector-header">
              <h3>Inspector</h3>
            </div>
            <div className="inspector-content">
              {selectedTrack && (
                <>
                  <div className="inspector-section">
                    <h4>Track Settings</h4>
                    <div className="setting-item">
                      <label>Volume</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={tracks.find(t => t.id === selectedTrack)?.volume || 0}
                        onChange={(e) => {
                          const newTracks = tracks.map(t => 
                            t.id === selectedTrack ? { ...t, volume: parseFloat(e.target.value) } : t
                          );
                          setTracks(newTracks);
                        }}
                      />
                    </div>
                    <div className="setting-item">
                      <label>Pan</label>
                      <input 
                        type="range" 
                        min="-1" 
                        max="1" 
                        step="0.01" 
                        value={tracks.find(t => t.id === selectedTrack)?.pan || 0}
                        onChange={(e) => {
                          const newTracks = tracks.map(t => 
                            t.id === selectedTrack ? { ...t, pan: parseFloat(e.target.value) } : t
                          );
                          setTracks(newTracks);
                        }}
                      />
                    </div>
                  </div>
                  <div className="inspector-section">
                    <h4>Effects</h4>
                    <div className="effects-list">
                      <div className="effect-item">
                        <i className="fas fa-sliders-h"></i>
                        <span>EQ</span>
                      </div>
                      <div className="effect-item">
                        <i className="fas fa-wave-square"></i>
                        <span>Compressor</span>
                      </div>
                      <div className="effect-item">
                        <i className="fas fa-volume-up"></i>
                        <span>Reverb</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className="tracks-area">
          <div className="tracks-header">
            <div className="track-header-cell">Track</div>
            <div className="track-header-cell">M</div>
            <div className="track-header-cell">S</div>
            <div className="track-header-cell">R</div>
            <div className="track-header-cell">I</div>
            <div className="track-header-cell">O</div>
          </div>
          <div className="tracks-container">
            {tracks.map((track) => (
              <div 
                key={track.id} 
                className={`track ${selectedTrack === track.id ? 'selected' : ''}`}
                onClick={() => setSelectedTrack(track.id)}
              >
                <div className="track-header">
                  <div className="track-name">{track.name}</div>
                  <div className="track-controls">
                    <button 
                      className={`control-btn ${track.mute ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newTracks = tracks.map(t => 
                          t.id === track.id ? { ...t, mute: !t.mute } : t
                        );
                        setTracks(newTracks);
                      }}
                    >
                      M
                    </button>
                    <button 
                      className={`control-btn ${track.solo ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        const newTracks = tracks.map(t => 
                          t.id === track.id ? { ...t, solo: !t.solo } : t
                        );
                        setTracks(newTracks);
                      }}
                    >
                      S
                    </button>
                    <button className="control-btn">R</button>
                    <button className="control-btn">I</button>
                    <button className="control-btn">O</button>
                  </div>
                </div>
                <div className="track-content">
                  <Stage
                    width={800 * zoom}
                    height={100}
                    className="track-canvas"
                  >
                    <Layer>
                      <Rect
                        x={0}
                        y={0}
                        width={800 * zoom}
                        height={100}
                        fill={track.color}
                        opacity={0.3}
                      />
                      {/* Waveform visualization would go here */}
                    </Layer>
                  </Stage>
                </div>
              </div>
            ))}
          </div>

          <div className="timeline-container">
            <Stage
              ref={stageRef}
              width={800 * zoom}
              height={50}
              className="timeline"
            >
              <Layer>
                <Rect
                  x={0}
                  y={0}
                  width={800 * zoom}
                  height={50}
                  fill="#1a1a1a"
                />
                {markers.map((marker, i) => (
                  <Line
                    key={i}
                    points={[marker * 5 * zoom, 0, marker * 5 * zoom, 50]}
                    stroke="#333"
                    strokeWidth={1}
                  />
                ))}
                {markers.map((marker, i) => (
                  <Text
                    key={i}
                    x={marker * 5 * zoom + 2}
                    y={2}
                    text={`${Math.floor(marker / 60)}:${(marker % 60).toString().padStart(2, '0')}`}
                    fill="#666"
                    fontSize={10}
                  />
                ))}
                <Line
                  points={[currentTime * 5 * zoom, 0, currentTime * 5 * zoom, 50]}
                  stroke="#8A2BE2"
                  strokeWidth={2}
                />
              </Layer>
            </Stage>
          </div>
        </div>

        {showMixer && (
          <div className="mixer-panel">
            <div className="mixer-header">
              <h3>Mixer</h3>
            </div>
            <div className="mixer-strips">
              {tracks.map((track) => (
                <div key={track.id} className="mixer-strip">
                  <div className="strip-header">
                    <div className="strip-name">{track.name}</div>
                    <div className="strip-controls">
                      <button 
                        className={`control-btn ${track.mute ? 'active' : ''}`}
                        onClick={() => {
                          const newTracks = tracks.map(t => 
                            t.id === track.id ? { ...t, mute: !t.mute } : t
                          );
                          setTracks(newTracks);
                        }}
                      >
                        M
                      </button>
                      <button 
                        className={`control-btn ${track.solo ? 'active' : ''}`}
                        onClick={() => {
                          const newTracks = tracks.map(t => 
                            t.id === track.id ? { ...t, solo: !t.solo } : t
                          );
                          setTracks(newTracks);
                        }}
                      >
                        S
                      </button>
                    </div>
                  </div>
                  <div className="strip-fader">
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={track.volume}
                      onChange={(e) => {
                        const newTracks = tracks.map(t => 
                          t.id === track.id ? { ...t, volume: parseFloat(e.target.value) } : t
                        );
                        setTracks(newTracks);
                      }}
                      className="volume-fader"
                    />
                    <div className="fader-value">{Math.round(track.volume * 100)}</div>
                  </div>
                  <div className="strip-pan">
                    <input 
                      type="range" 
                      min="-1" 
                      max="1" 
                      step="0.01" 
                      value={track.pan}
                      onChange={(e) => {
                        const newTracks = tracks.map(t => 
                          t.id === track.id ? { ...t, pan: parseFloat(e.target.value) } : t
                        );
                        setTracks(newTracks);
                      }}
                      className="pan-fader"
                    />
                    <div className="pan-value">{track.pan.toFixed(1)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Studio; 