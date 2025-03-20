import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mailbox from './pages/Mailbox';
import Cloud from './pages/Cloud';
import Shop from './pages/Shop';
import Studio from './pages/Studio';
import AuthCallback from './components/AuthCallback';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/mailbox" element={<Mailbox />} />
              <Route path="/dashboard/cloud" element={<Cloud />} />
              <Route path="/dashboard/shop" element={<Shop />} />
              <Route path="/dashboard/studio" element={<Studio />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 