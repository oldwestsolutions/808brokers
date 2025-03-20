import React, { useEffect, useRef } from 'react';
import '../styles/AudioVisualizer.css';

const AudioVisualizer = ({ audioUrl, type = 'main', color = '#8a2be2' }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);

  useEffect(() => {
    if (!audioUrl) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const loadAudio = async () => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        const response = await fetch(audioUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        audioBufferRef.current = audioBuffer;

        // Draw waveform
        const channelData = audioBuffer.getChannelData(0);
        const step = Math.ceil(channelData.length / canvas.width);
        const amp = canvas.height / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Style based on track type
        if (type === 'main') {
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
        } else {
          ctx.strokeStyle = 'rgba(138, 43, 226, 0.6)';
          ctx.lineWidth = 1.5;
        }

        ctx.beginPath();
        ctx.moveTo(0, amp);

        // Draw the center line
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(0, amp - 0.5, canvas.width, 1);

        // Draw the waveform
        for (let i = 0; i < canvas.width; i++) {
          const min = Math.min(...channelData.slice(i * step, (i + 1) * step));
          const max = Math.max(...channelData.slice(i * step, (i + 1) * step));
          
          // Draw vertical line for each point
          ctx.beginPath();
          ctx.moveTo(i, amp + min * amp);
          ctx.lineTo(i, amp + max * amp);
          ctx.stroke();
        }

        // Add gradient overlay
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(138, 43, 226, 0.2)');
        gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.1)');
        gradient.addColorStop(1, 'rgba(138, 43, 226, 0.2)');
        
        ctx.fillStyle = gradient;
        ctx.globalCompositeOperation = 'source-atop';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';

      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();
  }, [audioUrl, type, color]);

  return (
    <div className={`track-lane ${type}`}>
      <div className="track-controls">
        <button className="track-mute">M</button>
        <button className="track-solo">S</button>
        <div className="track-volume">
          <input type="range" min="0" max="1" step="0.1" defaultValue="0.8" />
        </div>
      </div>
      <div className="waveform-container">
        <canvas 
          ref={canvasRef}
          className="waveform-canvas"
          width={1200}
          height={100}
        />
        <div className="timeline-grid"></div>
      </div>
    </div>
  );
};

export default AudioVisualizer; 