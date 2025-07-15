import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  Calculator, 
  Pill, 
  GraduationCap,
  Briefcase,
  Info,
  User,
  Shield
} from "lucide-react";
import { useUserTier } from "@/hooks/useUserTier";
import { useState } from "react";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { isBasic, isPro } = useUserTier();
  const [userLevel, setUserLevel] = useState<"EMT" | "AEMT" | "Paramedic">("EMT");

  const baseNavItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/protocols", icon: FileText, label: "Protocols" },
    { path: "/calculators", icon: Calculator, label: "Calculators" },
    { path: "/medications", icon: Pill, label: "Medications" },
    { path: "/about", icon: Info, label: "About" },
  ];

  // Enhanced navigation based on user level and tier
  const getNavItems = () => {
    if (isBasic) {
      return [
        ...baseNavItems.slice(0, 4),
        { path: "/learning", icon: GraduationCap, label: "Learning" },
        baseNavItems[4] // About
      ];
    } else if (isPro) {
      return [
        ...baseNavItems.slice(0, 4),
        { path: "/pro", icon: Briefcase, label: "Pro Tools" },
        baseNavItems[4] // About
      ];
    }
    return baseNavItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 border-t border-border/50 backdrop-blur-md z-40 shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-around items-center py-2">
          {navItems.map((item) => {
            const isActive = location === item.path;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center p-3 h-auto min-w-[60px] transition-all duration-200 ${
                  isActive 
                    ? "text-primary bg-primary/10 rounded-xl" 
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl"
                }`}
                onClick={() => setLocation(item.path)}
              >
                <Icon className={`w-5 h-5 mb-1 transition-all duration-200 ${isActive ? "scale-110" : ""}`} />
                <span className={`text-xs font-medium transition-all duration-200 ${isActive ? "font-semibold" : ""}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
