import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Info } from "lucide-react";
import promedixLogo from "@assets/logo2_1752462736002.png";

export default function Header() {
  const [, setLocation] = useLocation();

  return (
    <header className="bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border-b border-border shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <img 
                src={promedixLogo} 
                alt="ProMedix EMS Logo" 
                className="h-24 w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
              />
              <div className="text-sm font-bold mt-1 text-center">
                <span className="text-secondary bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">Empowering</span> <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">EMS Excellence</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setLocation("/about")}
              className="hidden sm:flex items-center gap-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
            >
              <Info className="h-4 w-4" />
              About
            </Button>
            <Badge className="bg-gradient-to-r from-secondary to-secondary/80 text-white hover:from-secondary/90 hover:to-secondary/70 font-semibold px-3 py-1 transition-all duration-200">
              Pro
            </Badge>
            <div className="flex items-center space-x-2">
              <Avatar className="h-9 w-9 ring-2 ring-primary/20 transition-all duration-200 hover:ring-primary/40">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-bold text-sm">
                  PM
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
