import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import Calculators from "@/pages/calculators";
import Medications from "@/pages/medications";
import Protocols from "@/pages/protocols";
import About from "@/pages/about";
import Landing from "@/pages/landing";
import Learning from "@/pages/learning";
import Pro from "@/pages/pro";
import NotFound from "@/pages/not-found";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/calculators" element={<Calculators />} />
      <Route path="/medications" element={<Medications />} />
      <Route path="/protocols" element={<Protocols />} />
      <Route path="/about" element={<About />} />
      <Route path="/learning" element={<Learning />} />
      <Route path="/pro" element={<Pro />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
