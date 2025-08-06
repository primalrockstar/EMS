import React from 'react'
import { FileText, Download, Eye, Upload, Search, Filter } from 'lucide-react'

interface ProtocolsPageProps {
  userTier: 'basic' | 'pro'
}

export const ProtocolsPage: React.FC<ProtocolsPageProps> = ({ userTier }) => {
  const protocols = [
    {
      id: 1,
      name: "Cardiac Arrest Protocol",
      category: "Cardiac",
      state: "Clark County, NV",
      type: "PDF",
      size: "2.3 MB",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      name: "Respiratory Distress Protocol",
      category: "Respiratory",
      state: "Clark County, NV", 
      type: "PDF",
      size: "1.8 MB",
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      name: "Trauma Assessment Protocol",
      category: "Trauma",
      state: "Clark County, NV",
      type: "PDF", 
      size: "3.1 MB",
      lastUpdated: "2024-01-08"
    },
    {
      id: 4,
      name: "Pediatric Emergency Protocol",
      category: "Pediatric",
      state: "Clark County, NV",
      type: "PDF",
      size: "2.7 MB", 
      lastUpdated: "2024-01-05"
    }
  ]

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Protocols</h1>
          <p className="text-gray-600 dark:text-gray-400">Emergency medical protocols and procedures</p>
        </div>
        {userTier === 'pro' && (
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <Upload className="h-4 w-4" />
            <span>Upload Protocol</span>
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search protocols..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none">
            <option>All Categories</option>
            <option>Cardiac</option>
            <option>Respiratory</option>
            <option>Trauma</option>
            <option>Pediatric</option>
          </select>
        </div>
      </div>

      {/* Protocols Grid */}
      <div className="grid gap-4">
        {protocols.map((protocol) => (
          <div key={protocol.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{protocol.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{protocol.category}</span>
                    <span>•</span>
                    <span>{protocol.state}</span>
                    <span>•</span>
                    <span>{protocol.size}</span>
                    <span>•</span>
                    <span>Updated {protocol.lastUpdated}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                  <Eye className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userTier === 'basic' && (
        <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              You have read-only access to protocols. Upgrade to Pro for upload and editing capabilities.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}