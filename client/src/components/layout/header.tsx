import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = "none";
    const fallbackText = e.currentTarget.nextElementSibling as HTMLElement;
    if (fallbackText) {
      fallbackText.style.display = "inline";
    }
  };

  return (
    <header className="top-nav flex items-center gap-4 p-2 bg-white shadow">
      <Link to="/" className="flex items-center">
        <img
          src="/client/public/emslogo.png"
          alt="ProMedix EMS Logo"
          height={40}
          style={{ marginRight: 16 }}
          onError={handleImageError}
        />
        <span 
          style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            color: '#dc2626',
            display: 'none'
          }}
        >
          ProMedix EMS
        </span>
      </Link>
      {/* Dashboard link removed completely */}
      {/* Add other navigation links here if needed in the future */}
    </header>
  );
};

export default Header;
