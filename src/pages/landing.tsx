import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Calculator, Pill, MessageSquare, Badge, User, MapPin } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15);

  useEffect(() => {
    // Countdown timer for the visible counter
    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [secondsLeft]);

  useEffect(() => {
    // Auto-redirect after 15 seconds if no interaction
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 15000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleEnterApp = () => {
    setIsAnimating(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 300);
  };

  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "650+ Study Cards",
      description: "Comprehensive flashcards across all EMS categories"
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Interactive Scenarios",
      description: "40+ real-world emergency training cases"
    },
    {
      icon: <Pill className="h-6 w-6" />,
      title: "Medication Reference",
      description: "Complete drug database with dosing information"
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      title: "15 Medical Calculators",
      description: "Essential tools for field calculations"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Protocol Assistant",
      description: "AI-powered protocol guidance with voice control"
    },
    {
      icon: <Badge className="h-6 w-6" />,
      title: "Clark County Protocols",
      description: "Official EMS protocols for Las Vegas region"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="max-w-4xl w-full text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="text-6xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
                ProMedix EMS
              </div>
            </div>
            <div className="text-sm opacity-80 mb-2">© 2025 ProMedix EMS</div>
            <div className="text-2xl font-semibold mb-4">
              Professional Emergency Medical Services Training
            </div>
            <div className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              ProMedix EMS is a comprehensive training platform for EMT, AEMT, and Paramedic certification levels. 
              Features interactive scenarios, medication references, Clark County protocols, 
              and advanced study tools for emergency medical professionals.
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4 text-white">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mb-8">
            <Button 
              size="lg"
              className={`bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-300 ${
                isAnimating ? 'scale-95 opacity-75' : 'hover:scale-105'
              }`}
              onClick={handleEnterApp}
            >
              Enter ProMedix EMS
            </Button>
          </div>

          {/* Countdown */}
          <div className="mt-4 text-white text-center text-sm opacity-80">
            Redirecting to the basic homepage in {secondsLeft} second{secondsLeft !== 1 ? "s" : ""}...
          </div>

          {/* Developer Info */}
          <div className="text-center opacity-75 text-sm mt-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="h-4 w-4" />
              <span>Created by Shaun Williamson</span>
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
              <MapPin className="h-4 w-4" />
              <span>Las Vegas, Nevada</span>
            </div>
            <div className="text-xs">
              © 2025 ProMedix EMS. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
