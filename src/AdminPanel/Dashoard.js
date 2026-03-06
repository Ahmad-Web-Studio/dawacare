// src/adminpanel/Dashboard.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import Orders from "./Orders";
import Users from "./Users";
import UploadProducts from "./UploadProducts";

const Dashboard = () => {
  return (
    <div className="dashboard-container" style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-content" style={{ flex: 1, padding: "20px" }}>
        <Routes>
          {/* Welcome/Home page */}
          <Route path="/" element={<DashboardHome />} />

          {/* Admin pages */}
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path = "UploadProducts" element={<UploadProducts/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;