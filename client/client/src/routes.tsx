import { Switch, Route } from "wouter";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Protocols from "@/pages/protocols";
import Calculators from "@/pages/calculators";
import Medications from "@/pages/medications";
import Learning from "@/pages/learning";
import Pro from "@/pages/pro";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

export default function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/landing" component={Landing} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/protocols" component={Protocols} />
      <Route path="/calculators" component={Calculators} />
      <Route path="/medications" component={Medications} />
      <Route path="/learning" component={Learning} />
      <Route path="/pro" component={Pro} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}