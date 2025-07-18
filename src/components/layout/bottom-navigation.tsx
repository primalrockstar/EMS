import { Link } from "react-router-dom";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-background border-t flex justify-around items-center h-16 z-10">
      <Link to="/" className="py-2 px-4">Home</Link>
      <Link to="/dashboard" className="py-2 px-4">Dashboard</Link>
      <Link to="/calculators" className="py-2 px-4">Calculators</Link>
      <Link to="/medications" className="py-2 px-4">Medications</Link>
      <Link to="/protocols" className="py-2 px-4">Protocols</Link>
      <Link to="/pro" className="py-2 px-4">Pro</Link>
    </nav>
  );
}
