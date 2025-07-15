import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ProtocolUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProtocolUpload({ open, onOpenChange }: ProtocolUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    state: "",
    ageGroup: "adult_pediatric",
    content: "",
  });
  const [preview, setPreview] = useState<string>("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      if (uploadedFile) {
        setFile(uploadedFile);
        setFormData(prev => ({ ...prev, name: uploadedFile.name.split('.')[0] }));
        
        // Simple preview for text files
        if (uploadedFile.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const content = JSON.parse(e.target?.result as string);
              setPreview(JSON.stringify(content, null, 2));
            } catch (error) {
              setPreview("Invalid JSON file");
            }
          };
          reader.readAsText(uploadedFile);
        } else {
          setPreview(`File: ${uploadedFile.name} (${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)`);
        }
      }
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const formDataToSend = new FormData();
      if (file) {
        formDataToSend.append('file', file);
      }
      formDataToSend.append('name', formData.name);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('ageGroup', formData.ageGroup);
      formDataToSend.append('content', formData.content || preview);
      formDataToSend.append('userId', '1'); // Mock user ID

      return await apiRequest('POST', '/api/protocols', formDataToSend);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Protocol uploaded successfully",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/protocols'] });
      queryClient.invalidateQueries({ queryKey: ['/api/dashboard/stats'] });
      onOpenChange(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload protocol",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFile(null);
    setFormData({
      name: "",
      category: "",
      state: "",
      ageGroup: "adult_pediatric",
      content: "",
    });
    setPreview("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    uploadMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Protocol</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium mb-2">
              {isDragActive ? 'Drop files here' : 'Drop files here or click to browse'}
            </h4>
            <p className="text-muted-foreground">
              Supports PDF, Word (.docx), and JSON files
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Protocol Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Cardiac Arrest Protocol"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiac">Cardiac</SelectItem>
                  <SelectItem value="respiratory">Respiratory</SelectItem>
                  <SelectItem value="trauma">Trauma</SelectItem>
                  <SelectItem value="pediatric">Pediatric</SelectItem>
                  <SelectItem value="neurological">Neurological</SelectItem>
                  <SelectItem value="toxicology">Toxicology</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="obstetrics">Obstetrics</SelectItem>
                  <SelectItem value="behavioral">Behavioral Health</SelectItem>
                  <SelectItem value="environmental">Environmental</SelectItem>
                  <SelectItem value="burns">Burns</SelectItem>
                  <SelectItem value="overdose">Overdose</SelectItem>
                  <SelectItem value="pain_management">Pain Management</SelectItem>
                  <SelectItem value="airway">Airway Management</SelectItem>
                  <SelectItem value="shock">Shock</SelectItem>
                  <SelectItem value="allergic">Allergic Reactions</SelectItem>
                  <SelectItem value="infectious">Infectious Disease</SelectItem>
                  <SelectItem value="geriatric">Geriatric</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="procedures">Procedures</SelectItem>
                  <SelectItem value="medications">Medications</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="communications">Communications</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="quality_assurance">Quality Assurance</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                  <SelectItem value="legal">Legal/Ethical</SelectItem>
                  <SelectItem value="special_populations">Special Populations</SelectItem>
                  <SelectItem value="mass_casualty">Mass Casualty</SelectItem>
                  <SelectItem value="hazmat">Hazmat</SelectItem>
                  <SelectItem value="water_rescue">Water Rescue</SelectItem>
                  <SelectItem value="wilderness">Wilderness</SelectItem>
                  <SelectItem value="tactical">Tactical</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="state">State/Region</Label>
              <Select 
                value={formData.state} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alabama">Alabama</SelectItem>
                  <SelectItem value="alaska">Alaska</SelectItem>
                  <SelectItem value="arizona">Arizona</SelectItem>
                  <SelectItem value="arkansas">Arkansas</SelectItem>
                  <SelectItem value="california">California</SelectItem>
                  <SelectItem value="colorado">Colorado</SelectItem>
                  <SelectItem value="connecticut">Connecticut</SelectItem>
                  <SelectItem value="delaware">Delaware</SelectItem>
                  <SelectItem value="florida">Florida</SelectItem>
                  <SelectItem value="georgia">Georgia</SelectItem>
                  <SelectItem value="hawaii">Hawaii</SelectItem>
                  <SelectItem value="idaho">Idaho</SelectItem>
                  <SelectItem value="illinois">Illinois</SelectItem>
                  <SelectItem value="indiana">Indiana</SelectItem>
                  <SelectItem value="iowa">Iowa</SelectItem>
                  <SelectItem value="kansas">Kansas</SelectItem>
                  <SelectItem value="kentucky">Kentucky</SelectItem>
                  <SelectItem value="louisiana">Louisiana</SelectItem>
                  <SelectItem value="maine">Maine</SelectItem>
                  <SelectItem value="maryland">Maryland</SelectItem>
                  <SelectItem value="massachusetts">Massachusetts</SelectItem>
                  <SelectItem value="michigan">Michigan</SelectItem>
                  <SelectItem value="minnesota">Minnesota</SelectItem>
                  <SelectItem value="mississippi">Mississippi</SelectItem>
                  <SelectItem value="missouri">Missouri</SelectItem>
                  <SelectItem value="montana">Montana</SelectItem>
                  <SelectItem value="nebraska">Nebraska</SelectItem>
                  <SelectItem value="nevada">Nevada</SelectItem>
                  <SelectItem value="new_hampshire">New Hampshire</SelectItem>
                  <SelectItem value="new_jersey">New Jersey</SelectItem>
                  <SelectItem value="new_mexico">New Mexico</SelectItem>
                  <SelectItem value="new_york">New York</SelectItem>
                  <SelectItem value="north_carolina">North Carolina</SelectItem>
                  <SelectItem value="north_dakota">North Dakota</SelectItem>
                  <SelectItem value="ohio">Ohio</SelectItem>
                  <SelectItem value="oklahoma">Oklahoma</SelectItem>
                  <SelectItem value="oregon">Oregon</SelectItem>
                  <SelectItem value="pennsylvania">Pennsylvania</SelectItem>
                  <SelectItem value="rhode_island">Rhode Island</SelectItem>
                  <SelectItem value="south_carolina">South Carolina</SelectItem>
                  <SelectItem value="south_dakota">South Dakota</SelectItem>
                  <SelectItem value="tennessee">Tennessee</SelectItem>
                  <SelectItem value="texas">Texas</SelectItem>
                  <SelectItem value="utah">Utah</SelectItem>
                  <SelectItem value="vermont">Vermont</SelectItem>
                  <SelectItem value="virginia">Virginia</SelectItem>
                  <SelectItem value="washington">Washington</SelectItem>
                  <SelectItem value="west_virginia">West Virginia</SelectItem>
                  <SelectItem value="wisconsin">Wisconsin</SelectItem>
                  <SelectItem value="wyoming">Wyoming</SelectItem>
                  <SelectItem value="district_of_columbia">District of Columbia</SelectItem>
                  <SelectItem value="puerto_rico">Puerto Rico</SelectItem>
                  <SelectItem value="american_samoa">American Samoa</SelectItem>
                  <SelectItem value="guam">Guam</SelectItem>
                  <SelectItem value="northern_mariana_islands">Northern Mariana Islands</SelectItem>
                  <SelectItem value="us_virgin_islands">US Virgin Islands</SelectItem>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ageGroup">Applicable To</Label>
              <Select 
                value={formData.ageGroup} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, ageGroup: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adult_pediatric">Adult & Pediatric</SelectItem>
                  <SelectItem value="adult">Adult Only</SelectItem>
                  <SelectItem value="pediatric">Pediatric Only</SelectItem>
                  <SelectItem value="geriatric">Geriatric</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview */}
          {preview && (
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Preview</h4>
                <div className="text-sm text-muted-foreground">
                  {file && (
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="h-4 w-4 text-red-500" />
                      <span>{file.name}</span>
                      <span className="text-xs bg-muted px-2 py-1 rounded">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  )}
                  <pre className="whitespace-pre-wrap text-xs bg-muted p-2 rounded max-h-32 overflow-y-auto">
                    {preview}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Button type="submit" disabled={uploadMutation.isPending} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              {uploadMutation.isPending ? 'Saving...' : 'Save Protocol'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
