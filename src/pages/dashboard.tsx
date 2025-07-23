import React from 'react'
import { 
  BookOpen, 
  Calculator, 
  FileText, 
  Pill, 
  Heart,
  Award,
  Clock,
  TrendingUp,
  AlertTriangle,
  Star,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

interface DashboardProps {
  userTier: 'basic' | 'pro'
}

export const Dashboard: React.FC<DashboardProps> = ({ userTier }) => {
  if (userTier === 'basic') {
    return (
      <div className="p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-2">Welcome, Student!</h2>
            <p className="text-blue-100 mb-4">You've completed 60% of Cardiac Module</p>
            <div className="w-full bg-blue-400 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Educational Modules</h3>
              <p className="text-xs text-gray-600 mt-1">Cardiac, Trauma, Respiratory</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Calculator className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Basic Calculators</h3>
              <p className="text-xs text-gray-600 mt-1">APGAR, Glasgow Coma</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Protocol Reference</h3>
              <p className="text-xs text-gray-600 mt-1">Read-only protocols</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold text-sm">Study Notes</h3>
              <p className="text-xs text-gray-600 mt-1">Flashcards & notes</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Learning Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Cardiac Emergencies</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Trauma Basics</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pharmacology</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Completed Airway Management Quiz</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Studied Cardiac Rhythms</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Pro Tier Dashboard
  return (
    <div className="p-4 space-y-6">
      {/* Alert Banner */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <p className="text-red-700 text-sm font-medium">
            Protocol Update: New cardiac arrest guidelines effective immediately
          </p>
        </div>
      </div>

      {/* Quick Access Panel */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-blue-500 text-white hover:bg-blue-600 transition-colors">
          <CardContent className="p-4 text-center">
            <Calculator className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Advanced Calculators</h3>
            <p className="text-xs text-blue-100 mt-1">IV drip, RSI dosing</p>
          </CardContent>
        </Card>

        <Card className="bg-green-500 text-white hover:bg-green-600 transition-colors">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Field Protocols</h3>
            <p className="text-xs text-green-100 mt-1">Clark County specific</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-500 text-white hover:bg-purple-600 transition-colors">
          <CardContent className="p-4 text-center">
            <Pill className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Medication Reference</h3>
            <p className="text-xs text-purple-100 mt-1">38 medications</p>
          </CardContent>
        </Card>

        <Card className="bg-orange-500 text-white hover:bg-orange-600 transition-colors">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2" />
            <h3 className="font-semibold">Real-Time Alerts</h3>
            <p className="text-xs text-orange-100 mt-1">2 active alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Pinned Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            Pinned Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <button className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100">
              <Heart className="h-6 w-6 text-red-500 mx-auto mb-1" />
              <span className="text-xs font-medium">ACLS Drugs</span>
            </button>
            
            <button className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100">
              <Calculator className="h-6 w-6 text-blue-500 mx-auto mb-1" />
              <span className="text-xs font-medium">IV Calculator</span>
            </button>
            
            <button className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100">
              <Pill className="h-6 w-6 text-green-500 mx-auto mb-1" />
              <span className="text-xs font-medium">Epinephrine</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Calculations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium">IV Drip Rate</p>
                <p className="text-xs text-gray-500">1000ml over 8hrs = 31 gtts/min</p>
              </div>
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
            
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <div>
                <p className="text-sm font-medium">Pediatric Dose</p>
                <p className="text-xs text-gray-500">Epinephrine 0.15mg (15kg child)</p>
              </div>
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">24</p>
            <p className="text-xs text-gray-600">Calculations Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">8</p>
            <p className="text-xs text-gray-600">Protocols Accessed</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">2.3h</p>
            <p className="text-xs text-gray-600">Study Time</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
