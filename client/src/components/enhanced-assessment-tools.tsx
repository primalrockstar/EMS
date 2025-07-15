import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertTriangle, Clock, Activity, Heart, Eye, Stethoscope, ThermometerSun } from "lucide-react";

interface AssessmentFinding {
  id: string;
  category: string;
  finding: string;
  severity: "normal" | "abnormal" | "critical";
  description: string;
  actions: string[];
}

interface VitalSigns {
  systolic: number;
  diastolic: number;
  heartRate: number;
  respiratoryRate: number;
  temperature: number;
  oxygenSaturation: number;
  bloodGlucose?: number;
  painScale?: number;
}

export default function EnhancedAssessmentTools() {
  const [activeTab, setActiveTab] = useState("primary");
  const [findings, setFindings] = useState<AssessmentFinding[]>([]);
  const [vitals, setVitals] = useState<VitalSigns>({
    systolic: 0,
    diastolic: 0,
    heartRate: 0,
    respiratoryRate: 0,
    temperature: 0,
    oxygenSaturation: 0
  });
  const [userLevel, setUserLevel] = useState<"EMT" | "AEMT" | "Paramedic">("EMT");
  const [patientAge, setPatientAge] = useState<number>(0);
  const [patientWeight, setPatientWeight] = useState<number>(0);

  const primarySurveyItems = [
    {
      id: "airway",
      label: "Airway",
      icon: <Activity className="h-5 w-5" />,
      assessments: [
        "Patent and clear",
        "Partial obstruction",
        "Complete obstruction",
        "Requires suctioning",
        "Requires advanced airway"
      ]
    },
    {
      id: "breathing",
      label: "Breathing",
      icon: <Stethoscope className="h-5 w-5" />,
      assessments: [
        "Adequate rate and depth",
        "Shallow breathing",
        "Labored breathing",
        "Absent breath sounds",
        "Requires ventilation"
      ]
    },
    {
      id: "circulation",
      label: "Circulation",
      icon: <Heart className="h-5 w-5" />,
      assessments: [
        "Strong pulse, good perfusion",
        "Weak pulse, poor perfusion",
        "Tachycardia",
        "Bradycardia",
        "No pulse detected"
      ]
    },
    {
      id: "disability",
      label: "Disability",
      icon: <Eye className="h-5 w-5" />,
      assessments: [
        "Alert and oriented",
        "Responds to verbal stimuli",
        "Responds to pain only",
        "Unresponsive",
        "Altered mental status"
      ]
    },
    {
      id: "exposure",
      label: "Exposure",
      icon: <ThermometerSun className="h-5 w-5" />,
      assessments: [
        "No obvious trauma",
        "Minor injuries noted",
        "Significant trauma",
        "Life-threatening injuries",
        "Environmental concerns"
      ]
    }
  ];

  const secondaryAssessments = [
    { category: "Head", items: ["Pupils", "Scalp", "Facial symmetry", "Oral cavity"] },
    { category: "Neck", items: ["Cervical spine", "Jugular veins", "Trachea", "Lymph nodes"] },
    { category: "Chest", items: ["Chest wall", "Breath sounds", "Heart sounds", "Palpation"] },
    { category: "Abdomen", items: ["Inspection", "Palpation", "Bowel sounds", "Rigidity"] },
    { category: "Extremities", items: ["Pulses", "Motor function", "Sensation", "Deformities"] },
    { category: "Neurological", items: ["Glasgow Coma Scale", "Reflexes", "Coordination", "Speech"] }
  ];

  const addFinding = (category: string, finding: string, severity: "normal" | "abnormal" | "critical") => {
    const newFinding: AssessmentFinding = {
      id: Date.now().toString(),
      category,
      finding,
      severity,
      description: "",
      actions: []
    };
    setFindings([...findings, newFinding]);
  };

  const getVitalStatus = (vital: keyof VitalSigns, value: number) => {
    const ranges = {
      systolic: { normal: [90, 140], critical: [180, 60] },
      diastolic: { normal: [60, 90], critical: [110, 40] },
      heartRate: { normal: [60, 100], critical: [150, 40] },
      respiratoryRate: { normal: [12, 20], critical: [30, 8] },
      temperature: { normal: [36.1, 37.2], critical: [39.4, 35.0] },
      oxygenSaturation: { normal: [95, 100], critical: [90, 85] }
    };

    const range = ranges[vital];
    if (!range) return "normal";

    if (value >= range.normal[0] && value <= range.normal[1]) return "normal";
    if (value >= range.critical[0] || value <= range.critical[1]) return "critical";
    return "abnormal";
  };

  const generateAssessmentReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      assessor: userLevel,
      patientInfo: { age: patientAge, weight: patientWeight },
      vitals,
      findings: findings.map(f => ({
        category: f.category,
        finding: f.finding,
        severity: f.severity
      })),
      recommendations: findings
        .filter(f => f.severity === "critical")
        .map(f => `Immediate attention required: ${f.finding}`)
    };

    console.log("Assessment Report:", report);
    return report;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "normal": return "bg-green-100 text-green-800";
      case "abnormal": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Assessment Tools</h2>
          <p className="text-muted-foreground">Comprehensive patient assessment and documentation</p>
        </div>
        <div className="flex gap-2">
          {["EMT", "AEMT", "Paramedic"].map((level) => (
            <Button
              key={level}
              variant={userLevel === level ? "default" : "outline"}
              size="sm"
              onClick={() => setUserLevel(level as "EMT" | "AEMT" | "Paramedic")}
            >
              {level}
            </Button>
          ))}
        </div>
      </div>

      {/* Patient Information */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(Number(e.target.value))}
                placeholder="Patient age"
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={patientWeight}
                onChange={(e) => setPatientWeight(Number(e.target.value))}
                placeholder="Patient weight"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="primary">Primary Survey</TabsTrigger>
          <TabsTrigger value="vitals">Vital Signs</TabsTrigger>
          <TabsTrigger value="secondary">Secondary Assessment</TabsTrigger>
          <TabsTrigger value="findings">Findings</TabsTrigger>
        </TabsList>

        {/* Primary Survey */}
        <TabsContent value="primary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {primarySurveyItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {item.assessments.map((assessment, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => {
                          const severity = assessment.includes("obstruction") || 
                                         assessment.includes("No pulse") || 
                                         assessment.includes("Unresponsive") ? "critical" :
                                         assessment.includes("Partial") ||
                                         assessment.includes("Weak") ||
                                         assessment.includes("Altered") ? "abnormal" : "normal";
                          addFinding(item.label, assessment, severity);
                        }}
                      >
                        {assessment}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Vital Signs */}
        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="systolic">Systolic BP</Label>
                  <Input
                    id="systolic"
                    type="number"
                    value={vitals.systolic}
                    onChange={(e) => setVitals({...vitals, systolic: Number(e.target.value)})}
                    placeholder="120"
                  />
                  <Badge className={getSeverityColor(getVitalStatus("systolic", vitals.systolic))}>
                    {getVitalStatus("systolic", vitals.systolic)}
                  </Badge>
                </div>
                <div>
                  <Label htmlFor="diastolic">Diastolic BP</Label>
                  <Input
                    id="diastolic"
                    type="number"
                    value={vitals.diastolic}
                    onChange={(e) => setVitals({...vitals, diastolic: Number(e.target.value)})}
                    placeholder="80"
                  />
                  <Badge className={getSeverityColor(getVitalStatus("diastolic", vitals.diastolic))}>
                    {getVitalStatus("diastolic", vitals.diastolic)}
                  </Badge>
                </div>
                <div>
                  <Label htmlFor="heartRate">Heart Rate</Label>
                  <Input
                    id="heartRate"
                    type="number"
                    value={vitals.heartRate}
                    onChange={(e) => setVitals({...vitals, heartRate: Number(e.target.value)})}
                    placeholder="80"
                  />
                  <Badge className={getSeverityColor(getVitalStatus("heartRate", vitals.heartRate))}>
                    {getVitalStatus("heartRate", vitals.heartRate)}
                  </Badge>
                </div>
                <div>
                  <Label htmlFor="respiratoryRate">Respiratory Rate</Label>
                  <Input
                    id="respiratoryRate"
                    type="number"
                    value={vitals.respiratoryRate}
                    onChange={(e) => setVitals({...vitals, respiratoryRate: Number(e.target.value)})}
                    placeholder="16"
                  />
                  <Badge className={getSeverityColor(getVitalStatus("respiratoryRate", vitals.respiratoryRate))}>
                    {getVitalStatus("respiratoryRate", vitals.respiratoryRate)}
                  </Badge>
                </div>
                <div>
                  <Label htmlFor="temperature">Temperature (°C)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={vitals.temperature}
                    onChange={(e) => setVitals({...vitals, temperature: Number(e.target.value)})}
                    placeholder="36.5"
                  />
                  <Badge className={getSeverityColor(getVitalStatus("temperature", vitals.temperature))}>
                    {getVitalStatus("temperature", vitals.temperature)}
                  </Badge>
                </div>
                <div>
                  <Label htmlFor="oxygenSaturation">Oxygen Saturation (%)</Label>
                  <Input
                    id="oxygenSaturation"
                    type="number"
                    value={vitals.oxygenSaturation}
                    onChange={(e) => setVitals({...vitals, oxygenSaturation: Number(e.target.value)})}
                    placeholder="98"
                  />
                  <Badge className={getSeverityColor(getVitalStatus("oxygenSaturation", vitals.oxygenSaturation))}>
                    {getVitalStatus("oxygenSaturation", vitals.oxygenSaturation)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Secondary Assessment */}
        <TabsContent value="secondary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {secondaryAssessments.map((assessment) => (
              <Card key={assessment.category}>
                <CardHeader>
                  <CardTitle>{assessment.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {assessment.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => addFinding(assessment.category, item, "normal")}
                        >
                          {item}
                        </Button>
                        <Select onValueChange={(value) => addFinding(assessment.category, item, value as "normal" | "abnormal" | "critical")}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="abnormal">Abnormal</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Findings */}
        <TabsContent value="findings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Assessment Findings
                <Button onClick={generateAssessmentReport} variant="outline">
                  Generate Report
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {findings.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No findings recorded yet. Use the Primary Survey and Secondary Assessment tabs to document findings.
                </p>
              ) : (
                <div className="space-y-4">
                  {findings.map((finding) => (
                    <div key={finding.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{finding.category}</Badge>
                          <Badge className={getSeverityColor(finding.severity)}>
                            {finding.severity}
                          </Badge>
                        </div>
                        <p className="mt-2 font-medium">{finding.finding}</p>
                        <p className="text-sm text-muted-foreground">
                          Recorded at {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFindings(findings.filter(f => f.id !== finding.id))}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}