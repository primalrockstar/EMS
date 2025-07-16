export interface AnatomySystem {
  id: string;
  name: string;
  description: string;
  parts: AnatomyPart[];
  emsRelevance: string;
}

export interface AnatomyPart {
  id: string;
  name: string;
  position: { x: number; y: number };
  description: string;
  emsNote: string;
  color: string;
}

export const anatomySystems: AnatomySystem[] = [
  {
    id: 'respiratory',
    name: 'Respiratory System',
    description: 'The respiratory system is responsible for gas exchange and breathing',
    emsRelevance: 'Critical for airway management, ventilation, and oxygenation procedures',
    parts: [
      {
        id: 'nasal_cavity',
        name: 'Nasal Cavity',
        position: { x: 50, y: 10 },
        description: 'Primary entrance for air during normal breathing',
        emsNote: 'Nasopharyngeal airways inserted here; check for obstruction',
        color: '#3B82F6'
      },
      {
        id: 'mouth',
        name: 'Mouth',
        position: { x: 50, y: 15 },
        description: 'Alternative air entrance and primary route for procedures',
        emsNote: 'Oropharyngeal airways, intubation, and suctioning access point',
        color: '#3B82F6'
      },
      {
        id: 'pharynx',
        name: 'Pharynx',
        position: { x: 50, y: 20 },
        description: 'Throat area connecting nasal/oral cavity to larynx',
        emsNote: 'Common site for foreign body obstruction; suction frequently needed',
        color: '#3B82F6'
      },
      {
        id: 'larynx',
        name: 'Larynx',
        position: { x: 50, y: 25 },
        description: 'Voice box containing vocal cords',
        emsNote: 'Landmark for intubation; contains cricothyroid membrane',
        color: '#EF4444'
      },
      {
        id: 'cricothyroid',
        name: 'Cricothyroid Membrane',
        position: { x: 50, y: 27 },
        description: 'Membrane between cricoid and thyroid cartilages',
        emsNote: 'Emergency cricothyroidotomy site when intubation fails',
        color: '#DC2626'
      },
      {
        id: 'trachea',
        name: 'Trachea',
        position: { x: 50, y: 35 },
        description: 'Windpipe connecting larynx to bronchi',
        emsNote: 'Intubation target; palpable landmark in neck',
        color: '#3B82F6'
      },
      {
        id: 'bronchi',
        name: 'Main Bronchi',
        position: { x: 50, y: 45 },
        description: 'Primary branches of trachea entering lungs',
        emsNote: 'Right bronchus more vertical - common aspiration site',
        color: '#3B82F6'
      },
      {
        id: 'lungs',
        name: 'Lungs',
        position: { x: 50, y: 60 },
        description: 'Primary organs of respiration',
        emsNote: 'Assess breath sounds; needle decompression sites',
        color: '#10B981'
      }
    ]
  },
  {
    id: 'circulatory',
    name: 'Circulatory System',
    description: 'The cardiovascular system pumps blood throughout the body',
    emsRelevance: 'Essential for CPR, IV access, and cardiac emergency management',
    parts: [
      {
        id: 'heart',
        name: 'Heart',
        position: { x: 45, y: 40 },
        description: 'Four-chambered pump that circulates blood',
        emsNote: 'CPR compression point; ECG electrode placement reference',
        color: '#EF4444'
      },
      {
        id: 'aorta',
        name: 'Aorta',
        position: { x: 50, y: 35 },
        description: 'Largest artery carrying blood from heart',
        emsNote: 'Pulse assessment point; blood pressure reference',
        color: '#DC2626'
      },
      {
        id: 'carotid',
        name: 'Carotid Artery',
        position: { x: 50, y: 20 },
        description: 'Major artery in neck supplying brain',
        emsNote: 'Primary pulse check site; avoid pressure on both sides',
        color: '#DC2626'
      },
      {
        id: 'radial',
        name: 'Radial Artery',
        position: { x: 35, y: 55 },
        description: 'Artery in wrist commonly used for pulse',
        emsNote: 'Pulse assessment; blood pressure palpation reference',
        color: '#DC2626'
      },
      {
        id: 'femoral',
        name: 'Femoral Artery',
        position: { x: 48, y: 75 },
        description: 'Large artery in thigh',
        emsNote: 'Pulse check in cardiac arrest; potential IV access',
        color: '#DC2626'
      },
      {
        id: 'external_jugular',
        name: 'External Jugular Vein',
        position: { x: 52, y: 22 },
        description: 'Large vein in neck',
        emsNote: 'Emergency IV access when peripheral veins unavailable',
        color: '#3B82F6'
      },
      {
        id: 'antecubital',
        name: 'Antecubital Vein',
        position: { x: 35, y: 50 },
        description: 'Vein in elbow crease',
        emsNote: 'Preferred IV access site; large and stable',
        color: '#3B82F6'
      }
    ]
  },
  {
    id: 'musculoskeletal',
    name: 'Musculoskeletal System',
    description: 'Bones, joints, and muscles providing structure and movement',
    emsRelevance: 'Important for trauma assessment, splinting, and immobilization',
    parts: [
      {
        id: 'skull',
        name: 'Skull',
        position: { x: 50, y: 5 },
        description: 'Bony structure protecting the brain',
        emsNote: 'Assess for fractures; mechanism of injury important',
        color: '#F59E0B'
      },
      {
        id: 'cervical_spine',
        name: 'Cervical Spine',
        position: { x: 50, y: 15 },
        description: 'Seven vertebrae in the neck',
        emsNote: 'Immobilize with collar; high injury risk in trauma',
        color: '#F59E0B'
      },
      {
        id: 'ribs',
        name: 'Ribs',
        position: { x: 50, y: 35 },
        description: 'Curved bones protecting thoracic organs',
        emsNote: 'Fractures may cause pneumothorax; CPR may break ribs',
        color: '#F59E0B'
      },
      {
        id: 'pelvis',
        name: 'Pelvis',
        position: { x: 50, y: 65 },
        description: 'Ring-shaped bone structure',
        emsNote: 'Pelvic fractures = internal bleeding risk; log roll carefully',
        color: '#F59E0B'
      },
      {
        id: 'femur',
        name: 'Femur',
        position: { x: 48, y: 80 },
        description: 'Longest bone in the body (thigh)',
        emsNote: 'Fractures cause significant bleeding; requires traction splint',
        color: '#F59E0B'
      },
      {
        id: 'tibia_fibula',
        name: 'Tibia/Fibula',
        position: { x: 48, y: 90 },
        description: 'Lower leg bones',
        emsNote: 'Common fracture sites; assess distal circulation',
        color: '#F59E0B'
      },
      {
        id: 'humerus',
        name: 'Humerus',
        position: { x: 35, y: 40 },
        description: 'Upper arm bone',
        emsNote: 'Fractures may injure radial nerve; sling and swathe',
        color: '#F59E0B'
      },
      {
        id: 'radius_ulna',
        name: 'Radius/Ulna',
        position: { x: 35, y: 55 },
        description: 'Forearm bones',
        emsNote: 'Common fracture sites; splint from hand to above elbow',
        color: '#F59E0B'
      }
    ]
  }
];

