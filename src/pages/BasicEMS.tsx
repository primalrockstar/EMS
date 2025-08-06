import React from 'react'
import { BookOpen, Calculator, Pill, FileText, Award, Clock, TrendingUp } from 'lucide-react'

interface BasicEMSProps {
  userTier: 'basic' | 'pro'
}

export const BasicEMS: React.FC<BasicEMSProps> = ({ userTier }) => {
  const basicFeatures = [
    {
      icon: BookOpen,
      title: 'Educational Modules',
      description: 'Structured learning content for EMS students',
      available: true,
      color: 'blue'
    },
    {
      icon: Calculator,
      title: 'Basic Calculators',
      description: 'APGAR, Glasgow Coma Scale, basic dosing',
      available: true,
      color: 'green'
    },
    {
      icon: Pill,
      title: 'Medication Reference',
      description: 'Basic scope medications and dosing',
      available: true,
      color: 'purple'
    },
    {
      icon: FileText,
      title: 'Protocol Reference',
      description: 'Read-only access to protocols',
      available: true,
      color: 'red'
    },
    {
      icon: Award,
      title: 'Study Notes',
      description: 'Flashcards and study materials',
      available: true,
      color: 'yellow'
    }
  ]

  const progressData = [
    { subject: 'Airway Management', progress: 85, total: 100 },
    { subject: 'Cardiac Emergencies', progress: 72, total: 100 },
    { subject: 'Trauma Assessment', progress: 68, total: 100 },
    { subject: 'Medical Emergencies', progress: 54, total: 100 },
    { subject: 'Pharmacology', progress: 41, total: 100 }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-600 border-yellow-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Basic EMS Training</h1>
        <p className="text-gray-600 dark:text-gray-400">Foundational emergency medical services education</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">Learning Progress</h3>
            <p className="text-blue-100">Keep up the great work!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">64%</div>
            <div className="text-blue-100 text-sm">Overall Progress</div>
          </div>
        </div>
        <div className="w-full bg-blue-400 rounded-full h-3">
          <div className="bg-white h-3 rounded-full" style={{ width: '64%' }}></div>
        </div>
      </div>

      {/* Available Features */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Available Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {basicFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(feature.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                <div className="mt-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    ✓ Available
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Learning Progress Details */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subject Progress</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-4">
            {progressData.map((item) => (
              <div key={item.subject}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.subject}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Stats */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">24.5h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Study Time</div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
            <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
            <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">89%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Quiz Average</div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
            <BookOpen className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white">41</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Chapters</div>
          </div>
        </div>
      </div>

      {/* Upgrade Prompt */}
      {userTier === 'basic' && (
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready for Advanced Training?</h3>
              <p className="text-purple-100 mb-4">
                Upgrade to Pro for advanced calculators, field protocols, and real-time alerts.
              </p>
              <ul className="text-purple-100 text-sm space-y-1">
                <li>• Advanced medical calculators</li>
                <li>• Field protocol access</li>
                <li>• Voice control features</li>
                <li>• Real-time EMS alerts</li>
              </ul>
            </div>
            <div className="text-center">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Completed Airway Management Quiz</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Score: 92% • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Studied Cardiac Rhythms</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Chapter 15 • Yesterday</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Calculator className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Used APGAR Calculator</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Score: 8/10 • 2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}