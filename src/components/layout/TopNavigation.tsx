import { Link } from "react-router-dom";

export default function TopNavigation() {
  return (
    <nav className="w-full bg-white border-b flex justify-center items-center gap-8 h-16 z-10">
      <Link to="/" className="py-2 px-4 font-medium text-gray-700 hover:text-blue-600">Home</Link>
      <Link to="/dashboard" className="py-2 px-4 font-medium text-gray-700 hover:text-blue-600">Dashboard</Link>
      <Link to="/calculators" className="py-2 px-4 font-medium text-gray-700 hover:text-blue-600">Calculators</Link>
      <Link to="/medications" className="py-2 px-4 font-medium text-gray-700 hover:text-blue-600">Medications</Link>
      <Link to="/protocols" className="py-2 px-4 font-medium text-gray-700 hover:text-blue-600">Protocols</Link>
      <Link to="/learning" className="py-2 px-4 font-medium text-gray-700 hover:text-blue-600">Learning</Link>
      <Link to="/pro" className="py-2 px-4 font-medium text-gray-700 hover:text-blue-600">Pro</Link>
    </nav>
  );
}
