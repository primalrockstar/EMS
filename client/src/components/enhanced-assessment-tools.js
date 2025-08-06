import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Heart, Eye, Stethoscope, ThermometerSun } from "lucide-react";
export default function EnhancedAssessmentTools() {
    const [activeTab, setActiveTab] = useState("primary");
    const [findings, setFindings] = useState([]);
    const [vitals, setVitals] = useState({
        systolic: 0,
        diastolic: 0,
        heartRate: 0,
        respiratoryRate: 0,
        temperature: 0,
        oxygenSaturation: 0
    });
    const [userLevel, setUserLevel] = useState("EMT");
    const [patientAge, setPatientAge] = useState(0);
    const [patientWeight, setPatientWeight] = useState(0);
    const primarySurveyItems = [
        {
            id: "airway",
            label: "Airway",
            icon: _jsx(Activity, { className: "h-5 w-5" }),
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
            icon: _jsx(Stethoscope, { className: "h-5 w-5" }),
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
            icon: _jsx(Heart, { className: "h-5 w-5" }),
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
            icon: _jsx(Eye, { className: "h-5 w-5" }),
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
            icon: _jsx(ThermometerSun, { className: "h-5 w-5" }),
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
    const addFinding = (category, finding, severity) => {
        const newFinding = {
            id: Date.now().toString(),
            category,
            finding,
            severity,
            description: "",
            actions: []
        };
        setFindings([...findings, newFinding]);
    };
    const getVitalStatus = (vital, value) => {
        const ranges = {
            systolic: { normal: [90, 140], critical: [180, 60] },
            diastolic: { normal: [60, 90], critical: [110, 40] },
            heartRate: { normal: [60, 100], critical: [150, 40] },
            respiratoryRate: { normal: [12, 20], critical: [30, 8] },
            temperature: { normal: [36.1, 37.2], critical: [39.4, 35.0] },
            oxygenSaturation: { normal: [95, 100], critical: [90, 85] }
        };
        const range = ranges[vital];
        if (!range)
            return "normal";
        if (value >= range.normal[0] && value <= range.normal[1])
            return "normal";
        if (value >= range.critical[0] || value <= range.critical[1])
            return "critical";
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
    const getSeverityColor = (severity) => {
        switch (severity) {
            case "normal": return "bg-green-100 text-green-800";
            case "abnormal": return "bg-yellow-100 text-yellow-800";
            case "critical": return "bg-red-100 text-red-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold", children: "Enhanced Assessment Tools" }), _jsx("p", { className: "text-muted-foreground", children: "Comprehensive patient assessment and documentation" })] }), _jsx("div", { className: "flex gap-2", children: ["EMT", "AEMT", "Paramedic"].map((level) => (_jsx(Button, { variant: userLevel === level ? "default" : "outline", size: "sm", onClick: () => setUserLevel(level), children: level }, level))) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Patient Information" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "age", children: "Age" }), _jsx(Input, { id: "age", type: "number", value: patientAge, onChange: (e) => setPatientAge(Number(e.target.value)), placeholder: "Patient age" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "weight", children: "Weight (kg)" }), _jsx(Input, { id: "weight", type: "number", value: patientWeight, onChange: (e) => setPatientWeight(Number(e.target.value)), placeholder: "Patient weight" })] })] }) })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [_jsx(TabsTrigger, { value: "primary", children: "Primary Survey" }), _jsx(TabsTrigger, { value: "vitals", children: "Vital Signs" }), _jsx(TabsTrigger, { value: "secondary", children: "Secondary Assessment" }), _jsx(TabsTrigger, { value: "findings", children: "Findings" })] }), _jsx(TabsContent, { value: "primary", className: "space-y-4", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: primarySurveyItems.map((item) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [item.icon, item.label] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: item.assessments.map((assessment, index) => (_jsx(Button, { variant: "outline", size: "sm", className: "w-full justify-start", onClick: () => {
                                                    const severity = assessment.includes("obstruction") ||
                                                        assessment.includes("No pulse") ||
                                                        assessment.includes("Unresponsive") ? "critical" :
                                                        assessment.includes("Partial") ||
                                                            assessment.includes("Weak") ||
                                                            assessment.includes("Altered") ? "abnormal" : "normal";
                                                    addFinding(item.label, assessment, severity);
                                                }, children: assessment }, index))) }) })] }, item.id))) }) }), _jsx(TabsContent, { value: "vitals", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Vital Signs Monitoring" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "systolic", children: "Systolic BP" }), _jsx(Input, { id: "systolic", type: "number", value: vitals.systolic, onChange: (e) => setVitals({ ...vitals, systolic: Number(e.target.value) }), placeholder: "120" }), _jsx(Badge, { className: getSeverityColor(getVitalStatus("systolic", vitals.systolic)), children: getVitalStatus("systolic", vitals.systolic) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "diastolic", children: "Diastolic BP" }), _jsx(Input, { id: "diastolic", type: "number", value: vitals.diastolic, onChange: (e) => setVitals({ ...vitals, diastolic: Number(e.target.value) }), placeholder: "80" }), _jsx(Badge, { className: getSeverityColor(getVitalStatus("diastolic", vitals.diastolic)), children: getVitalStatus("diastolic", vitals.diastolic) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "heartRate", children: "Heart Rate" }), _jsx(Input, { id: "heartRate", type: "number", value: vitals.heartRate, onChange: (e) => setVitals({ ...vitals, heartRate: Number(e.target.value) }), placeholder: "80" }), _jsx(Badge, { className: getSeverityColor(getVitalStatus("heartRate", vitals.heartRate)), children: getVitalStatus("heartRate", vitals.heartRate) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "respiratoryRate", children: "Respiratory Rate" }), _jsx(Input, { id: "respiratoryRate", type: "number", value: vitals.respiratoryRate, onChange: (e) => setVitals({ ...vitals, respiratoryRate: Number(e.target.value) }), placeholder: "16" }), _jsx(Badge, { className: getSeverityColor(getVitalStatus("respiratoryRate", vitals.respiratoryRate)), children: getVitalStatus("respiratoryRate", vitals.respiratoryRate) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "temperature", children: "Temperature (\u00B0C)" }), _jsx(Input, { id: "temperature", type: "number", step: "0.1", value: vitals.temperature, onChange: (e) => setVitals({ ...vitals, temperature: Number(e.target.value) }), placeholder: "36.5" }), _jsx(Badge, { className: getSeverityColor(getVitalStatus("temperature", vitals.temperature)), children: getVitalStatus("temperature", vitals.temperature) })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "oxygenSaturation", children: "Oxygen Saturation (%)" }), _jsx(Input, { id: "oxygenSaturation", type: "number", value: vitals.oxygenSaturation, onChange: (e) => setVitals({ ...vitals, oxygenSaturation: Number(e.target.value) }), placeholder: "98" }), _jsx(Badge, { className: getSeverityColor(getVitalStatus("oxygenSaturation", vitals.oxygenSaturation)), children: getVitalStatus("oxygenSaturation", vitals.oxygenSaturation) })] })] }) })] }) }), _jsx(TabsContent, { value: "secondary", className: "space-y-4", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: secondaryAssessments.map((assessment) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: assessment.category }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-2", children: assessment.items.map((item, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", className: "flex-1", onClick: () => addFinding(assessment.category, item, "normal"), children: item }), _jsxs(Select, { onValueChange: (value) => addFinding(assessment.category, item, value), children: [_jsx(SelectTrigger, { className: "w-20", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "normal", children: "Normal" }), _jsx(SelectItem, { value: "abnormal", children: "Abnormal" }), _jsx(SelectItem, { value: "critical", children: "Critical" })] })] })] }, index))) }) })] }, assessment.category))) }) }), _jsx(TabsContent, { value: "findings", className: "space-y-4", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: ["Assessment Findings", _jsx(Button, { onClick: generateAssessmentReport, variant: "outline", children: "Generate Report" })] }) }), _jsx(CardContent, { children: findings.length === 0 ? (_jsx("p", { className: "text-muted-foreground text-center py-8", children: "No findings recorded yet. Use the Primary Survey and Secondary Assessment tabs to document findings." })) : (_jsx("div", { className: "space-y-4", children: findings.map((finding) => (_jsxs("div", { className: "flex items-center justify-between p-4 border rounded-lg", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Badge, { variant: "outline", children: finding.category }), _jsx(Badge, { className: getSeverityColor(finding.severity), children: finding.severity })] }), _jsx("p", { className: "mt-2 font-medium", children: finding.finding }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Recorded at ", new Date().toLocaleTimeString()] })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setFindings(findings.filter(f => f.id !== finding.id)), children: "Remove" })] }, finding.id))) })) })] }) })] })] }));
}
