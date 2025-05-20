import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp.js';
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
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Library from './pages/Library';
import Wallet from './pages/Wallet';
import Dropbox from './pages/Dropbox';
import Favorites from './pages/Favorites';
import University from './pages/University';
import PageTransition from './components/PageTransition';
import './styles/App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUp /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/dashboard/mailbox" element={<PageTransition><Mailbox /></PageTransition>} />
        <Route path="/dashboard/cloud" element={<PageTransition><Cloud /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/dashboard/studio" element={<PageTransition><Studio /></PageTransition>} />
        <Route path="/community" element={<PageTransition><Community /></PageTransition>} />
        <Route path="/charts" element={<PageTransition><Charts /></PageTransition>} />
        <Route path="/foryou" element={<PageTransition><ForYou /></PageTransition>} />
        <Route path="/radio" element={<PageTransition><Radio /></PageTransition>} />
        <Route path="/auth/callback" element={<PageTransition><AuthCallback /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/settings" element={<PageTransition><Settings /></PageTransition>} />
        <Route path="/library" element={<PageTransition><Library /></PageTransition>} />
        <Route path="/wallet" element={<PageTransition><Wallet /></PageTransition>} />
        <Route path="/dropbox" element={<PageTransition><Dropbox /></PageTransition>} />
        <Route path="/favorites" element={<PageTransition><Favorites /></PageTransition>} />
        <Route path="/university" element={<PageTransition><University /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <div className="App">
      <Navbar />
      <AnimatedRoutes />
      <Analytics />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App; 