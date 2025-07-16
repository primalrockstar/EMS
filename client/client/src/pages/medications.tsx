import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Pill, AlertTriangle, Info } from "lucide-react";

export default function Medications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [scopeFilter, setScopeFilter] = useState("all");

  const { data: medications, isLoading } = useQuery({
    queryKey: ["/api/medications", { search: searchTerm, category: categoryFilter !== "all" ? categoryFilter : undefined, scope: scopeFilter !== "all" ? scopeFilter : undefined }],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(categoryFilter !== "all" && { category: categoryFilter }),
        ...(scopeFilter !== "all" && { scope: scopeFilter }),
      });
      const response = await fetch(`/api/medications?${params}`);
      return response.json();
    },
  });

  const categoryColors = {
    cardiac: "bg-red-500",
    respiratory: "bg-blue-500",
    neurological: "bg-green-500",
    analgesic: "bg-purple-500",
    sedative: "bg-indigo-500",
    antibiotic: "bg-yellow-500",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medication Reference</h1>
        <p className="text-muted-foreground">
          Comprehensive EMS medication guide with dosages and contraindications
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search medications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={scopeFilter} onValueChange={setScopeFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Scopes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Scopes</SelectItem>
                <SelectItem value="EMT-B">EMT-Basic</SelectItem>
                <SelectItem value="AEMT">AEMT</SelectItem>
                <SelectItem value="Paramedic">Paramedic</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="cardiac">Cardiac</SelectItem>
                <SelectItem value="respiratory">Respiratory</SelectItem>
                <SelectItem value="neurological">Neurological</SelectItem>
                <SelectItem value="analgesic">Analgesic</SelectItem>
                <SelectItem value="gastrointestinal">Gastrointestinal</SelectItem>
                <SelectItem value="hematological">Hematological</SelectItem>
                <SelectItem value="toxicology">Toxicology</SelectItem>
                <SelectItem value="hormonal">Hormonal</SelectItem>
                <SelectItem value="electrolyte">Electrolyte</SelectItem>
                <SelectItem value="obstetric">Obstetric</SelectItem>
                <SelectItem value="diuretic">Diuretic</SelectItem>
                <SelectItem value="anti-inflammatory">Anti-inflammatory</SelectItem>
                <SelectItem value="anesthetic">Anesthetic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Medication List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">Loading medications...</div>
        ) : medications?.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-muted-foreground">
                No medications found matching your search.
              </div>
            </CardContent>
          </Card>
        ) : (
          medications?.map((medication: any) => (
            <Card key={medication.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Pill className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-xl">{medication.name}</h3>
                      {medication.scope && (
                        <Badge variant="outline" className="border-primary text-primary">
                          {medication.scope}
                        </Badge>
                      )}
                      {medication.category && (
                        <Badge className={`${categoryColors[medication.category as keyof typeof categoryColors] || 'bg-gray-500'} text-white`}>
                          {medication.category.toUpperCase()}
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      {/* Indications */}
                      {medication.indications && medication.indications.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center">
                            <Info className="h-4 w-4 mr-1" />
                            INDICATIONS
                          </h4>
                          <ul className="text-sm space-y-1">
                            {medication.indications.map((indication: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                {indication}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Contraindications */}
                      {medication.contraindications && medication.contraindications.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm text-muted-foreground mb-2 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            CONTRAINDICATIONS
                          </h4>
                          <ul className="text-sm space-y-1">
                            {medication.contraindications.map((contraindication: string, index: number) => (
                              <li key={index} className="flex items-center text-red-600">
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                {contraindication}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Dosage Information */}
                    <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">DOSAGE INFORMATION</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        {medication.adultDose && (
                          <div>
                            <span className="font-medium">Adult:</span> {medication.adultDose}
                          </div>
                        )}
                        {medication.pediatricDose && (
                          <div>
                            <span className="font-medium">Pediatric:</span> {medication.pediatricDose}
                          </div>
                        )}
                        {medication.route && (
                          <div>
                            <span className="font-medium">Route:</span> {medication.route}
                          </div>
                        )}
                      </div>
                      {medication.notes && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          <span className="font-medium">Notes:</span> {medication.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
