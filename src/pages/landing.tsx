import React from "react";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    { title: "650+ Study Cards", description: "Comprehensive flashcards across all EMS categories", icon: "📖" },
    { title: "Interactive Scenarios", description: "40+ real-world emergency training cases", icon: "❤️" },
    { title: "Medication Reference", description: "Complete drug database with dosing information", icon: "💊" },
    { title: "15 Medical Calculators", description: "Essential tools for field calculations", icon: "🧮" },
    { title: "Protocol Assistant", description: "AI-powered protocol guidance with voice control", icon: "🤖" },
    { title: "Clark County Protocols", description: "Official EMS protocols for Las Vegas region", icon: "📜" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-red-700 to-red-500">
      {/* Background Pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>
      
      <div className="relative w-full max-w-6xl mx-auto text-center px-4 mt-16">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="/client/public/emslogo.png" 
            alt="ProMedix EMS Logo" 
            className="h-16 w-auto mx-auto filter brightness-0 invert opacity-90"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.createElement('div');
              fallback.innerHTML = '<span class="text-5xl font-bold text-white">⚡</span>';
              e.currentTarget.parentNode?.appendChild(fallback);
            }}
          />
        </div>

        {/* Main Title */}
        <h1 className="text-white text-6xl md:text-7xl font-extrabold mb-2 drop-shadow-lg">
          ProMedix EMS
        </h1>
        
        <div className="text-white text-lg mb-1 opacity-80">© 2025 ProMedix EMS</div>
        
        <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6 drop-shadow-md">
          Professional Emergency Medical Services Training
        </h2>
        
        <p className="text-white mb-12 max-w-4xl mx-auto text-lg leading-relaxed drop-shadow-sm opacity-90">
          ProMedix EMS is a comprehensive training platform for EMT, AEMT, and Paramedic certification levels.
          Features interactive scenarios, medication references, Clark County protocols, and advanced study tools for emergency medical professionals.
        </p>
        
        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map(({ title, description, icon }) => (
            <div 
              key={title} 
              className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 shadow-xl text-white transform hover:scale-105 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20"
            >
              <div className="text-5xl mb-4 drop-shadow-lg">{icon}</div>
              <div className="font-bold text-xl mb-3 drop-shadow-md">{title}</div>
              <div className="text-sm leading-relaxed opacity-90 drop-shadow-sm">{description}</div>
            </div>
          ))}
        </div>
        
        {/* Enhanced CTA Button */}
        <button
          className="mt-6 px-10 py-4 bg-white text-red-600 font-bold text-lg rounded-lg shadow-xl hover:bg-red-50 hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          onClick={() => navigate("/dashboard")}
        >
          Enter ProMedix EMS
        </button>
        
        {/* Enhanced Footer */}
        <footer className="mt-10 text-white text-sm flex flex-col items-center gap-2 opacity-80">
          <span className="font-semibold">Created by Shaun Williamson</span>
          <span>Las Vegas, Nevada</span>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
