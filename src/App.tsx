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

// Import our pages
import { Dashboard } from './pages/Dashboard'
import { BasicEMS } from './pages/BasicEMS'
import { ProtocolsPage } from './pages/ProtocolsPage'
import { CalculatorsPage } from './pages/CalculatorsPage'
import { MedicationsPage } from './pages/MedicationsPage'
import { MorePage } from './pages/MorePage'

export default function App() {
  const [userTier, setUserTier] = useState<'basic' | 'pro'>('basic')
  const [darkMode, setDarkMode] = useState(false)
  const [voiceActive, setVoiceActive] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  const navigationItems = [
    { id: 'home', name: 'Home', icon: Home, component: Dashboard },
    { id: 'protocols', name: 'Protocols', icon: FileText, component: ProtocolsPage },
    { id: 'calculators', name: 'Calculators', icon: Calculator, component: CalculatorsPage },
    { id: 'medications', name: 'Medications', icon: Pill, component: MedicationsPage },
    { id: 'more', name: 'More', icon: MoreHorizontal, component: MorePage },
  ]

  const toggleVoice = () => {
    setVoiceActive(!voiceActive)
    // TODO: Implement Web Speech API
    if (!voiceActive) {
      console.log('Voice activated - listening for commands...')
    }
  }

  const CurrentComponent = navigationItems.find(item => item.id === currentPage)?.component || Dashboard

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EMS</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">ProMedix</span>
          </div>

          {/* User Tier Badge */}
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              userTier === 'pro' 
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {userTier.toUpperCase()}
            </span>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Profile */}
            <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-20 min-h-screen">
        <CurrentComponent userTier={userTier} />
      </main>

      {/* Voice Control FAB */}
      <button
        onClick={toggleVoice}
        className={`fixed right-4 bottom-24 w-14 h-14 rounded-full shadow-lg z-40 transition-all duration-300 ${
          voiceActive 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {voiceActive ? (
          <MicOff className="h-6 w-6 text-white mx-auto" />
        ) : (
          <Mic className="h-6 w-6 text-white mx-auto" />
        )}
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="grid grid-cols-5 h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors min-h-[48px] ${
                  isActive
                    ? 'text-blue-500 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* Voice Feedback Overlay */}
      {voiceActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 m-4 max-w-sm w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Mic className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Listening...
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Try: "Open APGAR calculator" or "Show cardiac protocols"
              </p>
              <button
                onClick={toggleVoice}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Stop Listening
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tier Switcher (Development Only) */}
      <div className="fixed top-20 right-4 z-40">
        <button
          onClick={() => setUserTier(userTier === 'basic' ? 'pro' : 'basic')}
          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
        >
          Switch to {userTier === 'basic' ? 'Pro' : 'Basic'}
        </button>
      </div>
    </div>
  )
}
