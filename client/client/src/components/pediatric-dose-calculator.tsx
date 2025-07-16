import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface PediatricDoseCalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PediatricDoseCalculator({ open, onOpenChange }: PediatricDoseCalculatorProps) {
  const [inputs, setInputs] = useState({
    weight: "",
    medication: "",
    weightUnit: "kg",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Common pediatric medications with dosing
  const medications = [
    { 
      name: "Epinephrine", 
      dose: 0.01, 
      unit: "mg/kg", 
      route: "IV/IO",
      maxDose: 1,
      indication: "Cardiac arrest, anaphylaxis"
    },
    { 
      name: "Atropine", 
      dose: 0.02, 
      unit: "mg/kg", 
      route: "IV/IO",
      minDose: 0.1,
      maxDose: 0.5,
      indication: "Bradycardia"
    },
    { 
      name: "Amiodarone", 
      dose: 5, 
      unit: "mg/kg", 
      route: "IV/IO",
      maxDose: 300,
      indication: "V-Fib, V-Tach"
    },
    { 
      name: "Adenosine", 
      dose: 0.1, 
      unit: "mg/kg", 
      route: "IV/IO",
      maxDose: 6,
      indication: "SVT"
    },
    { 
      name: "Midazolam", 
      dose: 0.2, 
      unit: "mg/kg", 
      route: "IV/IM",
      maxDose: 10,
      indication: "Seizures, sedation"
    },
  ];

  const selectedMedication = medications.find(med => med.name === inputs.medication);
  
  const calculateDose = () => {
    if (!inputs.weight || !selectedMedication) return null;
    
    const weight = parseFloat(inputs.weight);
    if (isNaN(weight) || weight <= 0) return null;
    
    const weightInKg = inputs.weightUnit === "lb" ? weight * 0.453592 : weight;
    let calculatedDose = selectedMedication.dose * weightInKg;
    
    // Apply min/max constraints
    if (selectedMedication.minDose && calculatedDose < selectedMedication.minDose) {
      calculatedDose = selectedMedication.minDose;
    }
    if (selectedMedication.maxDose && calculatedDose > selectedMedication.maxDose) {
      calculatedDose = selectedMedication.maxDose;
    }
    
    return {
      dose: calculatedDose.toFixed(2),
      weightKg: weightInKg.toFixed(1),
      unit: selectedMedication.unit.split('/')[0], // Extract unit (mg from mg/kg)
    };
  };

  const result = calculateDose();

  const saveMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('POST', '/api/calculator-results', {
        calculatorType: 'pediatric_dose',
        inputs: { ...inputs, medication: selectedMedication },
        result: result,
        userId: 1
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Pediatric dose calculation saved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/calculator-results'] });
      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save calculation",
        variant: "destructive",
      });
    },
  });

  const resetInputs = () => {
    setInputs({
      weight: "",
      medication: "",
      weightUnit: "kg",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" aria-describedby="pediatric-dose-description">
        <DialogHeader>
          <DialogTitle>Pediatric Dose Calculator</DialogTitle>
          <div id="pediatric-dose-description" className="text-sm text-muted-foreground">
            Calculate weight-based medication dosing for pediatric patients
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Weight Input */}
          <div>
            <Label htmlFor="weight">Patient Weight</Label>
            <div className="flex space-x-2">
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={inputs.weight}
                onChange={(e) => setInputs(prev => ({ ...prev, weight: e.target.value }))}
                className="flex-1"
              />
              <Select 
                value={inputs.weightUnit} 
                onValueChange={(value) => setInputs(prev => ({ ...prev, weightUnit: value }))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Medication Selection */}
          <div>
            <Label htmlFor="medication">Medication</Label>
            <Select 
              value={inputs.medication} 
              onValueChange={(value) => setInputs(prev => ({ ...prev, medication: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select medication" />
              </SelectTrigger>
              <SelectContent>
                {medications.map((med) => (
                  <SelectItem key={med.name} value={med.name}>
                    {med.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Medication Info */}
          {selectedMedication && (
            <Card className="bg-muted/50">
              <CardContent className="p-3">
                <div className="text-sm space-y-1">
                  <div><strong>Indication:</strong> {selectedMedication.indication}</div>
                  <div><strong>Route:</strong> {selectedMedication.route}</div>
                  <div><strong>Standard Dose:</strong> {selectedMedication.dose} {selectedMedication.unit}</div>
                  {selectedMedication.maxDose && (
                    <div><strong>Max Dose:</strong> {selectedMedication.maxDose} {selectedMedication.unit.split('/')[0]}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Result */}
          {result && (
            <Card className="bg-primary/10">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {result.dose} {result.unit}
                </div>
                <div className="text-sm text-muted-foreground">
                  For {result.weightKg} kg patient
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Route: {selectedMedication?.route}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button 
              onClick={() => saveMutation.mutate()} 
              disabled={!result || saveMutation.isPending}
              className="flex-1"
            >
              <Save className="h-4 w-4 mr-2" />
              {saveMutation.isPending ? 'Saving...' : 'Save Result'}
            </Button>
            <Button variant="outline" onClick={resetInputs} className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
