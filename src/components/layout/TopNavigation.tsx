import React from "react";
import { Link } from "react-router-dom";

const TopNavigation: React.FC = () => (
  <nav className="top-nav flex items-center gap-4 p-2 bg-white shadow">
    <Link to="/">
      <img
        src="/emslogo.png"
        alt="ProMedix EMS Logo"
        height={40}
        style={{ marginRight: 16 }}
      />
    </Link>
    <Link to="/dashboard" className="font-semibold">
      Dashboard
    </Link>
    {/* Add more navigation links as needed */}
  </nav>
);

export default TopNavigation;
