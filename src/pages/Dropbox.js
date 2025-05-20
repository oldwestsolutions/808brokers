import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropbox } from '@fortawesome/free-brands-svg-icons';
import { FiFile } from 'react-icons/fi';
import '../styles/Dropbox.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const Dropbox = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [assets, setAssets] = useState([]);
  const [events, setEvents] = useState([]);

  // Function to handle incoming events
  const handleEvent = useCallback((event) => {
    const data = JSON.parse(event.data);
    setEvents(prevEvents => [...prevEvents, data].slice(-50)); // Keep last 50 events
    
    // If the event contains asset updates, refresh the assets list
    if (data.type === 'assetUpdate' || data.type === 'block') {
      loadAssets();
    }
  }, []);

  // Set up event source connection
  useEffect(() => {
    let eventSource = null;

    if (isConnected) {
      eventSource = new EventSource(`${API_BASE_URL}/api/events`);
      
      eventSource.onmessage = handleEvent;
      eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        eventSource.close();
      };
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [isConnected, handleEvent]);

  useEffect(() => {
    // Check if we're already connected to the network
    const checkConnection = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/status`);
        const data = await response.json();
        setIsConnected(data.connected);
        if (data.connected) {
          await loadAssets();
        }
      } catch (err) {
        console.error('Failed to connect to network:', err);
        setError('Failed to connect to the network');
      }
    };

    checkConnection();
  }, []);

  const loadAssets = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/assets`);
      const data = await response.json();
      setAssets(data);
    } catch (err) {
      console.error('Failed to load assets:', err);
      setError('Failed to load assets');
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/connect`, {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        setIsConnected(true);
        await loadAssets();
      } else {
        throw new Error(data.message || 'Failed to connect');
      }
    } catch (err) {
      console.error('Connection error:', err);
      setError('Failed to connect to the network');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/disconnect`, {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        setIsConnected(false);
        setAssets([]);
        setEvents([]);
      } else {
        throw new Error(data.message || 'Failed to disconnect');
      }
    } catch (err) {
      console.error('Disconnection error:', err);
      setError('Failed to disconnect from the network');
    }
  };

  return (
    <div className="dropbox-container">
      <div className="dropbox-header">
        <FontAwesomeIcon icon={faDropbox} className="dropbox-logo" />
        <h1>Dropbox Integration</h1>
      </div>

      <div className="dropbox-content">
        {!isConnected ? (
          <div className="connection-section">
            <p>Connect to the Hyperledger Fabric network to manage your assets</p>
            <button 
              className="connect-button" 
              onClick={handleConnect}
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Connect to Network'}
            </button>
          </div>
        ) : (
          <div className="assets-section">
            <div className="assets-header">
              <h2>Your Assets</h2>
              <button 
                className="disconnect-button"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>
            
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="assets-list">
              {assets.map((asset, index) => (
                <div key={index} className="asset-item">
                  <FiFile className="file-icon" />
                  <div className="asset-details">
                    <h3>{asset.id}</h3>
                    <p>Owner: {asset.owner}</p>
                    <p>Value: {asset.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="events-section">
              <h3>Network Events</h3>
              <div className="events-list">
                {events.map((event, index) => (
                  <div key={index} className="event-item">
                    <span className="event-time">
                      {new Date().toLocaleTimeString()}
                    </span>
                    <span className="event-type">{event.type}</span>
                    <pre className="event-data">
                      {JSON.stringify(event.data, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropbox; 