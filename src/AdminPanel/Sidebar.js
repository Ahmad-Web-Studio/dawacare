// src/adminpanel/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import './AdminPanel.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
       
        <Link to="/admin" style = {{ textDecoration : 'none' , color : 'white' }}>  <h2 className="sidebar-title">Dawa<span>Care</span></h2></Link>
        </div>
        <p className="admin-badge">Admin Panel</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li className={location.pathname === "/admin" ? "active" : ""}>
            <Link to="/admin">
              <span className="menu-text">Dashboard</span>
            </Link>
          </li>
          
          <li className={location.pathname === "/admin/orders" ? "active" : ""}>
            <Link to="/admin/orders">
              <span className="menu-text">Orders</span>
            </Link>
          </li>
          
          <li className={location.pathname === "/admin/users" ? "active" : ""}>
            <Link to="/admin/users">
              <span className="menu-text">Customers Details</span>
            </Link>
          </li>
          
          <li className={location.pathname === "/admin/UploadProducts" ? "active" : ""}>
            <Link to="/admin/UploadProducts">
              <span className="menu-text">Manage Products</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
     
        <button className="logout-btn">
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;