import { useLocation } from "react-router-dom";
import Header from "@/components/layout/header";
import TopNavigation from "@/components/layout/TopNavigation";
import AppRoutes from "@/routes";
import VoiceControl from "@/components/voice-control";
import LegalDisclaimer, { useDisclaimerCheck } from "@/components/legal-disclaimer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

function Router() {
  const { pathname } = useLocation();
  const { showDisclaimer, setShowDisclaimer } = useDisclaimerCheck();
  const showNav = pathname !== "/";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      {showNav && <TopNavigation />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      <VoiceControl />
      <LegalDisclaimer open={showDisclaimer} onOpenChange={setShowDisclaimer} />
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
