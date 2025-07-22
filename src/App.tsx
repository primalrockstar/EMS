import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Landing } from './pages/Landing'  // Add this import

// Keep your other simple components
const Dashboard = () => <div className="p-8"><h1 className="text-3xl font-bold">Dashboard</h1><p>Welcome to EMS Platform!</p></div>
const Calculators = () => <div className="p-8"><h1 className="text-3xl font-bold">Medical Calculators</h1><p>Your calculators will go here.</p></div>
const Protocols = () => <div className="p-8"><h1 className="text-3xl font-bold">Protocols</h1><p>Emergency protocols.</p></div>
const Learning = () => <div className="p-8"><h1 className="text-3xl font-bold">Learning</h1><p>Training modules.</p></div>
const Medications = () => <div className="p-8"><h1 className="text-3xl font-bold">Medications</h1><p>Drug database.</p></div>

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />  {/* Updated this line */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/medications" element={<Medications />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>
    </div>
  )
}

export default App