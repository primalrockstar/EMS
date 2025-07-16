import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Pill, Calculator, WifiOff, Plus, Search, Eye, Download, Edit, Bell, Shield, Users, Briefcase } from "lucide-react";
import { useUserTier } from "@/hooks/useUserTier";
import { useState } from "react";
import { useLocation } from "wouter";
import ProtocolUpload from "@/components/protocol-upload";
import ApgarCalculator from "@/components/apgar-calculator";
import PediatricDoseCalculator from "@/components/pediatric-dose-calculator";
import IVDripCalculator from "@/components/iv-drip-calculator";
import GlasgowComaCalculator from "@/components/glasgow-coma-calculator";
import BMICalculator from "@/components/bmi-calculator";
import CardiacOutputCalculator from "@/components/cardiac-output-calculator";
import BurnSurfaceCalculator from "@/components/burn-surface-calculator";
import OxygenTankCalculator from "@/components/oxygen-tank-calculator";
import EmergencyProtocolsModule from "@/components/emergency-protocols-module";
import QuickAccessWidget from "@/components/quick-access-widget";
import ProtocolSearch from "@/components/protocol-search";
import MedicationInteractionChecker from "@/components/medication-interaction-checker";
import RealTimeAlertSystem from "@/components/real-time-alert-system";
import ProtocolDetailViewer from "@/components/protocol-detail-viewer";

