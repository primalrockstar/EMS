import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => (
  <header className="top-nav flex items-center gap-4 p-2 bg-white shadow">
    <Link to="/">
      <img
        src="/emslogo.png"
        alt="ProMedix EMS Logo"
        height={40}
        style={{ marginRight: 16 }}
        onError={(e) => {
          // Show fallback text instead of hiding
          e.currentTarget.style.display = "none";
          // You could also replace with a fallback image or text
        }}
      />
      {/* Fallback text that will show if image fails */}
      <span 
        style={{ 
          fontSize: '18px', 
          fontWeight: 'bold',
          color: '#dc2626',
          display: 'none'
        }}
        onLoad={() => {
          // This span will be visible if image fails to load
          const img = document.querySelector('img[alt="ProMedix EMS Logo"]') as HTMLImageElement;
          if (!img || img.style.display === 'none') {
            (document.querySelector('span') as HTMLElement).style.display = 'inline';
          }
        }}
      >
        ProMedix EMS
      </span>
    </Link>
  </header>
);

export default Header;