export const anatomyQuizzes = [
  {
    id: 'respiratory_quiz',
    systemId: 'respiratory',
    title: 'Respiratory System Quiz',
    questions: [
      {
        question: 'What is the emergency airway procedure site?',
        options: ['Trachea', 'Cricothyroid membrane', 'Larynx', 'Pharynx'],
        correct: 'Cricothyroid membrane',
        explanation: 'The cricothyroid membrane is the site for emergency surgical airway when intubation fails.'
      },
      {
        question: 'Which bronchus is more prone to aspiration?',
        options: ['Left main bronchus', 'Right main bronchus', 'Both equally', 'Neither'],
        correct: 'Right main bronchus',
        explanation: 'The right main bronchus is more vertical and wider, making it more prone to aspiration.'
      }
    ]
  },
  {
    id: 'circulatory_quiz',
    systemId: 'circulatory',
    title: 'Circulatory System Quiz',
    questions: [
      {
        question: 'Which pulse point is checked during CPR?',
        options: ['Radial', 'Carotid', 'Femoral', 'Brachial'],
        correct: 'Carotid',
        explanation: 'The carotid pulse is checked during CPR as it remains palpable longer than peripheral pulses.'
      },
      {
        question: 'What is the preferred IV access site?',
        options: ['External jugular', 'Femoral', 'Antecubital', 'Subclavian'],
        correct: 'Antecubital',
        explanation: 'The antecubital vein is preferred for IV access due to its large size and stability.'
      }
    ]
  }
];