export default function Dashboard() {
  const [showUpload, setShowUpload] = useState(false);
  const [showApgar, setShowApgar] = useState(false);
  const [showPediatricDose, setShowPediatricDose] = useState(false);
  const [showIVDrip, setShowIVDrip] = useState(false);
  const [showGlasgowComa, setShowGlasgowComa] = useState(false);
  
  // Debug state changes
  console.log("Dashboard render - Calculator states:", {
    showApgar, showPediatricDose, showIVDrip, showGlasgowComa
  });
  const [showBMI, setShowBMI] = useState(false);
  const [showCardiacOutput, setShowCardiacOutput] = useState(false);
  const [showBurnSurface, setShowBurnSurface] = useState(false);
  const [showOxygenTank, setShowOxygenTank] = useState(false);
  const [showEmergencyProtocols, setShowEmergencyProtocols] = useState(false);
  const [showProtocolSearch, setShowProtocolSearch] = useState(false);
  const [showMedicationChecker, setShowMedicationChecker] = useState(false);
  const [showAlertSystem, setShowAlertSystem] = useState(false);
  const [selectedProtocolId, setSelectedProtocolId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"EMR" | "EMT" | "AEMT" | "Paramedic">("EMT");
  
  const [, setLocation] = useLocation();
  const { userTier, switchTier, isBasic, isPro } = useUserTier();

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard/stats?userId=1");
      return response.json();
    },
  });

  const { data: protocols, isLoading: protocolsLoading } = useQuery({
    queryKey: ["/api/protocols"],
    queryFn: async () => {
      const response = await fetch("/api/protocols?userId=1");
      return response.json();
    },
  });

  const { data: medications, isLoading: medicationsLoading } = useQuery({
    queryKey: ["/api/medications"],
    queryFn: async () => {
      const response = await fetch("/api/medications");
      return response.json();
    },
  });

  const categoryColors = {
    cardiac: "bg-red-600", // EMS Red for cardiac emergencies
    respiratory: "bg-blue-600", // ProMedix Blue for respiratory
    trauma: "bg-orange-600", // Warning Orange for trauma
    pediatric: "bg-purple-600", // Purple for pediatric care
    neurological: "bg-green-600", // Success Green for neurological
    toxicology: "bg-yellow-600", // Caution Yellow for toxicology
    operations: "bg-gray-600", // Neutral Gray for operations
    adult_treatment: "bg-blue-600", // ProMedix Blue for adult treatment
    adult_pediatric: "bg-purple-600", // Purple for combined care
  };

  console.log("Dashboard background class:", "bg-background", "for tier:", userTier);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-foreground">
        {/* Dashboard Overview */}
        <div className="mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="mt-3 text-muted-foreground text-lg">
                Welcome back! Here's your ProMedix EMS overview.
              </p>
              <div className="mt-4">
                <Badge 
                  variant={isBasic ? "default" : "secondary"} 
                  className={`${isBasic ? "bg-gradient-to-r from-primary to-primary/80" : "bg-gradient-to-r from-secondary to-secondary/80"} text-white px-4 py-2 text-sm font-semibold shadow-lg`}
                >
                  {isBasic ? "Basic Mode - Educational Tools" : "Pro Mode - Field Professional Tools"}
                </Badge>
              </div>
            </div>
            
            {/* Mode Selection */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Mode:</span>
              <div className="flex rounded-xl p-1.5 bg-muted/50 backdrop-blur-sm border border-border/50">
                <Button
                  variant={isBasic ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    console.log("Switching to basic mode");
                    switchTier('basic');
                    setLocation('/');
                  }}
                  className={isBasic ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md" : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"}
                >
                  <Users className="h-4 w-4 mr-1" />
                  Basic
                </Button>
                <Button
                  variant={isPro ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    console.log("Switching to pro mode");
                    switchTier('pro');
                    setLocation('/pro');
                  }}
                  className={isPro ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md" : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"}
                >
                  <Briefcase className="h-4 w-4 mr-1" />
                  Pro
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-4 bg-primary/20 rounded-2xl group-hover:bg-primary/30 transition-colors duration-300">
                  <FileText className="h-7 w-7 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground font-medium">My Protocols</p>
                  <p className="text-3xl font-bold text-foreground">
                    {statsLoading ? "..." : stats?.myProtocols || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-secondary/10 to-secondary/5 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-4 bg-secondary/20 rounded-2xl group-hover:bg-secondary/30 transition-colors duration-300">
                  <Pill className="h-7 w-7 text-secondary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground font-medium">Medications</p>
                  <p className="text-3xl font-bold text-foreground">
                    {statsLoading ? "..." : stats?.medications || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-4 bg-orange-500/20 rounded-2xl group-hover:bg-orange-500/30 transition-colors duration-300">
                  <Calculator className="h-7 w-7 text-orange-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground font-medium">Calculators</p>
                  <p className="text-3xl font-bold text-foreground">
                    {statsLoading ? "..." : stats?.calculators || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-green-500/5 hover:shadow-xl transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-4 bg-green-500/20 rounded-2xl group-hover:bg-green-500/30 transition-colors duration-300">
                  <WifiOff className="h-7 w-7 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-muted-foreground font-medium">Offline Ready</p>
                  <p className="text-3xl font-bold text-foreground">
                    {statsLoading ? "..." : stats?.offlineReady || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions & Enhanced Features */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Quick Actions & Enhanced Features</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Protocol Search */}
                <Card className="border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors cursor-pointer bg-blue-50/50 dark:bg-blue-900/20" onClick={() => setShowProtocolSearch(true)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary rounded-full">
                        <Search className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary dark:text-primary">Protocol Search</h3>
                        <p className="text-sm text-primary/70 dark:text-primary/80">Advanced search with decision-tree navigation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Field Calculators */}
                <Card className="border-2 border-dashed border-orange-300 hover:border-orange-500 transition-colors cursor-pointer bg-orange-50/50 dark:bg-orange-900/20" onClick={() => setLocation('/calculators')}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-600 rounded-full">
                        <Calculator className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-orange-700 dark:text-orange-300">Field Calculators</h3>
                        <p className="text-sm text-orange-600 dark:text-orange-400">Essential medical calculations</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Medication Lookup */}
                <Card className="border-2 border-dashed border-red-300 hover:border-red-500 transition-colors cursor-pointer bg-red-50/50 dark:bg-red-900/20" onClick={() => setLocation('/medications')}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-secondary rounded-full">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary dark:text-secondary">Medication Lookup</h3>
                        <p className="text-sm text-secondary/70 dark:text-secondary/80">Quick drug reference and dosing</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Protocols */}
                <Card className="border-2 border-dashed border-green-300 hover:border-green-500 transition-colors cursor-pointer bg-green-50/50 dark:bg-green-900/20" onClick={() => setShowEmergencyProtocols(true)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-600 rounded-full">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-green-700 dark:text-green-300">Emergency Protocols</h3>
                        <p className="text-sm text-green-600 dark:text-green-400">Access critical care protocols instantly</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Protocol Upload */}
                <Card className="border-2 border-dashed border-purple-300 hover:border-purple-500 transition-colors cursor-pointer bg-purple-50/50 dark:bg-purple-900/20" onClick={() => setShowUpload(true)}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-600 rounded-full">
                        <Plus className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-purple-700 dark:text-purple-300">Protocol Upload</h3>
                        <p className="text-sm text-purple-600 dark:text-purple-400">Add custom protocols</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Medications */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Recent Medications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {medicationsLoading ? (
                    <div className="text-center py-4 text-muted-foreground">Loading medications...</div>
                  ) : (
                    medications?.slice(0, 6).map((medication: any) => (
                      <Card 
                        key={medication.id} 
                        className="hover:shadow-md transition-shadow cursor-pointer hover:bg-muted/50"
                        onClick={() => setLocation(`/medications?search=${encodeURIComponent(medication.name)}`)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-primary">{medication.name}</h4>
                              <p className="text-xs text-muted-foreground">{medication.scope}</p>
                              {medication.indication && (
                                <p className="text-xs text-secondary mt-1 truncate">{medication.indication}</p>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs ml-2">
                              {medication.category}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Role Selection */}
          <Card>
            <CardHeader>
              <CardTitle>User Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={userRole} onValueChange={(value: "EMR" | "EMT" | "AEMT" | "Paramedic") => setUserRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EMR">EMR - Emergency Medical Responder</SelectItem>
                  <SelectItem value="EMT">EMT - Emergency Medical Technician</SelectItem>
                  <SelectItem value="AEMT">AEMT - Advanced Emergency Medical Technician</SelectItem>
                  <SelectItem value="Paramedic">Paramedic</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Quick Access Widget */}
          <QuickAccessWidget 
            userRole={userRole}
            userTier={userTier}
            onProtocolClick={(protocolId) => {
              console.log("Open protocol:", protocolId);
              setShowEmergencyProtocols(true);
            }}
            onCalculatorClick={(calculatorType) => {
              console.log("Calculator clicked:", calculatorType);
              switch(calculatorType) {
                case "apgar":
                  console.log("Opening APGAR calculator");
                  console.log("Current showApgar state:", showApgar);
                  setShowApgar(true);
                  console.log("Set showApgar to true");
                  break;
                case "pediatric-dose":
                  console.log("Opening Pediatric Dose calculator");
                  setShowPediatricDose(true);
                  break;
                case "iv-drip":
                  console.log("Opening IV Drip calculator");
                  setShowIVDrip(true);
                  break;
                case "glasgow-coma":
                  console.log("Opening Glasgow Coma calculator");
                  setShowGlasgowComa(true);
                  break;
                case "bmi":
                  console.log("Opening BMI calculator");
                  setShowBMI(true);
                  break;
                case "cardiac-output":
                  console.log("Opening Cardiac Output calculator");
                  setShowCardiacOutput(true);
                  break;
                case "burn-surface":
                  console.log("Opening Burn Surface calculator");
                  setShowBurnSurface(true);
                  break;
                case "oxygen-tank":
                  console.log("Opening Oxygen Tank calculator");
                  setShowOxygenTank(true);
                  break;
                default:
                  console.log("Unknown calculator type:", calculatorType);
                  break;
              }
            }}
          />

          {/* Real-Time Alert System */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Real-Time Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setShowAlertSystem(true)}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
              >
                <Bell className="h-4 w-4 mr-2" />
                View Active Alerts
              </Button>
            </CardContent>
          </Card>

          {/* Quick Calculators */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Calculators</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-3">
              <Button 
                className="btn-ems-primary h-auto p-4 justify-start"
                onClick={() => setShowApgar(true)}
              >
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">APGAR Score</div>
                    <div className="text-sm opacity-90">Newborn assessment</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="btn-ems-emergency h-auto p-4 justify-start"
                onClick={() => setShowPediatricDose(true)}
              >
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Pediatric Dose</div>
                    <div className="text-sm opacity-90">Weight-based dosing</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-green-500 text-white hover:bg-green-500/90 h-auto p-4 justify-start"
                onClick={() => setShowIVDrip(true)}
              >
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">IV Drip Rate</div>
                    <div className="text-sm opacity-90">Fluid calculations</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-red-500 text-white hover:bg-red-500/90 h-auto p-4 justify-start"
                onClick={() => setShowEmergencyProtocols(true)}
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Emergency Protocols</div>
                    <div className="text-sm opacity-90">EMS protocols by scope</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-blue-500 text-white hover:bg-blue-500/90 h-auto p-4 justify-start"
                onClick={() => setShowProtocolSearch(true)}
              >
                <div className="flex items-center">
                  <Search className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Protocol Search</div>
                    <div className="text-sm opacity-90">Find protocols quickly</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-pink-500 text-white hover:bg-pink-500/90 h-auto p-4 justify-start"
                onClick={() => setShowMedicationChecker(true)}
              >
                <div className="flex items-center">
                  <Pill className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Medication Checker</div>
                    <div className="text-sm opacity-90">Drug interactions</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-purple-500 text-white hover:bg-purple-500/90 h-auto p-4 justify-start"
                onClick={() => setShowGlasgowComa(true)}
              >
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Glasgow Coma Scale</div>
                    <div className="text-sm opacity-90">Neurological assessment</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-teal-500 text-white hover:bg-teal-500/90 h-auto p-4 justify-start"
                onClick={() => setShowBMI(true)}
              >
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">BMI Calculator</div>
                    <div className="text-sm opacity-90">Body mass index</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-indigo-500 text-white hover:bg-indigo-500/90 h-auto p-4 justify-start"
                onClick={() => setShowCardiacOutput(true)}
              >
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Cardiac Output</div>
                    <div className="text-sm opacity-90">Hemodynamic calculations</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-orange-500 text-white hover:bg-orange-500/90 h-auto p-4 justify-start"
                onClick={() => setShowBurnSurface(true)}
              >
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Burn Surface Area</div>
                    <div className="text-sm opacity-90">Rule of Nines</div>
                  </div>
                </div>
              </Button>

              <Button 
                className="bg-cyan-500 text-white hover:bg-cyan-500/90 h-auto p-4 justify-start"
                onClick={() => setShowOxygenTank(true)}
              >
                <div className="flex items-center">
                  <Calculator className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Oxygen Tank Duration</div>
                    <div className="text-sm opacity-90">Tank calculations</div>
                  </div>
                </div>
              </Button>

              {/* Pro Mode Quick Access */}
              {isPro && (
                <Button 
                  className="bg-purple-500 text-white hover:bg-purple-500/90 h-auto p-4 justify-start"
                  onClick={() => window.location.href = '/pro'}
                >
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Pro Field Tools</div>
                      <div className="text-sm opacity-90">Advanced professional tools</div>
                    </div>
                  </div>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Recent Medications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Medications</CardTitle>
            </CardHeader>
            <CardContent>
              {medicationsLoading ? (
                <div className="text-center py-4">Loading medications...</div>
              ) : (
                <div className="space-y-3">
                  {Array.isArray(medications) ? (
                    medications.slice(0, 3).map((medication: any) => (
                      <div key={medication.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium">{medication.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {medication.indications?.[0]} • {medication.adultDose}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">No medications available</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

      {/* Modals */}
      <ProtocolUpload open={showUpload} onOpenChange={setShowUpload} />
      <ApgarCalculator open={showApgar} onOpenChange={setShowApgar} />
      <PediatricDoseCalculator open={showPediatricDose} onOpenChange={setShowPediatricDose} />
      <IVDripCalculator open={showIVDrip} onOpenChange={setShowIVDrip} />
      <GlasgowComaCalculator open={showGlasgowComa} onOpenChange={setShowGlasgowComa} />
      <BMICalculator open={showBMI} onOpenChange={setShowBMI} />
      <CardiacOutputCalculator open={showCardiacOutput} onOpenChange={setShowCardiacOutput} />
      <BurnSurfaceCalculator open={showBurnSurface} onOpenChange={setShowBurnSurface} />
      <OxygenTankCalculator open={showOxygenTank} onOpenChange={setShowOxygenTank} />
      <EmergencyProtocolsModule open={showEmergencyProtocols} onOpenChange={setShowEmergencyProtocols} />
      <ProtocolSearch open={showProtocolSearch} onOpenChange={setShowProtocolSearch} />
      <MedicationInteractionChecker open={showMedicationChecker} onOpenChange={setShowMedicationChecker} />
      <RealTimeAlertSystem open={showAlertSystem} onOpenChange={setShowAlertSystem} />
      <ProtocolDetailViewer 
        protocolId={selectedProtocolId} 
        open={!!selectedProtocolId} 
        onOpenChange={(open) => !open && setSelectedProtocolId(null)} 
      />
    </div>
  );
}
