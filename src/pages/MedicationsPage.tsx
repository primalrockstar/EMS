import React, { useState } from 'react'
import { Pill, Search, Filter, ChevronRight, ArrowLeft, AlertCircle } from 'lucide-react'

interface MedicationsPageProps {
  userTier: 'basic' | 'pro'
}

export const MedicationsPage: React.FC<MedicationsPageProps> = ({ userTier }) => {
  const [selectedMedication, setSelectedMedication] = useState<any>(null)
  const [medicationSearch, setMedicationSearch] = useState('')
  const [medicationFilter, setMedicationFilter] = useState('all')

  // Complete 56 medications database (using a subset for demo)
  const medications = [
    {
      id: 1,
      name: "Activated Charcoal",
      genericName: "Activated Charcoal",
      brandNames: ["Actidose", "CharcoAid", "Liqui-Char"],
      classification: "Antidote/Adsorbent",
      scope: "EMT-B",
      mechanism: "Binds to many drugs and chemicals, inhibiting absorption from GI tract",
      indications: ["Oral poisoning", "Drug overdose"],
      contraindications: ["Altered mental status", "Inability to swallow", "Caustic ingestion"],
      dosage: { adult: "25-50g PO", pediatric: "1g/kg PO" },
      route: ["Oral"],
      onsetDuration: "Onset: Immediate. Duration: Until elimination",
      sideEffects: ["Constipation", "Black stools", "Vomiting"],
      considerations: "Most effective within 1 hour of ingestion"
    },
    {
      id: 2,
      name: "Albuterol",
      genericName: "Albuterol Sulfate",
      brandNames: ["Proventil", "Ventolin", "ProAir"],
      classification: "Beta-2 Agonist",
      scope: "EMT-B",
      mechanism: "Selective beta-2 adrenergic agonist causing bronchodilation",
      indications: ["Asthma", "COPD", "Bronchospasm"],
      contraindications: ["Hypersensitivity"],
      dosage: { adult: "2.5mg in 3mL NS via nebulizer", pediatric: "2.5mg in 3mL NS" },
      route: ["Inhalation"],
      onsetDuration: "Onset: 5-15min. Duration: 3-6hrs",
      sideEffects: ["Tachycardia", "Tremor", "Nervousness"],
      considerations: "Monitor heart rate and BP"
    },
    {
      id: 3,
      name: "Epinephrine",
      genericName: "Epinephrine",
      brandNames: ["EpiPen", "Adrenalin", "Twinject"],
      classification: "Sympathomimetic",
      scope: "EMT-B",
      mechanism: "Alpha and beta adrenergic agonist",
      indications: ["Anaphylaxis", "Severe asthma", "Cardiac arrest"],
      contraindications: ["None in life-threatening situations"],
      dosage: { adult: "0.3-0.5mg IM (1:1000)", pediatric: "0.01mg/kg IM" },
      route: ["IM", "IV", "Endotracheal"],
      onsetDuration: "Onset: 1-2min. Duration: 5-10min",
      sideEffects: ["Tachycardia", "Hypertension", "Anxiety"],
      considerations: "May repeat q3-5min"
    },
    {
      id: 4,
      name: "Adenosine",
      genericName: "Adenosine",
      brandNames: ["Adenocard"],
      classification: "Antiarrhythmic",
      scope: "Paramedic",
      mechanism: "Slows conduction through AV node",
      indications: ["SVT", "PSVT"],
      contraindications: ["2nd/3rd degree heart block", "Asthma", "COPD"],
      dosage: { adult: "6mg IV rapid push, then 12mg", pediatric: "0.1mg/kg IV" },
      route: ["IV"],
      onsetDuration: "Onset: <30sec. Duration: 1-2min",
      sideEffects: ["Chest pain", "Dyspnea", "Flushing"],
      considerations: "Give rapid IV push followed by saline flush"
    },
    {
      id: 5,
      name: "Morphine",
      genericName: "Morphine Sulfate",
      brandNames: ["MS Contin", "Roxanol"],
      classification: "Opioid Analgesic",
      scope: "Paramedic",
      mechanism: "Mu-opioid receptor agonist",
      indications: ["Severe pain", "MI", "Pulmonary edema"],
      contraindications: ["Respiratory depression", "Head injury", "Hypotension"],
      dosage: { adult: "2-10mg IV", pediatric: "0.1mg/kg IV" },
      route: ["IV", "IM", "SC"],
      onsetDuration: "Onset: 5-10min IV. Duration: 2-7hrs",
      sideEffects: ["Respiratory depression", "Hypotension", "Nausea"],
      considerations: "Monitor respiratory status"
    }
  ]

  // Filter medications based on search and scope
  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(medicationSearch.toLowerCase()) ||
                         med.classification.toLowerCase().includes(medicationSearch.toLowerCase()) ||
                         med.indications.some(indication => indication.toLowerCase().includes(medicationSearch.toLowerCase()))
    
    const matchesFilter = medicationFilter === 'all' || med.scope === medicationFilter
    
    return matchesSearch && matchesFilter
  })

  if (selectedMedication) {
    return (
      <div className="p-4 space-y-6">
        {/* Navigation */}
        <div className="mb-6">
          <button 
            onClick={() => setSelectedMedication(null)}
            className="text-sm font-medium mb-6 flex items-center hover:underline transition-colors text-purple-600"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Medications List
          </button>
        </div>

        {/* Medication Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {selectedMedication.name}
              </h1>
              <p className="text-lg italic text-gray-600 dark:text-gray-400">
                {selectedMedication.classification} • {selectedMedication.scope}
              </p>
            </div>
          </div>
        </div>

        {/* Medication Details */}
        <div className="space-y-6">
          {/* Basic Information */}
          <section className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-purple-600">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Generic Name:</p>
                <p className="text-gray-600 dark:text-gray-400">{selectedMedication.genericName}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Brand Names:</p>
                <p className="text-gray-600 dark:text-gray-400">{selectedMedication.brandNames.join(', ')}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Classification:</p>
                <p className="text-gray-600 dark:text-gray-400">{selectedMedication.classification}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Scope of Practice:</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedMedication.scope === 'EMT-B' ? 'bg-blue-500 text-white' : 
                  selectedMedication.scope === 'AEMT' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                }`}>
                  {selectedMedication.scope}
                </span>
              </div>
            </div>
          </section>

          {/* Mechanism of Action */}
          <section className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-200">Mechanism of Action</h2>
            <p className="text-blue-800 dark:text-blue-200">{selectedMedication.mechanism}</p>
          </section>

          {/* Indications & Contraindications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-green-800 dark:text-green-200">Indications</h2>
              <ul className="space-y-2">
                {selectedMedication.indications.map((indication: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0 bg-green-500"></div>
                    <span className="text-green-800 dark:text-green-200">{indication}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-red-800 dark:text-red-200">Contraindications</h2>
              <ul className="space-y-2">
                {selectedMedication.contraindications.map((contraindication: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0 bg-red-500"></div>
                    <span className="text-red-800 dark:text-red-200">{contraindication}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Clinical Disclaimer */}
          <section className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 mr-3 text-red-600 dark:text-red-400" />
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Important Clinical Notice</h3>
            </div>
            <p className="text-sm leading-relaxed text-red-800 dark:text-red-200">
              This medication information is for educational purposes only. Always follow your local protocols, medical director guidelines, and scope of practice. Medication administration should only be performed by trained and certified personnel within their authorized scope of practice.
            </p>
          </section>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">EMS Medications</h1>
        <p className="text-gray-600 dark:text-gray-400">Comprehensive medication reference for emergency medical services</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search medications, classifications, or indications..."
            value={medicationSearch}
            onChange={(e) => setMedicationSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={medicationFilter}
            onChange={(e) => setMedicationFilter(e.target.value)}
            className="pl-10 pr-8 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 appearance-none"
          >
            <option value="all">All Scopes</option>
            <option value="EMT-B">EMT-B</option>
            <option value="AEMT">AEMT</option>
            <option value="Paramedic">Paramedic</option>
          </select>
        </div>
      </div>

      {/* Medication Count by Scope */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg text-center bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {medications.filter(med => med.scope === 'EMT-B').length}
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">EMT-B Medications</div>
        </div>
        <div className="p-4 rounded-lg text-center bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {medications.filter(med => med.scope === 'AEMT').length}
          </div>
          <div className="text-sm text-green-800 dark:text-green-200">AEMT Medications</div>
        </div>
        <div className="p-4 rounded-lg text-center bg-purple-50 dark:bg-purple-900 border border-purple-200 dark:border-purple-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {medications.filter(med => med.scope === 'Paramedic').length}
          </div>
          <div className="text-sm text-purple-800 dark:text-purple-200">Paramedic Medications</div>
        </div>
        <div className="p-4 rounded-lg text-center bg-orange-50 dark:bg-orange-900 border border-orange-200 dark:border-orange-700">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {medications.length}
          </div>
          <div className="text-sm text-orange-800 dark:text-orange-200">Total Medications</div>
        </div>
      </div>

      {/* Medications Grid */}
      <div className="grid gap-4">
        {filteredMedications.map((medication) => (
          <div 
            key={medication.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedMedication(medication)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 bg-purple-500">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {medication.name}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      medication.scope === 'EMT-B' ? 'bg-blue-500 text-white' : 
                      medication.scope === 'AEMT' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                    }`}>
                      {medication.scope}
                    </span>
                  </div>
                  <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
                    {medication.classification} • {medication.brandNames.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Primary indications: {medication.indications.slice(0, 3).join(', ')}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {filteredMedications.length === 0 && (
        <div className="text-center py-12">
          <Pill className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No Medications Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}