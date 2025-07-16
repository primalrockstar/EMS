import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Briefcase, 
  FileText, 
  Calculator, 
  Pill, 
  Shield, 
  Clock, 
  AlertTriangle,
  Target,
  Stethoscope,
  Activity,
  Heart,
  Users,
  Search,
  Filter,
  Star,
  Bookmark,
  Download,
  Upload,
  Settings,
  Bell,
  CheckCircle,
  XCircle,
  Info,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Archive,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Database,
  Cloud,
  Lock,
  Key,
  User,
  Building,
  Truck,
  Radio,
  Headphones,
  Wifi,
  Signal,
  Battery,
  Thermometer,
  Gauge,
  Timer,
  Stopwatch,
  ClipboardList,
  Clipboard,
  ClipboardCheck,
  ClipboardCopy,
  ClipboardPaste,
  FileInput,
  FileOutput,
  FilePlus,
  FileX,
  Folder,
  FolderOpen,
  FolderPlus,
  Save,
  Edit,
  Trash2,
  RotateCcw,
  RefreshCw,
  Share2,
  Link,
  Copy,
  Paste,
  Cut,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Move,
  Resize,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Rewind,
  FastForward,
  Baby,
  Wind,
  Droplets,
  Flame,
  Brain,
  Plus
} from "lucide-react";
import { useUserTier } from "@/hooks/useUserTier";
import { useLocation } from "wouter";
import ApgarCalculator from "@/components/apgar-calculator";
import PediatricDoseCalculator from "@/components/pediatric-dose-calculator";
import IVDripCalculator from "@/components/iv-drip-calculator";
import GlasgowComaCalculator from "@/components/glasgow-coma-calculator";
import CardiacOutputCalculator from "@/components/cardiac-output-calculator";
import BurnSurfaceCalculator from "@/components/burn-surface-calculator";
import OxygenTankCalculator from "@/components/oxygen-tank-calculator";
import BMICalculator from "@/components/bmi-calculator";
import ShockIndexCalculator from "@/components/shock-index-calculator";
import MAPCalculator from "@/components/map-calculator";
import PediatricWeightEstimator from "@/components/pediatric-weight-estimator";
import MinuteVentilationCalculator from "@/components/minute-ventilation-calculator";
import StrokeScaleCalculator from "@/components/stroke-scale-calculator";
import AnionGapCalculator from "@/components/anion-gap-calculator";
import ParklandFormulaCalculator from "@/components/parkland-formula-calculator";

