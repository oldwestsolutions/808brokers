import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleShopClick = (e) => {
    e.preventDefault();
    if (user) {
      navigate('/shop');
    } else {
      navigate('/login', { state: { from: '/shop' } });
    }
  };

  return (
    <footer className="minimal-footer">
      <div className="minimal-footer-content">
        <div className="footer-links-left">
          <Link to="/community">Community</Link>
          <a href="/shop" onClick={handleShopClick}>Shop</a>
        </div>
        <div className="footer-links-right">
          <Link to="/company">Company</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 