import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { 
  Home, 
  FileText, 
  Calculator, 
  Pill, 
  MoreHorizontal,
  Mic,
  MicOff,
  User,
  Moon,
  Sun
} from 'lucide-react'

function App() {
  const [userTier, setUserTier] = useState<'basic' | 'pro'>('basic')
  const [darkMode, setDarkMode] = useState(false)
  const [voiceActive, setVoiceActive] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-red-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">EMS</span>
              </div>
              <div>
                <h1 className="text-lg font-bold">NewEMSAPP</h1>
                <p className="text-xs opacity-90">Emergency Medical Services Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setVoiceActive(!voiceActive)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                {voiceActive ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Welcome to NewEMSAPP
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Your comprehensive Emergency Medical Services platform for training and protocols.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Protocols</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Access EMS protocols</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                <Calculator className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Calculators</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Medical calculators</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                <Pill className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Medications</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Drug reference</p>
              </div>
              <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
                <User className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800 dark:text-white">Profile</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">User settings</p>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <nav className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-around py-2">
            <button className="flex flex-col items-center py-2 px-4 text-red-600">
              <Home size={20} />
              <span className="text-xs mt-1">Home</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-gray-400">
              <FileText size={20} />
              <span className="text-xs mt-1">Protocols</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-gray-400">
              <Calculator size={20} />
              <span className="text-xs mt-1">Calculators</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-gray-400">
              <Pill size={20} />
              <span className="text-xs mt-1">Medications</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-gray-400">
              <MoreHorizontal size={20} />
              <span className="text-xs mt-1">More</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default App


