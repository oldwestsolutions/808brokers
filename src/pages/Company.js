import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Company.css';
import dicelogo from '../images/DiceLogoTransparent.png';
import downtown from '../images/downtown.gif';

const Company = () => {
  return (
    <div className="company-page">
      <motion.div 
        className="company-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-logo">
          <img src={dicelogo} alt="808 Brokers Logo" />
        </div>
        <h1>About 808 Brokers</h1>
        <p className="hero-subtitle">Revolutionizing Music Production Through Technology</p>
      </motion.div>

      <div className="company-content">
        <motion.section 
          className="company-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Our Story</h2>
          <div className="story-content">
            <div className="story-image">
              <img src={downtown} alt="Downtown Background" />
            </div>
            <div className="story-text">
              <p>
                808 Brokers was founded with a vision to bridge the gap between traditional music production 
                and cutting-edge technology. Our platform combines the power of IBM's blockchain capabilities with 
                Dropbox's robust cloud infrastructure to create an unparalleled music production experience.
              </p>
              <p>
                Born in the heart of the city, we understand the pulse of urban music production and the 
                need for seamless collaboration between artists, producers, and technology.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="company-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2>IBM Hyperledger</h2>
          <div className="integration-card">
            <div className="integration-icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM Logo" />
            </div>
            <div className="integration-content">
              <h3>Blockchain-Powered Music Valuation</h3>
              <p>
                Our integration with IBM Hyperledger provides:
              </p>
              <ul>
                <li>Transparent tracking of music streams and royalties</li>
                <li>Smart contract-based music licensing</li>
                <li>Real-time music valuation and appraisal</li>
                <li>Secure and immutable record of music derivatives</li>
                <li>Automated royalty distribution system</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="company-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2>Google Cloud Platform</h2>
          <div className="integration-card">
            <div className="integration-icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" alt="Google Cloud Logo" />
            </div>
            <div className="integration-content">
              <h3>Enterprise-Grade Infrastructure</h3>
              <p>
                Powered by Google Cloud, we deliver:
              </p>
              <ul>
                <li>Global content delivery network for instant access</li>
                <li>Scalable cloud storage for music projects</li>
                <li>Real-time collaboration tools</li>
                <li>Advanced analytics and insights</li>
                <li>99.99% uptime guarantee</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="company-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2>Dropbox Integration</h2>
          <div className="integration-card">
            <div className="integration-icon">
              <img src="https://cdn.worldvectorlogo.com/logos/dropbox-1.svg" alt="Dropbox Logo" style={{ filter: 'none' }} />
            </div>
            <div className="integration-content">
              <h3>Seamless Cloud Storage</h3>
              <p>
                Our integration with Dropbox provides:
              </p>
              <ul>
                <li>Instant file synchronization across devices</li>
                <li>Secure cloud storage for all your music projects</li>
                <li>Easy collaboration with other producers</li>
                <li>Automatic backup of your work</li>
                <li>Version control for your music files</li>
              </ul>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="company-section support-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2>Support & Contact</h2>
          <div className="support-grid">
            <div className="support-card">
              <h3>Contact Us</h3>
              <p>For all inquiries and support</p>
              <a href="mailto:808brokers@gmail.com" className="support-link">
                808brokers@gmail.com
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Company; 