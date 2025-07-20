import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/routes";
import TopNavigation from "@/components/layout/TopNavigation";
import Header from "@/components/layout/header";
import VoiceControl from "@/components/voice-control";
import LegalDisclaimer, { useDisclaimerCheck } from "@/components/legal-disclaimer";

function Router() {
  const { showDisclaimer, setShowDisclaimer } = useDisclaimerCheck();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <TopNavigation />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <VoiceControl />
      <LegalDisclaimer 
        open={showDisclaimer} 
        onOpenChange={setShowDisclaimer} 
      />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
