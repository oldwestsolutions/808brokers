import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="minimal-footer">
      <div className="minimal-footer-content">
        <div className="footer-links-left">
          <Link to="/community">Community</Link>
          <Link to="/shop">Shop</Link>
        </div>
        <div className="footer-links-right">
          <Link to="/company">Company</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 