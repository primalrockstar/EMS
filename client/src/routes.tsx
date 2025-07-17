import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Patients from "@/pages/Patients";
import Settings from "@/pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/settings" element={<Settings />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}
