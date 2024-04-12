import React from 'react';
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    // Close sidebar when a link is clicked
    onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <ul>
        <li><button onClick={handleLinkClick}>Section 1</button></li>
        <li><button onClick={handleLinkClick}>Section 2</button></li>
        <li><button onClick={handleLinkClick}>Section 3</button></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
