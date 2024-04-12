// Dashboard.js
import React, { useState } from "react";
import Sidebar from "./SideBar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button onClick={toggleSidebar}>☰</button>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <div className="main-content">
        {/* Your dashboard sections/components go here */}
      </div>
    </div>
  );
};

export default Dashboard;
