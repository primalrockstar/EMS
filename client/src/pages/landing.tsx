import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <img
        src="/emslogo.png"
        alt="ProMedix EMS Logo"
        height={120}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to ProMedix EMS</h1>
      <button
        className="px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        onClick={() => navigate("/dashboard")}
      >
        Enter ProMedix EMS
      </button>
    </div>
  );
};

export default LandingPage;
