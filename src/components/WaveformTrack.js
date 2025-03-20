import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import '../styles/WaveformTrack.css';

const WaveformTrack = ({ 
  audioUrl, 
  isMain = false, 
  onReady, 
  color = '#8a2be2',
  height = 128
}) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!waveformRef.current) return;

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'rgba(255, 255, 255, 0.3)',
      progressColor: color,
      cursorColor: '#fff',
      barWidth: 2,
      barRadius: 3,
      cursorWidth: 1,
      height: height,
      barGap: 2,
      responsive: true,
      normalize: true,
      partialRender: true,
      pixelRatio: 1,
      backgroundColor: 'transparent',
      interact: true,
      hideScrollbar: true,
    });

    wavesurfer.current.load(audioUrl);

    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current.getDuration());
      if (onReady) onReady(wavesurfer.current);
    });

    wavesurfer.current.on('audioprocess', () => {
      setCurrentTime(wavesurfer.current.getCurrentTime());
    });

    wavesurfer.current.on('play', () => setIsPlaying(true));
    wavesurfer.current.on('pause', () => setIsPlaying(false));

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
    };
  }, [audioUrl, color, height, onReady]);

  const togglePlay = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurfer.current) {
      wavesurfer.current.setVolume(newVolume);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`waveform-track ${isMain ? 'main-track' : 'recording-track'}`}>
      <div className="track-info">
        <div className="track-controls">
          <button 
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
          >
            <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
          </button>
          <button className="track-mute">M</button>
          <button className="track-solo">S</button>
        </div>
        <div className="volume-slider">
          <i className="fas fa-volume-up"></i>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
      
      <div className="waveform-container">
        <div ref={waveformRef} className="waveform" />
        <div className="timeline">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default WaveformTrack; 