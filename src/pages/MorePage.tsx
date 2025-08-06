import React from 'react'
import { Settings, User, HelpCircle, Info, Star, BookOpen, Download, Shield } from 'lucide-react'

interface MorePageProps {
  userTier: 'basic' | 'pro'
}

export const MorePage: React.FC<MorePageProps> = ({ userTier }) => {
  const menuItems = [
    {
      section: 'Account',
      items: [
        { icon: User, name: 'Profile Settings', description: 'Manage your account and preferences' },
        { icon: Star, name: 'Subscription', description: `Current plan: ${userTier.toUpperCase()}` },
        { icon: Download, name: 'Offline Content', description: 'Download for offline access' }
      ]
    },
    {
      section: 'Learning',
      items: [
        { icon: BookOpen, name: 'Study Progress', description: 'Track your learning journey' },
        { icon: Star, name: 'Favorites', description: 'Your saved protocols and medications' },
        { icon: Download, name: 'Downloads', description: 'Manage downloaded content' }
      ]
    },
    {
      section: 'Support',
      items: [
        { icon: HelpCircle, name: 'Help & Support', description: 'Get help and contact support' },
        { icon: Info, name: 'About', description: 'About ProMedix EMS' },
        { icon: Shield, name: 'Privacy Policy', description: 'Privacy and data protection' }
      ]
    },
    {
      section: 'App',
      items: [
        { icon: Settings, name: 'Settings', description: 'App preferences and configuration' },
        { icon: Info, name: 'Version Info', description: 'App version and updates' }
      ]
    }
  ]

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">More</h1>
        <p className="text-gray-600 dark:text-gray-400">Settings, support, and additional features</p>
      </div>

      {/* User Tier Badge */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">
              {userTier === 'pro' ? 'Pro Account' : 'Basic Account'}
            </h3>
            <p className="text-blue-100">
              {userTier === 'pro' 
                ? 'Access to all advanced features and tools'
                : 'Upgrade to Pro for advanced features'
              }
            </p>
          </div>
          <div className="text-right">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              userTier === 'pro' 
                ? 'bg-white bg-opacity-20 text-white' 
                : 'bg-white text-purple-600'
            }`}>
              {userTier.toUpperCase()}
            </div>
          </div>
        </div>
        {userTier === 'basic' && (
          <button className="mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
            Upgrade to Pro
          </button>
        )}
      </div>

      {/* Menu Sections */}
      <div className="space-y-6">
        {menuItems.map((section) => (
          <div key={section.section}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              {section.section}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.name}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300 text-left group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
                        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                        →
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ProMedix EMS</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
            Professional Emergency Medical Services Education Platform
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-xs">
            Version 1.0.0 • Built for EMS professionals
          </p>
        </div>
      </div>

      {/* Developer Info */}
      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Created By</h3>
          <p className="text-blue-800 dark:text-blue-200 font-medium">Shaun Williamson</p>
          <p className="text-blue-700 dark:text-blue-300 text-sm">
            EMS Student at Guardian Elite Medical Services
          </p>
          <p className="text-blue-600 dark:text-blue-400 text-sm">
            Las Vegas, Nevada
          </p>
        </div>
      </div>
    </div>
  )
}