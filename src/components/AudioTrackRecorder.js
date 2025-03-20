import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js';
import '../styles/AudioTrackRecorder.css';

const AudioTrackRecorder = ({ onRecordingComplete }) => {
  const containerRef = useRef(null);
  const wavesurferRef = useRef(null);
  const recordPluginRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Create Record plugin instance
    recordPluginRef.current = RecordPlugin.create();

    // Create WaveSurfer instance with the plugin
    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      height: 100,
      minPxPerSec: 50,
      cursorWidth: 2,
      cursorColor: '#fff',
      interact: true,
      plugins: [recordPluginRef.current]
    });

    // Event listeners
    recordPluginRef.current.on('record-start', () => {
      setIsRecording(true);
      setDuration(0);
    });

    recordPluginRef.current.on('record-progress', (time) => {
      setDuration(time);
    });

    recordPluginRef.current.on('record-end', (blob) => {
      setIsRecording(false);
      
      // Create audio URL and send to parent
      const audioUrl = URL.createObjectURL(blob);
      onRecordingComplete({
        blob,
        url: audioUrl,
        duration: duration
      });
    });

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      await recordPluginRef.current.startRecording();
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = () => {
    if (recordPluginRef.current) {
      recordPluginRef.current.stopRecording();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-track-recorder">
      <div className="recorder-controls">
        <button 
          className={`record-button ${isRecording ? 'recording' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          <i className={`fas fa-${isRecording ? 'stop' : 'microphone'}`}></i>
          {isRecording ? formatTime(duration) : 'Record'}
        </button>
        
        {isRecording && (
          <div className="recording-status">
            <div className="recording-dot"></div>
            Recording
          </div>
        )}
      </div>

      <div className="waveform-container">
        <div ref={containerRef} className="waveform"></div>
        <div className="timeline-grid"></div>
      </div>
    </div>
  );
};

export default AudioTrackRecorder; 