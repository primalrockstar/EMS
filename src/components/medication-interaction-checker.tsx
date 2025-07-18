import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Search, Plus, X, Clock, User, FileText } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface MedicationInteractionCheckerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DrugInteraction {
  id: string;
  drug1: string;
  drug2: string;
  severity: 'major' | 'moderate' | 'minor';
  description: string;
  clinicalEffects: string;
  management: string;
}

interface MedicationLog {
  id: string;
  medicationName: string;
  dosage: string;
  route: string;
  timestamp: Date;
  administeredBy: string;
  patientId?: string;
  notes?: string;
}

export default function MedicationInteractionChecker({ open, onOpenChange }: MedicationInteractionCheckerProps) {
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [patientInfo, setPatientInfo] = useState({
    age: "",
    weight: "",
    allergies: ""
  });
  const [administrationLog, setAdministrationLog] = useState<MedicationLog[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch Clark County approved medications
  const { data: medications = [] } = useQuery({
    queryKey: ["/api/medications"],
    enabled: open,
  });

  // Filter medications based on search
  const filteredMedications = medications.filter((med: any) => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (med.category && med.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (med.scope && med.scope.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Clark County EMS medication interactions (based on actual medication database)
  const clarkCountyInteractions: DrugInteraction[] = [
    {
      id: "1",
      drug1: "Aspirin",
      drug2: "Warfarin",
      severity: "major",
      description: "Increased risk of bleeding",
      clinicalEffects: "May increase anticoagulant effects leading to bleeding complications",
      management: "Monitor INR closely, consider alternative antiplatelet therapy"
    },
    {
      id: "2",
      drug1: "Morphine",
      drug2: "Lorazepam",
      severity: "major",
      description: "Enhanced CNS depression",
      clinicalEffects: "Increased sedation, respiratory depression",
      management: "Use with extreme caution, monitor respiratory status"
    },
    {
      id: "3",
      drug1: "Epinephrine",
      drug2: "Propranolol",
      severity: "moderate",
      description: "Reduced effectiveness of epinephrine",
      clinicalEffects: "Beta-blocker may reduce epinephrine effectiveness",
      management: "Consider higher doses of epinephrine if needed"
    },
    {
      id: "4",
      drug1: "Fentanyl",
      drug2: "Midazolam",
      severity: "major",
      description: "Synergistic CNS and respiratory depression",
      clinicalEffects: "Severe sedation, respiratory depression, potential coma",
      management: "Reduce doses, continuous monitoring, have naloxone/flumazenil ready"
    },
    {
      id: "5",
      drug1: "Naloxone",
      drug2: "Morphine",
      severity: "major",
      description: "Opioid antagonist reversal",
      clinicalEffects: "Naloxone will reverse morphine effects, potential withdrawal",
      management: "Monitor for return of pain, respiratory depression after naloxone wears off"
    },
    {
      id: "6",
      drug1: "Adenosine",
      drug2: "Theophylline",
      severity: "moderate",
      description: "Reduced adenosine effectiveness",
      clinicalEffects: "Methylxanthines block adenosine receptors",
      management: "May require higher adenosine doses"
    },
    {
      id: "7",
      drug1: "Succinylcholine",
      drug2: "Atracurium",
      severity: "major",
      description: "Prolonged neuromuscular blockade",
      clinicalEffects: "Extended paralysis, respiratory compromise",
      management: "Avoid combination, ensure adequate ventilation"
    },
    {
      id: "8",
      drug1: "Dopamine",
      drug2: "Norepinephrine",
      severity: "moderate",
      description: "Additive vasopressor effects",
      clinicalEffects: "Severe hypertension, arrhythmias",
      management: "Monitor blood pressure closely, reduce doses if needed"
    },
    {
      id: "9",
      drug1: "Amiodarone",
      drug2: "Digoxin",
      severity: "major",
      description: "Increased digoxin levels",
      clinicalEffects: "Digoxin toxicity, arrhythmias",
      management: "Monitor digoxin levels, reduce digoxin dose"
    },
    {
      id: "10",
      drug1: "Lidocaine",
      drug2: "Propranolol",
      severity: "moderate",
      description: "Increased lidocaine toxicity",
      clinicalEffects: "Enhanced CNS and cardiac effects",
      management: "Monitor for lidocaine toxicity signs"
    }
  ];

  // Check for interactions using fuzzy matching and partial name recognition
  const checkInteractions = () => {
    const interactions: DrugInteraction[] = [];
    
    for (let i = 0; i < selectedMedications.length; i++) {
      for (let j = i + 1; j < selectedMedications.length; j++) {
        const drug1 = selectedMedications[i];
        const drug2 = selectedMedications[j];
        
        // Check for exact matches first
        let interaction = clarkCountyInteractions.find(
          int => (int.drug1 === drug1 && int.drug2 === drug2) ||
                 (int.drug1 === drug2 && int.drug2 === drug1)
        );
        
        // If no exact match, check for partial/fuzzy matches
        if (!interaction) {
          interaction = clarkCountyInteractions.find(
            int => (drug1.toLowerCase().includes(int.drug1.toLowerCase()) && drug2.toLowerCase().includes(int.drug2.toLowerCase())) ||
                   (drug1.toLowerCase().includes(int.drug2.toLowerCase()) && drug2.toLowerCase().includes(int.drug1.toLowerCase())) ||
                   (int.drug1.toLowerCase().includes(drug1.toLowerCase()) && int.drug2.toLowerCase().includes(drug2.toLowerCase())) ||
                   (int.drug2.toLowerCase().includes(drug1.toLowerCase()) && int.drug1.toLowerCase().includes(drug2.toLowerCase()))
          );
        }
        
        if (interaction) {
          interactions.push(interaction);
        }
      }
    }
    
    return interactions;
  };

  const interactions = checkInteractions();

  const addMedication = (medicationName: string) => {
    if (!selectedMedications.includes(medicationName)) {
      setSelectedMedications([...selectedMedications, medicationName]);
    }
  };

  const removeMedication = (medicationName: string) => {
    setSelectedMedications(selectedMedications.filter(med => med !== medicationName));
  };

  const logMedication = useMutation({
    mutationFn: async (logData: Omit<MedicationLog, 'id'>) => {
      // In real app, this would save to database
      const newLog: MedicationLog = {
        ...logData,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      setAdministrationLog([...administrationLog, newLog]);
      return newLog;
    },
    onSuccess: () => {
      toast({
        title: "Medication Logged",
        description: "Medication administration has been recorded",
      });
    },
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'major':
        return <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Major
        </Badge>;
      case 'moderate':
        return <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-100 text-yellow-800">
          <AlertTriangle className="h-3 w-3" />
          Moderate
        </Badge>;
      case 'minor':
        return <Badge variant="outline" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Minor
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Medication Interaction Checker
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="checker" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checker">Interaction Checker</TabsTrigger>
            <TabsTrigger value="patient">Patient Information</TabsTrigger>
            <TabsTrigger value="log">Administration Log</TabsTrigger>
          </TabsList>

          <TabsContent value="checker" className="space-y-4">
            {/* Medication Search */}
            <div className="space-y-2">
              <Label htmlFor="medication-search">Search Clark County Approved Medications</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="medication-search"
                  placeholder="Search medications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Medication List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Available Medications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                  {filteredMedications.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      {searchTerm ? 'No medications match your search' : 'Loading medications...'}
                    </p>
                  ) : (
                    filteredMedications.map((med: any) => (
                      <div key={med.id} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-gray-600">{med.scope || med.category || 'EMS Medication'}</p>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addMedication(med.name)}
                          disabled={selectedMedications.includes(med.name)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Selected Medications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                  {selectedMedications.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No medications selected</p>
                  ) : (
                    selectedMedications.map((med, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="font-medium">{med}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removeMedication(med)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Interaction Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {interactions.length === 0 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                  )}
                  Interaction Analysis
                  <Badge variant="outline" className="ml-2">
                    {selectedMedications.length} medications selected
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedMedications.length < 2 ? (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Select at least 2 medications to check for interactions.
                    </AlertDescription>
                  </Alert>
                ) : interactions.length === 0 ? (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      No significant drug interactions detected with selected medications.
                      <div className="mt-2 text-xs text-gray-600">
                        Checked combinations: {selectedMedications.map((med, i) => 
                          selectedMedications.slice(i+1).map(med2 => `${med} + ${med2}`).join(', ')
                        ).filter(Boolean).join(', ') || 'None'}
                      </div>
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-4">
                    {interactions.map((interaction) => (
                      <Alert key={interaction.id} className="border-orange-200">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{interaction.drug1} + {interaction.drug2}</span>
                              {getSeverityBadge(interaction.severity)}
                            </div>
                            <p className="text-sm">{interaction.description}</p>
                            <details className="text-sm">
                              <summary className="font-medium cursor-pointer">Clinical Effects & Management</summary>
                              <div className="mt-2 space-y-1">
                                <p><strong>Effects:</strong> {interaction.clinicalEffects}</p>
                                <p><strong>Management:</strong> {interaction.management}</p>
                              </div>
                            </details>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patient" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={patientInfo.age}
                      onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                      placeholder="Patient age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={patientInfo.weight}
                      onChange={(e) => setPatientInfo({...patientInfo, weight: e.target.value})}
                      placeholder="Patient weight"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Input
                    id="allergies"
                    value={patientInfo.allergies}
                    onChange={(e) => setPatientInfo({...patientInfo, allergies: e.target.value})}
                    placeholder="List known allergies"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="log" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Medication Administration Log
                </CardTitle>
              </CardHeader>
              <CardContent>
                {administrationLog.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No medications logged yet</p>
                ) : (
                  <div className="space-y-4">
                    {administrationLog.map((log) => (
                      <div key={log.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{log.medicationName}</h4>
                          <Badge variant="outline">{log.route}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Dosage:</strong> {log.dosage}
                          </div>
                          <div>
                            <strong>Time:</strong> {log.timestamp.toLocaleTimeString()}
                          </div>
                          <div>
                            <strong>Administered by:</strong> {log.administeredBy}
                          </div>
                          <div>
                            <strong>Date:</strong> {log.timestamp.toLocaleDateString()}
                          </div>
                        </div>
                        {log.notes && (
                          <div className="mt-2 text-sm">
                            <strong>Notes:</strong> {log.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}