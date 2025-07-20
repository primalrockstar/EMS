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
        onError={e => (e.currentTarget.style.display = "none")}
      />
    </Link>
  </header>
);

export default Header;
