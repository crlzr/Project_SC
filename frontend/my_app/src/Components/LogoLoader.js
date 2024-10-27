// LogoLoader.js
import React from 'react';
import '../index.css'; // Create this CSS file for styling

const LogoLoader = () => {
  return (
    <div className="logo-loader">
      <img 
        src={`${process.env.PUBLIC_URL}/sharecirclelogo.png`} 
        alt="Loading..." 
        className="loader-image" 
      />
    </div>
  );
};

export default LogoLoader;
