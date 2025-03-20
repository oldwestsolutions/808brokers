import React, { useRef, useState } from 'react';
import Recorder from 'recorder-js';
import '../styles/AudioRecorder.css';

const AudioRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      recorderRef.current = new Recorder(audioContext);
      recorderRef.current.init(stream);
      
      recorderRef.current.start();
      setIsRecording(true);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;

    try {
      const { blob } = await recorderRef.current.stop();
      const audioUrl = URL.createObjectURL(blob);
      
      // Clear timer
      clearInterval(timerRef.current);
      setIsRecording(false);
      setRecordingTime(0);

      // Send recording to parent component
      onRecordingComplete(audioUrl);
    } catch (err) {
      console.error('Error stopping recording:', err);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-recorder">
      <button 
        className={`record-button ${isRecording ? 'recording' : ''}`}
        onClick={isRecording ? stopRecording : startRecording}
      >
        <i className={`fas fa-${isRecording ? 'stop' : 'microphone'}`}></i>
        {isRecording ? formatTime(recordingTime) : 'Record'}
      </button>
    </div>
  );
};

export default AudioRecorder; 