import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Mailbox from './pages/Mailbox';
import Cloud from './pages/Cloud';
import Shop from './pages/Shop';
import Studio from './pages/Studio';
import Community from './pages/Community';
import Charts from './pages/Charts';
import ForYou from './pages/ForYou';
import Radio from './pages/Radio';
import AuthCallback from './components/AuthCallback';
import './styles/App.css';

function AppContent() {
  const location = useLocation();
  const showNavbar = !['/foryou', '/radio', '/charts'].includes(location.pathname);
  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      {showNavbar && <Navbar isHomePage={isHomePage} />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/mailbox" element={<Mailbox />} />
          <Route path="/dashboard/cloud" element={<Cloud />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/dashboard/studio" element={<Studio />} />
          <Route path="/community" element={<Community />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/foryou" element={<ForYou />} />
          <Route path="/radio" element={<Radio />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App; 