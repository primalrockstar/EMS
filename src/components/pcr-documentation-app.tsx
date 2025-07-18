import React, { useState, useEffect } from 'react';
import { Search, Save, Download, Moon, Sun, Calculator, Clock, FileText, User, Activity, Stethoscope, Truck, Plus, Minus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface PCRDocumentationAppProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// BMI Calculator Component
const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const heightInInches = parseFloat(height);
      const weightInPounds = parseFloat(weight);
      const bmiValue = (weightInPounds / (heightInInches * heightInInches)) * 703;
      setBMI(parseFloat(bmiValue.toFixed(2)));
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal weight');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Calculator className="mr-2" size={20} />
          BMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Height (inches)
            </label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="70"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Weight (lbs)
            </label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="216"
            />
          </div>
        </div>
        <Button onClick={calculateBMI} className="w-full">
          Calculate BMI
        </Button>
        {bmi && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>BMI: {bmi}</strong> ({category})
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Feedback Panel Component
const FeedbackPanel = ({ feedback, activeMethod }: { feedback: any, activeMethod: string }) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="flex items-center text-lg">
        <FileText className="mr-2" size={20} />
        Feedback on Your Report
      </CardTitle>
    </CardHeader>
    <CardContent>
      {Object.keys(feedback).length === 0 ? (
        <p className="text-muted-foreground">No feedback available. Complete the form and click "Generate Feedback".</p>
      ) : (
        <div className="space-y-4">
          {activeMethod === 'soap' && Object.entries(feedback).map(([section, fields]: [string, any]) => (
            <div key={section}>
              <h4 className="font-medium capitalize">{section}</h4>
              {Object.entries(fields).map(([field, messages]: [string, any]) => (
                <div key={field} className="ml-4">
                  <p className="font-medium text-sm">{field}:</p>
                  <ul className="list-disc ml-6 text-sm text-muted-foreground">
                    {messages.map((msg: string, index: number) => (
                      <li key={index}>{msg}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          {activeMethod === 'chart' && feedback.chart && (
            <div>
              <h4 className="font-medium">CHART</h4>
              {Object.entries(feedback.chart).map(([field, messages]: [string, any]) => (
                <div key={field} className="ml-4">
                  <p className="font-medium text-sm">{field}:</p>
                  <ul className="list-disc ml-6 text-sm text-muted-foreground">
                    {messages.map((msg: string, index: number) => (
                      <li key={index}>{msg}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {activeMethod === 'chronological' && feedback.chronological && (
            <div>
              <h4 className="font-medium">Chronological Entries</h4>
              {feedback.chronological.map((entryFeedback: any, index: number) => (
                entryFeedback && (
                  <div key={index} className="ml-4">
                    <p className="font-medium text-sm">Entry {index + 1}:</p>
                    <ul className="list-disc ml-6 text-sm text-muted-foreground">
                      {entryFeedback.map((msg: string, i: number) => (
                        <li key={i}>{msg}</li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      )}
    </CardContent>
  </Card>
);

// Sample Reports Modal Component
const SampleReportsModal = ({ 
  isOpen, 
  onClose, 
  sampleReports, 
  setFormData, 
  setChronologicalEntries 
}: {
  isOpen: boolean;
  onClose: () => void;
  sampleReports: any[];
  setFormData: (data: any) => void;
  setChronologicalEntries: (entries: any[]) => void;
}) => {
  if (!isOpen) return null;

  const loadSample = (report: any) => {
    if (report.type === 'chronological') {
      setChronologicalEntries(report.content.entries);
      setFormData({});
    } else {
      setFormData(report.content);
      setChronologicalEntries([]);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sample Reports</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {sampleReports.map((report, index) => (
            <Button
              key={index}
              onClick={() => loadSample(report)}
              className="w-full justify-start"
              variant="outline"
            >
              {report.title}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main App Component
export default function PCRDocumentationApp({ open, onOpenChange }: PCRDocumentationAppProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [activeMethod, setActiveMethod] = useState('soap');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<any>({});
  const [chronologicalEntries, setChronologicalEntries] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any>({});
  const [showSampleModal, setShowSampleModal] = useState(false);

  useEffect(() => {
    if (open) {
      generateFeedback();
    }
  }, [formData, chronologicalEntries, open]);

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev: any) => ({
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

  const updateChronologicalEntry = (id: number, field: string, value: string) => {
    setChronologicalEntries(prev => prev.map(entry =>
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const removeChronologicalEntry = (id: number) => {
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
    const newFeedback: any = {};

    const checkField = (value: string, fieldName: string, section: string) => {
      const feedbackMessages = [];
      if (!value) {
        feedbackMessages.push(`${fieldName} is empty. Provide specific details.`);
      } else if (value.length < 10) {
        feedbackMessages.push(`${fieldName} is too brief. Include more details, e.g., "${templates[section as keyof typeof templates]?.examples?.[fieldName] || 'specific clinical details'}".`);
      }
      return feedbackMessages;
    };

    const validateClinicalContent = (value: string, fieldName: string) => {
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
        templates.soap[section as keyof typeof templates.soap].fields.forEach((field) => {
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
        } else if (entry.entry.length < 15) {
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

  const renderSOAPForm = () => (
    <div className="space-y-6">
      {Object.entries(templates.soap).map(([section, data]) => (
        <Card key={section}>
          <CardHeader>
            <CardTitle className="flex items-center text-xl capitalize">
              {section === 'subjective' && <User className="mr-2" size={24} />}
              {section === 'objective' && <Activity className="mr-2" size={24} />}
              {section === 'assessment' && <Stethoscope className="mr-2" size={24} />}
              {section === 'plan' && <FileText className="mr-2" size={24} />}
              {section}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.fields.map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2">
                    {field}
                  </label>
                  <Textarea
                    value={formData[`${section}_${field.replace(/\s+/g, '')}`] || ''}
                    onChange={(e) => handleInputChange(section, field.replace(/\s+/g, ''), e.target.value)}
                    placeholder={data.examples[field] || `Enter ${field.toLowerCase()}...`}
                    className="min-h-[100px]"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCHARTForm = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">CHART Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {templates.chart.fields.map(field => (
              <div key={field}>
                <label className="block text-sm font-medium mb-2">
                  {field}
                </label>
                <Textarea
                  value={formData[`chart_${field.replace(/\s+/g, '')}`] || ''}
                  onChange={(e) => handleInputChange('chart', field.replace(/\s+/g, ''), e.target.value)}
                  placeholder={templates.chart.examples[field] || `Enter ${field.toLowerCase()}...`}
                  className="min-h-[100px]"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChronologicalForm = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center text-xl">
              <Clock className="mr-2" size={24} />
              Chronological Timeline
            </CardTitle>
            <Button onClick={addChronologicalEntry} className="flex items-center">
              <Plus className="mr-1" size={16} />
              Add Entry
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chronologicalEntries.map(entry => (
              <div key={entry.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <Input
                    type="time"
                    value={entry.time}
                    onChange={(e) => updateChronologicalEntry(entry.id, 'time', e.target.value)}
                    className="w-auto"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeChronologicalEntry(entry.id)}
                  >
                    <Minus size={16} />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Entry Description
                    </label>
                    <Textarea
                      value={entry.entry}
                      onChange={(e) => updateChronologicalEntry(entry.id, 'entry', e.target.value)}
                      placeholder="Dispatched for chest pain complaint..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Vital Signs
                    </label>
                    <Textarea
                      value={entry.vitals}
                      onChange={(e) => updateChronologicalEntry(entry.id, 'vitals', e.target.value)}
                      placeholder="BP: 116/78, HR: 72..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Actions Taken
                    </label>
                    <Textarea
                      value={entry.actions}
                      onChange={(e) => updateChronologicalEntry(entry.id, 'actions', e.target.value)}
                      placeholder="Oxygen applied, IV established..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Ultimate PCR Documentation Guide</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search and Controls */}
          <div className="flex justify-between items-center">
            <div className="relative flex-1 mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              size="sm"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>

          {/* Method Selection */}
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveMethod('soap')}
              variant={activeMethod === 'soap' ? 'default' : 'outline'}
            >
              SOAP Method
            </Button>
            <Button
              onClick={() => setActiveMethod('chart')}
              variant={activeMethod === 'chart' ? 'default' : 'outline'}
            >
              CHART Method
            </Button>
            <Button
              onClick={() => setActiveMethod('chronological')}
              variant={activeMethod === 'chronological' ? 'default' : 'outline'}
            >
              Chronological Method
            </Button>
          </div>

          {/* Method Guide */}
          <Card>
            <CardHeader>
              <CardTitle>
                {activeMethod === 'soap' && 'SOAP Method Guide'}
                {activeMethod === 'chart' && 'CHART Method Guide'}
                {activeMethod === 'chronological' && 'Chronological Method Guide'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeMethod === 'soap' && (
                <div className="space-y-2">
                  <div><strong>Subjective:</strong> Patient's complaints, symptoms, and history (OPQRST format)</div>
                  <div><strong>Objective:</strong> Measurable findings, vital signs, physical exam, diagnostics</div>
                  <div><strong>Assessment:</strong> Clinical impression, differential diagnosis</div>
                  <div><strong>Plan:</strong> Interventions, medications, transport decisions</div>
                </div>
              )}
              {activeMethod === 'chart' && (
                <div className="space-y-2">
                  <div><strong>Chief Complaint:</strong> Primary reason for call</div>
                  <div><strong>History:</strong> Medical history and incident details</div>
                  <div><strong>Assessment:</strong> Physical findings and vital signs</div>
                  <div><strong>Rx (Treatment):</strong> Interventions and medications administered</div>
                  <div><strong>Transport:</strong> Destination and handoff information</div>
                </div>
              )}
              {activeMethod === 'chronological' && (
                <div className="space-y-2">
                  <div><strong>Timeline Format:</strong> Document events in chronological order</div>
                  <div><strong>Time Stamps:</strong> Include exact times for all entries</div>
                  <div><strong>Comprehensive:</strong> Include vitals, actions, and observations for each entry</div>
                  <div><strong>Handoff:</strong> Document complete patient transfer information</div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Tools */}
            <div className="lg:col-span-1">
              <BMICalculator />
              <FeedbackPanel feedback={feedback} activeMethod={activeMethod} />
              
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button onClick={generateFeedback} className="w-full" variant="outline">
                      <FileText className="mr-2" size={16} />
                      Generate Feedback
                    </Button>
                    <Button onClick={() => setShowSampleModal(true)} className="w-full" variant="outline">
                      <FileText className="mr-2" size={16} />
                      View Sample Reports
                    </Button>
                    <Button onClick={exportSBAR} className="w-full" variant="outline">
                      <Download className="mr-2" size={16} />
                      Export SBAR
                    </Button>
                    <Button onClick={saveDraft} className="w-full" variant="outline">
                      <Save className="mr-2" size={16} />
                      Save Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Reference</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><strong>Normal Vitals:</strong></div>
                    <div>BP: 120/80 mmHg</div>
                    <div>HR: 60-100 bpm</div>
                    <div>RR: 12-20 bpm</div>
                    <div>SpO2: &gt;95%</div>
                    <div>Temp: 98.6°F</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeMethod === 'soap' && renderSOAPForm()}
              {activeMethod === 'chart' && renderCHARTForm()}
              {activeMethod === 'chronological' && renderChronologicalForm()}
            </div>
          </div>
        </div>

        <SampleReportsModal
          isOpen={showSampleModal}
          onClose={() => setShowSampleModal(false)}
          sampleReports={sampleReports}
          setFormData={setFormData}
          setChronologicalEntries={setChronologicalEntries}
        />
      </DialogContent>
    </Dialog>
  );
}