export default function Pro() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [protocolFilter, setProtocolFilter] = useState("");
  const [medicationFilter, setMedicationFilter] = useState("");
  const [calculatorFilter, setCalculatorFilter] = useState("");
  const [selectedProtocol, setSelectedProtocol] = useState<any>(null);
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const [selectedCalculator, setSelectedCalculator] = useState<any>(null);
  
  // Calculator modal states
  const [showApgar, setShowApgar] = useState(false);
  const [showPediatricDose, setShowPediatricDose] = useState(false);
  const [showIVDrip, setShowIVDrip] = useState(false);
  const [showGlasgowComa, setShowGlasgowComa] = useState(false);
  const [showCardiacOutput, setShowCardiacOutput] = useState(false);
  const [showBurnSurface, setShowBurnSurface] = useState(false);
  const [showOxygenTank, setShowOxygenTank] = useState(false);
  const [showBMI, setShowBMI] = useState(false);
  const [showShockIndex, setShowShockIndex] = useState(false);
  const [showMAP, setShowMAP] = useState(false);
  const [showPediatricWeight, setShowPediatricWeight] = useState(false);
  const [showMinuteVentilation, setShowMinuteVentilation] = useState(false);
  const [showStrokeScale, setShowStrokeScale] = useState(false);
  const [showAnionGap, setShowAnionGap] = useState(false);
  const [showParklandFormula, setShowParklandFormula] = useState(false);
  const [showProtocolDetail, setShowProtocolDetail] = useState(false);
  const [showMedicationDetail, setShowMedicationDetail] = useState(false);
  const [showProtocolUpload, setShowProtocolUpload] = useState(false);
  const [showProtocolSearch, setShowProtocolSearch] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showEquipmentChecklist, setShowEquipmentChecklist] = useState(false);
  const [showBatteryStatus, setShowBatteryStatus] = useState(false);
  const [showQualityMetrics, setShowQualityMetrics] = useState(false);
  const [showLocationServices, setShowLocationServices] = useState(false);
  const [showFieldReferences, setShowFieldReferences] = useState(false);
  const [showProtocolUploadModal, setShowProtocolUploadModal] = useState(false);
  const [showIncidentReports, setShowIncidentReports] = useState(false);
  const [showAlertSystem, setShowAlertSystem] = useState(false);
  const [showShiftScheduler, setShowShiftScheduler] = useState(false);
  const [showMaintenanceLog, setShowMaintenanceLog] = useState(false);
  const [showDataSync, setShowDataSync] = useState(false);
  const [showExportProtocols, setShowExportProtocols] = useState(false);
  const [showCaseArchives, setShowCaseArchives] = useState(false);
  const [showPerformanceAnalytics, setShowPerformanceAnalytics] = useState(false);
  const [showPerformanceTrends, setShowPerformanceTrends] = useState(false);
  const [showComplianceTracking, setShowComplianceTracking] = useState(false);
  
  const { userTier, switchTier, isBasic, isPro } = useUserTier();
  const [, setLocation] = useLocation();

  // Fetch professional protocols
  const { data: protocols } = useQuery({
    queryKey: ["/api/protocols"],
    enabled: isPro,
  });

  // Fetch medications
  const { data: medications } = useQuery({
    queryKey: ["/api/medications"],
    enabled: isPro,
  });

  // Fetch calculator results history
  const { data: calculatorResults } = useQuery({
    queryKey: ["/api/calculator-results"],
    enabled: isPro,
  });

  // Filter functions
  const filteredProtocols = protocols?.filter((protocol: any) => 
    protocol.name.toLowerCase().includes(protocolFilter.toLowerCase()) ||
    protocol.category?.toLowerCase().includes(protocolFilter.toLowerCase())
  ) || [];

  const filteredMedications = medications?.filter((medication: any) => 
    medication.name.toLowerCase().includes(medicationFilter.toLowerCase()) ||
    medication.category?.toLowerCase().includes(medicationFilter.toLowerCase())
  ) || [];

  const professionalCalculators = [
    {
      id: "cardiac-output",
      name: "Cardiac Output Calculator",
      description: "Calculate cardiac output using heart rate and stroke volume",
      category: "Cardiovascular",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-red-500"
    },
    {
      id: "iv-drip-rate",
      name: "IV Drip Rate Calculator",
      description: "Calculate IV drip rates for accurate medication delivery",
      category: "Medication",
      icon: <Activity className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      id: "burn-surface-area",
      name: "Burn Surface Area Calculator",
      description: "Calculate burn surface area using Rule of Nines",
      category: "Trauma",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-orange-500"
    },
    {
      id: "glasgow-coma-scale",
      name: "Glasgow Coma Scale",
      description: "Assess neurological function and consciousness level",
      category: "Neurological",
      icon: <Stethoscope className="h-5 w-5" />,
      color: "bg-purple-500"
    },
    {
      id: "oxygen-tank-duration",
      name: "Oxygen Tank Duration",
      description: "Calculate remaining oxygen supply duration",
      category: "Respiratory",
      icon: <Gauge className="h-5 w-5" />,
      color: "bg-green-500"
    },
    {
      id: "pediatric-dose",
      name: "Pediatric Dose Calculator",
      description: "Weight-based medication dosing for pediatric patients",
      category: "Pediatrics",
      icon: <Calculator className="h-5 w-5" />,
      color: "bg-pink-500"
    },
    {
      id: "apgar",
      name: "APGAR Score Calculator",
      description: "Assess newborn condition immediately after birth",
      category: "Pediatrics",
      icon: <Baby className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      id: "bmi",
      name: "BMI Calculator",
      description: "Calculate body mass index and health classification",
      category: "General",
      icon: <Calculator className="h-5 w-5" />,
      color: "bg-teal-500"
    },
    {
      id: "shock-index",
      name: "Shock Index Calculator",
      description: "Assess shock severity using pulse and systolic BP",
      category: "Trauma",
      icon: <Heart className="h-5 w-5" />,
      color: "bg-red-600"
    },
    {
      id: "map",
      name: "MAP Calculator",
      description: "Mean Arterial Pressure for perfusion assessment",
      category: "Cardiovascular",
      icon: <Activity className="h-5 w-5" />,
      color: "bg-blue-600"
    },
    {
      id: "pediatric-weight",
      name: "Pediatric Weight Estimator",
      description: "Estimate weight using age-based formulas",
      category: "Pediatrics",
      icon: <Baby className="h-5 w-5" />,
      color: "bg-pink-600"
    },
    {
      id: "minute-ventilation",
      name: "Minute Ventilation Calculator",
      description: "Calculate tidal volume × respiratory rate",
      category: "Respiratory",
      icon: <Wind className="h-5 w-5" />,
      color: "bg-green-600"
    },
    {
      id: "stroke-scale",
      name: "Stroke Scale Calculator",
      description: "FAST/BE-FAST stroke assessment tool",
      category: "Neurological",
      icon: <Brain className="h-5 w-5" />,
      color: "bg-purple-600"
    },
    {
      id: "anion-gap",
      name: "Anion Gap Calculator",
      description: "Assess acid-base disorders and DKA",
      category: "Metabolic",
      icon: <Droplets className="h-5 w-5" />,
      color: "bg-indigo-600"
    },
    {
      id: "parkland-formula",
      name: "Parkland Formula Calculator",
      description: "Fluid resuscitation for burn patients",
      category: "Burns",
      icon: <Flame className="h-5 w-5" />,
      color: "bg-orange-600"
    }
  ];

  const filteredCalculators = professionalCalculators.filter((calc) => 
    calc.name.toLowerCase().includes(calculatorFilter.toLowerCase()) ||
    calc.category.toLowerCase().includes(calculatorFilter.toLowerCase())
  );

  // Calculator click handler
  const handleCalculatorClick = (calculatorId: string) => {
    switch (calculatorId) {
      case "cardiac-output":
        setShowCardiacOutput(true);
        break;
      case "iv-drip-rate":
        setShowIVDrip(true);
        break;
      case "burn-surface-area":
        setShowBurnSurface(true);
        break;
      case "glasgow-coma-scale":
        setShowGlasgowComa(true);
        break;
      case "oxygen-tank-duration":
        setShowOxygenTank(true);
        break;
      case "pediatric-dose":
        setShowPediatricDose(true);
        break;
      case "apgar":
        setShowApgar(true);
        break;
      case "bmi":
        setShowBMI(true);
        break;
      case "shock-index":
        setShowShockIndex(true);
        break;
      case "map":
        setShowMAP(true);
        break;
      case "pediatric-weight":
        setShowPediatricWeight(true);
        break;
      case "minute-ventilation":
        setShowMinuteVentilation(true);
        break;
      case "stroke-scale":
        setShowStrokeScale(true);
        break;
      case "anion-gap":
        setShowAnionGap(true);
        break;
      case "parkland-formula":
        setShowParklandFormula(true);
        break;
      default:
        console.warn(`Unknown calculator: ${calculatorId}`);
    }
  };

  // Field tool click handler
  const handleFieldToolClick = (tool: string) => {
    console.log(`Field tool clicked: ${tool}`);
    switch (tool) {
      case "protocol-upload":
        setShowProtocolUploadModal(true);
        break;
      case "export-protocols":
        setShowExportProtocols(true);
        break;
      case "edit-protocols":
        alert("Edit Protocols: Custom protocol editor will open in a new window");
        break;
      case "emergency-contacts":
        setShowEmergencyContacts(true);
        break;
      case "incident-reports":
        setShowIncidentReports(true);
        break;
      case "alert-system":
        setShowAlertSystem(true);
        break;
      case "case-archives":
        setShowCaseArchives(true);
        break;
      case "performance-analytics":
        setShowPerformanceAnalytics(true);
        break;
      case "data-sync":
        setShowDataSync(true);
        break;
      case "equipment-checklist":
        setShowEquipmentChecklist(true);
        break;
      case "battery-status":
        setShowBatteryStatus(true);
        break;
      case "maintenance-log":
        setShowMaintenanceLog(true);
        break;
      case "quality-metrics":
        setShowQualityMetrics(true);
        break;
      case "performance-trends":
        setShowPerformanceTrends(true);
        break;
      case "compliance-tracking":
        setShowComplianceTracking(true);
        break;
      case "location-services":
        setShowLocationServices(true);
        break;
      case "shift-scheduler":
        setShowShiftScheduler(true);
        break;
      case "field-references":
        setShowFieldReferences(true);
        break;
      default:
        alert(`${tool} feature will be available in a future update`);
        break;
    }
  };

  // Professional dashboard stats
  const dashboardStats = [
    {
      title: "Active Protocols",
      value: protocols?.length || 0,
      icon: <FileText className="h-8 w-8" />,
      color: "bg-blue-500",
      change: "+2 this week"
    },
    {
      title: "Medications",
      value: medications?.length || 0,
      icon: <Pill className="h-8 w-8" />,
      color: "bg-green-500",
      change: "Updated today"
    },
    {
      title: "Calculations",
      value: calculatorResults?.length || 0,
      icon: <Calculator className="h-8 w-8" />,
      color: "bg-purple-500",
      change: "+5 today"
    },
    {
      title: "Field Tools",
      value: 15,
      icon: <Briefcase className="h-8 w-8" />,
      color: "bg-orange-500",
      change: "All active"
    }
  ];

  const quickActions = [
    {
      title: "Emergency Protocols",
      description: "Access critical care protocols instantly",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "bg-red-500 hover:bg-red-600",
      action: () => setSelectedTab("protocols")
    },
    {
      title: "Medication Lookup",
      description: "Quick drug reference and dosing",
      icon: <Pill className="h-6 w-6" />,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => setSelectedTab("medications")
    },
    {
      title: "Field Calculators",
      description: "Essential medical calculations",
      icon: <Calculator className="h-6 w-6" />,
      color: "bg-green-500 hover:bg-green-600",
      action: () => setSelectedTab("calculators")
    },
    {
      title: "Protocol Upload",
      description: "Add custom protocols",
      icon: <Upload className="h-6 w-6" />,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => setSelectedTab("protocols")
    }
  ];

  const recentActivities = [
    {
      action: "Calculated IV drip rate",
      time: "5 minutes ago",
      icon: <Activity className="h-4 w-4" />,
      color: "text-blue-500"
    },
    {
      action: "Accessed cardiac arrest protocol",
      time: "12 minutes ago",
      icon: <Heart className="h-4 w-4" />,
      color: "text-red-500"
    },
    {
      action: "Looked up epinephrine dosing",
      time: "25 minutes ago",
      icon: <Pill className="h-4 w-4" />,
      color: "text-green-500"
    },
    {
      action: "Updated custom protocol",
      time: "1 hour ago",
      icon: <FileText className="h-4 w-4" />,
      color: "text-purple-500"
    }
  ];

  // If user is not in Pro mode, show upgrade prompt
  if (!isPro) {
    return (
      <div className="min-h-screen bg-black" style={{ backgroundColor: '#000000' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <Lock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Pro Mode Required</h2>
              <p className="text-gray-300 mb-6">
                This page contains professional field tools. Switch to Pro mode to access advanced features.
              </p>
              <Button 
                onClick={() => {
                  switchTier('pro');
                  setLocation('/pro');
                }}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Switch to Pro Mode
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Pro Field Tools</h1>
        <p className="text-gray-300">
          Professional EMS tools for field use - No educational content, just essential field tools
        </p>
        
        {/* Mode indicator */}
        <div className="mt-4 flex items-center gap-2">
          <Badge className="bg-secondary text-secondary-foreground">
            <Briefcase className="h-3 w-3 mr-1" />
            Pro Mode Active
          </Badge>
          <Button
            size="sm"
            className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
            onClick={() => {
              switchTier('basic');
              setLocation('/');
            }}
          >
            <Users className="h-3 w-3 mr-1" />
            Switch to Basic
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5 bg-gray-800 border-gray-700">
          <TabsTrigger value="overview" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="protocols" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Protocols</TabsTrigger>
          <TabsTrigger value="medications" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Medications</TabsTrigger>
          <TabsTrigger value="calculators" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Calculators</TabsTrigger>
          <TabsTrigger value="tools" className="text-white data-[state=active]:bg-gray-700 data-[state=active]:text-white">Field Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.change}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg text-white`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Zap className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    onClick={action.action}
                    className={`${action.color} text-white h-24 flex flex-col items-center justify-center space-y-2`}
                  >
                    {action.icon}
                    <div className="text-center">
                      <div className="font-semibold text-sm">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Clock className="h-5 w-5 mr-2" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{activity.action}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <FileText className="h-5 w-5 mr-2" />
                Professional Protocols
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search protocols..."
                  value={protocolFilter}
                  onChange={(e) => setProtocolFilter(e.target.value)}
                  className="max-w-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700 border-b border-gray-600">
                    <tr>
                      <th className="text-left p-4 font-medium text-white">Protocol</th>
                      <th className="text-left p-4 font-medium text-white">Category</th>
                      <th className="text-left p-4 font-medium text-white">State</th>
                      <th className="text-left p-4 font-medium text-white">Updated</th>
                      <th className="text-center p-4 font-medium text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProtocols.map((protocol: any) => (
                      <tr key={protocol.id} className="border-b border-gray-600 hover:bg-gray-700/50 transition-colors">
                        <td className="p-4">
                          <div className="flex flex-col">
                            <div className="font-medium text-white mb-1">{protocol.name}</div>
                            <div className="flex items-center space-x-2 mb-1">
                              {protocol.scope && (
                                <Badge variant="secondary" className="text-xs bg-gray-600 text-gray-300">
                                  {protocol.scope}
                                </Badge>
                              )}
                              {protocol.ageGroup && (
                                <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
                                  {protocol.ageGroup.replace('_', ' & ')}
                                </Badge>
                              )}
                            </div>
                            {protocol.description && (
                              <div className="text-xs text-gray-400 line-clamp-2">
                                {protocol.description}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-blue-600 text-white text-xs">
                            {protocol.category}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-xs border-gray-500 text-gray-300">
                            {protocol.state || "Nevada"}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-gray-400">
                          {new Date(protocol.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-gray-400 hover:text-white hover:bg-gray-600"
                              onClick={() => {
                                setSelectedProtocol(protocol);
                                setShowProtocolDetail(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-600">
                              <Bookmark className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2" />
                Medication Reference
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medications..."
                  value={medicationFilter}
                  onChange={(e) => setMedicationFilter(e.target.value)}
                  className="max-w-sm"
                />
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scopes</SelectItem>
                    <SelectItem value="BLS">BLS</SelectItem>
                    <SelectItem value="ALS">ALS</SelectItem>
                    <SelectItem value="AEMT">AEMT</SelectItem>
                    <SelectItem value="Paramedic">Paramedic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMedications.map((medication: any) => (
                  <Card key={medication.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant="outline" 
                          className={
                            medication.scope === 'BLS' ? 'border-green-500 text-green-500' :
                            medication.scope === 'ALS' ? 'border-blue-500 text-blue-500' :
                            medication.scope === 'AEMT' ? 'border-purple-500 text-purple-500' :
                            'border-red-500 text-red-500'
                          }
                        >
                          {medication.scope}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{medication.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{medication.category}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Dosage:</span>
                          <p className="text-muted-foreground">{medication.dosage}</p>
                        </div>
                        <Button 
                          className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white" 
                          size="sm"
                          onClick={() => {
                            setSelectedMedication(medication);
                            setShowMedicationDetail(true);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculators" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Field Calculators
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search calculators..."
                  value={calculatorFilter}
                  onChange={(e) => setCalculatorFilter(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCalculators.map((calculator) => (
                  <Card key={calculator.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{calculator.category}</Badge>
                        <div className={`${calculator.color} p-2 rounded-lg text-white`}>
                          {calculator.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg">{calculator.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{calculator.description}</p>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white" 
                        size="sm"
                        onClick={() => handleCalculatorClick(calculator.id)}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Open Calculator
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Briefcase className="h-5 w-5 mr-2" />
                Professional Field Tools
              </CardTitle>
              <p className="text-sm text-gray-300">
                Advanced tools for field professionals
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Protocol Management */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-white">
                      <FileText className="h-5 w-5 mr-2" />
                      Protocol Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("protocol-upload")}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Protocol
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("export-protocols")}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Protocols
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("edit-protocols")}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Custom Protocols
                    </Button>
                  </CardContent>
                </Card>

                {/* Communication Tools */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-white">
                      <Radio className="h-5 w-5 mr-2" />
                      Communication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("emergency-contacts")}>
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Contacts
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("incident-reports")}>
                      <Mail className="h-4 w-4 mr-2" />
                      Incident Reports
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("alert-system")}>
                      <Bell className="h-4 w-4 mr-2" />
                      Alert System
                    </Button>
                  </CardContent>
                </Card>

                {/* Data Management */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-white">
                      <Database className="h-5 w-5 mr-2" />
                      Data Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("case-archives")}>
                      <Archive className="h-4 w-4 mr-2" />
                      Case Archives
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("performance-analytics")}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Performance Analytics
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("data-sync")}>
                      <Cloud className="h-4 w-4 mr-2" />
                      Cloud Sync
                    </Button>
                  </CardContent>
                </Card>

                {/* Equipment Tracking */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-white">
                      <Truck className="h-5 w-5 mr-2" />
                      Equipment Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("equipment-checklist")}>
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Equipment Checklist
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("battery-status")}>
                      <Battery className="h-4 w-4 mr-2" />
                      Battery Status
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("maintenance-log")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Maintenance Log
                    </Button>
                  </CardContent>
                </Card>

                {/* Quality Assurance */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-white">
                      <Shield className="h-5 w-5 mr-2" />
                      Quality Assurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("quality-metrics")}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Quality Metrics
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("performance-trends")}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Performance Trends
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("compliance-tracking")}>
                      <Target className="h-4 w-4 mr-2" />
                      Compliance Tracking
                    </Button>
                  </CardContent>
                </Card>

                {/* Reference Tools */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg text-white">
                      <Globe className="h-5 w-5 mr-2" />
                      Reference Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("location-services")}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Location Services
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("shift-scheduler")}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Shift Scheduler
                    </Button>
                    <Button className="w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600" onClick={() => handleFieldToolClick("field-references")}>
                      <Info className="h-4 w-4 mr-2" />
                      Field References
                    </Button>
                  </CardContent>
                </Card>

              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
      
      {/* Calculator Modals */}
      <ApgarCalculator open={showApgar} onOpenChange={setShowApgar} />
      <PediatricDoseCalculator open={showPediatricDose} onOpenChange={setShowPediatricDose} />
      <IVDripCalculator open={showIVDrip} onOpenChange={setShowIVDrip} />
      <GlasgowComaCalculator open={showGlasgowComa} onOpenChange={setShowGlasgowComa} />
      <CardiacOutputCalculator open={showCardiacOutput} onOpenChange={setShowCardiacOutput} />
      <BurnSurfaceCalculator open={showBurnSurface} onOpenChange={setShowBurnSurface} />
      <OxygenTankCalculator open={showOxygenTank} onOpenChange={setShowOxygenTank} />
      <BMICalculator open={showBMI} onOpenChange={setShowBMI} />
      <ShockIndexCalculator open={showShockIndex} onOpenChange={setShowShockIndex} />
      <MAPCalculator open={showMAP} onOpenChange={setShowMAP} />
      <PediatricWeightEstimator open={showPediatricWeight} onOpenChange={setShowPediatricWeight} />
      <MinuteVentilationCalculator open={showMinuteVentilation} onOpenChange={setShowMinuteVentilation} />
      <StrokeScaleCalculator open={showStrokeScale} onOpenChange={setShowStrokeScale} />
      <AnionGapCalculator open={showAnionGap} onOpenChange={setShowAnionGap} />
      <ParklandFormulaCalculator open={showParklandFormula} onOpenChange={setShowParklandFormula} />
      
      {/* Protocol Detail Modal */}
      {selectedProtocol && (
        <Dialog open={showProtocolDetail} onOpenChange={setShowProtocolDetail}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">{selectedProtocol.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Protocol Info */}
              <div className="flex items-center space-x-4">
                <Badge className="bg-blue-600 text-white">
                  {selectedProtocol.category}
                </Badge>
                <Badge variant="outline" className="border-gray-500 text-gray-300">
                  {selectedProtocol.state || "Nevada"}
                </Badge>
                {selectedProtocol.scope && (
                  <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                    {selectedProtocol.scope}
                  </Badge>
                )}
              </div>
              
              {/* Protocol Content */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Protocol Details</h3>
                {selectedProtocol.description && (
                  <p className="text-gray-300 mb-4">{selectedProtocol.description}</p>
                )}
                
                {selectedProtocol.content && (
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-gray-300 text-sm">
                      {selectedProtocol.content}
                    </pre>
                  </div>
                )}
                
                {!selectedProtocol.content && !selectedProtocol.description && (
                  <p className="text-gray-400 italic">No detailed content available for this protocol.</p>
                )}
              </div>
              
              {/* Protocol Actions */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Bookmark
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white" onClick={() => setShowProtocolDetail(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Medication Detail Modal */}
      {selectedMedication && (
        <Dialog open={showMedicationDetail} onOpenChange={setShowMedicationDetail}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-white text-xl">{selectedMedication.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Medication Info */}
              <div className="flex items-center space-x-4">
                <Badge 
                  variant="outline" 
                  className={
                    selectedMedication.scope === 'BLS' ? 'border-green-500 text-green-500' :
                    selectedMedication.scope === 'ALS' ? 'border-blue-500 text-blue-500' :
                    selectedMedication.scope === 'AEMT' ? 'border-purple-500 text-purple-500' :
                    'border-red-500 text-red-500'
                  }
                >
                  {selectedMedication.scope}
                </Badge>
                <Badge className="bg-blue-600 text-white">
                  {selectedMedication.category}
                </Badge>
                {selectedMedication.class && (
                  <Badge variant="secondary" className="bg-gray-600 text-gray-300">
                    {selectedMedication.class}
                  </Badge>
                )}
              </div>
              
              {/* Medication Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dosage Information */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Dosage & Administration</h3>
                  <p className="text-gray-300 text-sm">{selectedMedication.dosage || 'No dosage information available'}</p>
                  {selectedMedication.route && (
                    <div className="mt-2">
                      <span className="text-gray-400 text-sm">Route: </span>
                      <span className="text-gray-300 text-sm">{selectedMedication.route}</span>
                    </div>
                  )}
                </div>
                
                {/* Indications */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Indications</h3>
                  <p className="text-gray-300 text-sm">{selectedMedication.indications || 'No indication information available'}</p>
                </div>
                
                {/* Contraindications */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Contraindications</h3>
                  <p className="text-gray-300 text-sm">{selectedMedication.contraindications || 'No contraindication information available'}</p>
                </div>
                
                {/* Side Effects */}
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Side Effects</h3>
                  <p className="text-gray-300 text-sm">{selectedMedication.sideEffects || 'No side effect information available'}</p>
                </div>
              </div>
              
              {/* Additional Information */}
              {selectedMedication.notes && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Additional Notes</h3>
                  <p className="text-gray-300 text-sm">{selectedMedication.notes}</p>
                </div>
              )}
              
              {/* Medication Actions */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
                  <Star className="h-4 w-4 mr-2" />
                  Favorite
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white" onClick={() => setShowMedicationDetail(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Emergency Contacts Modal */}
      {showEmergencyContacts && (
        <Dialog open={showEmergencyContacts} onOpenChange={setShowEmergencyContacts}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Emergency Contacts</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Emergency Services</h3>
                <p className="text-gray-300">911 (Emergency)</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Medical Control</h3>
                <p className="text-gray-300">702-555-0123</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Poison Control</h3>
                <p className="text-gray-300">1-800-222-1222</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Clark County Fire</h3>
                <p className="text-gray-300">702-455-7332</p>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowEmergencyContacts(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Equipment Checklist Modal */}
      {showEquipmentChecklist && (
        <Dialog open={showEquipmentChecklist} onOpenChange={setShowEquipmentChecklist}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Equipment Checklist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Defibrillator: Operational</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Oxygen Tank: 2100 PSI</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Medications: Checked</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Airway Kit: Complete</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-white">Trauma Supplies: Stocked</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowEquipmentChecklist(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Battery Status Modal */}
      {showBatteryStatus && (
        <Dialog open={showBatteryStatus} onOpenChange={setShowBatteryStatus}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Battery Status</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Monitor</span>
                  <span className="text-green-400">85%</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Defibrillator</span>
                  <span className="text-green-400">92%</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Suction Unit</span>
                  <span className="text-yellow-400">78%</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Radio</span>
                  <span className="text-green-400">91%</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Tablet</span>
                  <span className="text-yellow-400">67%</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowBatteryStatus(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Quality Metrics Modal */}
      {showQualityMetrics && (
        <Dialog open={showQualityMetrics} onOpenChange={setShowQualityMetrics}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Quality Metrics</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Response Time Average</span>
                  <span className="text-green-400">8.5 min</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Patient Satisfaction</span>
                  <span className="text-green-400">94%</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Protocol Compliance</span>
                  <span className="text-green-400">98%</span>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">Equipment Uptime</span>
                  <span className="text-green-400">99.2%</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowQualityMetrics(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Location Services Modal */}
      {showLocationServices && (
        <Dialog open={showLocationServices} onOpenChange={setShowLocationServices}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Location Services</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">GPS Status</h3>
                <p className="text-green-400">Active</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Nearest Hospital</h3>
                <p className="text-gray-300">University Medical Center (2.3 miles)</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Trauma Center</h3>
                <p className="text-gray-300">Level 1 (3.1 miles)</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Current Zone</h3>
                <p className="text-gray-300">Response District 4</p>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowLocationServices(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Field References Modal */}
      {showFieldReferences && (
        <Dialog open={showFieldReferences} onOpenChange={setShowFieldReferences}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-white">Field References</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Quick Reference Guides</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Adult CPR Protocol</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link className="h-3 w-3 mr-1" />
                      Open
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Pediatric Emergency Guidelines</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link className="h-3 w-3 mr-1" />
                      Open
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Medication Dosing Charts</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link className="h-3 w-3 mr-1" />
                      Open
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Trauma Assessment Protocols</span>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Link className="h-3 w-3 mr-1" />
                      Open
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Emergency Procedures</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Airway Management</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <FileText className="h-3 w-3 mr-1" />
                      View Protocol
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Cardiac Arrest Protocols</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <FileText className="h-3 w-3 mr-1" />
                      View Protocol
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Shock Treatment Guidelines</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <FileText className="h-3 w-3 mr-1" />
                      View Protocol
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Burn Care Procedures</span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <FileText className="h-3 w-3 mr-1" />
                      View Protocol
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">External Resources</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">AHA Guidelines</span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Globe className="h-3 w-3 mr-1" />
                      Visit Site
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">NREMT Standards</span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Globe className="h-3 w-3 mr-1" />
                      Visit Site
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Clark County EMS</span>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Globe className="h-3 w-3 mr-1" />
                      Visit Site
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowFieldReferences(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Protocol Upload Modal */}
      {showProtocolUploadModal && (
        <Dialog open={showProtocolUploadModal} onOpenChange={setShowProtocolUploadModal}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Protocol Upload</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Upload New Protocol</h3>
                <p className="text-gray-300 mb-4">Select protocol files to upload to the system</p>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300">Drag and drop files here or click to browse</p>
                  <p className="text-gray-400 text-sm mt-2">Supported formats: PDF, DOCX, TXT</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowProtocolUploadModal(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Upload
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Incident Reports Modal */}
      {showIncidentReports && (
        <Dialog open={showIncidentReports} onOpenChange={setShowIncidentReports}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Incident Reports</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Recent Reports</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Report #2025-001</span>
                    <span className="text-gray-400">Jan 14, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Report #2025-002</span>
                    <span className="text-gray-400">Jan 13, 2025</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Create New Report</h3>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  New Incident Report
                </Button>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowIncidentReports(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Alert System Modal */}
      {showAlertSystem && (
        <Dialog open={showAlertSystem} onOpenChange={setShowAlertSystem}>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-white">Alert System</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Active Alerts</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <span className="text-gray-300">Medication recall notification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-300">Protocol update available</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Alert Preferences</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="text-blue-600" defaultChecked />
                    <span className="text-gray-300">Critical alerts</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="text-blue-600" defaultChecked />
                    <span className="text-gray-300">Protocol updates</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="text-blue-600" />
                    <span className="text-gray-300">Maintenance reminders</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={() => setShowAlertSystem(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Shift Scheduler Modal */}
      {showShiftScheduler && (
        <Dialog open={showShiftScheduler} onOpenChange={setShowShiftScheduler}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Shift Scheduler</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Current Shift</h3>
                <p className="text-gray-300">Today 06:00 - 18:00</p>
                <p className="text-gray-400">Ends in: 4 hours 23 minutes</p>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-4">Weekly Schedule - Editable</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 w-24">Monday</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="time" 
                        defaultValue="06:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <span className="text-gray-400">-</span>
                      <input 
                        type="time" 
                        defaultValue="18:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 w-24">Tuesday</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="time" 
                        defaultValue="06:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <span className="text-gray-400">-</span>
                      <input 
                        type="time" 
                        defaultValue="18:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 w-24">Wednesday</span>
                    <div className="flex items-center space-x-2">
                      <select className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm">
                        <option value="off">Off</option>
                        <option value="shift">Scheduled</option>
                      </select>
                      <input 
                        type="time" 
                        defaultValue="06:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm opacity-50"
                        disabled
                      />
                      <span className="text-gray-400">-</span>
                      <input 
                        type="time" 
                        defaultValue="18:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm opacity-50"
                        disabled
                      />
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 w-24">Thursday</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="time" 
                        defaultValue="06:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <span className="text-gray-400">-</span>
                      <input 
                        type="time" 
                        defaultValue="18:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 w-24">Friday</span>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="time" 
                        defaultValue="06:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <span className="text-gray-400">-</span>
                      <input 
                        type="time" 
                        defaultValue="18:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm"
                      />
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 w-24">Saturday</span>
                    <div className="flex items-center space-x-2">
                      <select className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm">
                        <option value="off">Off</option>
                        <option value="shift">Scheduled</option>
                      </select>
                      <input 
                        type="time" 
                        defaultValue="06:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm opacity-50"
                        disabled
                      />
                      <span className="text-gray-400">-</span>
                      <input 
                        type="time" 
                        defaultValue="18:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm opacity-50"
                        disabled
                      />
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 w-24">Sunday</span>
                    <div className="flex items-center space-x-2">
                      <select className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm">
                        <option value="off">Off</option>
                        <option value="shift">Scheduled</option>
                      </select>
                      <input 
                        type="time" 
                        defaultValue="06:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm opacity-50"
                        disabled
                      />
                      <span className="text-gray-400">-</span>
                      <input 
                        type="time" 
                        defaultValue="18:00" 
                        className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm opacity-50"
                        disabled
                      />
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-gray-600">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                    <Calendar className="h-3 w-3 mr-1" />
                    Request Time Off
                  </Button>
                  <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                    <Users className="h-3 w-3 mr-1" />
                    Swap Shifts
                  </Button>
                  <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">
                    <Clock className="h-3 w-3 mr-1" />
                    Overtime Request
                  </Button>
                  <Button size="sm" className="bg-orange-600 text-white hover:bg-orange-700">
                    <Settings className="h-3 w-3 mr-1" />
                    Schedule Preferences
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowShiftScheduler(false)}>
                  ← Back to Field Tools
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowShiftScheduler(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Schedule
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Maintenance Log Modal */}
      {showMaintenanceLog && (
        <Dialog open={showMaintenanceLog} onOpenChange={setShowMaintenanceLog}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white">Maintenance Log & Service Records</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Vehicle Maintenance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">Engine Oil</span>
                      <input type="date" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm" defaultValue="2024-12-01" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">Good (3,200 miles)</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">Brake Pads</span>
                      <input type="date" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm" defaultValue="2024-11-15" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-yellow-400">Service Due</span>
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">Tires</span>
                      <input type="date" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm" defaultValue="2024-10-20" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">Good (12,000 miles)</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Equipment Maintenance</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">Defibrillator</span>
                      <input type="date" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm" defaultValue="2024-12-15" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">Tested (12/15/2024)</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <Zap className="h-3 w-3 mr-1" />
                        Test
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">Oxygen Tank</span>
                      <input type="number" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm w-20" defaultValue="2200" placeholder="PSI" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">Full (2,200 PSI)</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Gauge className="h-3 w-3 mr-1" />
                        Check
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300">Suction Unit</span>
                      <input type="date" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 text-sm" defaultValue="2024-11-28" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-red-400">Needs Service</span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <XCircle className="h-3 w-3 mr-1" />
                        Service
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Add New Maintenance Record</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Item</label>
                    <input type="text" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 w-full" placeholder="Equipment/Vehicle part" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Date</label>
                    <input type="date" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 w-full" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Status</label>
                    <select className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 w-full">
                      <option>Good</option>
                      <option>Service Due</option>
                      <option>Needs Service</option>
                      <option>Out of Service</option>
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="block text-sm text-gray-300 mb-1">Notes</label>
                  <textarea className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 w-full h-20" placeholder="Maintenance notes..."></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowMaintenanceLog(false)}>
                  Cancel
                </Button>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Maintenance Log
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Equipment Checklist Modal */}
      {showEquipmentChecklist && (
        <Dialog open={showEquipmentChecklist} onOpenChange={setShowEquipmentChecklist}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Equipment Checklist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Primary Equipment</h3>
                <div className="space-y-2">
                  {[
                    { name: "Defibrillator/AED", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Oxygen Tank (Full)", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Suction Unit", status: "✗", color: "text-red-300", bgColor: "bg-red-900/20" },
                    { name: "Pulse Oximeter", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Blood Pressure Cuff", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Thermometer", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-2 rounded ${item.bgColor}`}>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={item.status === "✓"} className="rounded" />
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                      <span className={`${item.color} font-bold text-lg`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Medications</h3>
                <div className="space-y-2">
                  {[
                    { name: "Epinephrine", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Albuterol", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Aspirin", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Narcan", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Glucose", status: "!", color: "text-yellow-300", bgColor: "bg-yellow-900/20" },
                    { name: "Activated Charcoal", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-2 rounded ${item.bgColor}`}>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={item.status === "✓"} className="rounded" />
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                      <span className={`${item.color} font-bold text-lg`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Vehicle Supplies</h3>
                <div className="space-y-2">
                  {[
                    { name: "Stretcher", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Backboard", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Cervical Collars", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Bandages/Gauze", status: "!", color: "text-yellow-300", bgColor: "bg-yellow-900/20" },
                    { name: "IV Supplies", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" },
                    { name: "Trauma Kit", status: "✓", color: "text-green-300", bgColor: "bg-green-900/20" }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-center justify-between p-2 rounded ${item.bgColor}`}>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked={item.status === "✓"} className="rounded" />
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                      <span className={`${item.color} font-bold text-lg`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowEquipmentChecklist(false)}>
                  ← Back to Field Tools
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowEquipmentChecklist(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Checklist
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Data Sync Modal */}
      {showDataSync && (
        <Dialog open={showDataSync} onOpenChange={setShowDataSync}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Cloud Data Sync Configuration</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Server Configuration</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-300 text-sm block mb-1">Primary Server</label>
                    <select className="w-full bg-gray-600 text-white rounded p-2 border border-gray-500">
                      <option>ProMedix EMS Central Database</option>
                      <option>Nevada State EMS Registry</option>
                      <option>National EMS Information System</option>
                      <option>Custom Server</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm block mb-1">Backup Server</label>
                    <select className="w-full bg-gray-600 text-white rounded p-2 border border-gray-500">
                      <option>Nevada State EMS Registry</option>
                      <option>ProMedix EMS Central Database</option>
                      <option>National EMS Information System</option>
                      <option>None</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm block mb-1">Server URL (Custom)</label>
                    <input 
                      type="text" 
                      placeholder="https://custom-server.ems.gov/api" 
                      className="w-full bg-gray-600 text-white rounded p-2 border border-gray-500 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-gray-300 text-sm block mb-1">API Key</label>
                    <input 
                      type="password" 
                      placeholder="Enter API key for secure connection" 
                      className="w-full bg-gray-600 text-white rounded p-2 border border-gray-500 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Sync Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Last Sync</span>
                    <span className="text-green-400">5 minutes ago</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Status</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400">Connected</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Connection Quality</span>
                    <span className="text-green-400">Excellent (HIPAA Compliant)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Data Categories</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <div>
                        <span className="text-gray-300">Protocols & Guidelines</span>
                        <div className="text-xs text-gray-400">ProMedix EMS protocols and procedures</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">15.2 MB</span>
                      <div className="text-xs text-green-400">✓ Synced</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <div>
                        <span className="text-gray-300">Medication Database</span>
                        <div className="text-xs text-gray-400">Emergency medications and dosing information</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">8.1 MB</span>
                      <div className="text-xs text-green-400">✓ Synced</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <div>
                        <span className="text-gray-300">Calculator Results</span>
                        <div className="text-xs text-gray-400">Saved calculations and patient assessments</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">1.2 MB</span>
                      <div className="text-xs text-yellow-400">⚡ Pending</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <div>
                        <span className="text-gray-300">User Settings & Preferences</span>
                        <div className="text-xs text-gray-400">Personal configurations and preferences</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">0.2 MB</span>
                      <div className="text-xs text-green-400">✓ Synced</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <div>
                        <span className="text-gray-300">Case Reports & Documentation</span>
                        <div className="text-xs text-gray-400">Field reports and incident documentation</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 text-sm">12.4 MB</span>
                      <div className="text-xs text-gray-400">○ Disabled</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Sync Settings</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">Sync Frequency</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="syncMode" value="auto" defaultChecked className="rounded" />
                        <span className="text-gray-300">Auto-sync every</span>
                        <select className="bg-gray-600 text-white rounded px-2 py-1 text-sm border border-gray-500">
                          <option value="5">5 minutes</option>
                          <option value="15" selected>15 minutes</option>
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="syncMode" value="manual" className="rounded" />
                        <span className="text-gray-300">Manual sync only</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" name="syncMode" value="trigger" className="rounded" />
                        <span className="text-gray-300">Sync on data changes</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">Connection Settings</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-300">Sync on WiFi only</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-300">Allow cellular data sync (charges may apply)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-300">Pause sync during emergency calls</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-300">Enable background sync</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-gray-300 text-sm block mb-2">Data Retention</label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300 text-sm">Keep local data for</span>
                        <select className="bg-gray-600 text-white rounded px-2 py-1 text-sm border border-gray-500">
                          <option value="7">7 days</option>
                          <option value="30" selected>30 days</option>
                          <option value="90">90 days</option>
                          <option value="365">1 year</option>
                          <option value="forever">Forever</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-gray-300 text-sm">Auto-delete synced data older than retention period</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Security & Compliance</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Encryption</span>
                    <span className="text-green-400">AES-256 End-to-End</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">HIPAA Compliance</span>
                    <span className="text-green-400">✓ Verified</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Data Location</span>
                    <span className="text-blue-400">US East (Virginia)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Audit Logging</span>
                    <span className="text-green-400">✓ Enabled</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowDataSync(false)}>
                  ← Back to Field Tools
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    Test Connection
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                    View Sync Log
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowDataSync(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-green-600 text-white hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Cloud className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Export Protocols Modal */}
      {showExportProtocols && (
        <Dialog open={showExportProtocols} onOpenChange={setShowExportProtocols}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Export Protocols</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Export Format</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="format" value="pdf" defaultChecked className="rounded" />
                    <span className="text-gray-300">PDF Collection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="format" value="zip" className="rounded" />
                    <span className="text-gray-300">ZIP Archive</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" name="format" value="json" className="rounded" />
                    <span className="text-gray-300">JSON Data</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Protocol Selection</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-gray-300">Adult Treatment Protocols</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-gray-300">Pediatric Protocols</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-gray-300">Operations Protocols</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-gray-300">Medication Protocols</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowExportProtocols(false)}>
                  ← Back to Field Tools
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowExportProtocols(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Protocols
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Case Archives Modal */}
      {showCaseArchives && (
        <Dialog open={showCaseArchives} onOpenChange={setShowCaseArchives}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white">Case Archives</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Recent Cases</h3>
                <div className="space-y-3">
                  {[
                    { id: "CA-2025-001", date: "2025-01-14", type: "Cardiac Arrest", outcome: "ROSC", status: "Completed" },
                    { id: "CA-2025-002", date: "2025-01-13", type: "Trauma", outcome: "Stable", status: "Completed" },
                    { id: "CA-2025-003", date: "2025-01-12", type: "Respiratory", outcome: "Improved", status: "Completed" },
                    { id: "CA-2025-004", date: "2025-01-11", type: "Overdose", outcome: "Stable", status: "Completed" },
                    { id: "CA-2025-005", date: "2025-01-10", type: "Stroke", outcome: "Transported", status: "Completed" }
                  ].map((caseItem, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-600 rounded p-3">
                      <div>
                        <div className="font-medium text-white">{caseItem.id}</div>
                        <div className="text-sm text-gray-300">{caseItem.date} - {caseItem.type}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-300">Outcome: {caseItem.outcome}</div>
                        <div className="text-sm text-green-400">{caseItem.status}</div>
                      </div>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Search Archives</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Case ID</label>
                    <input type="text" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 w-full" placeholder="CA-2025-..." />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Date Range</label>
                    <input type="date" className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 w-full" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Case Type</label>
                    <select className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 w-full">
                      <option>All Types</option>
                      <option>Cardiac Arrest</option>
                      <option>Trauma</option>
                      <option>Respiratory</option>
                      <option>Overdose</option>
                      <option>Stroke</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Outcome</label>
                    <select className="bg-gray-600 text-white border border-gray-500 rounded px-2 py-1 w-full">
                      <option>All Outcomes</option>
                      <option>ROSC</option>
                      <option>Stable</option>
                      <option>Improved</option>
                      <option>Transported</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowCaseArchives(false)}>
                  ← Back to Field Tools
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowCaseArchives(false)}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Search className="h-4 w-4 mr-2" />
                    Search Cases
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Performance Analytics Modal */}
      {showPerformanceAnalytics && (
        <Dialog open={showPerformanceAnalytics} onOpenChange={setShowPerformanceAnalytics}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-5xl">
            <DialogHeader>
              <DialogTitle className="text-white">Performance Analytics Dashboard</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Response Time</h3>
                  <div className="text-2xl font-bold text-green-400">8.5 min</div>
                  <div className="text-sm text-gray-400">Avg this month</div>
                  <div className="text-xs text-green-400">↓ 12% from last month</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Call Volume</h3>
                  <div className="text-2xl font-bold text-blue-400">247</div>
                  <div className="text-sm text-gray-400">Calls this month</div>
                  <div className="text-xs text-blue-400">↑ 8% from last month</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Success Rate</h3>
                  <div className="text-2xl font-bold text-green-400">94.2%</div>
                  <div className="text-sm text-gray-400">Positive outcomes</div>
                  <div className="text-xs text-green-400">↑ 2% from last month</div>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Protocol Compliance</h3>
                  <div className="text-2xl font-bold text-green-400">98.1%</div>
                  <div className="text-sm text-gray-400">Adherence rate</div>
                  <div className="text-xs text-green-400">↑ 1% from last month</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Call Type Breakdown</h3>
                  <div className="space-y-2">
                    {[
                      { type: "Cardiac", count: 67, percentage: 27, color: "bg-red-500" },
                      { type: "Trauma", count: 52, percentage: 21, color: "bg-orange-500" },
                      { type: "Respiratory", count: 45, percentage: 18, color: "bg-blue-500" },
                      { type: "Medical", count: 38, percentage: 15, color: "bg-green-500" },
                      { type: "Psychiatric", count: 28, percentage: 11, color: "bg-purple-500" },
                      { type: "Other", count: 17, percentage: 7, color: "bg-gray-500" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded ${item.color}`}></div>
                          <span className="text-gray-300">{item.type}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-white font-medium">{item.count}</span>
                          <span className="text-gray-400 text-sm ml-2">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-3">Performance Trends</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Response Time Target</span>
                        <span className="text-green-400">8 min or less</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[85%]"></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">85% of calls met target</div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Protocol Adherence</span>
                        <span className="text-green-400">95% or higher</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[98%]"></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">98% adherence rate</div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Patient Satisfaction</span>
                        <span className="text-green-400">90% or higher</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[94%]"></div>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">94% satisfaction score</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Recent Performance Highlights</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Achievement</span>
                    </div>
                    <p className="text-white text-sm">Achieved 100% protocol compliance for 5 consecutive days</p>
                    <p className="text-gray-400 text-xs mt-1">Jan 9-13, 2025</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-400" />
                      <span className="text-blue-400 text-sm font-medium">Improvement</span>
                    </div>
                    <p className="text-white text-sm">Response time improved by 15% compared to last quarter</p>
                    <p className="text-gray-400 text-xs mt-1">Q4 2024 vs Q1 2025</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400 text-sm font-medium">Recognition</span>
                    </div>
                    <p className="text-white text-sm">Recognized for excellence in pediatric emergency care</p>
                    <p className="text-gray-400 text-xs mt-1">Clark County EMS Award</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Action Items</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-600 rounded p-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <span className="text-white">Review respiratory protocol adherence</span>
                    </div>
                    <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                      Review
                    </Button>
                  </div>
                  <div className="flex items-center justify-between bg-gray-600 rounded p-2">
                    <div className="flex items-center space-x-2">
                      <Info className="h-4 w-4 text-blue-400" />
                      <span className="text-white">Complete monthly training module</span>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Start
                    </Button>
                  </div>
                  <div className="flex items-center justify-between bg-gray-600 rounded p-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-white">Update equipment maintenance log</span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Complete
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowPerformanceAnalytics(false)}>
                  ← Back to Field Tools
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowPerformanceAnalytics(false)}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Performance Trends Modal */}
      {showPerformanceTrends && (
        <Dialog open={showPerformanceTrends} onOpenChange={setShowPerformanceTrends}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Performance Trends Analysis</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Response Time Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 rounded p-3 border border-green-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-300 text-sm">Current Average</p>
                        <p className="text-white font-bold text-xl">7.2 min</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-400" />
                    </div>
                    <p className="text-green-300 text-xs mt-1">↓ 3.2% vs last month</p>
                  </div>
                  <div className="bg-blue-900/20 rounded p-3 border border-blue-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-300 text-sm">30-Day Average</p>
                        <p className="text-white font-bold text-xl">7.5 min</p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-blue-400" />
                    </div>
                    <p className="text-blue-300 text-xs mt-1">Target: &lt;7.0 min</p>
                  </div>
                  <div className="bg-purple-900/20 rounded p-3 border border-purple-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-300 text-sm">Best Time</p>
                        <p className="text-white font-bold text-xl">4.1 min</p>
                      </div>
                      <Timer className="h-8 w-8 text-purple-400" />
                    </div>
                    <p className="text-purple-300 text-xs mt-1">This week record</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Call Volume Trends</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <span className="text-white font-medium">Priority 1 Calls</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-500 rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full w-[85%]"></div>
                      </div>
                      <span className="text-red-300 font-bold">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <span className="text-white font-medium">Priority 2 Calls</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-500 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full w-[65%]"></div>
                      </div>
                      <span className="text-yellow-300 font-bold">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <span className="text-white font-medium">Priority 3 Calls</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-500 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[92%]"></div>
                      </div>
                      <span className="text-green-300 font-bold">92%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Quality Metrics Trends</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Patient Satisfaction</span>
                      <span className="text-green-300 font-bold">94.8%</span>
                    </div>
                    <div className="w-full bg-gray-500 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-[95%]"></div>
                    </div>
                    <p className="text-green-300 text-xs mt-1">↑ 2.1% improvement</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">Protocol Adherence</span>
                      <span className="text-green-300 font-bold">98.2%</span>
                    </div>
                    <div className="w-full bg-gray-500 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-[98%]"></div>
                    </div>
                    <p className="text-green-300 text-xs mt-1">↑ 1.3% improvement</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Monthly Performance Goals</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-green-900/20 rounded p-2 border border-green-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-white">Response time under 7.5 minutes</span>
                    </div>
                    <span className="text-green-300 font-bold">Achieved</span>
                  </div>
                  <div className="flex items-center justify-between bg-yellow-900/20 rounded p-2 border border-yellow-700">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span className="text-white">95% patient satisfaction rate</span>
                    </div>
                    <span className="text-yellow-300 font-bold">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between bg-blue-900/20 rounded p-2 border border-blue-700">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-blue-400" />
                      <span className="text-white">Zero critical protocol deviations</span>
                    </div>
                    <span className="text-blue-300 font-bold">Target</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowPerformanceTrends(false)}>
                  ← Back to Field Tools
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowPerformanceTrends(false)}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Trends Report
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Compliance Tracking Modal */}
      {showComplianceTracking && (
        <Dialog open={showComplianceTracking} onOpenChange={setShowComplianceTracking}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Compliance Tracking Dashboard</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Overall Compliance Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 rounded p-3 border border-green-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-300 text-sm">Protocol Compliance</p>
                        <p className="text-white font-bold text-xl">98.2%</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                    <p className="text-green-300 text-xs mt-1">2 minor deviations this month</p>
                  </div>
                  <div className="bg-blue-900/20 rounded p-3 border border-blue-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-300 text-sm">Documentation</p>
                        <p className="text-white font-bold text-xl">96.7%</p>
                      </div>
                      <FileText className="h-8 w-8 text-blue-400" />
                    </div>
                    <p className="text-blue-300 text-xs mt-1">Complete within 24hrs</p>
                  </div>
                  <div className="bg-yellow-900/20 rounded p-3 border border-yellow-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-300 text-sm">Training Current</p>
                        <p className="text-white font-bold text-xl">94.1%</p>
                      </div>
                      <Users className="h-8 w-8 text-yellow-400" />
                    </div>
                    <p className="text-yellow-300 text-xs mt-1">3 pending certifications</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Protocol Adherence by Category</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <span className="text-white font-medium">Cardiac Protocols</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-500 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[99%]"></div>
                      </div>
                      <span className="text-green-300 font-bold">99%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <span className="text-white font-medium">Respiratory Protocols</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-500 rounded-full h-2">
                        <div className="bg-yellow-400 h-2 rounded-full w-[95%]"></div>
                      </div>
                      <span className="text-yellow-300 font-bold">95%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <span className="text-white font-medium">Trauma Protocols</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-500 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[98%]"></div>
                      </div>
                      <span className="text-green-300 font-bold">98%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-gray-600 rounded">
                    <span className="text-white font-medium">Medication Protocols</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-500 rounded-full h-2">
                        <div className="bg-green-400 h-2 rounded-full w-[97%]"></div>
                      </div>
                      <span className="text-green-300 font-bold">97%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Recent Compliance Issues</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-yellow-900/20 rounded p-2 border border-yellow-700">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      <div>
                        <span className="text-white font-medium">Medication documentation delay</span>
                        <p className="text-gray-300 text-xs">Case #2847 - 48hr delay in completion</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                        Review
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-300">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-red-900/20 rounded p-2 border border-red-700">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      <div>
                        <span className="text-white font-medium">Protocol deviation - respiratory</span>
                        <p className="text-gray-300 text-xs">Case #2831 - Alternative intervention used</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Investigate
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-600 text-red-300">
                        Report
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-3">Compliance Certifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">BLS Certification</span>
                      <span className="text-green-300 font-bold">Current</span>
                    </div>
                    <p className="text-gray-300 text-sm">Expires: 06/15/2025</p>
                    <p className="text-green-300 text-xs">✓ Renewed automatically</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">ACLS Certification</span>
                      <span className="text-yellow-300 font-bold">Expiring Soon</span>
                    </div>
                    <p className="text-gray-300 text-sm">Expires: 02/28/2025</p>
                    <p className="text-yellow-300 text-xs">⚠ Renewal required</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">PALS Certification</span>
                      <span className="text-green-300 font-bold">Current</span>
                    </div>
                    <p className="text-gray-300 text-sm">Expires: 09/10/2025</p>
                    <p className="text-green-300 text-xs">✓ Valid through 2025</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-300">State EMS License</span>
                      <span className="text-green-300 font-bold">Current</span>
                    </div>
                    <p className="text-gray-300 text-sm">Expires: 12/31/2025</p>
                    <p className="text-green-300 text-xs">✓ Nevada licensed</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowComplianceTracking(false)}>
                  ← Back to Field Tools
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => setShowComplianceTracking(false)}>
                    Close
                  </Button>
                  <Button className="bg-blue-600 text-white hover:bg-blue-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export Compliance Report
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}