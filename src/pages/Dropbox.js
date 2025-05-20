import React, { useState, useEffect } from 'react';
import { FiDownload, FiShare2, FiTrash2, FiFile, FiLink, FiList, FiGrid } from 'react-icons/fi';
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

  const handleDownload = async (file) => {
    if (!isConnected) return;
    try {
      const response = await dbx.filesDownload({ path: file.path_lower });
      // Handle the downloaded file
      const blob = response.result.fileBlob;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleShare = async (file) => {
    if (!isConnected) return;
    try {
      const response = await dbx.sharingCreateSharedLink({ path: file.path_lower });
      // Handle the shared link
      const sharedLink = response.result.url;
      navigator.clipboard.writeText(sharedLink);
      alert('Share link copied to clipboard!');
    } catch (error) {
      console.error('Error sharing file:', error);
    }
  };

  const handleDelete = async (file) => {
    if (!isConnected) return;
    try {
      await dbx.filesDelete({ path: file.path_lower });
      setFiles(files.filter(f => f.id !== file.id));
    } catch (error) {
      console.error('Error deleting file:', error);
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
          <button 
            className="toolbar-button"
            disabled={!isConnected}
          >
            <FiDownload />
            <span>Download</span>
          </button>
          <button 
            className="toolbar-button"
            disabled={!isConnected}
          >
            <FiShare2 />
            <span>Share</span>
          </button>
          <button 
            className="toolbar-button"
            disabled={!isConnected}
          >
            <FiTrash2 />
            <span>Delete</span>
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
                <div className="file-actions">
                  <button onClick={() => handleDownload(file)}>
                    <FiDownload />
                  </button>
                  <button onClick={() => handleShare(file)}>
                    <FiShare2 />
                  </button>
                  <button onClick={() => handleDelete(file)}>
                    <FiTrash2 />
                  </button>
                </div>
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