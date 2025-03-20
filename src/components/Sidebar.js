import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className="nav-item">
          <i className="fas fa-home"></i>
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/dashboard/mailbox" className="nav-item">
          <i className="fas fa-envelope"></i>
          <span>Mailbox</span>
        </NavLink>
        <NavLink to="/dashboard/cloud" className="nav-item">
          <i className="fas fa-cloud"></i>
          <span>Cloud Storage</span>
        </NavLink>
        <NavLink to="/dashboard/shop" className="nav-item">
          <i className="fas fa-shopping-cart"></i>
          <span>Shop</span>
        </NavLink>
        <NavLink to="/dashboard/studio" className="nav-item">
          <i className="fas fa-microphone"></i>
          <span>Studio</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar; 