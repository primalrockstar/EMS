import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "650+ Study Cards", description: "Comprehensive flashcards across all EMS categories", icon: "📖" },
  { title: "Interactive Scenarios", description: "40+ real-world emergency training cases", icon: "❤️" },
  { title: "Medication Reference", description: "Complete drug database with dosing information", icon: "💊" },
  { title: "15 Medical Calculators", description: "Essential tools for field calculations", icon: "🧮" },
  { title: "Protocol Assistant", description: "AI-powered protocol guidance with voice control", icon: "🤖" },
  { title: "Clark County Protocols", description: "Official EMS protocols for Las Vegas region", icon: "📜" },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-700 to-red-500">
      <div className="w-full max-w-4xl mx-auto text-center mt-16">
        <h1 className="text-white text-6xl font-extrabold mb-2">ProMedix EMS</h1>
        <div className="text-white text-lg mb-1">© 2025 ProMedix EMS</div>
        <h2 className="text-white text-2xl font-semibold mb-4">
          Professional Emergency Medical Services Training
        </h2>
        <p className="text-white mb-8">
          ProMedix EMS is a comprehensive training platform for EMT, AEMT, and Paramedic certification levels.
          Features interactive scenarios, medication references, Clark County protocols, and advanced study tools for emergency medical professionals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {features.map(({ title, description, icon }) => (
            <div key={title} className="bg-white bg-opacity-20 rounded-lg p-6 shadow text-white">
              <div className="text-4xl mb-2">{icon}</div>
              <div className="font-bold text-lg mb-1">{title}</div>
              <div className="text-sm">{description}</div>
            </div>
          ))}
        </div>
        <button
          className="mt-4 px-6 py-3 bg-white text-red-600 font-semibold rounded shadow hover:bg-red-100 transition"
          onClick={() => navigate("/dashboard")}
        >
          Enter ProMedix EMS
        </button>
        <footer className="mt-6 text-white text-xs flex flex-col items-center gap-1">
          <span>Created by Shaun Williamson</span>
          <span>Las Vegas, Nevada</span>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
