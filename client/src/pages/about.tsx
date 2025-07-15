import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LegalDisclaimer from "@/components/legal-disclaimer";
import { 
  Heart, 
  Users, 
  Shield, 
  Award, 
  MapPin, 
  BookOpen, 
  Calculator,
  FileText,
  Smartphone,
  Lock,
  Globe,
  Stethoscope,
  AlertTriangle,
  Info
} from "lucide-react";

export default function About() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "41 Study Chapters",
      description: "Complete Emergency Care and Transportation reference"
    },
    {
      icon: Calculator,
      title: "Medical Calculators",
      description: "Pediatric/Adult Dosing, GCS, IV Fluid, Cardiac Timing"
    },
    {
      icon: FileText,
      title: "Custom Protocols",
      description: "Upload and customize state/locality guidelines"
    },
    {
      icon: Users,
      title: "Scope-Specific",
      description: "Tailored for EMR, EMT, AEMT, and Paramedic levels"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Responsive design for field and classroom use"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Encrypted data and biometric authentication"
    }
  ];

  const keyCalculators = [
    "Pediatric Medication Dosing",
    "Adult Medication Dosing", 
    "Glasgow Coma Scale (GCS)",
    "IV Fluid Resuscitation",
    "Cardiac Arrest Drug Timing",
    "Stroke Scale Assessment"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">About ProMedixEMS</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Empowering EMS Excellence Through Innovation and Accessibility
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                ProMedixEMS is a powerful, user-friendly mobile application designed to empower Emergency Medical Services (EMS) 
                students and professionals with essential tools for education and life-saving care. Created by Shaun Williamson, 
                an EMS student at Guardian Elite Medical Services in Las Vegas, Nevada, ProMedixEMS reflects a deep commitment to 
                advancing EMS excellence through innovation and accessibility.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Born from Shaun's passion for emergency medical care and his hands-on experience as a student, ProMedixEMS bridges 
                the gap between classroom learning and high-stakes field practice. The app offers 41 chapters of study notes, 
                interactive calculators, and scope-specific protocols tailored for EMR, EMT, AEMT, and Paramedic levels.
              </p>
            </CardContent>
          </Card>

          {/* Creator Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Created by Shaun Williamson
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">EMS Student at Guardian Elite Medical Services, Las Vegas, Nevada</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Shaun's dedication to EMS excellence drives every feature of ProMedixEMS. As an active EMS student, he understands 
                the challenges faced by both students and professionals in the field, creating solutions that address real-world needs 
                while maintaining the highest standards of medical accuracy and safety.
              </p>
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Enhanced Learning:</strong> Comprehensive EMS protocols and evidence-based guidelines, 
                  providing thorough educational content for all certification levels.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-green-600" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Medical Calculators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                Essential Medical Calculators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {keyCalculators.map((calculator, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">{calculator}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                All calculators are designed to support field decision-making and follow established medical protocols, 
                with special integration for Clark County EMS guidelines.
              </p>
            </CardContent>
          </Card>

          {/* Tiers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                Service Levels
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-600 text-white">Basic</Badge>
                    <span className="text-sm text-gray-600">For Students</span>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Study aids and reference materials</li>
                    <li>• Interactive simulations and learning modules</li>
                    <li>• Protocol practice scenarios</li>
                    <li>• Educational calculators and tools</li>
                    <li>• Flashcards and study notes</li>
                  </ul>
                </div>
                <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-orange-600 text-white">Pro</Badge>
                    <span className="text-sm text-gray-600">For Professionals</span>
                  </div>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Field-ready protocol references</li>
                    <li>• Professional medication database</li>
                    <li>• Advanced medical calculators</li>
                    <li>• Offline access capabilities</li>
                    <li>• Custom protocol management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Excellence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-gray-600" />
                Technical Excellence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Developed using React and TypeScript with a modern blue/white interface, ProMedixEMS prioritizes intuitive navigation, 
                accessibility (voice-over, multilingual support), and security (encrypted data, biometric authentication). The app is 
                built for seamless use in any environment—from the classroom to the ambulance.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Globe className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Accessibility</h4>
                  <p className="text-xs text-gray-600">Voice-over & multilingual support</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Security</h4>
                  <p className="text-xs text-gray-600">Encrypted data & biometric auth</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Smartphone className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">Mobile First</h4>
                  <p className="text-xs text-gray-600">Optimized for field use</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Legal Disclaimer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Important Legal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Medical Disclaimer:</strong> ProMedixEMS is for educational and reference use only. 
                  It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult 
                  a qualified medical professional and follow local EMS protocols.
                </AlertDescription>
              </Alert>
              <div className="text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDisclaimer(true)}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  View Complete Legal Disclaimer
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Closing */}
          <div className="text-center py-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Designed with Dedication</h3>
              <p className="text-blue-100 mb-4">
                Created by Shaun Williamson for the EMS community
              </p>
              <p className="text-sm text-blue-200">
                ProMedixEMS: Empowering EMS Excellence Through Innovation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Disclaimer Modal */}
      <LegalDisclaimer 
        open={showDisclaimer} 
        onOpenChange={setShowDisclaimer} 
      />
    </div>
  );
}