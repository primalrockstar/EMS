import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  Clock, 
  Heart, 
  Activity, 
  Thermometer,
  Brain,
  Flame,
  Stethoscope,
  Zap
} from "lucide-react";

interface ProtocolSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProtocolSearch({ open, onOpenChange }: ProtocolSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedUrgency, setSelectedUrgency] = useState("all");

  const { data: protocols, isLoading } = useQuery({
    queryKey: ["/api/protocols", searchTerm, selectedCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      
      const response = await fetch(`/api/protocols?${params}`);
      return response.json();
    },
  });

  const categories = [
    { id: "all", name: "All Categories", icon: Filter },
    { id: "cardiac", name: "Cardiac", icon: Heart },
    { id: "respiratory", name: "Respiratory", icon: Activity },
    { id: "trauma", name: "Trauma", icon: Flame },
    { id: "neurological", name: "Neurological", icon: Brain },
    { id: "pediatric", name: "Pediatric", icon: Thermometer },
    { id: "toxicology", name: "Toxicology", icon: Zap },
    { id: "procedure", name: "Procedures", icon: Stethoscope }
  ];

  const urgencyLevels = [
    { id: "all", name: "All Urgency" },
    { id: "critical", name: "Critical" },
    { id: "urgent", name: "Urgent" },
    { id: "standard", name: "Standard" }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      cardiac: "bg-red-500",
      respiratory: "bg-blue-500",
      trauma: "bg-orange-500",
      neurological: "bg-purple-500",
      pediatric: "bg-green-500",
      toxicology: "bg-yellow-500",
      procedure: "bg-pink-500"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      critical: "bg-red-500",
      urgent: "bg-orange-500",
      standard: "bg-green-500"
    };
    return colors[urgency as keyof typeof colors] || "bg-gray-500";
  };

  const filteredProtocols = protocols?.filter((protocol: any) => {
    const matchesSearch = protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         protocol.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || protocol.category === selectedCategory;
    const matchesUrgency = selectedUrgency === "all" || protocol.urgency === selectedUrgency;
    
    return matchesSearch && matchesCategory && matchesUrgency;
  }) || [];

  const handleProtocolClick = (protocol: any) => {
    // Navigate to protocol detail or open modal
    window.location.href = `/protocols/${protocol.id}`;
  };

  const highlightSearchTerm = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0" aria-describedby="protocol-search-description">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Protocol Search & Navigation
          </DialogTitle>
          <div id="protocol-search-description" className="text-sm text-muted-foreground">
            Search and filter Clark County EMS protocols with decision-tree navigation
          </div>
        </DialogHeader>
        <Card className="w-full max-w-4xl mx-auto border-0 shadow-none">
          <CardHeader className="hidden">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Protocol Search & Navigation
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Search and filter Clark County EMS protocols with decision-tree navigation
            </div>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search protocols (e.g., 'chest pain', 'STEMI', 'trauma')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  className="h-auto p-2 flex flex-col items-center gap-1"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="h-4 w-4" />
                  <span className="text-xs">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Urgency</label>
            <div className="grid grid-cols-4 gap-2">
              {urgencyLevels.map((level) => (
                <Button
                  key={level.id}
                  variant={selectedUrgency === level.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedUrgency(level.id)}
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Search Results ({filteredProtocols.length})
            </h3>
            {searchTerm && (
              <Badge variant="outline">
                Searching for: "{searchTerm}"
              </Badge>
            )}
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading protocols...</div>
          ) : filteredProtocols.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No protocols found matching your criteria</p>
              <p className="text-sm text-muted-foreground mt-2">
                Try different search terms or filter options
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProtocols.map((protocol: any) => (
                <Card key={protocol.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4" onClick={() => handleProtocolClick(protocol)}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(protocol.category)}`} />
                        <h4 className="font-semibold text-sm">{protocol.name}</h4>
                      </div>
                      <div className="flex gap-1">
                        <Badge 
                          variant="secondary" 
                          className={`${getUrgencyColor(protocol.urgency)} text-white text-xs`}
                        >
                          {protocol.urgency}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {protocol.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {protocol.description || "No description available"}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>Updated: {protocol.updatedAt ? new Date(protocol.updatedAt).toLocaleDateString() : "N/A"}</span>
                      </div>
                      <div>
                        Scope: {protocol.scope || "All"}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Quick Decision Tree */}
        {searchTerm.toLowerCase().includes("chest pain") && (
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Decision Tree: Chest Pain
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    STEMI Protocol
                  </Button>
                  <span>→ ST elevation, new LBBB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Cardiac Protocol
                  </Button>
                  <span>→ Troponin positive, unstable</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    Chest Pain Protocol
                  </Button>
                  <span>→ Stable, unclear etiology</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}