import React, { useState } from 'react'
import { Calculator, Heart, Baby, Droplets, Brain, Activity } from 'lucide-react'

interface CalculatorsPageProps {
  userTier: 'basic' | 'pro'
}

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({ userTier }) => {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(null)

  const calculators = [
    {
      id: 'apgar',
      name: 'APGAR Score',
      description: 'Newborn assessment scoring',
      icon: Baby,
      color: 'blue',
      tier: 'basic'
    },
    {
      id: 'glasgow',
      name: 'Glasgow Coma Scale',
      description: 'Neurological assessment',
      icon: Brain,
      color: 'purple',
      tier: 'basic'
    },
    {
      id: 'pediatric-dose',
      name: 'Pediatric Dosing',
      description: 'Weight-based medication dosing',
      icon: Baby,
      color: 'green',
      tier: 'basic'
    },
    {
      id: 'iv-drip',
      name: 'IV Drip Rate',
      description: 'Intravenous fluid calculations',
      icon: Droplets,
      color: 'blue',
      tier: 'pro'
    },
    {
      id: 'cardiac-output',
      name: 'Cardiac Output',
      description: 'Hemodynamic calculations',
      icon: Heart,
      color: 'red',
      tier: 'pro'
    },
    {
      id: 'burn-assessment',
      name: 'Burn Assessment',
      description: 'Rule of Nines calculation',
      icon: Activity,
      color: 'orange',
      tier: 'pro'
    }
  ]

  const availableCalculators = calculators.filter(calc => 
    userTier === 'pro' || calc.tier === 'basic'
  )

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      red: 'bg-red-100 text-red-600 border-red-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (selectedCalculator) {
    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedCalculator(null)}
            className="text-blue-500 hover:text-blue-700"
          >
            ← Back to Calculators
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {calculators.find(c => c.id === selectedCalculator)?.name}
          </h1>
        </div>
        
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400 text-center py-8">
            Calculator component would be loaded here...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Medical Calculators</h1>
        <p className="text-gray-600 dark:text-gray-400">Field-ready calculation tools for EMS professionals</p>
      </div>

      {/* Calculator Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{availableCalculators.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {calculators.filter(c => c.tier === 'basic').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Basic Tier</div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {calculators.filter(c => c.tier === 'pro').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pro Tier</div>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">24</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Used Today</div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableCalculators.map((calculator) => {
          const Icon = calculator.icon
          return (
            <div 
              key={calculator.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCalculator(calculator.id)}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(calculator.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                    {calculator.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {calculator.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  calculator.tier === 'basic' 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {calculator.tier.toUpperCase()}
                </span>
                <Calculator className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Pro Upgrade Banner */}
      {userTier === 'basic' && (
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Unlock Advanced Calculators</h3>
              <p className="text-purple-100">
                Upgrade to Pro for access to IV drip rates, cardiac output, and more advanced tools.
              </p>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      )}
    </div>
  )
}