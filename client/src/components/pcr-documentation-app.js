import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Search, Save, Download, Moon, Sun, Calculator, Clock, FileText, User, Activity, Stethoscope, Plus, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Templates data
const templates = {
    soap: {
        subjective: {
            fields: ['Chief Complaint', 'History of Present Illness', 'OPQRST', 'Pain Scale', 'Associated Symptoms'],
            examples: {
                'Chief Complaint': 'Chest pain, 8/10 severity',
                'OPQRST': 'Onset: Sudden at 0730\nProvocation: Worse with movement\nQuality: Sharp, stabbing\nRegion: Central chest, radiates to left arm\nSeverity: 8/10\nTiming: Continuous for 30 minutes'
            }
        },
        objective: {
            fields: ['Vital Signs', 'Physical Exam', 'Diagnostics', 'BMI', 'Medications Given'],
            examples: {
                'Vital Signs': 'BP: 116/78, HR: 72, RR: 18, SpO2: 98%, Temp: 98.6°F',
                'Physical Exam': 'Alert, oriented x3. Skin pale, diaphoretic. Chest clear bilaterally.'
            }
        },
        assessment: {
            fields: ['Primary Impression', 'Differential Diagnosis', 'Severity'],
            examples: {
                'Primary Impression': 'Suspected acute myocardial infarction',
                'Differential Diagnosis': '1. STEMI 2. Unstable angina 3. Aortic dissection'
            }
        },
        plan: {
            fields: ['Interventions', 'Medications', 'Transport Decision', 'Destination'],
            examples: {
                'Interventions': 'Oxygen 4L/min via NC, IV access established',
                'Medications': 'Aspirin 324 mg PO, Nitroglycerin 0.4 mg SL x2'
            }
        }
    },
    chart: {
        fields: ['Chief Complaint', 'History', 'Assessment', 'Rx', 'Transport'],
        examples: {
            'Chief Complaint': 'Chest pain with radiation to left arm',
            'History': 'Previous MI 2019, HTN, DM Type 2. Takes metoprolol, lisinopril',
            'Assessment': 'Vitals stable, BMI 30.97, appears in moderate distress'
        }
    }
};
// Sample reports for student reference
const sampleReports = [
    {
        type: 'soap',
        title: 'SOAP Sample Report - Chest Pain',
        content: {
            subjective_ChiefComplaint: 'Chest pain, 8/10 severity',
            subjective_HistoryOfPresentIllness: '55 y/o male with sudden onset chest pain at 0730. Describes pain as sharp, central, radiating to left arm.',
            subjective_OPQRST: 'Onset: Sudden at 0730\nProvocation: Worse with movement\nQuality: Sharp, stabbing\nRegion: Central chest\nSeverity: 8/10\nTiming: Continuous',
            objective_VitalSigns: 'BP: 116/78, HR: 72, RR: 18, SpO2: 98%, Temp: 98.6°F',
            objective_PhysicalExam: 'Alert, oriented x3. Skin pale, diaphoretic.',
            assessment_PrimaryImpression: 'Suspected acute myocardial infarction',
            plan_Interventions: 'Oxygen 4L/min via NC, IV access established'
        }
    },
    {
        type: 'chart',
        title: 'CHART Sample Report - Chest Pain',
        content: {
            chart_ChiefComplaint: 'Chest pain with radiation to left arm',
            chart_History: 'Previous MI 2019, HTN, DM Type 2. Takes metoprolol, lisinopril',
            chart_Assessment: 'Vitals stable, appears in moderate distress',
            chart_Rx: 'Oxygen 4 L/min, Aspirin 324 mg',
            chart_Transport: 'Priority 1 to Regional Medical Center'
        }
    }
];
// BMI Calculator Component
const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState(null);
    const [category, setCategory] = useState('');
    const calculateBMI = () => {
        if (height && weight) {
            const heightInInches = parseFloat(height);
            const weightInPounds = parseFloat(weight);
            const bmiValue = (weightInPounds / (heightInInches * heightInInches)) * 703;
            setBMI(parseFloat(bmiValue.toFixed(2)));
            if (bmiValue < 18.5)
                setCategory('Underweight');
            else if (bmiValue < 25)
                setCategory('Normal weight');
            else if (bmiValue < 30)
                setCategory('Overweight');
            else
                setCategory('Obese');
        }
    };
    return (_jsxs(Card, { className: "mb-4", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center text-lg", children: [_jsx(Calculator, { className: "mr-2", size: 20 }), "BMI Calculator"] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Height (inches)" }), _jsx(Input, { type: "number", value: height, onChange: (e) => setHeight(e.target.value), placeholder: "70" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Weight (lbs)" }), _jsx(Input, { type: "number", value: weight, onChange: (e) => setWeight(e.target.value), placeholder: "216" })] })] }), _jsx(Button, { onClick: calculateBMI, className: "w-full", children: "Calculate BMI" }), bmi && (_jsx("div", { className: "mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md", children: _jsxs("p", { className: "text-blue-800 dark:text-blue-200", children: [_jsxs("strong", { children: ["BMI: ", bmi] }), " (", category, ")"] }) }))] })] }));
};
// Feedback Panel Component
const FeedbackPanel = ({ feedback, activeMethod }) => (_jsxs(Card, { className: "mb-4", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center text-lg", children: [_jsx(FileText, { className: "mr-2", size: 20 }), "Feedback on Your Report"] }) }), _jsx(CardContent, { children: Object.keys(feedback).length === 0 ? (_jsx("p", { className: "text-muted-foreground", children: "No feedback available. Complete the form and click \"Generate Feedback\"." })) : (_jsxs("div", { className: "space-y-4", children: [activeMethod === 'soap' && Object.entries(feedback).map(([section, fields]) => (_jsxs("div", { children: [_jsx("h4", { className: "font-medium capitalize", children: section }), Object.entries(fields).map(([field, messages]) => (_jsxs("div", { className: "ml-4", children: [_jsxs("p", { className: "font-medium text-sm", children: [field, ":"] }), _jsx("ul", { className: "list-disc ml-6 text-sm text-muted-foreground", children: messages.map((msg, index) => (_jsx("li", { children: msg }, index))) })] }, field)))] }, section))), activeMethod === 'chart' && feedback.chart && (_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: "CHART" }), Object.entries(feedback.chart).map(([field, messages]) => (_jsxs("div", { className: "ml-4", children: [_jsxs("p", { className: "font-medium text-sm", children: [field, ":"] }), _jsx("ul", { className: "list-disc ml-6 text-sm text-muted-foreground", children: messages.map((msg, index) => (_jsx("li", { children: msg }, index))) })] }, field)))] })), activeMethod === 'chronological' && feedback.chronological && (_jsxs("div", { children: [_jsx("h4", { className: "font-medium", children: "Chronological Entries" }), feedback.chronological.map((entryFeedback, index) => (entryFeedback && (_jsxs("div", { className: "ml-4", children: [_jsxs("p", { className: "font-medium text-sm", children: ["Entry ", index + 1, ":"] }), _jsx("ul", { className: "list-disc ml-6 text-sm text-muted-foreground", children: entryFeedback.map((msg, i) => (_jsx("li", { children: msg }, i))) })] }, index))))] }))] })) })] }));
// Sample Reports Modal Component
const SampleReportsModal = ({ isOpen, onClose, sampleReports, setFormData, setChronologicalEntries }) => {
    if (!isOpen)
        return null;
    const loadSample = (report) => {
        if (report.type === 'chronological') {
            setChronologicalEntries(report.content.entries);
            setFormData({});
        }
        else {
            setFormData(report.content);
            setChronologicalEntries([]);
        }
        onClose();
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Sample Reports" }) }), _jsx("div", { className: "space-y-4", children: sampleReports.map((report, index) => (_jsx(Button, { onClick: () => loadSample(report), className: "w-full justify-start", variant: "outline", children: report.title }, index))) })] }) }));
};
// Main App Component
export default function PCRDocumentationApp({ open, onOpenChange }) {
    const [darkMode, setDarkMode] = useState(false);
    const [activeMethod, setActiveMethod] = useState('soap');
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({});
    const [chronologicalEntries, setChronologicalEntries] = useState([]);
    const [feedback, setFeedback] = useState({});
    const [showSampleModal, setShowSampleModal] = useState(false);
    useEffect(() => {
        if (open) {
            generateFeedback();
        }
    }, [formData, chronologicalEntries, open]);
    const handleInputChange = (section, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [`${section}_${field.replace(/\s+/g, '')}`]: value
        }));
    };
    const addChronologicalEntry = () => {
        const now = new Date();
        const timeStr = now.toTimeString().substring(0, 5);
        setChronologicalEntries(prev => [...prev, {
                id: Date.now(),
                time: timeStr,
                entry: '',
                vitals: '',
                actions: ''
            }]);
    };
    const updateChronologicalEntry = (id, field, value) => {
        setChronologicalEntries(prev => prev.map(entry => entry.id === id ? { ...entry, [field]: value } : entry));
    };
    const removeChronologicalEntry = (id) => {
        setChronologicalEntries(prev => prev.filter(entry => entry.id !== id));
    };
    const exportSBAR = () => {
        const sbar = {
            situation: formData.subjective_ChiefComplaint || '',
            background: formData.subjective_HistoryOfPresentIllness || '',
            assessment: formData.assessment_PrimaryImpression || '',
            recommendation: formData.plan_Interventions || ''
        };
        const sbarText = `SBAR Report:
Situation: ${sbar.situation}
Background: ${sbar.background}
Assessment: ${sbar.assessment}
Recommendation: ${sbar.recommendation}`;
        const blob = new Blob([sbarText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sbar-report.txt';
        a.click();
    };
    const saveDraft = () => {
        const draft = { formData, chronologicalEntries, timestamp: new Date(), type: activeMethod };
        const drafts = JSON.parse(localStorage.getItem('drafts') || '[]');
        drafts.push(draft);
        localStorage.setItem('drafts', JSON.stringify(drafts));
        alert('Draft saved successfully!');
    };
    const generateFeedback = () => {
        const newFeedback = {};
        const checkField = (value, fieldName, section) => {
            const feedbackMessages = [];
            if (!value) {
                feedbackMessages.push(`${fieldName} is empty. Provide specific details.`);
            }
            else if (value.length < 10) {
                feedbackMessages.push(`${fieldName} is too brief. Include more details, e.g., "${templates[section]?.examples?.[fieldName] || 'specific clinical details'}".`);
            }
            return feedbackMessages;
        };
        const validateClinicalContent = (value, fieldName) => {
            const feedbackMessages = [];
            if (fieldName === 'Vital Signs' && value) {
                if (!value.includes('BP') || !value.includes('HR') || !value.includes('RR')) {
                    feedbackMessages.push('Vital Signs should include BP, HR, and RR at minimum.');
                }
            }
            if (fieldName === 'Interventions' && value && !value.toLowerCase().includes('oxygen') && value.toLowerCase().includes('chest pain')) {
                feedbackMessages.push('For chest pain, consider including oxygen administration if clinically appropriate.');
            }
            return feedbackMessages;
        };
        if (activeMethod === 'soap') {
            Object.keys(templates.soap).forEach((section) => {
                newFeedback[section] = {};
                templates.soap[section].fields.forEach((field) => {
                    const fieldKey = `${section}_${field.replace(/\s+/g, '')}`;
                    const value = formData[fieldKey] || '';
                    let fieldFeedback = checkField(value, field, section);
                    fieldFeedback = [...fieldFeedback, ...validateClinicalContent(value, field)];
                    if (fieldFeedback.length > 0) {
                        newFeedback[section][field] = fieldFeedback;
                    }
                });
            });
        }
        if (activeMethod === 'chart') {
            newFeedback.chart = {};
            templates.chart.fields.forEach((field) => {
                const fieldKey = `chart_${field.replace(/\s+/g, '')}`;
                const value = formData[fieldKey] || '';
                let fieldFeedback = checkField(value, field, 'chart');
                fieldFeedback = [...fieldFeedback, ...validateClinicalContent(value, field)];
                if (fieldFeedback.length > 0) {
                    newFeedback.chart[field] = fieldFeedback;
                }
            });
        }
        if (activeMethod === 'chronological') {
            newFeedback.chronological = [];
            chronologicalEntries.forEach((entry, index) => {
                const entryFeedback = [];
                if (!entry.time) {
                    entryFeedback.push('Time stamp is missing.');
                }
                if (!entry.entry) {
                    entryFeedback.push('Entry Description is empty. Provide a detailed narrative.');
                }
                else if (entry.entry.length < 15) {
                    entryFeedback.push('Entry Description is too brief. Include specific observations or events.');
                }
                if (!entry.vitals) {
                    entryFeedback.push('Vital Signs are missing. Include BP, HR, RR, etc.');
                }
                if (!entry.actions) {
                    entryFeedback.push('Actions Taken are missing. Document interventions performed.');
                }
                if (entryFeedback.length > 0) {
                    newFeedback.chronological[index] = entryFeedback;
                }
            });
        }
        setFeedback(newFeedback);
    };
    const renderSOAPForm = () => (_jsx("div", { className: "space-y-6", children: Object.entries(templates.soap).map(([section, data]) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center text-xl capitalize", children: [section === 'subjective' && _jsx(User, { className: "mr-2", size: 24 }), section === 'objective' && _jsx(Activity, { className: "mr-2", size: 24 }), section === 'assessment' && _jsx(Stethoscope, { className: "mr-2", size: 24 }), section === 'plan' && _jsx(FileText, { className: "mr-2", size: 24 }), section] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: data.fields.map(field => (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: field }), _jsx(Textarea, { value: formData[`${section}_${field.replace(/\s+/g, '')}`] || '', onChange: (e) => handleInputChange(section, field.replace(/\s+/g, ''), e.target.value), placeholder: data.examples[field] || `Enter ${field.toLowerCase()}...`, className: "min-h-[100px]" })] }, field))) }) })] }, section))) }));
    const renderCHARTForm = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl", children: "CHART Documentation" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: templates.chart.fields.map(field => (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: field }), _jsx(Textarea, { value: formData[`chart_${field.replace(/\s+/g, '')}`] || '', onChange: (e) => handleInputChange('chart', field.replace(/\s+/g, ''), e.target.value), placeholder: templates.chart.examples[field] || `Enter ${field.toLowerCase()}...`, className: "min-h-[100px]" })] }, field))) }) })] }) }));
    const renderChronologicalForm = () => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { className: "flex items-center text-xl", children: [_jsx(Clock, { className: "mr-2", size: 24 }), "Chronological Timeline"] }), _jsxs(Button, { onClick: addChronologicalEntry, className: "flex items-center", children: [_jsx(Plus, { className: "mr-1", size: 16 }), "Add Entry"] })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: chronologicalEntries.map(entry => (_jsxs("div", { className: "border rounded-lg p-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-3", children: [_jsx(Input, { type: "time", value: entry.time, onChange: (e) => updateChronologicalEntry(entry.id, 'time', e.target.value), className: "w-auto" }), _jsx(Button, { variant: "destructive", size: "sm", onClick: () => removeChronologicalEntry(entry.id), children: _jsx(Minus, { size: 16 }) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Entry Description" }), _jsx(Textarea, { value: entry.entry, onChange: (e) => updateChronologicalEntry(entry.id, 'entry', e.target.value), placeholder: "Dispatched for chest pain complaint...", rows: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Vital Signs" }), _jsx(Textarea, { value: entry.vitals, onChange: (e) => updateChronologicalEntry(entry.id, 'vitals', e.target.value), placeholder: "BP: 116/78, HR: 72...", rows: 3 })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Actions Taken" }), _jsx(Textarea, { value: entry.actions, onChange: (e) => updateChronologicalEntry(entry.id, 'actions', e.target.value), placeholder: "Oxygen applied, IV established...", rows: 3 })] })] })] }, entry.id))) }) })] }) }));
    if (!open)
        return null;
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "max-w-7xl max-h-[90vh] overflow-y-auto", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { className: "text-2xl", children: "Ultimate PCR Documentation Guide" }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "relative flex-1 mr-4", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400", size: 20 }), _jsx(Input, { type: "text", placeholder: "Search fields...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }), _jsx(Button, { variant: "outline", onClick: () => setDarkMode(!darkMode), size: "sm", children: darkMode ? _jsx(Sun, { size: 20 }) : _jsx(Moon, { size: 20 }) })] }), _jsxs("div", { className: "flex space-x-4", children: [_jsx(Button, { onClick: () => setActiveMethod('soap'), variant: activeMethod === 'soap' ? 'default' : 'outline', children: "SOAP Method" }), _jsx(Button, { onClick: () => setActiveMethod('chart'), variant: activeMethod === 'chart' ? 'default' : 'outline', children: "CHART Method" }), _jsx(Button, { onClick: () => setActiveMethod('chronological'), variant: activeMethod === 'chronological' ? 'default' : 'outline', children: "Chronological Method" })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { children: [activeMethod === 'soap' && 'SOAP Method Guide', activeMethod === 'chart' && 'CHART Method Guide', activeMethod === 'chronological' && 'Chronological Method Guide'] }) }), _jsxs(CardContent, { children: [activeMethod === 'soap' && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { children: [_jsx("strong", { children: "Subjective:" }), " Patient's complaints, symptoms, and history (OPQRST format)"] }), _jsxs("div", { children: [_jsx("strong", { children: "Objective:" }), " Measurable findings, vital signs, physical exam, diagnostics"] }), _jsxs("div", { children: [_jsx("strong", { children: "Assessment:" }), " Clinical impression, differential diagnosis"] }), _jsxs("div", { children: [_jsx("strong", { children: "Plan:" }), " Interventions, medications, transport decisions"] })] })), activeMethod === 'chart' && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { children: [_jsx("strong", { children: "Chief Complaint:" }), " Primary reason for call"] }), _jsxs("div", { children: [_jsx("strong", { children: "History:" }), " Medical history and incident details"] }), _jsxs("div", { children: [_jsx("strong", { children: "Assessment:" }), " Physical findings and vital signs"] }), _jsxs("div", { children: [_jsx("strong", { children: "Rx (Treatment):" }), " Interventions and medications administered"] }), _jsxs("div", { children: [_jsx("strong", { children: "Transport:" }), " Destination and handoff information"] })] })), activeMethod === 'chronological' && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { children: [_jsx("strong", { children: "Timeline Format:" }), " Document events in chronological order"] }), _jsxs("div", { children: [_jsx("strong", { children: "Time Stamps:" }), " Include exact times for all entries"] }), _jsxs("div", { children: [_jsx("strong", { children: "Comprehensive:" }), " Include vitals, actions, and observations for each entry"] }), _jsxs("div", { children: [_jsx("strong", { children: "Handoff:" }), " Document complete patient transfer information"] })] }))] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-1", children: [_jsx(BMICalculator, {}), _jsx(FeedbackPanel, { feedback: feedback, activeMethod: activeMethod }), _jsxs(Card, { className: "mb-4", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Actions" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { onClick: generateFeedback, className: "w-full", variant: "outline", children: [_jsx(FileText, { className: "mr-2", size: 16 }), "Generate Feedback"] }), _jsxs(Button, { onClick: () => setShowSampleModal(true), className: "w-full", variant: "outline", children: [_jsx(FileText, { className: "mr-2", size: 16 }), "View Sample Reports"] }), _jsxs(Button, { onClick: exportSBAR, className: "w-full", variant: "outline", children: [_jsx(Download, { className: "mr-2", size: 16 }), "Export SBAR"] }), _jsxs(Button, { onClick: saveDraft, className: "w-full", variant: "outline", children: [_jsx(Save, { className: "mr-2", size: 16 }), "Save Draft"] })] }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Quick Reference" }) }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2 text-sm", children: [_jsx("div", { children: _jsx("strong", { children: "Normal Vitals:" }) }), _jsx("div", { children: "BP: 120/80 mmHg" }), _jsx("div", { children: "HR: 60-100 bpm" }), _jsx("div", { children: "RR: 12-20 bpm" }), _jsx("div", { children: "SpO2: >95%" }), _jsx("div", { children: "Temp: 98.6\u00B0F" })] }) })] })] }), _jsxs("div", { className: "lg:col-span-3", children: [activeMethod === 'soap' && renderSOAPForm(), activeMethod === 'chart' && renderCHARTForm(), activeMethod === 'chronological' && renderChronologicalForm()] })] })] }), _jsx(SampleReportsModal, { isOpen: showSampleModal, onClose: () => setShowSampleModal(false), sampleReports: sampleReports, setFormData: setFormData, setChronologicalEntries: setChronologicalEntries })] }) }));
}
