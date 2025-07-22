import React from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Heart, 
  Pill, 
  Calculator, 
  Bot, 
  FileText,
  ArrowRight,
  Star,
  Users,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export const Landing: React.FC = () => {
  const features = [
    { 
      title: "650+ Study Cards", 
      description: "Comprehensive flashcards across all EMS categories", 
      icon: BookOpen,
      color: "text-blue-600"
    },
    { 
      title: "Interactive Scenarios", 
      description: "40+ real-world emergency training cases", 
      icon: Heart,
      color: "text-red-600"
    },
    { 
      title: "Medication Reference", 
      description: "Complete drug database with dosing information", 
      icon: Pill,
      color: "text-green-600"
    },
    { 
      title: "15 Medical Calculators", 
      description: "Essential tools for field calculations", 
      icon: Calculator,
      color: "text-purple-600"
    },
    { 
      title: "Protocol Assistant", 
      description: "AI-powered protocol guidance with voice control", 
      icon: Bot,
      color: "text-orange-600"
    },
    { 
      title: "Clark County Protocols", 
      description: "Official EMS protocols for Las Vegas region", 
      icon: FileText,
      color: "text-indigo-600"
    },
  ]

  const stats = [
    { number: '650+', label: 'Study Cards', icon: BookOpen },
    { number: '15', label: 'Calculators', icon: Calculator },
    { number: '40+', label: 'Scenarios', icon: Heart },
    { number: '24/7', label: 'Access', icon: Clock },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              ProMedix EMS
            </h1>
            
            <div className="text-xl mb-4 opacity-90">© 2025 ProMedix EMS</div>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              Professional Emergency Medical Services Training
            </h2>
            
            <p className="text-lg md:text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
              ProMedix EMS is a comprehensive training platform for EMT, AEMT, and Paramedic certification levels.
              Features interactive scenarios, medication references, Clark County protocols, and advanced study tools.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 opacity-90" />
                    <div className="text-3xl font-bold">{stat.number}</div>
                    <div className="text-sm opacity-80">{stat.label}</div>
                  </div>
                )
              })}
            </div>
            
            <Button asChild size="lg" className="bg-white text-red-700 hover:bg-red-50 text-lg px-8 py-3">
              <Link to="/dashboard">
                Enter ProMedix EMS
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for EMS Excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed specifically for emergency medical professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-100 p-3 rounded-lg mr-4">
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Advance Your EMS Career?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of EMS professionals who trust ProMedix for their training and certification needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50">
              <Link to="/dashboard">
                Start Training Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-red-600">
              <Link to="/calculators">
                Try Calculators
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm opacity-80">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1 text-yellow-400" />
              <span>Professional Grade</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>Trusted by 1000+ EMTs</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>24/7 Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            <span className="text-lg font-semibold">ProMedix EMS</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2025 ProMedix EMS. Professional Emergency Medical Services Training Platform.
          </p>
        </div>
      </footer>
    </div>
  )
}