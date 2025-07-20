import queryClient from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/routes";
import Header from "@/components/layout/header";
import VoiceControl from "@/components/voice-control";
import LegalDisclaimer, { useDisclaimerCheck } from "@/components/legal-disclaimer";
import TodoList from "@/components/TodoList";

function Router() {
  const { showDisclaimer, setShowDisclaimer } = useDisclaimerCheck();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pb-20">
        <TodoList />
        <AppRoutes />
      </main>
      <BottomNavigation />
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
