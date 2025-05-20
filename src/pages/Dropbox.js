import React, { useState, useEffect } from 'react';
import { FiLink, FiList, FiGrid, FiFile } from 'react-icons/fi';
import { SiDropbox } from 'react-icons/si';
import { Dropbox } from 'dropbox';
import BackButton from '../components/BackButton';
import '../styles/Dropbox.css';

const DropboxPage = () => {
  const [viewMode, setViewMode] = useState('list');
  const [isConnected, setIsConnected] = useState(false);
  const [files, setFiles] = useState([]);
  const [dbx, setDbx] = useState(null);

  // Initialize Dropbox client
  useEffect(() => {
    const dbxClient = new Dropbox({
      accessToken: process.env.REACT_APP_DROPBOX_ACCESS_TOKEN,
      fetch: fetch
    });
    setDbx(dbxClient);
  }, []);

  const handleConnect = async () => {
    if (!isConnected) {
      // Here you would typically implement OAuth flow
      // For now, we'll just toggle the connection state
      setIsConnected(true);
      try {
        const response = await dbx.filesListFolder({ path: '' });
        setFiles(response.result.entries);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    } else {
      setIsConnected(false);
      setFiles([]);
    }
  };

  return (
    <div className="dropbox-page">
      <div className="dropbox-header">
        <BackButton destination="/library" text="Back to Library" />
        <div className="header-content">
          <div className="title-container">
            <SiDropbox className="dropbox-logo" />
            <h2>Dropbox</h2>
          </div>
          <p className="description">
            Powered by IBM Hyperledger Fabric - A secure, scalable blockchain framework for enterprise-grade distributed ledger solutions.
          </p>
        </div>
      </div>
      
      <div className="dropbox-toolbar">
        <div className="toolbar-left">
          <button 
            className={`toolbar-button connect ${isConnected ? 'connected' : ''}`}
            onClick={handleConnect}
          >
            <FiLink />
            <span>{isConnected ? 'Connected' : 'Connect to Dropbox'}</span>
          </button>
        </div>
        <div className="view-toggle">
          <button 
            className={`view-button ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FiList />
          </button>
          <button 
            className={`view-button ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <FiGrid />
          </button>
        </div>
      </div>

      <div className="dropbox-content">
        <div className={`file-list ${viewMode}`}>
          {files.length > 0 ? (
            files.map((file) => (
              <div key={file.id} className="file-item">
                <FiFile className="file-icon" />
                <span>{file.name}</span>
              </div>
            ))
          ) : (
            <div className="no-files">
              {isConnected ? 'No files found' : 'Connect to Dropbox to view files'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropboxPage; 