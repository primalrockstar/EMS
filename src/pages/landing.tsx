import React from 'react';
import { 
  Heart, 
  Shield, 
  Clock, 
  Users, 
  Phone, 
  FileText 
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Patient Care Management",
      description: "Comprehensive patient tracking and care coordination tools"
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Secure Data Protection",
      description: "HIPAA-compliant security ensuring patient data privacy"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Real-time Monitoring",
      description: "24/7 patient monitoring with instant alerts and notifications"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Team Collaboration",
      description: "Seamless communication between medical staff and departments"
    },
    {
      icon: <Phone className="w-8 h-8 text-white" />,
      title: "Emergency Response",
      description: "Rapid emergency coordination and response management"
    },
    {
      icon: <FileText className="w-8 h-8 text-white" />,
      title: "Digital Documentation",
      description: "Paperless medical records and automated reporting systems"
    }
  ];

  const handleEnterSystem = () => {
    // Replace this with your actual navigation logic
    // Examples:
    // navigate('/dashboard'); // for React Router
    // window.location.href = '/dashboard'; // for direct navigation
    // router.push('/dashboard'); // for Next.js
    
    alert('Welcome to ProMedix EMS! Replace this alert with your navigation logic.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-900">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          {/* Logo - Professional text-based placeholder */}
          <div className="h-12 mb-8 flex justify-center">
            <div className="bg-white/20 px-6 py-3 rounded-lg border border-white/30 backdrop-blur-sm">
              <span className="text-white font-bold text-2xl tracking-wide">ProMedix EMS</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Emergency Medical
            <br />
            <span className="text-red-200">Management System</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-red-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Advanced healthcare management platform designed for emergency medical services, 
            hospitals, and healthcare facilities.
          </p>
          
          {/* CTA Button */}
          <button 
            onClick={handleEnterSystem}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-10 rounded-lg border border-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm text-lg"
          >
            Enter ProMedix EMS
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="bg-red-500/30 p-3 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-red-100 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <p className="text-red-200 text-lg">
            Trusted by healthcare professionals worldwide
          </p>
          <div className="mt-8 flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-red-200">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-red-200">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">HIPAA</div>
              <div className="text-red-200">Compliant</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
